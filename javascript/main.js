let app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        description: 'A pair of warm fuzzy socks',
        // image: '',
        imageUrl: '',
        selectedIndexItem: 0,
        inventory: 10,
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
        cart: 0,
        onSale: false,
    },

    mounted(){
        // this.image     =  './assets/vmSocks-green-onWhite.jpg';
        this.imageUrl  = 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg';
    },

    methods: {
        addToCart() {
            this.cart += 1;
            this.inventory -=1;
            // console.log(this.inventory);
            console.log(this.selectedIndexItem);
            this.variants[this.selectedIndexItem].variantQuantity -=1;
            // if (this.variants[this.selectedIndexItem].variantQuantity === 0) {
            //     this.inStock = false;
            // }
        },
        removeFromCart() {
            if (this.cart > 0) {
                this.cart -= 1;
                this.inventory +=1;
                if (this.inventory >= 1) {
                    this.inStock = true;
                }
            }
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
        }
    }
})