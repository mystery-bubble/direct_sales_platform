<template>
  <div class="cart-item-container">
    <div class="c-item action">
      <input type="checkbox">
    </div>
    <div class="c-item picture">
      <img class="item-picture" src="https://via.placeholder.com/500">
    </div>
    <div class="c-item shrink-content">test</div>
    <div class="c-item title">
      <div>
        這是一個超讚的商品這是一個超讚的商品這是一個超讚的商品這是一個超讚的商品這是一個超讚的商品這是一個超讚的商品這是一個超讚的商品
      </div>
    </div>
    <div class="c-item specs">
      <select name="specs" class="border border-custom-black">
        <option disabled selected hidden>選擇規格</option>
        <option value="">testsetsetset</option>
        <option value="">testsetsetset</option>
        <option value="">testsetsetset</option>
        <option value="">testsetsetset</option>
      </select>
    </div>
    <div class="c-item price">$ 9999999</div>
    <div class="c-item amount">
      <div class="sign">
        <Icon icon="mdi:plus" />
      </div>
      <div class="number">99999</div>
      <div class="sign">
        <Icon icon="mdi:minus" />
      </div>
    </div>
    <div class="c-item subtotal">$ 999999</div>
    <div class="c-item check-sign">
      <svg
        class="ml-1.5"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 18.101 18.544"
      >
        <path 
          d="M1509.117,18.5l4.165,5.863,11.49-16.175"
          transform="translate(-1507.894 -7.319)"
          fill="none"
          stroke="#f3f4f5"
          stroke-linejoin="round"
          stroke-width="3"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeHandler( state ) {
      this.$emit( "change", state )
    }
  }
}
</script>

<style>
@import "../../../styles/components/unique/Cart/x-cart-item.pcss";
</style>