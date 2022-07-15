const productsBtn = document.querySelectorAll ('.product__btn');
const cartProductsList = document.querySelector('.cart-content');
const cart = document.querySelector('.cerd');
const quantity = document.querySelector('.quantity');
const cartQuantity = document.querySelector('.cart__quantity');
const orderModalOpenProd = document.querySelector('.order-modal__btn');
const orderModalList = document.querySelector('.order-modal__list');


// функция для формирования рандомного id для карточки товара
const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};


// присвоение рандомного id карточке товара
productsBtn.forEach(el => {
    el.closest('.product').setAttribute('data-id', randomId());
});


//Div внутри корзины,в которую мы добавляем товары
const cartWrapper = document.querySelector('.cart-content__list');


// добавление класса active если в корзине есть товары + считаем колличество товаров в корзине и выводим число
const printQuantity = function() {
    let length = cartProductsList.querySelector('.simplebar-content').children.length;
    cartQuantity.textContent = length;
    if (length > 0) {
        cart.classList.add('active');
    }
    else {
        cart.classList.remove('active');
    }

    if (length > 0) {
        quantity.classList.add('cart__quantity-none');
    }
    else {
        quantity.classList.remove('cart__quantity-none');
    }

};

// Отслеживаем клик на странице
window.addEventListener('click', function (event) {
    
    // Проверяем что клик был совершен по кнопке "Добавить в корзину"
    if (event.target.hasAttribute('data-cart')) {
        
        // Находим карточку с товаром, внутри которой был совершен клик
        const card = event.target.closest('.product');

        //Собираем данные  с этого товара и записываем их в единый объект productInfo
        const productInfo = {
            id: card.dataset.id,
            title: card.querySelector('.product__title').innerText,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            price: card.querySelector('.cart_price').innerText,
        };

        const cartItemHTML = `
            <li class="cart-content__item">
                <article class="cart-content__product cart-product">
                    <img src="${productInfo.imgSrc}" alt="Клапан" class="cart-product__img">
                    <div class="cart-product__text">
                        <h3 class="cart-product__title">${productInfo.title}</h3>
                        <span class="cart-product__price">${productInfo.price}</span>
                    </div>
                    <button class="cart-product__delete" aria-label="Удалить товар"></button>
                </article>
            </li>`;

        // Отобразим товар в корзине
        cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);

        printQuantity();

    };

    const deleteProducts = (productParent) => {
        productParent.remove();
    
        printQuantity();
    }

    cartWrapper.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-product__delete'))
        deleteProducts(e.target.closest('cart-content__item'))
    })
});

let flag = 0;
orderModalOpenProd.addEventListener('click', (e) => {
    if (flag == 0) {
        orderModalOpenProd.classList.add('open');
        orderModalList.style.display = 'block';
        flag = 1;
    } else {
        orderModalOpenProd.classList.remove('open');
        orderModalList.style.display = 'none';
        flag = 0;
    }
});