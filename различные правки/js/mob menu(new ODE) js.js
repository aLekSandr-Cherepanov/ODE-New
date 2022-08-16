let menu = document.querySelector('.burger');
let menuBtn = document.querySelector('.leftside');
let cross = document.querySelector('.cross-mobmenu')

menu.addEventListener('click', function(){
    menuBtn.classList.toggle('show');
})

cross.addEventListener('click', function(){
    menuBtn.classList.toggle('show');
})


let wrappIcon = document.querySelector('.inline-search-show');
let wrapperForm = document.querySelector('.wrapper');

wrappIcon.addEventListener('click', function(){
    wrapperForm.classList.toggle('form');
})