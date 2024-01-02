

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

//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <img scr = ${item.imgSrc}</img>
                <p class="prices">${item.price}<span class="valut">$</span></p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);