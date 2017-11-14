((_) => {
  'use strict';
  const maps = [];
  const init = () => {
    _.each(map, function (node, i) {
      const config = {
        lat: Number(node.getAttribute('data-lat')),
        lng: Number(node.getAttribute('data-lng')),
        zoom: Number(node.getAttribute('data-zoom')),
      };

      const map = new google.maps.Map(node, {
        center: config,
        zoom: config.zoom,
      });
      maps.push(map);

      const marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: config,
      });
    });
  };

  const map = document.documentElement.querySelectorAll('[data-codenut="google-map"]');
  if (map.length) init();

  if (Codenut.debug) {
    console.log('%ccodenut component : "google-map" initialize', 'color:#133783');
  }
})(_);
