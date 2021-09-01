const TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var element = document.getElementById('rotate');
    var toRotate = [
        'BSC',
        'Fantom',
        'Polygon',
    ];
    var period = element.getAttribute('data-period');
    new TxtRotate(element, toRotate, period);
};

const openSection = (section) => {
    const perElement = document.getElementById('personal-about');
    const proElement = document.getElementById('professional-about');
    const socElement = document.getElementById('social-about');
    perElement.className = 'carousel-item';
    proElement.className = 'carousel-item';
    socElement.className = 'carousel-item';
    switch (section) {
        case 0:
            perElement.className = 'carousel-item active';
            break;
        case 1:
            proElement.className = 'carousel-item active';
            break;
        case 2:
            socElement.className = 'carousel-item active';
            break;
    }
};

window.openNav = function openNav() {
    var navigation = document.getElementById('nav-list');
    navigation.style.display = 'block';
    navigation.style.width = '100%';
    navigation.className =
        'drawer col-md-6 col-lg-4 col-12 p-0 animated fast slideInRight';
    fullpage_api.setAllowScrolling(false);
};

window.openAbout = function openAbout(section) {
    openSection(section);
    var navigation = document.getElementById('about-list');
    navigation.style.display = 'block';
    navigation.style.width = '100%';
    navigation.className = 'drawer col-lg-6 col-12 animated fast slideInRight';
    fullpage_api.setAllowScrolling(false);
};

window.closeDrawer = function closeDrawer(element) {
    const navigation = document.getElementById(element);
    navigation.style.display = 'none';
    navigation.className = 'drawer';
    fullpage_api.setAllowScrolling(true);
};
