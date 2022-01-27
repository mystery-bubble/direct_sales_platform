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
      <img class="item-picture" :src="info.imgSrc">
    </div>
    <div class="c-item shrink-content">
      <div class="title">{{ this.shrinkTitle }}</div>
      <div class="types">
        <select name="specs" class="drop-menu" @change="optionChangeHandler( $event.target.value )" @click.stop="clickMask">
          <option disabled :selected="selectedOption === 0" hidden>選擇規格</option>
          <option v-for="( type, index ) in info.types" :key="`type-${ index }`" :value="type.id" :selected="selectedOption === index + 1">{{ type.name }}</option>
        </select>
      </div>
      <div class="price">
        $ {{ info.price }}
      </div>
      <div class="amount">
        <div class="sign" @click.stop="decreaseStopAt( 1 )">
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
        <option disabled :selected="selectedOption === 0" hidden>選擇規格</option>
        <option v-for="( type, index ) in info.types" :key="`type-${ index }`" :value="type.id" :selected="selectedOption === index + 1">{{ type.name }}</option>
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
    },
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      default: 1
    },
    price: {
      type: Number,
      required: true,
      default: 0
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
      price: 0
    },
    isChecked: false,
    selectedOption: 0
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
          this.selectedOption = parseInt( iter ) + 1
          return
        }
      }
    },
    async infoRemap() {
      let newInfo = {
        imgSrc: "",
        title: "",
        types: [],
        price: 0,
        amount: 0
      }

      await this.$axios.get(`${ this.apiNetwork }/api/v1/product/${ this.id }`)
      .then( res => {
        newInfo.imgSrc = `${ this.apiNetwork }/api/v1/image/product/${ this.id }`
        newInfo.title = res.data.payload.name
        newInfo.types = res.data.payload.types.map( element => {
          return { id: element.id, name: element.title }
        })
      })

      newInfo.price = this.price
      newInfo.amount = this.amount
      this.info = newInfo
      this.info.types.forEach( ( element, index ) => {
        if ( this.type === element.id ) {
          this.selectedOption = parseInt( index ) + 1
        } 
      })
    },
    decreaseStopAt( value ) {
      if ( this.info.amount === value ) {
        return
      }
      --this.info.amount
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
    apiNetwork() {
      return process.env.NODE_ENV === "development" ? "http://localhost:1234" : "https://api.xihetang.com.tw"
    }
  },
  watch: {
    checked( newVal ) {
      this.isChecked = newVal
    },
    isChecked( newVal ) {
      this.$emit( "check", newVal )
    },
    amount( newVal, oldVal ) {
      if ( isNaN( newVal ) ) {
        this.info.amount = parseInt( oldVal )
      }
    },
    info: {
      handler: function( newVal ) {
        let newItem = {
          id: this.id,
          type: this.info.types[ this.selectedOption - 1 ].id,
          price: this.info.price,
          amount: newVal.amount
        }
        this.$emit( "change", newItem )
      },
      deep: true
    },
    selectedOption( newVal ) {
      let newItem = {
        id: this.id,
        type: this.info.types[ newVal - 1 ].id,
        price: this.info.price,
        amount: this.info.amount
      }
      this.$emit( "change", newItem )
    }
  },
  async created() {
    await this.infoRemap()
  }
}
</script>

<style>
@import "../../../styles/components/unique/Cart/x-cart-item.pcss";
</style>