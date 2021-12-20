<template>
  <div class="component little-product">
    <div class="little-product-image">
      <img :src="img" />
    </div>
    <div class="little-product-title">
      {{ shrinkTitle }}
    </div>
    <div class="little-product-numbers">
      <div class="number sold">已售出 {{ shortsold }}</div>
      <div class="number price">${{ price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String
    },
    title: {
      type: String
    },
    sold: {
      type: Number
    },
    price: {
      type: Number
    },
    over: {
      type: Number,
      default: 9999
    }
  },
  computed: {
    shortsold() {
      return this.sold > this.over ? `${ this.over }+` : this.info.sold
    },
    shrinkTitle() {
      if ( this.title.length > 25 ) {
        return this.title.slice( 0, 26 ) + "..."
      }
      return this.title
    }
  }
}
</script>

<style scoped lang="postcss">
@import "../../../styles/components/unique/Home/x-little-product.pcss";
</style>