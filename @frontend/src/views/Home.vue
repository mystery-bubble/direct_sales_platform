<template>
  <div class="view home">
    <div
      class="horizontal-types"
    >
      <div
        v-for="( type, index ) in types"
        :key="`product-type-${ index }`"
        class="h-type-item"
        :class="{ 'active': index === typeActive }"
        :style="`${ index === types.length - 1 ? 'margin-right: 0;' : '' }`"
        @click.stop="typeClickHandler( index )"
      >
        {{ type.name }}
      </div>
    </div>
    <div class="home list-section">
      <div class="vertical-types">
        <div
          v-for="( item, index ) in types"
          :key="`v-product-item-${ index }`"
          class="v-type-item"
          :class="{ 'active': index === typeActive }"
        >
          <div
            class="item section active-signs"
          >
            <div class="sign" :class="{ 'disabled': index !== typeActive }"></div>
            <div class="sign" :class="{ 'disabled': index !== typeActive }"></div>
          </div>
          <div class="item section text">{{ item.name }}</div>
        </div>
      </div>
      <div class="list container">
        <div class="search-box">
          <div class="inner" :class="{ 'focus': isFocused }">
            <icon icon="mdi:magnify" class="search-icon" />
            <input spellcheck="false" @focus="changeFocusState" @blur="changeFocusState" class="search-input-field" type="text">
          </div>
        </div>
        <div class="list content">
          <x-little-product
            v-for="( product, index ) in products"
            :key="`product-${ index }`"
            :img="product.path"
            :title="product.title"
            :sold="product.sold"
            :price="product.price"
          />
        </div>
      </div>
    </div>
    <transition name="fade">
      <div 
        class="home disable-mask"
        @click="changeFloatState"
        v-show="floatOpening"
      />
    </transition>
    <div class="home floating-group">
      <transition name="float-expand">
        <span
          class="floating-menu"
          v-show="floatOpening"
        >
          <span v-show="floatOpening">
            <div class="menu-item">test</div>
          </span>
        </span>
      </transition>
      <div class="floating-button" @click="changeFloatState">
        <Icon class="button-icon" icon="mdi:filter" />
      </div>
    </div>
  </div>
</template>

<script>
// Stop scrolling solution from https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
import XLittleProduct from "@/components/unique/Home/x-little-product.vue";

export default {
  name: "Home",
  components: {
    XLittleProduct
  },
  data: () => ({
    floatOpening: false,
    floatContentVisibilty: false,
    stopScrolling: {
      wheelOpt: undefined,
      wheelEvent: undefined
    },
    isFocused: false,
    products: Array(30).fill(
      {
        path: "https://via.placeholder.com/350",
        title: "testsetsetsetsetsetsetsetsetsetsetsetestsetsetsetsetsetsetsetsetsetsetse",
        sold: 10000,
        price: 99999
      }
    ),
    types: [
      {
        name: "全部商品",
        mode: "arrange",
        tag: ""
      },
      {
        name: "最新商品",
        mode: "arrange",
        tag: ""
      },
      {
        name: "暢銷商品",
        mode: "arrange",
        tag: ""
      },
      {
        name: "暢銷商品",
        mode: "arrange",
        tag: ""
      }
    ],
    typeActive: 0,
    currentPosition: {
      scroll: {
        left: undefined,
      },
      mouse: {
        x: undefined,
      }
    },
    isTypesDragging: false
  }),
  methods: {
    changeFocusState() {
      this.isFocused = !this.isFocused
    },
    changeFloatState() {
      this.floatOpening = !this.floatOpening
      setTimeout( () => {
        this.floatContentVisibilty = !this.floatContentVisibilty
      }, 140 )
    },
    preventDefault( e, keyMode = false ){  
      if ( !keyMode ) {
        e.preventDefault()
      }
      else {
        var keys = {37: 1, 38: 1, 39: 1, 40: 1};
        if ( keys[ e.keyCode ] ) {
          this.preventDefault( e );
          return false;
        }
      }
    },
    typeClickHandler( index ) {
      if ( !this.isTypesDragging ) {
        this.typeActive = index
      }
    }
  },
  mounted() {
    var supportsPassive = false;
    try {
      window.addEventListener( "test", null, Object.defineProperty( 
        {},
        'passive',
        { 
          get: function () {
            supportsPassive = true;
            return null 
          } 
        }
      ));
    }
    catch(e) {
      console.error( e )
    }
    this.stopScrolling.wheelOpt = supportsPassive ? { passive: false } : false;
    this.stopScrolling.wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
  },
  watch: {
    floatOpening( newVal ) {
      if ( newVal ) {
        window.addEventListener( 'DOMMouseScroll', this.preventDefault, false );
        window.addEventListener( this.stopScrolling.wheelEvent, this.preventDefault, this.stopScrolling.wheelOpt );
        window.addEventListener( 'touchmove', this.preventDefault, this.stopScrolling.wheelOpt );
        window.addEventListener( 'keydown', this.preventDefaultForScrollKeys, false );
      }
      else {
        window.removeEventListener( 'DOMMouseScroll', this.preventDefault, false );
        window.removeEventListener( this.stopScrolling.wheelEvent, this.preventDefault, this.stopScrolling.wheelOpt ); 
        window.removeEventListener( 'touchmove', this.preventDefault, this.stopScrolling.wheelOpt );
        window.removeEventListener( 'keydown', this.preventDefaultForScrollKeys, false );
      }
    }
  }
};
</script>

<style scoped lang="postcss">
@import "../styles/views/Home.pcss";
</style>