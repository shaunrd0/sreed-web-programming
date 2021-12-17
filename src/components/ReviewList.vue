<template>
  <div class="review-container">
    <h3>Reviews:</h3>
    <ul>
      <li v-for="(review, index) in reviews" :key="index">
        {{ review.name }} gave this {{ review.rating }} stars
        <br/>
        "{{ review.review }}"
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'ReviewList',
  data() {
    return {
      current_reviews: []
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      let data = this
      axios.get('./reviews.json')
          .then(function (response) {
            data.current_reviews = response.data.reviews
          })
          .catch(function (error) {
            console.log("AJAX FAILED: " + error)
          })
    }
  },
  computed: {
    reviews() {
      return this.current_reviews
    }
  }
}
</script>
