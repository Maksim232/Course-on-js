const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//пользовался методичкой,объяснением дз и гуглом
class List {
    constructor(url, container, list = list2){
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this._init();
    }
    getJson(url){
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    handleData(data){
        this.goods = [...data];
        this.render();
    }
    calcSum(){
        return this.allProducts.reduce((a, item) =>
        a += item.price, 0);
         /*
    getSum() {
        //reduce используется для последовательной обработки каждого элемента массива с сохранением промежуточного результата.
        let res = this.allProducts.reduce((s, item) => s + item.price,0);
        alert(res);
    }    */
    /*countBasketPrice() {
    for (var item of this.goods) {
        console.log(item.title + ' цена ' + item.price) ;
        s = s + item.price;
    }
    return s;
    }
    console.log(countBasketPrice(this.goods))
    */
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new this.list[this.constructor.name](product);
            //мы сделали объект товара либо CartItem, либо ProductItem
            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}


  


class Item{
    constructor(el, img = 'https://placehold.it/200x150'){
        this.product_name = el.product_name; //el - обращение к элементу 
        this.price = el.price;//обращение к цене элемента
        this.id_product = el.id_product;//обращение к id элемента(продукта)
        this.img = img;//картинка продукта
    }
    render(){//генерация товара для каталога товаров
        return `<div class="product-item" data-id="${this.id_product}">
                
<h3>${this.product_name}</h3>
                <div class="desc">
                    <img src="${this.img}" alt="Some img">
                    <p class="prices">${this.price}<span class="valut">$</span></p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`
    }
}

class ProductsList extends List{
    constructor(cart, container = '.products', url = "/catalogData.json"){
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));//handleData - сортировка товара/списка товаров
    }
    _init(){
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('buy-btn')){//если пользователь кликает на кнопку, то товар помещается в корзину (добавляется)
                this.cart.addProduct(e.target);
            }
        });
        
    }
}

class ProductItem extends Item{}

class Cart extends List{
    constructor(container = ".cart-block", url = "/getBasket.json"){
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);//вывели все товары в корзине 
            });
    }
    addProduct(element){
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if(find){
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    _updateCart(product){
       let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
       block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
       block.querySelector('.product-price').textContent =  `$${product.quantity*product.price } `; 
        // пытался добавить визуал к цене, но не получилось, пока с этим не разобрался
    }
    _init(){
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
    }
}


class CartItem extends Item{
    constructor(el, img = 'https://placehold.it/50x100'){
        super(el, img);
        this.quantity = el.quantity;
    }
    render(){
    return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Quantity: ${this.quantity}</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">${this.quantity*this.price} <span class="valut">$</span></p>
        </div>
        </div>`
    }
}
const list2 = {
    ProductsList: ProductItem,
    Cart: CartItem
};


let cart = new Cart();
let products = new ProductsList(cart);





//Функция для формирования верстки каждого товара
/*const renderProduct = (product,img='https://via.placeholder.com/200x150') => {
    return `<div class="product-item">
                <img src="${img}">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
};

renderPage(products);
*/