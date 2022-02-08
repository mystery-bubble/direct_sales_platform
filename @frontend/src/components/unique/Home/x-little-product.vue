<template>
  <div class="component little-product" @click="gotoInfo()">
    <div class="little-product-image">
      <img :src="imgSrc" />
    </div>
    <div class="little-product-title">
      {{ shrinkTitle }}
    </div>
    <div class="little-product-numbers">
      <!-- <div class="number sold">已售出 {{ shortsold }}</div> -->
      <div class="number sold">熱銷中</div>
      <div class="number price">{{ range }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    },
    title: {
      type: String
    },
    sold: {
      type: Number
    },
    price: {
      type: Object
    },
    over: {
      type: Number,
      default: 9999
    }
  },
  computed: {
    shortsold() {
      return this.sold > this.over ? `${ this.over }+` : this.sold
    },
    shrinkTitle() {
      if ( this.title.length > 25 ) {
        return this.title.slice( 0, 26 ) + "..."
      }
      return this.title
    },
    range() {
      if ( this.price.max === this.price.min ) {
        return "$" + this.price.max
      }
      else {
        return `$${ this.price.min } ~ $${ this.price.max }`
      }
    },
    imgSrc() {
      return `${ this.apiNetwork }/api/v1/image/product/${ this.id }`
    },
    apiNetwork() {
      return process.env.NODE_ENV === "development" ? "http://localhost:1234" : "https://api.xihetang.com.tw"
    }
  },
  methods: {
    gotoInfo() {
      this.$router.push( `/product/${ this.id }` )
    }
  }
}
</script>

<style scoped lang="postcss">
@import "../../../styles/components/unique/Home/x-little-product.pcss";
</style>