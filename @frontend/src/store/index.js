import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    addCartItem( state, item ) {
      /*
      {
        "id": custom id of product,
        "amount": amount of item,
        "type": current product type custom id
      }
      */
      state.cart = JSON.parse( window.localStorage.getItem('cart') )
      let found = false
      state.cart.forEach( ( element, index ) => {
        if ( element.id === item.id && element.type === item.type ) {
          state.cart[ index ].amount += item.amount
          found = true
        }
      })
      if ( !found ) {
        state.cart.push( item )
      }
      window.localStorage.setItem( "cart", JSON.stringify( state.cart ) )
    },
    removeCartItem( state, index ) {
      state.cart = JSON.parse( window.localStorage.getItem('cart') )
      if ( index > -1 ) {
        state.cart.splice( index, 1 )      
      }
      window.localStorage.setItem( "cart", JSON.stringify( state.cart ) )
    },
    updateCartItem( state, data ) {
      state.cart = JSON.parse( window.localStorage.getItem('cart') )
      let { amount, type } = data
      Object.assign( state.cart[ data.index ], {
        amount: amount || state.cart[ data.index ].amount,
        type: type || state.cart[ data.index ].type
      })
      window.localStorage.setItem( "cart", JSON.stringify( state.cart ) )
    },
    refreshCart( state ) {
      state.cart = JSON.parse( window.localStorage.getItem('cart') )
    },
    clearCart( state ) {
      state.cart = []
      window.localStorage.setItem("cart", "[]")
    }
  },
  actions: {
  },
  modules: {
  }
})
