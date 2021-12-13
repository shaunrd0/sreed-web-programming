const app = Vue.createApp({
  data() {
    return {
      cart: [],
    }
  },
  methods: {
    addToCart(item) {
      this.cart.push(item)
    },
    removeFromCart(item) {
      index = this.cart.indexOf(item)
      if (index > -1) {
        this.cart.splice(index, 1)
      }
    },
  },
})
