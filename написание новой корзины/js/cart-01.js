document.addEventListener('DOMContentLoaded', () => {
    const productsBtn = document.querySelectorAll ('.product__btn');
    const cartProductsList = document.querySelector('.cart-content');
    const cart = document.querySelector('.cerd');
    const quantity = document.querySelector('.quantity');
    const cartQuantity = document.querySelector('.cart__quantity');
    //переменная для кнопки состав заказа на странице оформления
    const orderModalOpenProd = document.querySelector('.order-modal__btn');
    //переменная где должны храниться товары из корзины
    const orderModalList = document.querySelector('.order-modal__list');
    
    let productArray = [];
    
    
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
    
    //функции для LocalStorage 
    
    const initialState = () => {
        if (localStorage.getItem('products') !== null) {
            cartProductsList.querySelector('.simplebar-content').innerHTML = localStorage.getItem('products');
            printQuantity();
        }
    };
    
    initialState();
    
    const updateStorage = () => {
        let parent = cartProductsList.querySelector('.simplebar-content');
        let html = parent.innerHTML;
        html = html.trim();
        localStorage.setItem('products', html);
    
        if (html.length) {
            localStorage.setItem('products', html);
        } else {
            localStorage.removeItem('products');
        }
        
    };
    
    
    // функция для удаления товара 
    const deleteProducts = (productParent) => {
        productParent.remove();
        printQuantity();
        updateStorage();
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
                price: card.querySelector(' .cart_price').innerText,
            };
        
            const cartItemHTML = `
                <li class="cart-content__item">
                    <article class="cart-content__product cart-product" data-id = "${productInfo.id}" >
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
        
            updateStorage();
            printQuantity();
        
        };
    });
    
    // удаление товара из корзины 
    
    cartWrapper.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-product__delete')){
        deleteProducts(e.target.closest('.cart-content__item'))
    }
    });
    
    
    // функция которая разворачивает список при клике на "состав заказа"
    
    
    
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
    
    const generateModalProduct = (img, title, price,id) => {
                return`
                <li class="order-modal__item">
                    <article class="order-modal__product order-product" data-id = "${id}">
                       <img src="${img}" alt="" class="cart-product__img">
                       <div class="order-product__text">
                           <h3 class="cart-product__title">${title}</h3>
                           <span class="cart-product__price">${price}</span>
                       </div>
                       <button class="order-product__delete">Удалить</button>
                    </article>
                </li>`;
            };
    let array = cartProductsList.querySelector('.simplebar-content').children;
    let length = array.length;  
        
    document.querySelector('.order-modal__quantity span').textContent = `${length} шт`;
        
    for (item of array) {
        let img = item.querySelector('.cart-product__img').getAttribute('src');
        let title = item.querySelector('.cart-product__title').textContent;
        let price = item.querySelector('.cart-product__price').textContent;
        let id = item.querySelector('.cart-product').dataset.id;
    
        orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, price,id));
    
    
        let obj = {};
        obj.title = title;
        obj.price = price;
        productArray.push(obj);
    }
    
    document.querySelector('.order').addEventListener('submit', (e) => {
        e.preventDefault();
        let self = e.currentTarget;
        let formData = new FormData(self);
        let name = self.querySelector('[name = "Имя"]').value;
        let tel = self.querySelector('[name = "Телефон"]').value;
        let mail = self.querySelector('[name = "Email"]').value;
        formData.append('Товары', JSON.stringify(productArray));
        formData.append('Имя', name);
        formData.append('Телефон', tel);
        formData.append('Email', mail);
    
        let xhr = new XMLHttpRequest();
    
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Отправлено')
                }
            }
        }
    
        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);
        
        self.reset();
    });
});




