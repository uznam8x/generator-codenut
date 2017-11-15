((_) => {


  const component = document.documentElement.querySelectorAll('[data-codenut="naver-map"]');
  if (window.naver && window.naver.maps && component.length) {
    const maps = [];
    const init = (map) => {
      _.each(map, function (node, i) {

        const config = {
          lat: Number(node.getAttribute('data-lat')),
          lng: Number(node.getAttribute('data-lng')),
          zoom: Number(node.getAttribute('data-zoom')),
        };

        const map = new naver.maps.Map(node, {
          center: new naver.maps.LatLng(config.lat, config.lng),
          zoom: config.zoom,
          mapTypeControl: true,
          scaleControl: true,
          logoControl: false,
          mapDataControl: true,
          zoomControl: true,
          minZoom: 1,
        });
        maps.push(map);

        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(config.lat, config.lng),
          map: map,
        });
      });
    };
    init(component);

    if (Codenut.debug) {
      console.log('%ccodenut component : "naver-map" initialize', 'color:#133783');
    }
  }
})(_);

