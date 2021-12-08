<template>
  <div class="header">
    <div class="main-part">
      <div class="logo-section">
        <img src="@/assets/title_logo.png" alt="西河堂御品顏LOGO_圖片" class="logo-img">
        <img src="@/assets/title_text.png" alt="西河堂御品顏LOGO_文字" class="text-img">
      </div>
      <div class="action-section">
        <div class="btn-group">
          <Icon icon="mdi:cart" class="action cart" />
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
          <expand-transition>
            <div v-show="!foldableAction.isFold">
              <div
                @click="goto('/cart')"
                class="action-item"
              >
                購物車
              </div>
              <div
                @click="goto( item.route )"
                class="action-item"
                v-for="( item, index ) in guideBar.items"
                :key="`item-${ index }`"
              >
                {{ item.title }}
              </div>
            </div>
          </expand-transition>
      </div>
    </div>
    <div
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
import ExpandTransition from "@/components/common/transitions/expand-transition.vue"

export default {
  components: {
    ExpandTransition
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
          route: "/test",
        },
        {
          title: "關於我們",
          route: "/",
        },
        {
          title: "幫助中心",
          route: "/",
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
      // set default value
      this.verticalMarquee.items.push( this.verticalMarquee.items[ 0 ] )

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
      // console.log( route )
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
    }
  }
}
</script>

<style scoped lang="postcss">
@import "../../../styles/components/unique/_root/x-header.pcss";
</style>