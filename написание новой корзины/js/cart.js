const productsBtn = document.querySelectorAll ('.product__btn');
const cartProductsList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.fullprice');
let price = 0;

const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const generateCartProduct = (img, title, price, id) => {
    return `
    <li class="cart-content__item">
        <article class="cart-content__product cart-product" data-id = "${id}">
            <img src="${img}" alt="Клапан" class="cart-product__img">
            <div class="cart-product__text">
                <h3 class="cart-product__title">${title}</h3>
                <span class="cart-product__price">${price} ₽</span>
            </div>
            <button class="cart-product__delete" aria-label="Удалить товар"></button>
        </article>
    </li>
    `;
};

productsBtn.forEach(el => {
	el.closest('.product').setAttribute('data-id', randomId());

	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.product');
		let id = parent.dataset.id;
		let img = parent.querySelector('.image-switch__img img').getAttribute('src');
		let title = parent.querySelector('.product__title').textContent;
		let priceString = priceWithoutSpaces(parent.querySelector('.product-price__current').textContent);
		let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product-price__current').textContent));

		plusFullPrice(priceNumber);

		printFullPrice();

		cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));
		printQuantity();

		
		self.disabled = true;

	});
});


/* остановился на 39:43 */