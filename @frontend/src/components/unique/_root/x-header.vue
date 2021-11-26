<template>
  <div class="header">
    <div class="main-part">
      <div class="logo-section">
        <img src="@/assets/title_logo.png" alt="西河堂御品顏LOGO_圖片" class="logo-img">
        <img src="@/assets/title_text.png" alt="西河堂御品顏LOGO_文字" class="text-img">
      </div>
      <div class="action-section">
        <div class="btn-group">
          <v-icon size="32">mdi-cart</v-icon>
        </div>
        <div class="guide-bar">
          <div
            class="active-container"
            :style="`left: ${ 20 + this.guideBarActivated * 124 }px; transition: left 275ms ease-in-out`"
          />
          <div
            @click="stateChange( guideBarActivated, index )" 
            v-for="( item, index ) in guideBarItems"
            :key="`bar-item-${ index }`"
            :class="{ 'active': ( guideBarActivated === index ) }"
            class="bar-item"
          >
            {{ item.title }}
          </div>
        </div>
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
export default {
  data: () => ({
    guideBarActivated: 0,
    guideBarItems: [
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
    ],
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
        this.guideBarActivated = newIndex
        this.goto( this.guideBarItems[ newIndex ].route )
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
        this.$router.push( route )
      }
    }
  },
  mounted() {
    console.log( this.$route.path )
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

<style lang="postcss">
.auto-scrolling {
  transition: transform 200ms ease-in;
}

.header {
  @apply px-7 py-6 flex-col;
}

.main-part > .logo-section {
  @apply flex justify-end px-7 py-5 m-1;

  height: 170px;
  width: 465px;
  background-color: rgba(174, 155, 113, .3);
  border-radius: 24px;
}

.main-part > .action-section {
  @apply flex flex-col flex-grow justify-between items-end;
}

.main-part {
  @apply flex;
}

.sub-part {
  @apply overflow-y-hidden mt-2 mx-1 px-4 h-11;
  
  padding-top: 0.7rem;
  background-color: rgba(174, 155, 113, .3);
  border-radius: 8px;
}

.sub-part > .vertical-marquee-item {
  @apply block mb-2;
}

.logo-img {
  object-fit: none;
}

.text-img {
  @apply pl-5;

  object-fit: none;
}

.btn-group {
  @apply flex
}

.guide-bar {
  @apply flex mb-1;

  position: relative;
}

.guide-bar > .active-container {
  position: absolute;
  width: 104px;
  height: 40px;
  left: 20px;
  background-color: #786F5C;
  border-radius: 8px;
  transition: left 200ms ease-in-out;
}

.guide-bar > .bar-item {
  @apply ml-5 px-5 py-2;

  font-weight: bold;
  color: rgba(66, 60, 49, 1);
  z-index: 1;
  cursor: pointer;
  transition: color 600ms ease-out
}

.active {
  color: rgba(243, 244, 245, 1) !important;
}
</style>