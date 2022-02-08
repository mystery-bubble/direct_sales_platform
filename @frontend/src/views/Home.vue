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
                @change="orderChange"
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
                :isChecked="index === filters.arrangeTarget"
                name="arrange-choice"
                @change="changeArrangeMethod( $event, index )"
              />
            </div>
            <div class="tool subtitle mt-5">商品篩選</div>
            <div class="tool text mt-1.5">價格範圍</div>
            <div class="mt-2">
              <input
                @change="changePriceRange('min', $event.target.value)"
                type="number"
                class="tool input"
                placeholder="最小值"
                step="100"
              >
              <span> ~ </span>
              <input 
                @change="changePriceRange('max', $event.target.value)"
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
        <div class="list-container">
          <div class="search-box">
            <div class="inner" :class="{ 'focus': isFocused }">
              <icon icon="mdi:magnify" class="search-icon" />
              <input spellcheck="false" @focus="changeFocusState" @blur="changeFocusState" class="search-input-field" type="text">
            </div>
          </div>
          <div class="content-none" v-if="searchEmpty()">
            找不到任何商品
          </div>
          <div class="list content" v-if="!searchEmpty()">
            <x-little-product
              v-for="( product, index ) in pagedProducts( page.now )"
              :id="product.id"
              :key="`product-${ index }`"
              :title="product.name"
              :sold="product.sold_count"
              :price="product.price"
            />
          </div>
        </div>
        <div class="page-change-block">
          <div class="change-block sign">
            <Icon 
              icon="mdi:chevron-double-left"
              :class="{ 'invisible': page.now === 0 }"
              @click="changePage( 0 )"
            />
          </div>
          <div class="change-block-main">
            <Icon 
              icon="mdi:chevron-left"
              class="inline-block text-3xl mr-1"
              :class="{ 'invisible': page.now === 0 }"
              @click="changePage( 0 )"
            />
            <div
              v-for="( pagenum, index ) in pageNumbers(page.now)"
              :key="`numblock-${ index }`"
              :style="`${ index === totalPages - 1 ? 'margin-right: 0;' : '' }`"
              class="number-block"
              :class="{ 'active': index === page.now }"
              @click="changePage( index )"
            >
              {{ pagenum }}
            </div>
            <Icon
              icon="mdi:chevron-right"
              class="inline-block text-3xl ml-1"
              :class="{ 'invisible': page.now === totalPages - 1 }"
              @click="changePage( totalPages - 1 )"
            />
          </div>
          <div class="change-block sign">
            <Icon 
              icon="mdi:chevron-double-right"
              :class="{ 'invisible': page.now === totalPages - 1 }"
              @click="changePage( totalPages - 1 )"
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
    products: [],
    types: [
      {
        name: "全部商品",
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
          methodsParam: "default"
        },
        {
          title: "依照上架時間",
          methodsParam: "createTime"
        },
        {
          title: "依照金額大小",
          methodsParam: "price"
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
    },
    page: {
      now: 0,
      maxAmount: 12
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
    changeArrangeMethod( isChecked, index ) {
      if ( isChecked ) {
        this.filters.arrangeTarget = index
      }
      this.products = this.arrangedProducts()
    },
    typeClickHandler( index ) {
      if ( !this.isTypesDragging ) {
        this.typeActive = index
      }
    },
    pagedProducts( current ) {
      if ( this.products.filter( element => this.inRange( element.price ) ).length <= this.page.maxAmount ) {
        return this.products.filter( element => this.inRange( element.price ) )
      }
      else {
        return this.products.filter( element => this.inRange( element.price ) ).slice( current * this.page.maxAmount , Math.min( ( current + 1 ) * this.page.maxAmount, this.products.length ) )
      }
    },
    pageNumbers( current ) {
      let returnNumbers = []
      if ( this.totalPages <= 7 ) {
        for ( let iter = 0 ; iter <= this.totalPages - 1 ; ++iter ) {
          returnNumbers.push( iter + 1 )
        }
      }
      else if ( current >= 0 || current <= 3 ) {
        for ( let iter = 0 ; iter <= 6 ; ++iter ) {
          returnNumbers.push( iter + 1 )
        }
      }
      else if ( current >= this.totalPages - 4 || current <= this.totalPages - 1 ) {
        for ( let iter = this.totalPages - 7 ; iter <= this.totalPages - 1 ; ++iter ) {
          returnNumbers.push( iter + 1 )
        }
      }
      else {
        for ( let iter = current - 3 ; iter <= current + 3 ; ++iter ) {
          returnNumbers.push( iter + 1 )
        }
      }
      return returnNumbers
    },
    changePriceRange( choice, value ) {
      if ( choice === "min" ) {
        if ( value === "" ) {
          this.filters.priceRange.min = 0  
        }
        else {
          this.filters.priceRange.min = parseInt( value )
        }
      }
      else if ( choice === "max" ) {
        if ( value === "" ) {
          this.filters.priceRange.max = Infinity  
        }
        else {
          this.filters.priceRange.max = parseInt( value )
        }
      }
    },
    changePage( index ) {
      this.page.now = index
      window.scrollTo(0,0)
      // call api
    },
    inRange( price ) {
      if ( price.min > this.filters.priceRange.max || price.min < this.filters.priceRange.min ) {
        return false
      }
      else {
        return true
      }
    },
    arrangedProducts() {
      if ( this.filters.arrangeTarget === 0 ) {
        // true will be ascending, false will be decending
        return this.products.slice().sort( ( x, y ) => {
          return !this.productsOrder ? x.index - y.index : y.index - x.index
        })
      }
      else if ( this.filters.arrangeTarget === 1 ) {
        return this.products.slice().sort( ( x, y ) => {
          let xDate = new Date( x.createdAt ).getTime()
          let yDate = new Date( y.createdAt ).getTime()

          return !this.productsOrder ? xDate - yDate : yDate - xDate
        })
      }
      else if ( this.filters.arrangeTarget === 2 ) {
        return this.products.slice().sort( ( x, y ) => !this.productsOrder ? x.price.min - y.price.min : y.price.min - x.price.min )
      }
    },
    orderChange( value ) {
      this.productsOrder = value
      console.log( this.arrangedProducts() )
      this.products = this.arrangedProducts()
    },
    searchEmpty() {
      return this.products.length === 0
    }
  },
  async mounted() {
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

    try {
      this.stopScrolling.wheelOpt = supportsPassive ? { passive: false } : false;
      this.stopScrolling.wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
  
      await this.$axios.get(`${ this.apiNetwork }/api/v1/product/search`)
                       .then( res => {
                         res.data.payload.forEach( ( element, index ) => element.index = index )
                         this.products = res.data.payload
                       })
    }
    catch ( err ) {
      console.error( err )
    }
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
  },
  computed: {
    totalPages() {
      return Math.floor( this.products.length / this.page.maxAmount ) + 1
    },
    apiNetwork() {
      return process.env.NODE_ENV === "development" ? "http://localhost:1234" : "https://api.xihetang.com.tw"
    }
  }
};
</script>

<style scoped lang="postcss">
@import "../styles/views/Home.pcss";
</style>