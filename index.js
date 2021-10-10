/* Welcome Slider start */
let slide = document.querySelector('.welcome__slider-wrapper');
let bullets = document.querySelectorAll('.welcome__control-slide_pag > ul > li');
let num = document.querySelector('.welcome__control-num > span');

let currentSlide = 1;
let slideAmmount = 5;
let isEnabled = true;

function hideSlide(direction, slideNum) {
    console.log(slideNum);
    slide.classList.add(direction);
    slide.addEventListener('animationend', function () {
        this.classList.remove(direction, `welcome__slide${slideNum}`);

    });
}

function showSlide(direction, slideDirection, slideNum) {
    console.log(slideNum);
    slide.classList.add(direction);
    slide.addEventListener('animationend', function () {
        this.classList.remove(direction, slideDirection, `newSlide${slideNum}`);
        this.classList.add(`welcome__slide${slideNum}`);
        isEnabled = true;
    });
}

function beforeNextSlide() {
    /* Here we change num and active bullet before starting nextSlide */
    isEnabled = false;
    bullets[currentSlide - 1].classList.remove('active');
    if (currentSlide === slideAmmount) {
        bullets[0].classList.add('active');
        num.innerHTML = "01"
    } else {
        bullets[currentSlide].classList.add('active');
        num.innerHTML = (currentSlide < 9) ? "0" + ++currentSlide : ++currentSlide;
        currentSlide--;
    }
    nextSlide(currentSlide, currentSlide + 1);
}


function beforePreviousSlide() {
    /* Here we change num and active bullet before starting previousSlide */
    isEnabled = false;
    bullets[currentSlide - 1].classList.remove('active');
    if (currentSlide === 1) {
        bullets[slideAmmount - 1].classList.add('active')
        num.innerHTML = (currentSlide < 11) ? "0" + slideAmmount : slideAmmount;
    } else {
        bullets[currentSlide - 2].classList.add('active')
        num.innerHTML = (currentSlide < 11) ? "0" + --currentSlide : --currentSlide;
        currentSlide++;
    }
    previousSlide(currentSlide, currentSlide - 1);
}


function nextSlide(n, m) {
    hideSlide('after-to-left', n);
    currentSlide = (m === slideAmmount + 1) ? 1 : m;
    slide.classList.add('next', `newSlide${currentSlide}`);
    showSlide('before-from-right', 'next', currentSlide);
}


function previousSlide(n, m) {
    hideSlide('after-to-right', n);
    currentSlide = (m == 0) ? slideAmmount : m;
    slide.classList.add('prev', `newSlide${currentSlide}`);
    showSlide('before-from-left', 'prev', currentSlide);
}

/* watch click on left arrow */
document.querySelector('.welcome__control-arrow.arrow-left').addEventListener('click', function () {
    console.log("clicked-left");
    if (isEnabled) {
        beforePreviousSlide();
    }
});
/* watch click on right arrow */
document.querySelector('.welcome__control-arrow.arrow-right').addEventListener('click', function () {
    console.log("clicked-right")
    if (isEnabled) {
        beforeNextSlide()
    }
});

/* watch click on bullets */
bullets.forEach((el, index) => {
    el.addEventListener('click', function (e) {
        if (el.classList.value === 'active') return;
        if (isEnabled) {
            isEnabled = false;
            bullets.forEach((elem, index) => {
                if (elem.classList.value === 'active') elem.classList.remove('active')
                elem.style.backgroundcolor = '#fff';
            });
            el.classList.add('active')
            el.style.backgroundcolor = '#D2B183';
            num.innerHTML = (index + 1 < 10) ? "0" + ++index : ++index;
            index--;
            if (index >= currentSlide) {
                nextSlide(currentSlide, index + 1);
            } else
                previousSlide(currentSlide, index + 1);
        }
    });
});

/* watch swipes */


