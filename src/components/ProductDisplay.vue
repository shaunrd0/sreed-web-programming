<template>
  <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :class="[!inStock ? 'out-of-stock-img' : '']"
             v-bind:src="image">
      </div>
      <div class="product-info">
        <!-- Product title, stock -->
        <h1> {{ title }} </h1>
        <p v-if="inStock <= 10 && inStock > 0">
          Only {{ inStock }} left!
        </p>
        <p v-else-if="inStock">
          In Stock
        </p>
        <p v-else>
          Out of Stock
        </p>

        <!-- Product Details -->
        <ul>
          <li v-for="(detail, index) in details" :key="index">
            {{detail}}
          </li>
        </ul>

        <!-- Product Variants -->
        <!--             :key="variant.id"-->
        <div v-for="(variant, index) in variants"
             :key="index"
             class="color-circle"
             :style="{backgroundColor: variant.color}"
             @mouseover="updateVariant(index)">
        </div>

        <!-- Product Sizes -->
        <div v-for="size in sizes"
             :key="size.id">
          {{ size.size }}
        </div>

        <!-- Cart Controls -->
        <button class="button"
                :class="{disabledButton: !inStock}"
                :disabled="!inStock"
                v-on:click="addToCart">
          Add to Cart
        </button>
        <button class="button"
                :class="[cartContains ? '' : 'disabledButton']"
                :disabled="!cartContains"
                v-on:click="removeFromCart">
          Remove from Cart
        </button>
      </div>
    </div>
  </div>

  <review-list/>
  <review-form/>
</template>

<script>
import ReviewList from "./ReviewList.vue";
import ReviewForm from "./ReviewForm.vue";

export default {
  name: 'ProductDisplay',
  components: {
    ReviewList, ReviewForm
  },
  props: {
    brand: {
      type: String,
      required: true
    }
  },
  emits: ['add-to-cart', 'remove-from-cart'],
  data() {
    return {
      product: 'Socks',
      selectedVariant: 0,
      inventory: 11,
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        {id: 1, color: 'green', image: './images/socks_green.jpg', quantity: 11, ordered: 0},
        {id: 2, color: 'blue', image: './images/socks_blue.jpg', quantity: 0, ordered: 0},
      ],
      sizes: [
        {id: 3, size: 'small'},
        {id: 4, size: 'large'},
      ]
    }
  },
  methods: {
    addToCart() {
      this.variants[this.selectedVariant].ordered += 1
      this.variants[this.selectedVariant].quantity -= 1
      this.$emit('add-to-cart', this.titleLong)
    },
    removeFromCart() {
      this.variants[this.selectedVariant].ordered -= 1
      this.variants[this.selectedVariant].quantity += 1
      this.$emit('remove-from-cart', this.titleLong)
    },
    updateVariant(index) {
      this.selectedVariant = index
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    titleLong() {
      return this.brand
          + '-' + this.product
          + '-' + this.variants[this.selectedVariant].id
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    cartContains() {
      return (this.variants[this.selectedVariant].ordered > 0)
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity
    },
  }
}
</script>