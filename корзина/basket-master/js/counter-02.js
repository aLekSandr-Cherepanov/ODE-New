 window.addEventListener('click', function (event) {

    //Обьявили переменную для счетчика
    let counter;

    //Проверяем клик строго по кнопкам плюс либо минус
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        //Находим обертку счетчика
        const counterWrapper = event.target.closest('.counter-wrapper');

        //Находим див с числом счетчика
        counter = counterWrapper.querySelector('[data-counter]');
    }

    
     
    // Явлеяется элемент по которому был совершен клик кнопкой плюс
     if (event.target.dataset.action === 'plus') {

        counter.innerText = ++counter.innerText;

     }

    // Явлеяется элемент по которому был совершен клик кнопкой минус
     if (event.target.dataset.action === 'minus') {

        if ( parseInt(counter.innerText) > 0 ) {
            // Изменяем текст в счетчике уменьшая его на 1
            counter.innerText = --counter.innerText;  
        }
    }

 });

