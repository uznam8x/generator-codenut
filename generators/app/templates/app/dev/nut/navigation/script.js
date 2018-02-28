(function($){
    $(document).on('click', '[data-codenut="navigation"] .navigation__mobile__button', (e)=>{
        e.currentTarget.parentNode.classList.toggle('navigation__mobile--activate');
    })
})(jQuery);