const swipedetect = (surface) => {
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
    let elapsedTime = 0;
    let minXway = 150;
    let maxYway = 100;
    let allowedTime = 300;


    function analyzingSwipe(){
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= minXway && Math.abs(distY) <= maxYway) {
                if ((distX > 0)) {
                    if (isEnabled) {
                        beforePreviousSlide();
                    }
                } else {
                    if (isEnabled) {
                        beforeNextSlide();
                    }
                }
            }
        }
    }

    surface.addEventListener('mousedown', function (e) {
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false);

    surface.addEventListener('mouseup', function (e) {
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        analyzingSwipe(distX, distY);
        e.preventDefault();
    }, false);

    surface.addEventListener('touchstart', function (e) {
        if (e.target.classList.contains('.welcome__control-arrow.arrow-left')) {
            if (isEnabled) {
                beforePreviousSlide();
            }
        } else {
            if (isEnabled) {
                beforeNextSlide();
            }
        }
        let touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false);

    surface.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);

    surface.addEventListener('touchend', function (e) {
        touchObj = e.changedTouches[0];
        distX = touchObj.pageX - startX;
        distY = touchObj.pageY - startY;
        analyzingSwipe(distX, distY);
        e.preventDefault();
    }, false);
}

swipedetect(slide);


/* Welcome slider end */

/* Navigation */

const hamburger = document.querySelector('.hamburger');
const overlay = document.querySelector('.overlay');
const nav = document.querySelector('.header__navigation');
const welcomeTitle = document.querySelector('.welcome-title');
const welcomeDesc = document.querySelector('.welcome-desc');
const welcomeBtn = document.querySelector('.welcome__button');
const openPopTicketsBtn = document.querySelector('.tickets__button');
const closePopTicketsBtn = document.querySelector('.form__x');

openPopTicketsBtn.addEventListener('click', toggleTicketsPopup);
closePopTicketsBtn.addEventListener('click', toggleTicketsPopup);

document.addEventListener('click', (e) => {
    if (e.target === overlay) {
        toggleTicketsPopup();
    }
    if (e.target === hamburger ||
        Array.from(document.querySelectorAll('.nav-list > ul > li > a')).find((el) => el === e.target) ||
        (e.target !== nav && nav.classList.contains('navigation_fadeIn'))) {
        console.log("press");
        toggleNav();
        hamburger.classList.toggle('active')
        welcomeTitle.classList.toggle('fadeOut')
        welcomeDesc.classList.toggle('fadeOut')
        welcomeBtn.classList.toggle('fadeOut')
    }
});

function toggleNav() {
    if (nav.classList.contains('navigation_fadeIn')) {
        nav.classList.remove('navigation_fadeIn');
        nav.classList.add('navigation_fadeOut');
        setTimeout(() => {
            nav.classList.remove('navigation_fadeOut');
        }, 1001);
    } else {
        nav.classList.remove('navigation_fadeOut');
        nav.classList.add('navigation_fadeIn');
    }
}

function toggleTicketsPopup() {
    const popup = document.querySelector('.popup');
    console.log(popup);
    if (popup.classList.contains('popup-active')) {
        console.log("dich");
        popup.classList.remove('popup-active');
        popup.classList.add('popup-disabled');
        overlay.classList.remove('overlay-fadeIn');
        console.log("overlay: " + overlay);
        setTimeout(() => {

            popup.classList.remove('popup-active');
            popup.classList.remove('popup-disabled');
        }, 1001);
    } else {
        popup.classList.add('popup-active');
        overlay.classList.add('overlay-fadeIn');
        return false;
    }
}

/* Progress bar */

const progress1 = document.querySelector('.progress1');
const progress2 = document.querySelector('.progress2');
progress1.addEventListener('input', function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, 
    #710707 ${value}%, #fff ${value}%, white 100%)`
});
progress2.addEventListener('input', function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, 
    #710707 ${value}%, #fff ${value}%, white 100%)`
});


/* Gallery */
(function images() {
    const imagesContainer = document.querySelector('.picture-inner-container');
    const totalImages = 15;
    const arrImg = [];
    for (let i = 1; i <= totalImages; i++) {
        const img = document.createElement('img');
        img.classList.add('gallery-img')
        img.src = `assets/img/galery/galery${i}.jpg`;
        img.alt = `galery${i}`;
        arrImg.push(img);
    }
    arrImg.sort(() => 0.5 - Math.random())
    arrImg.map((el) => {
        imagesContainer.append(el);
    });
})
();


/* Ripple effect */
$("html").on("click", ".form__right__button", function (evt) {
    let btn = $(evt.currentTarget);
    let x = evt.pageX - btn.offset().left;
    let y = evt.pageY - btn.offset().top;

    $("<span/>").appendTo(btn).css({
        left: x,
        top: y
    });
});