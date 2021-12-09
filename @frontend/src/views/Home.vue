<template>
  <div class="view home">
    <div class="home list-section">
      <div class="search-box">
        <div class="inner" :class="{ 'focus': isFocused }">
          <icon icon="mdi:magnify" class="search-icon" />
          <input spellcheck="false" @focus="changeFocusState" @blur="changeFocusState" class="search-input-field" type="text">
        </div>
      </div>
      <div class="list container">
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
    <div 
      class="home disable-mask"
      @click="changeFloatState"
      v-show="floatOpening"
    />
    <div class="home floating-group">
      <div
        ref="floatingMenu"
        class="floating-menu"
        :class="{ 'open': floatOpening, 'close': !floatOpening }"
      >
        <span v-show="floatContentVisibilty">
          <div class="menu-item">test</div>
        </span>
      </div>
      <div class="floating-button" @click="changeFloatState">
        <Icon class="button-icon" icon="mdi:toolbox" />
      </div>
    </div>
  </div>
</template>

<script>
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
        path: "https://via.placeholder.com/1000",
        title: "testsetsetsetsetsetsetsetsetsetsetsetestsetsetsetsetsetsetsetsetsetsetse",
        sold: 10000,
        price: 99999
      }
    )
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