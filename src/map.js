let map;
function init() {
    ol.proj.useGeographic();
    let coordinate = [11.41508,45.504167];
    map = new ol.Map({
        layers: [
           new ol.layer.Tile({source: new ol.source.OSM()}),
        ],
        view: new ol.View({
            center: coordinate,
            zoom: 18,
        }),
        target: 'mappa',
    });
    impostaDueMarker(coordinate);
    let container = document.getElementById("popup");

    let popup = new ol.Overlay({
      element: container,
      autoPan: false
    })
    map.addOverlay(popup);
  
    map.on("singleclick" , function(evt){
        let feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
        return feature;
      })
  
      if (feature) {
        let coordinates = evt.coordinate;
        popup.setPosition(coordinates);
        popup.getElement().innerHTML = feature.get("name") + "\n" + feature.get("description");
      } 
      else {
        popup.setPosition(undefined);
      }
    });
}
function impostaDueMarker(coordinate1, coordinate2) {
    let layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features:[
                new ol.Feature({
                    geometry: new ol.geom.Point(coordinate1),
                    name: "Casa mia",
                    description: "AC001E00903"
                }),
            ]
        }),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                src: "img/marker.png",
                anchor: [0.5, 1]
            })
        })
        });
    map.addLayer(layer);
}
