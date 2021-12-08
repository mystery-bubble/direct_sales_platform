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
    <div class="home disable-mask" v-show="floatOpening" />
    <div class="home floating-group">
      <div class="floating-menu" v-show="floatOpening">test</div>
      <v-icon class="floating-button" @click="changeFloatState" x-large color="#F3F4F5">mdi-menu</v-icon>
    </div>
  </div>
</template>

<script>
import XLittleProduct from "@/components/unique/Home/x-little-product.vue";

export default {
  name: "Home",
  components: {
    XLittleProduct,
  },
  data: () => ({
    floatOpening: false,
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
    }
  }
};
</script>

<style scoped lang="postcss">
@import "../styles/views/Home.pcss";
</style>