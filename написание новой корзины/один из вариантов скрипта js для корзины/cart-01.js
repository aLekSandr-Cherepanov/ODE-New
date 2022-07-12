const productsBtn = document.querySelectorAll ('.product__btn');

const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
productsBtn.forEach(el => {
    el.closest('.product').setAttribute('data-id', randomId());
});

//Div внутри корзины,в которую мы добавляем товары
const cartWrapper = document.querySelector('.cart-content__list');

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
                        <span class="cart-product__price">${productInfo.price} ₽</span>
                    </div>
                    <button class="cart-product__delete" aria-label="Удалить товар"></button>
                </article>
            </li>`;

        // Отобразим товар в корзине
        cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);

    };
    
});