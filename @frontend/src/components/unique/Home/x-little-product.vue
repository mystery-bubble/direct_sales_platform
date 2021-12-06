<template>
  <div class="component little-product">
    <div class="little-product-image">
      <img :src="info.imgPath" />
    </div>
    <div class="little-product-title">
      {{ info.title }}
    </div>
    <div class="little-product-numbers">
      <div class="number sold">已售出 {{ shortsold }}</div>
      <div class="number price">${{ info.price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    info: {
      imgPath: "https://via.placeholder.com/1000",
      title: "testsetsetsetsetsetsetsetsetsetsetsetestsetsetsetsetsetsetsetsetsetsetse",
      sold: 99999,
      price: 99999
    },
    over: 9999
  }),
  computed: {
    shortsold() {
      return this.info.sold > this.over ? `${ this.over }+` : this.info.sold
    }
  }
}
</script>

<style scoped lang="postcss">
@import "../../../styles/components/unique/Home/x-little-product.pcss";
</style>