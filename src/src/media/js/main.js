var $rightBar = document.querySelector('.container__right');
var $partners = document.querySelector('.left-partners');

if($rightBar.clientHeight <= 1400) {
    $partners.classList.add('_static');
}