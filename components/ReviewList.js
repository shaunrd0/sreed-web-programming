app.component('review-list', {
    template:
    `
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
    `,
    data() {
        return {
            current_reviews: this.reviews
        }
    },
    methods: {
        load() {
            data = this
            axios.get('./reviews.json')
                .then( function (response) {
                    data.current_reviews = response.data.reviews
                })
                .catch( function (error) {
                    console.log("FAIL: " + error)
                })
        },
    },
    computed: {
        reviews() {
            this.load()
            return this.current_reviews
        },
    }
})