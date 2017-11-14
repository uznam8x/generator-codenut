((_) => {
  'use strict';
  const maps = [];
  const init = () => {
    _.each(map, (node, i) => {
      const config = {
        lat: Number(node.getAttribute('data-lat')),
        lng: Number(node.getAttribute('data-lng')),
        zoom: Number(node.getAttribute('data-zoom')),
      };

      const map = new daum.maps.Map(node, {
        center:new daum.maps.LatLng(config.lat, config.lng),
        level: 3,
      });
      maps.push(map);

      const marker = new daum.maps.Marker({
        position: new daum.maps.LatLng(config.lat, config.lng),
      });

      marker.setMap(map);

      const mapTypeControl = new daum.maps.MapTypeControl();
      map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

      const zoomControl = new daum.maps.ZoomControl();
      map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
    });
  };

  const map = document.documentElement.querySelectorAll('[data-codenut="daum-map"]');
  if (map.length) init();

  if (Codenut.debug) {
    console.log('%ccodenut component : "daum-map" initialize', 'color:#133783');
  }
})(_);

