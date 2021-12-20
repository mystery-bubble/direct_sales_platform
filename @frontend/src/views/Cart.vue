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
    <!--
    <div class="cart event-part">
      
    </div>
    -->
    <div class="cart action-part">
      <div class="action-section">
      </div>
      <div class="result-section">
        <div class="number-total">
          <span class="total-sign">總金額</span>
          <span class="total-text">$ 9999999</span>
        </div>
        <div class="number-discount">
          <span class="discount-sign">折扣</span>
          <span class="discount-text">- $ 999999</span>
        </div>
        <hr class="border-0.5 border-custom-black-trn-3">
        <div class="action-dispatch">
          <div class="total-counter">共 9998 件商品</div>
          <div class="flex flex-row items-center">
            <div class="real-total-sign">實際金額</div>
            <div class="real-total-text">$ 999999999</div>
            <div class="dispatch-button">
              <div class="text-2xl">確定送出</div>
              <div class="text-4xl ml-4">
                <Icon icon="mdi:arrow-right-circle-outline" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XCartItem from "@/components/unique/Cart/x-cart-item.vue"

export default {
  components: {
    XCartItem
  },
  methods: {
  }
}
</script>

<style scoped lang="postcss">
@import "../styles/views/Cart.pcss";
</style>