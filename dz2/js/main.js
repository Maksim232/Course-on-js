class Productlist{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._fetchproducts();
        this.render();
        
        
    }

    _fetchproducts(){
    this.goods = products;
    }
    
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }
}

class ProductItem{
    constructor(product,img='https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                <h3>${this.title}</h3>
                <img src="${this.img}">
                <p class="prices">${this.price}<span class="valut">$</span></p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
    
}

var i1 = {
    id: 1,
    title: 'Notebook',
    imgSrc: "img/1.jpg",
    price: 2000 
};
var i2 = {
    id: 2,
    title: 'Mouse',
    imgSrc: "img/2.jpg",
    price: 20 
};

var i3 = {
    id: 3,
    title: 'Keyboard',
    imgSrc: "img/3.jpg ",
    price: 200 
};

var i4 = {
    id: 4,
    title: 'Gamepad',
    imgSrc: "img/4.jpg ",
    price: 50 
};

var products = [i1, i2, i3, i4];

let list = new Productlist();

var s = 0;
function countBasketPrice() {
    for (var item of products) {
        console.log(item.title + ' цена ' + item.price) ;
        s = s + item.price;
    }
    return s;
}
console.log(countBasketPrice(products))




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