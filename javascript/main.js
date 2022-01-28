Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true,
        }
    },
    template: `<ul><li v-for="detail in details">{{ detail }}</li></ul>`,
});

Vue.component('product', {

    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: `<div class="product">
                    <div class="product-image">
                        <a v-bind:href="imageUrl">
                            <img v-bind:src="image" />
                        </a>
                    </div>
                    <div class="product-info">
                        <h1>{{ sale }}</h1>
                        <p v-if="inStock">In Stock</p>
                        <p v-else>Out of Stock</p>
                        <p>Shipping: {{ shipping }}</p>

<!--                        <ul>-->
<!--                            <li v-for="detail in details">{{ detail }}</li>-->
<!--                        </ul>-->

                        <product-details v-bind:details="details"></product-details>

                        <div v-for="(variant, index) in variants"
                             v-bind:key="variant.id"
                             class="color-box"
                             v-bind:style="[variant.variantStyleObjectColor, variant.variantStyleObjectSize]"
                             v-on:mouseover="updateProductImage(index)">

                        </div>

                        <button v-on:click="addToCart" v-bind:disabled="!inStock"  v-bind:class="{disabledButton: !inStock}">
                            Add to cart
                        </button>
                        <button class="warning" v-on:click="removeFromCart">
                            Remove From cart
                        </button>            
                    </div>

                    <div>
                        <p v-if="!reviews.length">There are no reviews yet.</p>
                        <ul v-else>
                            <li v-for="(review, index) in reviews" :key="index">
                                <p>{{ review.name }}</p>
                                <p>Rating: {{ review.rating }}</p>
                                <p>{{ review.review }}</p>
                            </li>
                        </ul>
                    </div>

                    <product-review v-on:review-submitted="addReview"></product-review>

                </div>`,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            description: 'A pair of warm fuzzy socks',
            // image: '',
            imageUrl: '',
            selectedIndexItem: 0,
            inventory: 3,
            // inStock: true,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            colors: ['green', 'blue'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    color: '#4cb686',
                    variantImage: './assets/vmSocks-green-onWhite.jpg',
                    sizes: ['M', 'L', 'XL', 'XXL'],
                    variantQuantity: 3,
                    variantStyleObjectColor: {
                        backgroundColor: '#4cb686',
                    },
                    variantStyleObjectSize:{
                        width: '80px',
                        height: '80px',
                        marginTop: '10px',
                    }
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    color: '#445a72',
                    variantImage: './assets/vmSocks-blue-onWhite.jpg',
                    sizes: ['XS', 'S', 'M', 'L'],
                    variantQuantity: 3,
                    variantStyleObjectColor: {
                        backgroundColor: '#445a72',
                    },
                    variantStyleObjectSize:{
                        width: '80px',
                        height: '80px',
                        marginTop: '10px',
                    }
                }
            ],
            // cart: 0,
            onSale: false,
            reviews: []
        }
    },
    mounted(){
        // this.image     =  './assets/vmSocks-green-onWhite.jpg';
        this.imageUrl  = 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg';
        this.maxQuantityByColor = []
    },
    methods: {
        addReview(productReview) {
            this.reviews.push(productReview);
        },
        addToCart() {

            // this.cart += 1;
            // this.inventory -=1;
            // console.log(this.inventory);
            console.log(this.selectedIndexItem);
            if (this.variants[this.selectedIndexItem].variantQuantity > 0) {
                this.$emit('add-to-cart', this.variants[this.selectedIndexItem].variantId);
                this.variants[this.selectedIndexItem].variantQuantity -=1;
            }
            if (this.variants[this.selectedIndexItem].variantQuantity === 0) {
                this.inStock = false;
            }
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedIndexItem].variantId);
            if (this.variants[this.selectedIndexItem].variantQuantity < this.inventory) {
                this.variants[this.selectedIndexItem].variantQuantity +=1;
            }
            // this.variants[this.selectedIndexItem].variantQuantity +=1;
            //
            // if (this.variants[this.selectedIndexItem].variantQuantity > 0) {
            //     this.cart -= 1;
            // }

            // if (this.cart > 0) {
            //     this.cart -= 1;
            //     this.inventory +=1;
            //     if (this.inventory >= 1) {
            //         this.inStock = true;
            //     }
            // }
        },
        updateProductImage(index) {
            this.selectedIndexItem = index;
            // console.log(index);
            this.imageUrl = 'https://www.vuemastery.com/images/challenges/vmSocks-' + this.colors[index] + '-onWhite.jpg';
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedIndexItem].variantImage;
        },
        inStock() {
            return this.variants[this.selectedIndexItem].variantQuantity;
        },
        sale() {
            if(this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!';
            }

            return this.brand + ' ' + this.product;
        },
        shipping() {
            if (this.premium) {
                return 'Free';
            }
            return '$2.99';
        }
    },
});

Vue.component('product-review', {
    props: {
    },
    template: `<div class="product">
                <form class="review-form" v-on:submit.prevent="onSubmit">
                    <p class="error" v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                            <li v-for="error in errors">{{ error }}</li>
                        </ul>
                    </p>
                    <p>
                        <label for="name">Name:</label>
                        <input id="name" v-model="name">
                    </p>
                    <p>
                        <label for="review">Review:</label>      
                        <textarea id="review" v-model="review"></textarea>
                    </p>
                    
                    <p>Would you recommend this product?</p>
                    <label>
                      Yes
                      <input type="radio" value="Yes" v-model="recommend"/>
                    </label>
                    <label>
                      No
                      <input type="radio" value="No" v-model="recommend"/>
                    </label>
<!--                    <p>Would yourecommend this product ?</p>-->
<!--                        <input type="radio" id="responseYes" v-model="response" value="Yes">-->
<!--                        <label for="responseYes">Yes</label><br>-->
<!--                        <input type="radio" id="responseNo" v-model="response" value="No">-->
<!--                        <label for="responseNo">No</label><br>-->
                    
                    <p>
                        <label for="rating">Rating:</label>
                        <select id="rating" v-model.number="rating">
                            <option>5</option>
                            <option>4</option>
                            <option>3</option>
                            <option>2</option>
                            <option>1</option>
                        </select>
                    </p>
                    <p>
                        <input type="submit" value="Submit">  
                    </p>    
                </form>
            </div>`,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                };
                this.$emit('review-submitted', productReview)
                this.name     = null;
                this.review   = null;
                this.rating   = null;
                this.recommend = null;
            } else {
               if (!this.name) {
                   this.errors.push("Name required")
               }
               if (!this.review) {
                    this.errors.push("Review required")
               }
               if (!this.rating) {
                    this.errors.push("Rating required")
               }
               if (!this.recommend) {
                    this.errors.push("Recommendation required")
               }
            }
        }
    }
});

let app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: [],
    },
    methods: {
        addItemToCart(productId) {
            this.cart.push(productId);
        },
        removeItemFromCart(productId) {
            for(let index in this.cart){
                if(this.cart[index] === productId){
                    this.cart.splice(index,1);
                    break;
                }
            }
        }
    },
})