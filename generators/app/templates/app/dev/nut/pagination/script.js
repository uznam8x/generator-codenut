(function($ , nut ){
  nut.$dom.on('click', '[data-codenut="pagination"] a[href="#"]', function(e){
    e.preventDefault();
  });
  if( Codenut.debug ) console.log('%ccodenut component : "pagination" initialize', 'color:#133783');
})(jQuery, Codenut);
