<template>
  <div class="header">
    <div class="main-part">
      <div class="logo-section" @click="goto('/')">
        <img src="@/assets/title_logo.png" alt="西河堂御品顏LOGO_圖片" class="logo-img">
        <img src="@/assets/title_text.png" alt="西河堂御品顏LOGO_文字" class="text-img">
      </div>
      <div class="action-section">
        <div class="btn-group">
          <Icon icon="mdi:cart" class="action cart" @click.native="goto('/cart')" />
        </div>
        <div class="guide-bar">
          <div
            class="active-container"
            :style="`left: ${ 20 + this.guideBar.activated * 124 }px; transition: left 275ms ease-in-out`"
          />
          <div
            @click="stateChange( guideBar.activated, index )" 
            v-for="( item, index ) in guideBar.items"
            :key="`bar-item-${ index }`"
            :class="{ 'active': ( guideBar.activated === index ) }"
            class="bar-item"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="foldable-action-section">
        <div @click="folding" class="fold-activator">
          <Icon icon="mdi:menu" class="activator-icon" />
        </div>
        <transition name="expand-y">
          <span class="fold-list" v-show="!foldableAction.isFold">
            <transition-group name="expand-y-content">
              <div
                v-show="!foldableAction.isFold"
                @click="goto('/cart')"
                class="action-item"
                :key="`item-0`"
              >
                購物車
              </div>
              <div
                v-show="!foldableAction.isFold"
                @click="goto( item.route )"
                class="action-item"
                v-for="( item, index ) in guideBar.items"
                :key="`item-${ index + 1 }`"
              >
                {{ item.title }}
              </div>
            </transition-group>
          </span>
        </transition>
      </div>
    </div>
    <div
      v-if="false"
      class="sub-part"
      @mouseenter="verticalMarquee.isPaused = true"
      @mouseleave="verticalMarquee.isPaused = false"
    >
      <a
        @click="goto( item.route )"
        v-for="( item, index ) in verticalMarquee.items"
        :key="`marquee-item-${ index }`"
        class="vertical-marquee-item"
        :class="{ 'auto-scrolling': !verticalMarquee.disableTransition }"
        :style="`transform: translate( 0px, ${ verticalMarquee.now * -32 }px );`"
      >
        {{ item.text }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    guideBar: {
      activated: 0,
      items: [
        {
          title: "商品總覽",
          route: "/",
        },
        {
          title: "促銷活動",
          route: "/event",
        },
        {
          title: "關於我們",
          route: "/about",
        },
        {
          title: "幫助中心",
          route: "/help",
        }
      ]
    },
    verticalMarquee: {
      now: 0,
      timer: undefined,
      isPaused: false,
      delay: 3000,
      disableTransition: false,
      items: [
        {
          text: "test 0",
          route: "/"
        },
        {
          text: "test 1",
          route: "/test"
        },
        {
          text: "test 2",
          route: "/"
        }
      ]
    },
    foldableAction: {
      isFold: true  
    }
  }),
  methods: {
    initialize() {
      // set addon animations
      let frameChild = document.createElement("style")
      frameChild.classList.add("keyframe")
      frameChild.textContent = this.calculateFrame()
      document.head.appendChild(frameChild)

      // set default value
      this.verticalMarquee.items.push( this.verticalMarquee.items[ 0 ] )
      for ( let page in this.guideBar.items ) {
        if ( this.$route.path === this.guideBar.items[ parseInt( page ) ].route ) {
          this.stateChange( this.guideBar.activated, parseInt( page ) )
        }
      }
      // call api
    },
    stateChange( oldIndex, newIndex ) {
      if ( oldIndex === newIndex ) {
        return
      }
      else {
        this.guideBar.activated = newIndex
        this.goto( this.guideBar.items[ newIndex ].route )
      }
    },
    startTimer( oper ) {
      var timeout = oper()
      this.verticalMarquee.timer = setTimeout( () => {
        this.startTimer( this.marqueeIndexChange )
      }, timeout )
    },
    marqueeIndexChange() {
      if ( this.verticalMarquee.isPaused ) {
        return 3000
      }
      else {
        if ( this.verticalMarquee.now !== this.verticalMarquee.items.length - 1 ) {
          ++this.verticalMarquee.now
          return 3000
        }
        else {
          this.verticalMarquee.now = 0
          return 0
        }
      }
    },
    goto( route ) {
      if ( this.$route.path === route ) {
        return
      }
      else {
        this.foldableAction.isFold = true
        this.$router.push( route )
      }
    },
    folding() {
      this.foldableAction.isFold = !this.foldableAction.isFold;
    },
    calculateFrame() {
      let expandOuter = ""
      let expandInner = ""
      let collapseOuter = ""
      let collapseInner = ""
      let ease = ( n ) => {
        return 1 - Math.pow( 1 - n, 4 )
      }
      for ( let step = 0 ; step <= 100 ; ++step ) {
        let easedStep = ease( step / 100 )
        expandOuter += `${ step }% {transform:scale(1,${ easedStep });}`
        expandInner += `${ step }% {transform:scale(1,${ 1 / easedStep });}`
        collapseOuter += `${ step }% {transform:scale(1,${ 1 - easedStep });}`
        collapseInner += `${ step }% {transform:scale(1,${ 1 / ( 1 - easedStep ) });}`
      }
      return `@keyframes expandOuter {${ expandOuter }}
      @keyframes expandInner {${ expandInner }}
      @keyframes collapseOuter {${ collapseOuter }}
      @keyframes collapseInner {${ collapseInner }}`
    }
  },
  mounted() {
    this.initialize()
    setTimeout( () => {
      this.startTimer( this.marqueeIndexChange );
    }, 3000 )
  },
  watch: {
    "verticalMarquee.now" ( oldValue, newValue ) {
      if ( newValue == this.verticalMarquee.items.length - 1 ) {
        this.verticalMarquee.disableTransition = true
      }
      else {
        this.verticalMarquee.disableTransition = false
      }
    },
    "$route" () {
      for ( let page in this.guideBar.items ) {
        if ( this.$route.path === this.guideBar.items[ parseInt( page ) ].route ) {
          this.stateChange( this.guideBar.activated, parseInt( page ) )
        }
      }
    }
  }
}
</script>

<style scoped lang="postcss">
@import "../../../styles/components/unique/_root/x-header.pcss";
</style>