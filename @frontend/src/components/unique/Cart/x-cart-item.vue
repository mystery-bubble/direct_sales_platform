<template>
  <div
    class="cart-item-container"
    :class="{ 'selected': isChecked }"
    @click="changeHandler( !isChecked )"
  >
    <div class="c-item action">
      <input type="checkbox" :checked="isChecked" @change="changeHandler( $event.target.checked )">
    </div>
    <div class="c-item picture">
      <img class="item-picture" :src="info.imgsrc">
    </div>
    <div class="c-item shrink-content">
      <div class="title">{{ this.shrinkTitle }}</div>
      <div class="types">
        <select name="specs" class="drop-menu" @change="optionChangeHandler( $event.target.value )" @click.stop="selectMask">
          <option disabled selected hidden>選擇規格</option>
          <option v-for="( type, index ) in info.types" :key="`type-${ index }`" :value="type.id">{{ type.name }}</option>
        </select>
      </div>
      <div class="price">
        $ {{ info.price }}
      </div>
      <div class="amount">
        <div class="sign" @click.stop="--info.amount">
          <Icon icon="mdi:minus" />
        </div>
        <div class="number">
          <input v-model="info.amount" class="number-input" type="text" @click.stop="clickMask">
        </div>
        <div class="sign" @click.stop="++info.amount">
          <Icon icon="mdi:plus" />
        </div>
      </div>
    </div>
    <div class="c-item title">
      {{ info.title }}
    </div>
    <div class="c-item types">
      <select name="specs" class="drop-menu" @change="optionChangeHandler( $event.target.value )" @click.stop="clickMask">
        <option disabled selected hidden>選擇規格</option>
        <option v-for="( type, index ) in info.types" :key="`type-${ index }`" :value="type.id">{{ type.name }}</option>
      </select>
    </div>
    <div class="c-item price">$ {{ info.price }}</div>
    <div class="c-item amount">
      <div class="sign" @click.stop="--info.amount">
        <Icon icon="mdi:minus" />
      </div>
      <div class="number">
        <span>
          <input v-model="info.amount" class="number-input" type="text" @click.stop="clickMask">
        </span>
      </div>
      <div class="sign" @click.stop="++info.amount">
        <Icon icon="mdi:plus" />
      </div>
    </div>
    <div class="c-item subtotal">$ {{ this.subtotal }}</div>
    <div class="c-item check-sign" v-show="isChecked">
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
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    info: {
      title: "這是一個超讚的商品這是一個超讚的商品這是一個超讚的商品這是一個超讚的商品這是一個超讚的商品這是一個超讚的商品這是一個超讚的商品",
      imgsrc: "https://via.placeholder.com/500",
      types: [
        {
          id: "00000000",
          name: "選項 1"
        },
        {
          id: "00000001",
          name: "選項 2"
        },
        {
          id: "00000002",
          name: "選項 3"
        }
      ],
      price: 5000,
      amount: 1000
    },
    isChecked: false,
    selectedOption: -1,
    amountInputMode: false
  }),
  methods: {
    changeHandler( state ) {
      this.isChecked = state
    },
    clickMask() {
      return true
    },
    optionChangeHandler( id ) {
      for ( let iter in this.info.types ) {
        if ( this.info.types[ iter ].id === id ) {
          this.selectedOption = iter
          return
        }
      }
    }
  },
  computed: {
    subtotal() {
      return this.info.amount * this.info.price
    },
    shrinkTitle() {
      if ( this.info.title.length > 30 ) {
        return this.info.title.slice(0,31) + " ..."
      }
      else {
        return this.info.title
      }
    },
    amount() {
      return this.info.amount
    }
  },
  watch: {
    checked( newVal ) {
      this.isChecked = newVal
    },
    isChecked( newVal ) {
      this.$emit( "change", newVal )
    },
    amount( newVal, oldVal ) {
      if ( isNaN( newVal ) ) {
        this.info.amount = parseInt( oldVal )
      }
    }
  }
}
</script>

<style>
@import "../../../styles/components/unique/Cart/x-cart-item.pcss";
</style>