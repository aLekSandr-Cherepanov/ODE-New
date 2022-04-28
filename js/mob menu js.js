let menu = document.querySelector('.burger');
let menuBtn = document.querySelector('.leftside');
let cross = document.querySelector('.cross-mobmenu')

menu.addEventListener('click', function(){
    menuBtn.classList.toggle('show');
})

cross.addEventListener('click', function(){
    menuBtn.classList.toggle('show');
})