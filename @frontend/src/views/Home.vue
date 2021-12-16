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
    <div class="home section main">
      <div class="main left">
        <div class="vertical-types">
          <div
            v-for="( item, index ) in types"
            :key="`v-product-item-${ index }`"
            class="v-type-item"
            :class="{ 'active': index === typeActive }"
          >
            <div class="item section active-signs">
              <div class="sign" :class="{ 'disabled': index !== typeActive }"></div>
              <div class="sign" :class="{ 'disabled': index !== typeActive }"></div>
            </div>
            <div class="item section text">{{ item.name }}</div>
          </div>
        </div>
        <div class="filter-tools">
          <div class="tool title">
            <span class="title text">篩選工具</span>
          </div>
          <div class="tool content">
            <div class="tool subtitle">
              <div>商品排序</div>
              <radio-switch
                :state="productsOrder"
                size="md"
                text:left="降序"
                text:right="升序"
              />
            </div>
            <div class="checkbox-group">
              <custom-checkbox 
                v-for="( item, index ) in filters.arrange"
                :key="`checkbox-${ index }`"
                :label="item.title"
                class="mb-1.5"
              />
            </div>
            <div class="tool subtitle mt-5">商品篩選</div>
            <div class="tool text mt-1.5">價格範圍</div>
            <div class="mt-2">
              <input 
                type="number"
                class="tool input"
                placeholder="最小值"
                step="100"
              >
              <span> ~ </span>
              <input 
                type="number"
                class="tool input"
                placeholder="最大值"
                step="100"
              >
            </div>
            <div class="tool text error mt-1.5" v-show="errorOccured.priceRange.mingtrmax">
              最大值的數字必須大於最小值的數字。
            </div>
          </div>
        </div>
      </div>
      <div class="main right">
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
import RadioSwitch from "@/components/common/simple/radio-switch.vue"
import CustomCheckbox from "@/components/common/simple/custom-checkbox.vue"

export default {
  name: "Home",
  components: {
    XLittleProduct,
    RadioSwitch,
    CustomCheckbox
  },
  data: () => ({
    productsOrder: false,
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
      },
      {
        name: "最新商品",
      },
      {
        name: "暢銷商品",
      },
      {
        name: "暢銷商品",
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
    isTypesDragging: false,
    filters: {
      arrange: [
        {
          title: "依照默認排序",
          methodsParam: "arrange:default"
        },
        {
          title: "依照上架時間",
          methodsParam: "arrange:default"
        },
        {
          title: "依照金額大小",
          methodsParam: "arrange:default"
        }
      ],
      arrangeTarget: 0,
      priceRange: {
        min: 0,
        max: Infinity
      } 
    },
    errorOccured: {
      priceRange: {
        mingtrmax: false
      }
    }
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
    console.log( this.filters.arrange )
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