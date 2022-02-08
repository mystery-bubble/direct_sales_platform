<template>
  <div class="view cart">
    <div class="cart btn-group-part">
      <div class="btn pick-all" v-if="!allPicked" @click="pickAll( true )">全選</div>
      <div class="btn cancel-pick-all" v-if="allPicked" @click="pickAll( false )">取消全選</div>
      <div class="self-center">
        <span class="btn back" @click="deleteMode = false" v-if="deleteMode">返回</span>
        <span class="btn delete-picked" v-if="deleteMode" @click="deletePicked">刪除選擇的項目</span>
        <span class="btn delete-all" v-if="deleteMode" @click="deleteAll">刪除全部</span>
        <span class="btn delete-mode" v-if="!deleteMode" @click="deleteMode = true">刪除模式</span>
      </div>
    </div>
    <div class="cart blank-part">
      <span>
        <Icon icon="mdi:cart" class="mr-3" />
      </span>
      購物車中還沒有任何商品！再多逛逛吧！
    </div>
    <div class="cart main-part" v-if="cart.length !== 0">
      <div class="main head">
        <div class="inline-block w-1/2">商品</div>
        <div class="inline-block w-1/6">單價</div>
        <div class="inline-block w-1/6">數量</div>
        <div class="inline-block w-1/6">小計</div>
      </div>
      <span class="main-container">
        <x-cart-item
          @change="itemContentChangeHandler( index, $event )"
          @check="checkStateChange( index, $event )"
          :class="{ 'mb-2' : index !== cart.length - 1 }"
          v-for="( item, index ) in cart" :key="`${ item.type }`"
          :id="item.id"
          :type="item.type"
          :amount="item.amount"
          :price="item.price"
          :checked="itemState[ index ]"
        />
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
          <span class="total-text">$ {{ totalPrice }}</span>
        </div>
        <div class="number-discount" v-if="false">
          <span class="discount-sign">折扣</span>
          <span class="discount-text">- $ 999999</span>
        </div>
        <hr class="border-0.5 border-custom-black-trn-3">
        <div class="action-dispatch">
          <div class="total-counter">共 {{ itemCount }} 件商品</div>
          <div class="flex flex-col xl:flex-row items-center">
            <div class="real-total-sign">實際金額</div>
            <div class="real-total-text">$ {{ totalPrice - totalDiscount }}</div>
            <div class="dispatch-button" @click="sendCart()">
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
  data: () => ({
    cart: [],
    itemCount: 0,
    totalPrice: 0,
    deleteMode: false,
    allPicked: false,
    itemState: []
  }),
  methods: {
    itemContentChangeHandler( index, item ) {
      this.cart[ index ] = item
      this.$store.commit("updateCartItem", {
        index,
        amount: item.amount,
        type: item.type
      })
      this.itemCount = this.totalPrice = 0
      for ( let item of this.cart ) {
        this.itemCount += item.amount
        this.totalPrice += ( item.amount * item.price )
      }
    },
    async sendCart() {
      let possible_customer = undefined
      await this.$axios.get( `${ this.apiNetwork }/api/v1/customer?by=address` )
      .then( res => possible_customer = res.data.payload )
      .catch( err => console.error( err ) )

      console.log( possible_customer[0] )

      if ( Array.isArray( possible_customer ) && !!possible_customer.length ) {
        let message = `請問這是您的資訊嗎？\r\n\r\n顧客名稱(或暱稱): ${ possible_customer[0].call_as }\r\n電子信箱: ${ possible_customer[0].email }\r\n手機末三碼: ${ possible_customer[0].phone }`
        if ( confirm( message ) ) {
          this.createTransaction( possible_customer[0]._id )
        }
        else {
          message = "請輸入您的手機號碼。"
          let phone = prompt( message )
          let result = possible_customer.findIndex( element => element.phone === phone )
          if ( result !== -1 ) {
            message = `請問這是您的資訊嗎？\r\n\r\n如果是的話請按確認送出。\r\n如果不是的話請按取消來輸入您的資訊。\r\n\r\n顧客名稱(或暱稱): ${ possible_customer[0].call_as }\r\n電子信箱: ${ possible_customer[0].email }\r\n手機末三碼: ${ possible_customer[0].phone }`
            if ( confirm( message ) ) {
              this.createTransaction( possible_customer[ result ]._id )
            }
            else {
              let cid = await this.createNewCustomer( phone )
              await this.createTransaction( cid )
            }
          }
          else {
            let cid = await this.createNewCustomer( phone )
            await this.createTransaction( cid )
          }
        }
      }
      else {
        let cid = await this.createNewCustomer()
        await this.createTransaction( cid )
      }
    },
    async createTransaction( cid ) {
      let transaction = {
        customer: cid,
        discount: this.totalDiscount,
        orders: []
      }
      for ( let item of this.cart ) {
        transaction.orders.push({
          product: item.type,
          amount: item.amount
        })
      }

      await this.$axios.post(`${ this.apiNetwork }/api/v1/transaction/create`, transaction)
      .then( res => {
        if ( !res.data.success ) {
          throw Error("API FAILED ( Transaction.create )")
        }
        else {
          this.$store.commit("clearCart")
        }
      })
      .catch( err => {
        console.error( err )
      })
    },
    async createNewCustomer( phone ) {
      let confirmed = false
      let first = true
      let email_matcher = new RegExp( /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ )
      let customer = {
        call_as: "",
        email: "",
        phone
      }

      while( !confirmed ) {
        let message
        if ( !first || !phone ) {
          message = "請輸入您的手機號碼。"
          customer.phone = prompt( message, customer.phone )
        }
        message = "您希望我們怎麼稱呼您呢？"
        customer.call_as = prompt( message, customer.call_as )
        message = "請輸入您的電子郵件地址。"
        customer.email = prompt( message, customer.email )
        console.log( customer.call_as && customer.email && customer.phone && !email_matcher.test( customer.email ) )
        if ( !customer.call_as || !customer.email || !customer.phone || !email_matcher.test( customer.email ) ) {
          message = "您的部分資訊沒有輸入完整或輸入有誤。\r\n請重新輸入。\r\n或者按取消來關閉輸入視窗。"
          if( !confirm( message ) ) {
            return
          }
          continue
        }
        message = `這是您的個人資訊。\r\n請在確認無誤之後按下確定送出。\r\n若需要重新輸入請按取消。\r\n\r\n顧客名稱(或暱稱): ${ customer.call_as }\r\n電子信箱: ${ customer.email }\r\n手機號碼: ${ customer.phone }`
        confirmed = confirm( message )
        first = false
      }

      await this.$axios.post( `${ this.apiNetwork }/api/v1/customer/create`, customer )
      .then( res => {
        if ( res.data.success ) {
          return res.data.payload.cid
        }
        else {
          throw Error("API FAILED ( Transaction.create )")
        }
      })
      .catch( err => {
        console.error( err )
      })
    },
    clearCart() {
      if ( confirm("你確定要清空購物車的所有內容嗎？") ) {
        this.cart = []
        this.$store.commit("clearCart")
      }
    },
    checkAllPicked() {
      for ( let state of this.itemState ) {
        if ( !state ) {
          this.allPicked = false
          return
        }
      }
      this.allPicked = true
    },
    checkStateChange( index, value ) {
      this.itemState[ index ] = value
      this.checkAllPicked()
    },
    pickAll( reversed ) {
      if ( reversed ) {
        for ( let index in this.itemState ) {
          this.itemState[ index ] = true
        }
        this.checkAllPicked()
      }
      else {
        for ( let index in this.itemState ) {
          this.itemState[ index ] = false 
        }
        this.checkAllPicked()
      }
    },
    deletePicked() {
      let deleteCount = 0
      for ( let state of this.itemState ) {
        if ( state ) {
          ++deleteCount
        }
      }

      let delete_confirm = confirm(`您確定要執行刪除動作嗎？\r\n您將會刪除 ${ deleteCount } 個物品。`)
      if ( delete_confirm ) {
        for ( let index in this.itemState ) {
          if ( this.itemState[ index ] ) {
            this.cart.splice( index, 1 )
            this.$store.commit( "removeCartItem", index )
          }
        }
        this.itemState = this.itemState.filter( state => state === false )
        
        let newItemCount = 0
        let newTotalPrice = 0

        for ( let item of this.cart ) {
          newItemCount += item.amount
          newTotalPrice += ( item.amount * item.price )
        }

        this.itemCount = newItemCount
        this.totalPrice = newTotalPrice
        this.deleteMode = false
      }
    },
    deleteAll() {
      let delete_confirm = confirm(`您確定要執行刪除動作嗎？\r\n您將會刪除 ${ this.cart.length } 個物品。`)
      if ( delete_confirm ) {
        for ( let index in this.cart ) {
          this.cart.splice( index, 1 )
          this.$store.commit( "removeCartItem", index )
        }

        this.itemState = []
        this.itemCount = 0
        this.totalPrice = 0
        this.deleteMode = false
      }
    }
  },
  mounted() {
    this.$store.commit("refreshCart")
    this.cart = this.$store.state.cart

    if ( this.cart.length !== 0 && Array.isArray( this.cart ) ) {
      for ( let item of this.cart ) {
        this.itemCount += item.amount
        this.totalPrice += ( item.amount * item.price )
        this.itemState.push( false )
      }
    }
  },
  computed: {
    totalDiscount() {
      return 0
    },
    apiNetwork() {
      return process.env.NODE_ENV === "development" ? "http://localhost:1234" : "https://api.xihetang.com.tw"
    }
  }
}
</script>

<style scoped lang="postcss">
@import "../styles/views/Cart.pcss";
</style>