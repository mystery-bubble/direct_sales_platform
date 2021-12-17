<template>
  <div class="view cart">
    <div class="cart main-part">
      <div class="main head">
        <div class="inline-block w-1/2">商品</div>
        <div class="inline-block w-1/6">單價</div>
        <div class="inline-block w-1/6">數量</div>
        <div class="inline-block w-1/6">小計</div>
      </div>
      <span class="main-container">
        <x-cart-item></x-cart-item>
      </span>
    </div>
    <div class="cart event-part"></div>
    <div class="cart action-part"></div>
  </div>
</template>

<script>
import XCartItem from "@/components/unique/Cart/x-cart-item.vue"

export default {
  components: {
    XCartItem
  },
  methods: {
    test( val ) {
      console.log( val )
    }
  }
}
</script>

<style scoped lang="postcss">
@import "../styles/views/Cart.pcss";
</style>