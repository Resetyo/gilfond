ymaps.ready(init);
var map, mark;

function init(){
    var info_map = $('#map');
    if(info_map.length > 0) {
      var place = info_map.data('place').split(',').map(parseFloat);

      map = new ymaps.Map("map", {
          center: place,
          zoom: 14,
          controls: []
      });

      map.behaviors.disable('scrollZoom');

      mark = new ymaps.Placemark(place);
      map.geoObjects.add(mark);
    }

    var addresses_map = $('#addresses-map');
    if (addresses_map.length > 0) {
      // addresses_map.css('height','400px');
      var places = addresses_map.data('places').split(';').map(function(s){
        return s.split(',').map(parseFloat);
      });

      map2 = new ymaps.Map("addresses-map", {
          center: places[0],
          zoom: 13,
          controls: []
      });

      map2.behaviors.disable('scrollZoom');

      var addressesCollection =  new ymaps.GeoObjectCollection();
      for (var i = 0; i < places.length; i++) {
         addressesCollection.add(new ymaps.Placemark(places[i]));
      }

      map2.geoObjects.add(addressesCollection);
    }
}