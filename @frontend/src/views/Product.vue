<template>
  <div class="view product">
    <!-- <router-link class="text-xl" to="/">Back to Home</router-link> -->
    <div class="product image">
      <img class="w-full h-auto" :src="imgSrc">
    </div>
    <div class="product title-text">
      {{ info.name }}
    </div>
    <div class="product section-price-sold">
      <div class="product price">
        $ {{ currentPrice }}
      </div>
      <!-- <div class="product sold">
        已售出 {{ info.sold_count }} 件
      </div> -->
      <div class="product sold">
        熱銷中
      </div>
    </div>
    <hr class="border-t border-custom-black-trn-2 my-2 self-stretch">
    <div class="product type">
      <div class="type-title">種類</div>
      <div class="type-selectors">
        <div
          @click="changeType( index )"
          class="selectors-item"
          :class="{ 'active': index === typeActived }"
          v-for="( type, index ) in info.types"
          :key="`type-${ index }`"
        >
        {{ type.title }}
        </div>
      </div>
    </div>
    <hr class="border-t border-custom-black-trn-2 mt-2 mb-4 self-stretch">
    <div class="product description">
      {{ info.description || "無描述" }}
    </div>
    <hr class="border-t border-custom-black-trn-2 mt-4 mb-4 self-stretch">
    <div class="product actions">
      <div class="amount-change">
        <div class="sign" @click.stop="decreaseStopAt( 1 )">
          <Icon icon="mdi:minus" class="text-3xl" />
        </div>
        <div class="number">
          <input v-model="amount" class="number-input text-center w-full" type="text" @click.stop="clickMask">
        </div>
        <div class="sign" @click.stop="++amount">
          <Icon icon="mdi:plus" class="text-3xl" />
        </div>
      </div>
      <div class="add-to-cart" @click="addItemToCart()">加入至購物車</div>
    </div>
  </div>  
</template>

<script>
export default {
  data: () => ({
    // for the fucking computed crying about I AM GETTING UNDEFINED
    info: {
      types: [
        {
          selling_price: 0
        }
      ]
    },
    typeActived: 0,
    amount: 1,
    
  }),
  async mounted() {
    await this.$axios.get(`${ this.apiNetwork }/api/v1/product/${ this.$route.params.pid }`)
    .then( res => {
      this.info = res.data.payload
    } )
  },
  computed: {
    currentPrice() {
      return this.info.types[ this.typeActived ].selling_price
    },
    imgSrc() {
      return `${ this.apiNetwork }/api/v1/image/product/${ this.$route.params.pid }`
    },
    apiNetwork() {
      return process.env.NODE_ENV === "development" ? "http://localhost:1234" : "https://api.xihetang.com.tw"
    }
  },
  methods: {
    changeType( index ) {
      this.typeActived = index
    },
    addItemToCart() {
      this.$store.commit("addCartItem", {
        id: this.info.id,
        type: this.info.types[ this.typeActived ].id,
        amount: this.amount,
        price: this.currentPrice
      })
      alert("成功將商品加入購物車!")
      console.log( this.$store.state.cart )
    },
    clickMask() {
      return true
    },
    decreaseStopAt( value ) {
      if ( this.amount === value ) {
        return
      }
      --this.amount
    }
  }
}
</script>

<style scoped lang="postcss">
@import "../styles/views/Product.pcss";
</style>  