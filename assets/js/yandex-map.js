ymaps.ready(init);
var map, mark;

function init(){
    if($('#map').length > 0) {
      map = new ymaps.Map("map", {
          center: [56.047882, 92.907764],
          zoom: 14,
          controls: []
      });

      map.behaviors.disable('scrollZoom');

      mark = new ymaps.Placemark([56.047882, 92.907764]);
      map.geoObjects.add(mark);
    }
}