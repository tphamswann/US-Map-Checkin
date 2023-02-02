window.onload = function() {
    var div1 = document.getElementById("1home");
    var firstRadio = div1.getElementsByTagName("input")[0];
    firstRadio.checked = true;
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

function switchDiv() {
    var dropdown = document.getElementById("dropdown-menu");
    var selected = dropdown.options[dropdown.selectedIndex].value;
    var div1 = document.getElementById("1home");
    var div2 = document.getElementById("2env-health");
    var div3 = document.getElementById("3soc-econ");
    var div4 = document.getElementById("4pub-health");
    var div5 = document.getElementById("5clim-risk");
    var div6 = document.getElementById("6econ");
    var div7 = document.getElementById("7demo");
    var div8 = document.getElementById("8cejs-status");
    var div9 = document.getElementById("9thresh-1");
    var div10 = document.getElementById("10thresh-2");

    div1.style.display = "none";
    div2.style.display = "none";
    div3.style.display = "none";
    div4.style.display = "none";
    div5.style.display = "none";
    div6.style.display = "none";
    div7.style.display = "none";
    div8.style.display = "none";
    div9.style.display = "none";
    div10.style.display = "none";
    
    if (selected === "1home") {
      colorSwitch(layers_dict['env_index'])
      div1.style.display = "block";
    } else if (selected === "2env-health") {
      colorSwitch(layers_dict['env_index'])
      div2.style.display = "block";
    } else if (selected === "3soc-econ") {
      colorSwitch(layers_dict['travel_barriers_pt'])
      div3.style.display = "block";
    } else if (selected === "4pub-health") {
      colorSwitch(layers_dict['asthma'])
      div4.style.display = "block";
    } else if (selected === "5clim-risk") {
      colorSwitch(layers_dict['flood_risk'])
      div5.style.display = "block";
    } else if (selected === "6econ") {
      colorSwitch(layers_dict['adjusted_poor_200'])
      div6.style.display = "block";
    } else if (selected === "7demo") {
      colorSwitch(layers_dict['share_white'])
      div7.style.display = "block";
    } else if (selected === "8cejs-status") {
      colorSwitch(layers_dict['thresh_exceeded'])
      div8.style.display = "block";
    } else if (selected === "9thresh-1") {
      colorSwitch(layers_dict['th_25_inc'])
      div9.style.display = "block";
    } else if (selected === "10thresh-2") {
      colorSwitch(layers_dict['th_impervious_inc'])
      div10.style.display = "block";
    }
    //uncheck all the radio inputs
    var checkboxes = document.getElementsByName("radio");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    //select the first radio input of the currently displayed div
    var currentDiv = document.getElementById(selected);
    var firstRadio = currentDiv.getElementsByTagName("input")[0];
    firstRadio.checked = true;
}

function checkboxClick(checkbox) {
    var checkboxes = document.getElementsByName(checkbox.name);
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    checkbox.checked = true;
}

const bounds = [
  [-167.312920, 7.376945], // Southwest coordinates
  [-32.768134, 58.347470] // Northeast coordinates
  ];


mapboxgl.accessToken = 'pk.eyJ1IjoidHlwcyIsImEiOiJjbDh4YXRyZmkwNHQ1M3Bvd25vNjdrMWkyIn0.HpGJaaIrWfLkmx8MiFKX9A';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/typs/cld5g6fxd000101phl5n115i7', 
    center: [-95.836746, 37.355612], 
    zoom: 3.63, 
    projection: 'mercator',
    attributionControl:false,
    minZoom: 3,
    maxBounds: bounds
});

map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style

countyShown = true;
clicked = false
map.addSource('tractLayer', {
  'type': 'vector',
  'url': 'mapbox://typs.try-3-tracts'
  });

map.addLayer({
  'id': 'tractLayer',
  'type': 'fill',
  'source': 'tractLayer',
  'source-layer': 'data',
  'layout': {},
  'paint': {
  'fill-color': layers_dict['env_index']['tract-colors']
  },
  'fill-outline-color':'rgba(255,255,255,0.0)',
  },
  "waterway"
  );

map.addSource('countyLayer', {
'type': 'vector',
'url': 'mapbox://typs.ctrups0q',
});

map.addLayer({
'id': 'countyLayer',
'type': 'fill',
'source': 'countyLayer',
'source-layer': 'final-final-county-4lsfqd',
'layout': {},
'paint': {
'fill-color': layers_dict['env_index']['county-colors']
},
'fill-outline-color':'rgba(255,255,255,0.0)',
},
"waterway"
);

map.addLayer({
  'id': 'outlines',
  'type': 'line',
  'source': 'countyLayer',
  'source-layer': 'final-final-county-4lsfqd',
  'layout': {},
  'paint': {
    'line-color': '#767676',
    'line-width': 0.005
  }});

map.addLayer({
  'id': 'countyOutlineInner',
  'type': 'line',
  'source': 'countyLayer',
  'source-layer': 'final-final-county-4lsfqd',
  'layout': {},
  'paint': {
    'line-color': '#fff',
    'line-width': 6
  },
  'filter': ['in', 'GEOID', '']
  });

map.addLayer({
  'id': 'countyOutlines',
  'type': 'line',
  'source': 'countyLayer',
  'source-layer': 'final-final-county-4lsfqd',
  'layout': {},
  'paint': {
    'line-color': '#000',
    'line-width': 3
  },
  'filter': ['in', 'GEOID', '']
  });

  map.addLayer({
    'id': 'tractOutlineInner',
    'type': 'line',
    'source': 'tractLayer',
    'source-layer': 'data',
    'layout': {},
    'paint': {
      'line-color': '#fff',
      'line-width': 6
    },
    'filter': ['in', 'GEOID', '']
    });
  
  map.addLayer({
    'id': 'tractOutlines',
    'type': 'line',
    'source': 'tractLayer',
    'source-layer': 'data',
    'layout': {},
    'paint': {
      'line-color': '#000',
      'line-width': 3
    },
    'filter': ['in', 'GEOID', '']
    });


map.addControl(new mapboxgl.NavigationControl({
  showCompass: false
}
));

map.addControl(new mapboxgl.AttributionControl({
customAttribution: 'Developed by Ty Pham-Swann'
})
)

map.setPaintProperty(
    'countyLayer',
    'fill-opacity',
    ["case", ["==", ["get", 'env_index'], null], 0, 1]
);


highlightOn = false;
highlightedLayer = ''
countySelected = 'false'
tractSelected = 'false'
activeLayer = layers_dict['env_index']
popupList = []
pointOn = false
boolTract = false

document.getElementById('box').style.display = 'none'

map.addSource('single-point', {
  'type': 'geojson',
  'data': {
  'type': 'FeatureCollection',
  'features': []
  }
  });

  map.addLayer({
    'id': 'point',
    'source': 'single-point',
    'type': 'circle',
    'paint': {
    'circle-radius': 7,
    'circle-color': 'red'
    }
    });
});

function colorSwitch(layer){
activeLayer = layer
map.setPaintProperty('countyLayer', 'fill-color', layer['county-colors']) 
map.setPaintProperty('tractLayer', 'fill-color', layer['tract-colors']) 
if (boolTract == true && activeLayer['tract-only'] == false && (tractSelected == true || countySelected == true)){
  document.getElementById('box').style.display = 'block'
  document.getElementById('value').innerHTML = activeLayer['optional-pre'] + activeLayer['pre'] + round(activeLayer['multiple'] * propertiesArray[activeLayer['layer-name']], activeLayer['round']) + activeLayer['post']
  document.getElementById('tab-name').innerHTML = propertiesArray['NAMELSAD']
}
boolTract = layer['tract-only']

if (document.getElementById('box').style.display == 'block'){
  document.getElementById('value').innerHTML = activeLayer['optional-pre'] + activeLayer['pre'] + round(activeLayer['multiple'] * propertiesArray[activeLayer['layer-name']], activeLayer['round']) + activeLayer['post']
  document.getElementById('tab-name').innerHTML = propertiesArray['NAMELSAD']
}

if (map.getZoom() > 9) {
document.getElementById('legend').src = activeLayer['legend-tract']
} else {
document.getElementById('legend').src = activeLayer['legend-county']
}

if (boolTract == true){
  if (map.getZoom() < 9){
  document.getElementById("zoom-tract-info").style.display = 'block'
  }
  document.getElementById('box').style.display = 'none'


} else {
  document.getElementById("zoom-tract-info").style.display = 'none'
  if (map.getZoom() > 9) {
    document.getElementById('triangle').src = activeLayer['tract-triangle']
    } else {
    document.getElementById('triangle').src = activeLayer['county-triangle']
    }
}

}

map.on('zoom', () => {

  if (map.getZoom() > 9){
    document.getElementById('legend').src = activeLayer['legend-tract']
  } else {
    document.getElementById('legend').src = activeLayer['legend-county']
  }

if (boolTract == true){
  if (map.getZoom() > 9){
    document.getElementById("zoom-tract-info").style.display = 'none'
  } else {
    document.getElementById("zoom-tract-info").style.display = 'block'
  }
}

if (map.getZoom() > 9){
  //not this
  if (countyShown == true){
    map.on('idle',function(){
      if (map.getZoom() > 9){
  map.setLayoutProperty('countyLayer', 'visibility', 'none')
  countyShown = false
      }
})
  }
} else {
  if (countyShown == false){
    map.setLayoutProperty('countyLayer', 'visibility', 'visible')
    countyShown = true
    }
}  

})

//-----------------------------------------------------------------------------------
//-------------Popup--------------------------------------------------------------
//-----------------------------------------------------------------------------------

map.on('mouseenter', 'countyLayer', () => {

  map.getCanvas().style.cursor = 'pointer';
  
  const infoPopup = new mapboxgl.Popup({closeButton: false,
  closeOnClick: false})

  infoPopup.addTo(map);
  popupList.push(infoPopup)

  map.on('mousemove', 'countyLayer', (e) => {
        if (popupList.length > 1){
    for (let i = 0; i < popupList.length - 1; i++){
      popupList[i].remove()
      popupList.splice(i,1)
    }
  }

  infoPopup.trackPointer()

  if (map.getZoom() < 9) {
    if (activeLayer['tract-only'] == false){
  infoPopup.setHTML(
    `<p>${map.queryRenderedFeatures(e.point, {layers: ['countyLayer']})[0].properties['NAMELSAD']}, ${map.queryRenderedFeatures(e.point, {layers: ['countyLayer']})[0].properties['STATE_NAME']}</p>
          <h3>${activeLayer['pre']}${round(activeLayer['multiple'] * map.queryRenderedFeatures(e.point, {layers: ['countyLayer']})[0].properties[activeLayer['layer-name']], activeLayer['round'])}${activeLayer['post']}</h3>
          `
  )
    } else {
      infoPopup.setHTML(
        `<p>${map.queryRenderedFeatures(e.point, {layers: ['countyLayer']})[0].properties['NAMELSAD']}, ${map.queryRenderedFeatures(e.point, {layers: ['countyLayer']})[0].properties['STATE_NAME']}</p>
              <h3>${map.queryRenderedFeatures(e.point, {layers: ['countyLayer']})[0].properties[activeLayer['layer-name']]}</h3>
              `
      )
    }
  } else {
    infoPopup.remove()   
     if (popupList.length != 0){
    for (let i = popupList.length - 1; i > 0; i--){
      if (popupList[i] == infoPopup) {
      popupList[i].remove()
      popupList.splice(i,1)
      }
    }
  } 
  }

})
  map.on('mouseleave', 'countyLayer', () => {
map.getCanvas().style.cursor = '';
infoPopup.remove()

  if (popupList.length != 0){
    for (let i = popupList.length - 1; i > 0; i--){
      if (popupList[i] == infoPopup) {
      popupList[i].remove()
      popupList.splice(i,1)
      }
    }
  }

});
});


map.on('mouseenter', 'tractLayer', () => {

  map.getCanvas().style.cursor = 'pointer';
  
  const infoPopupTract = new mapboxgl.Popup({closeButton: false,
    closeOnClick: false})
  
    infoPopupTract.addTo(map);
    popupList.push(infoPopupTract);

map.on('mousemove', 'tractLayer', (e) => {
  
        if (popupList.length > 1){
    for (let i = 0; i < popupList.length - 1; i++){
      popupList[i].remove()
      popupList.splice(i,1)
    }
  }

  if (map.getZoom() > 9) {

  infoPopupTract.trackPointer()
  if (activeLayer['tract-only'] == false){

  if (map.queryRenderedFeatures(e.point, {layers: ['tractLayer']})[0].properties[activeLayer['layer-name']] == '-10000000000' || map.queryRenderedFeatures(e.point, {layers: ['tractLayer']})[0].properties[activeLayer['layer-name']] == null) {
    infoPopupTract.setHTML(
      `<p>${map.queryRenderedFeatures(e.point, {layers: ['tractLayer']})[0].properties['NAMELSAD']}</p>
            <h3>Insufficient Data</h3>
            `
    )
  } else {
  infoPopupTract.setHTML(
    `<p>${map.queryRenderedFeatures(e.point, {layers: ['tractLayer']})[0].properties['NAMELSAD']}</p>
          <h3>${activeLayer['pre']}${round(activeLayer['multiple'] * map.queryRenderedFeatures(e.point, {layers: ['tractLayer']})[0].properties[activeLayer['layer-name']], activeLayer['round'])}${activeLayer['post']}</h3>
          `
  )
}
    } else {
      infoPopupTract.setHTML(
        `<p>${map.queryRenderedFeatures(e.point, {layers: ['tractLayer']})[0].properties['NAMELSAD']}</p>
              <h3>${map.queryRenderedFeatures(e.point, {layers: ['tractLayer']})[0].properties[activeLayer['layer-name']]}</h3>
              `
      )
    }
} else {
  infoPopupTract.remove()
    }
  })

    map.on('mouseleave', 'tractLayer', () => {
map.getCanvas().style.cursor = '';

  if (popupList.length != 0){
    for (let i = popupList.length - 1; i > 0; i--){
      if (popupList[i] == infoPopupTract) {
      popupList[i].remove()
      popupList.splice(i,1)
      }
    }
  }
});
})

//-----------------------------------------------------------------------------------
//-------------Geocoder--------------------------------------------------------------
//-----------------------------------------------------------------------------------
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  countries:'us',
  marker: false,
  placeholder: 'Search an address',
  flyTo: false
  });
   
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));



geocoder.on('result', (e) => {
    if (pointOn == true){
    pointOn = false
  }
  map.getSource('single-point').setData(e.result.geometry);

    map.flyTo({
            center: new mapboxgl.LngLat(e.result.center[0], e.result.center[1]),
            zoom: 10 //(area * scale) + intercept
          })

    map.once('idle', () => {
      map.fire('click', {latlng: e.result.center, point: map.project(e.result.center)})
      pointOn = true
    })
})
//-----------------------------------------------------------------------------------
//-------------ON CLICK--------------------------------------------------------------
//-----------------------------------------------------------------------------------

map.on('click', 'countyLayer', (e) => { 
  if (pointOn == true){
    map.getSource('single-point').setData(blankPoints);
    pointOn = false
  }
  
  if (map.getZoom() < 10){
    var bounds = map.queryRenderedFeatures(e.point, {layers: ['countyLayer']})[0].geometry.coordinates;
    tractPolygon = turf.polygon(bounds)
    mbVersion = new mapboxgl.LngLat(turf.centerOfMass(tractPolygon).geometry.coordinates[0]+ 0, turf.centerOfMass(tractPolygon).geometry.coordinates[1])
    let area = map.queryRenderedFeatures(e.point, {layers: ['countyLayer']})[0].properties['ALAND']
    const scale = -0.000000000065924
    const intercept = 9.5

    map.flyTo({
            center: mbVersion,
            zoom: (area * scale) + intercept
          })
        } 

  if (map.getZoom() < 9) {
    if (tractSelected == true) {
      tractSelected = false
    map.setFilter('tractOutlineInner', [
      'in',
      'GEOID',
      ''
      ]);
      map.setFilter('tractOutlines', [
        'in',
        'GEOID',
        ''
        ]);
        highlightedLayer = ''
    }

    if (highlightOn == true && highlightedLayer == map.queryRenderedFeatures(e.point, {layers: ['countyLayer']} )[0].properties['GEOID']){
      document.getElementById('box').style.display = 'none'
      countySelected = false
      map.setFilter('countyOutlineInner', [
        'in',
        'GEOID',
        ''
        ]);
        map.setFilter('countyOutlines', [
          'in',
          'GEOID',
          ''
          ]); 
          highlightedLayer = ''
      } else {
        countySelected = true
        map.setFilter('countyOutlines', [
          'in',
          'GEOID',
          map.queryRenderedFeatures(e.point, {layers: ['countyLayer']})[0].properties['GEOID']
          ]);
          map.setFilter('countyOutlineInner', [
            'in',
            'GEOID',
            map.queryRenderedFeatures(e.point, {layers: ['countyLayer']})[0].properties['GEOID']
            ]);

            if (activeLayer['tract-only'] == false){
            document.getElementById('triangle').src = activeLayer['county-triangle']
            document.getElementById('box').style.display = 'block'
            document.getElementById('value').innerHTML = activeLayer['optional-pre'] + activeLayer['pre'] + round(activeLayer['multiple'] * map.queryRenderedFeatures(e.point, {layers: ['countyLayer']})[0].properties[activeLayer['layer-name']], activeLayer['round']) + activeLayer['post']
            document.getElementById('tab-name').innerHTML = map.queryRenderedFeatures(e.point, {layers: ['countyLayer']})[0].properties['NAMELSAD']
            }
          }
        
      propertiesArray = map.queryRenderedFeatures(e.point, {layers: ['countyLayer']})[0].properties

      highlightedLayer = (map.queryRenderedFeatures(e.point, {layers: ['countyLayer']})[0].properties['GEOID'])
      highlightOn = true;
  }
});
map.on('click', 'tractLayer', (e) => { 
  if (pointOn == true){
    map.getSource('single-point').setData(blankPoints);
    pointOn = false
  }

  if (map.getZoom() > 9) {
    if (countySelected == true) {
      countySelected = false
    map.setFilter('countyOutlineInner', [
      'in',
      'GEOID',
      ''
      ]);
      map.setFilter('countyOutlines', [
        'in',
        'GEOID',
        ''
        ]);
        highlightedLayer = ''
    }  

  if (highlightOn == true && highlightedLayer == map.queryRenderedFeatures(e.point)[0].properties['GEOID']){
    tractSelected = false
    map.setFilter('tractOutlineInner', [
      'in',
      'GEOID',
      ''
      ]);
      map.setFilter('tractOutlines', [
        'in',
        'GEOID',
        ''
        ]);
        highlightedLayer = ''
        document.getElementById('box').style.display = 'none'
    } else {
      tractSelected = true
      map.setFilter('tractOutlines', [
        'in',
        'GEOID',
        map.queryRenderedFeatures(e.point, {layers: ['tractLayer']})[0].properties['GEOID']
        ]);
        map.setFilter('tractOutlineInner', [
          'in',
          'GEOID',
          map.queryRenderedFeatures(e.point, {layers: ['tractLayer']})[0].properties['GEOID']
          ]);
    highlightedLayer = (map.queryRenderedFeatures(e.point, {layers: ['tractLayer']})[0].properties['GEOID'])
    highlightOn = true;

    if (activeLayer['tract-only'] == false){
    document.getElementById('triangle').src = activeLayer['tract-triangle']
    document.getElementById('box').style.display = 'block'
    document.getElementById('value').innerHTML = activeLayer['optional-pre'] + activeLayer['pre'] + round(activeLayer['multiple'] * map.queryRenderedFeatures(e.point, {layers: ['tractLayer']})[0].properties[activeLayer['layer-name']], activeLayer['round']) + activeLayer['post']
    document.getElementById('tab-name').innerHTML = map.queryRenderedFeatures(e.point, {layers: ['tractLayer']})[0].properties['NAMELSAD']
    }
    propertiesArray = map.queryRenderedFeatures(e.point, {layers: ['tractLayer']})[0].properties

  }
  }
});

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//DICTIONARIES:
const colorSchemes = {
  "main-blue-red": ['#a50026','#d73027','#f46d43','#fdae61','#fee090','#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'],
  "green-red": ['#a50026','#d73027','#f46d43','#fdae61','#fee08b','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837'],
  "blue-green-red": ['#d53e4f','#f46d43','#fdae61','#fee08b','#ffffbf','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa2'],
  "dark-blue-red": ['#67001f','#b2182b','#d6604d','#f4a582','#fddbc7','#d1e5f0','#92c5de','#4393c3','#2166ac','#053061'],
  "blue-1": ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'],
  "blue-3": ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b'],
  "blue-2": ['#fff7fb','#ece7f2','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#045a8d','#023858'],
  "race": ['#Fcfcbf','#Fed99e','#Fdb480','#Fb8d67','#Ec6966','#D14b6c','#Ac337c','#81257b','#571a72','#2d1160'],
  "yellow-blue": ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'],
  "red-1": ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'],
  "blue-4": ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b'],
  "purple-1":['#f7fcfd','#e0ecf4','#bfd3e6','#9ebcda','#8c96c6','#8c6bb1','#88419d','#810f7c','#4d004b'],
  "pink-1": ['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'],
  "race-variant": ['#F0f722', '#F8d229', '#F9ae37', '#F38a47', '#E16960', '#Ca4977', '#Ac2790', '#80109e', '#4f059b', '#0d0786'],
  "bool-colors": ['#c70e04', '#cef0f2'],
  "gray": "#c4c4c4"
}

const county_colors_dictionary = {
  'day': ['interpolate',['linear'],['get','heat'],0.007789743095204235,colorSchemes['blue-green-red'][8],0.7244303900192796,colorSchemes['blue-green-red'][7],1.4308309081696504,colorSchemes['blue-green-red'][6],2.196246891474966,colorSchemes['blue-green-red'][5],3.0180749966317837,colorSchemes['blue-green-red'][4],4.012733332829042,colorSchemes['blue-green-red'][3],5.341288475564904,colorSchemes['blue-green-red'][2],7.19015131578944,colorSchemes['blue-green-red'][1],10.732900814343884,colorSchemes['blue-green-red'][0]], 
  'Income': ['interpolate',['linear'],['get','income'],8090.0,colorSchemes['dark-blue-red'][0],18581.40434187208,colorSchemes['dark-blue-red'][1],21672.935455822353,colorSchemes['dark-blue-red'][2],24422.2581238504,colorSchemes['dark-blue-red'][3],27307.511226885825,colorSchemes['dark-blue-red'][4],31183.0,colorSchemes['dark-blue-red'][5],37023.47445939613,colorSchemes['dark-blue-red'][6],46883.92671759438,colorSchemes['dark-blue-red'][7],61188.081849878356,colorSchemes['dark-blue-red'][8]], 
  'Housing': ['interpolate',['linear'],['get','rent'],274.0,colorSchemes['yellow-blue'][0],548.0338868003341,colorSchemes['yellow-blue'][1],675.4132947976879,colorSchemes['yellow-blue'][2],819.1020419015208,colorSchemes['yellow-blue'][3],987.9981213954275,colorSchemes['yellow-blue'][4],1184.097216760905,colorSchemes['yellow-blue'][5],1427.5715857963592,colorSchemes['yellow-blue'][6],1788.2914652215156,colorSchemes['yellow-blue'][7],2465.2518107781157,colorSchemes['yellow-blue'][8]], 
  'share_black': ['interpolate',['linear'],['get','share_black'],0.0,colorSchemes['race'][0],0.031060817143291366,colorSchemes['race'][1],0.08872584970200023,colorSchemes['race'][2],0.1682564290229216,colorSchemes['race'][3],0.26371454299864927,colorSchemes['race'][4],0.3727747658945293,colorSchemes['race'][5],0.4962242436425771,colorSchemes['race'][6],0.6453716148779026,colorSchemes['race'][7],0.8694894927934868,colorSchemes['race'][8]], 
  'share_natam': ['interpolate',['linear'],['get','share_native'],0.0,colorSchemes['race'][0],0.011027818904387126,colorSchemes['race'][1],0.03887841023913776,colorSchemes['race'][2],0.08604738321509839,colorSchemes['race'][3],0.15664496029009933,colorSchemes['race'][4],0.27836062397054545,colorSchemes['race'][5],0.4381908190819082,colorSchemes['race'][6],0.6880722891566265,colorSchemes['race'][7],0.8725551741049533,colorSchemes['race'][8]], 
  'share_asian': ['interpolate',['linear'],['get','share_asian'],0.0,colorSchemes['race'][0],0.004534159831137948,colorSchemes['race'][1],0.013704493177740043,colorSchemes['race'][2],0.027808240525844175,colorSchemes['race'][3],0.04831096929208434,colorSchemes['race'][4],0.08008673396843452,colorSchemes['race'][5],0.1250841787698734,colorSchemes['race'][6],0.20007304001446202,colorSchemes['race'][7],0.3596216542929332,colorSchemes['race'][8]], 
  'share_pacific': ['interpolate',['linear'],['get','share_hawaiin'],0.0,colorSchemes['race'][0],0.0004280236725848129,colorSchemes['race'][1],0.0014331729276622167,colorSchemes['race'][2],0.002891860799539833,colorSchemes['race'][3],0.004944994081597982,colorSchemes['race'][4],0.008129447523690327,colorSchemes['race'][5],0.013481171548117154,colorSchemes['race'][6],0.020653496291257872,colorSchemes['race'][7],0.03410045558822579,colorSchemes['race'][8]], 
  'share_mixed': ['interpolate',['linear'],['get','share_mixed'],0.0,colorSchemes['race'][0],0.007281506338553318,colorSchemes['race'][1],0.01531857374576705,colorSchemes['race'][2],0.02407981192356381,colorSchemes['race'][3],0.03554329848413578,colorSchemes['race'][4],0.05166690338965602,colorSchemes['race'][5],0.07765571319923423,colorSchemes['race'][6],0.11604299465792664,colorSchemes['race'][7],0.17397324656543744,colorSchemes['race'][8]], 
  'share_white': ['interpolate',['linear'],['get','share_white'],0.0047027060769686945,colorSchemes['race'][0],0.2172192183970981,colorSchemes['race'][1],0.3735851983159761,colorSchemes['race'][2],0.49961199250154126,colorSchemes['race'][3],0.619280368379898,colorSchemes['race'][4],0.7218332015115565,colorSchemes['race'][5],0.8162401068072147,colorSchemes['race'][6],0.8983332516430879,colorSchemes['race'][7],0.9948867159551634,colorSchemes['race'][8]], 
  'share_hisp': ['interpolate',['linear'],['get','share_hispanic'],0.0,colorSchemes['race'][0],0.03660100286532952,colorSchemes['race'][1],0.08580459770114943,colorSchemes['race'][2],0.15926348137697074,colorSchemes['race'][3],0.25205244041272884,colorSchemes['race'][4],0.3604070529946083,colorSchemes['race'][5],0.5021634267522068,colorSchemes['race'][6],0.7112511144130756,colorSchemes['race'][7],0.987817035487999,colorSchemes['race'][8]], 
  'share_other': ['interpolate',['linear'],['get','share_other'],0.0,colorSchemes['race'][0],0.008299359106884433,colorSchemes['race'][1],0.023166067071910025,colorSchemes['race'][2],0.045407724522042864,colorSchemes['race'][3],0.07902579738192175,colorSchemes['race'][4],0.13508611604588838,colorSchemes['race'][5],0.2283180924287119,colorSchemes['race'][6],0.36,colorSchemes['race'][7],0.55,colorSchemes['race'][8]], 
  'share_kid': ['interpolate',['linear'],['get','share_child'],0.030654089760404336,colorSchemes['race'][0],0.07465972661380552,colorSchemes['race'][1],0.09293117432789158,colorSchemes['race'][2],0.10582412853249176,colorSchemes['race'][3],0.11709167311732833,colorSchemes['race'][4],0.12866900858704136,colorSchemes['race'][5],0.14453787644123214,colorSchemes['race'][6],0.17079873606600543,colorSchemes['race'][7],0.24000000000000002,colorSchemes['race'][8]], 
  'share_adult': ['interpolate',['linear'],['get','share_adult'],0.392116694923387,colorSchemes['race'][0],0.5755236203090508,colorSchemes['race'][1],0.6255881835765782,colorSchemes['race'][2],0.6567190654744737,colorSchemes['race'][3],0.680878190899001,colorSchemes['race'][4],0.7014462502827231,colorSchemes['race'][5],0.7230938457254247,colorSchemes['race'][6],0.7530797339156879,colorSchemes['race'][7],0.8460612740941722,colorSchemes['race'][8]], 
  'share_sr': ['interpolate',['linear'],['get','share_senior'],0.031059659090909093,colorSchemes['race'][0],0.12019744134057223,colorSchemes['race'][1],0.1481552762265112,colorSchemes['race'][2],0.17198719015138914,colorSchemes['race'][3],0.1945828625235405,colorSchemes['race'][4],0.2211822954741809,colorSchemes['race'][5],0.2559497505345688,colorSchemes['race'][6],0.31430002934887424,colorSchemes['race'][7],0.5618616646940278,colorSchemes['race'][8]], 
  'thresh_exceeded': ['interpolate',['linear'],['get','thresholds_exceeded'],0.0,colorSchemes['main-blue-red'][8],0.555354679099862,colorSchemes['main-blue-red'][7],1.3895136778115502,colorSchemes['main-blue-red'][6],2.296694583477873,colorSchemes['main-blue-red'][5],3.2637525826446283,colorSchemes['main-blue-red'][4],4.436237609003503,colorSchemes['main-blue-red'][3],6.0110253583241455,colorSchemes['main-blue-red'][2],8.418522860492379,colorSchemes['main-blue-red'][1],12.0,colorSchemes['main-blue-red'][0]], 
  'cat_exceeded': ['interpolate',['linear'],['get','categories_exceeded'],0.0,colorSchemes['main-blue-red'][8],0.3290558806419601,colorSchemes['main-blue-red'][7],0.8170521888740203,colorSchemes['main-blue-red'][6],1.338733031674208,colorSchemes['main-blue-red'][5],1.9151816312542838,colorSchemes['main-blue-red'][4],2.5977535977535977,colorSchemes['main-blue-red'][3],3.3800095648015303,colorSchemes['main-blue-red'][2],4.3432713168102035,colorSchemes['main-blue-red'][1],7.0,colorSchemes['main-blue-red'][0]], 
  'percent_disadvantaged': ['interpolate',['linear'],['get','percent_area_disadvantaged'],0.0,colorSchemes['main-blue-red'][0],5.86412982412961,colorSchemes['main-blue-red'][1],17.271171796913382,colorSchemes['main-blue-red'][2],29.762104361109557,colorSchemes['main-blue-red'][3],42.43607723085786,colorSchemes['main-blue-red'][4],56.52129402129402,colorSchemes['main-blue-red'][5],71.75047438330171,colorSchemes['main-blue-red'][6],89.50912462184054,colorSchemes['main-blue-red'][7],100.0,colorSchemes['main-blue-red'][8]], 
  'share_neighbors_disadvantaged': ['interpolate',['linear'],['get','share_neighbors_disadvantaged'],0.0,colorSchemes['main-blue-red'][0],10.590609127646164,colorSchemes['main-blue-red'][1],22.690600126047478,colorSchemes['main-blue-red'][2],34.259032038173146,colorSchemes['main-blue-red'][3],46.84423266513309,colorSchemes['main-blue-red'][4],60.43889231528309,colorSchemes['main-blue-red'][5],74.52521793275218,colorSchemes['main-blue-red'][6],88.8273381294964,colorSchemes['main-blue-red'][7],100.0,colorSchemes['main-blue-red'][8]], 
  'total_pop': ['interpolate',['linear'],['get','total_population'],237.0,colorSchemes['blue-3'][0],94793.0,colorSchemes['blue-3'][1],291165.0,colorSchemes['blue-3'][2],621690.0,colorSchemes['blue-3'][3],1074475.0,colorSchemes['blue-3'][4],1757299.0,colorSchemes['blue-3'][5],3314006.0,colorSchemes['blue-3'][6],5198275.0,colorSchemes['blue-3'][7],10073612.0,colorSchemes['blue-3'][8]], 
  'adjusted_poverty_200': ['interpolate',['linear'],['get','adjusted_poor_200'],0.0,colorSchemes['dark-blue-red'][8],0.13011348833537284,colorSchemes['dark-blue-red'][7],0.19455696717973778,colorSchemes['dark-blue-red'][6],0.24522490288284604,colorSchemes['dark-blue-red'][5],0.2918829653563095,colorSchemes['dark-blue-red'][4],0.3425005381138342,colorSchemes['dark-blue-red'][3],0.402912146967392,colorSchemes['dark-blue-red'][2],0.4858852569376917,colorSchemes['dark-blue-red'][1],0.7013143697891123,colorSchemes['dark-blue-red'][0]], 
  'ag_loss': ['interpolate',['linear'],['get','ag_loss_rate'],0.0,colorSchemes['red-1'][0],0.6645505731260878,colorSchemes['red-1'][1],1.7627145962732917,colorSchemes['red-1'][2],3.6677093970668118,colorSchemes['red-1'][3],6.7958,colorSchemes['red-1'][4],11.074903691331217,colorSchemes['red-1'][5],19.893150433897674,colorSchemes['red-1'][6],29.637788495770504,colorSchemes['red-1'][7],39.8912,colorSchemes['red-1'][8]], 
  'building_loss': ['interpolate',['linear'],['get','building_loss_rate'],0.0003105651566184093,colorSchemes['red-1'][0],0.02694510399271292,colorSchemes['red-1'][1],0.05605149952907352,colorSchemes['red-1'][2],0.09541409684065934,colorSchemes['red-1'][3],0.1549,colorSchemes['red-1'][4],0.25102298025134645,colorSchemes['red-1'][5],0.40768602186825054,colorSchemes['red-1'][6],0.8259218282590084,colorSchemes['red-1'][7],1.5242,colorSchemes['red-1'][8]], 
  'pop_loss': ['interpolate',['linear'],['get','pop_loss_rate'],0.0,colorSchemes['red-1'][0],0.00048494933165096015,colorSchemes['red-1'][1],0.0010343626373626375,colorSchemes['red-1'][2],0.002032317671427014,colorSchemes['red-1'][3],0.0044,colorSchemes['red-1'][4],0.008987538659793815,colorSchemes['red-1'][5],0.0182,colorSchemes['red-1'][6],0.0439,colorSchemes['red-1'][7],0.0764,colorSchemes['red-1'][8]], 
  'flood_risk': ['interpolate',['linear'],['get','flood_risk'],0.0,colorSchemes['red-1'][0],7.3825932061565505,colorSchemes['red-1'][1],11.660536802443676,colorSchemes['red-1'][2],17.14386042623724,colorSchemes['red-1'][3],24.615098230139182,colorSchemes['red-1'][4],35.55110041265475,colorSchemes['red-1'][5],51.13671223741247,colorSchemes['red-1'][6],74.09152801757966,colorSchemes['red-1'][7],99.40963126269831,colorSchemes['red-1'][8]], 
  'Share of properties at risk of fire in 30 years': ['interpolate',['linear'],['get','fire_risk'],0.0,colorSchemes['red-1'][0],4.848987946327041,colorSchemes['red-1'][1],14.762585969738652,colorSchemes['red-1'][2],27.40828402366864,colorSchemes['red-1'][3],41.71053107480861,colorSchemes['red-1'][4],56.0,colorSchemes['red-1'][5],71.104206547882,colorSchemes['red-1'][6],85.0,colorSchemes['red-1'][7],98.6033288590604,colorSchemes['red-1'][8]], 
  'Energy burden': ['interpolate',['linear'],['get','energy_burden'],0.0,colorSchemes['main-blue-red'][8],1.8827733773790307,colorSchemes['main-blue-red'][7],2.63837482030718,colorSchemes['main-blue-red'][6],3.2658715368368743,colorSchemes['main-blue-red'][5],3.872808028134853,colorSchemes['main-blue-red'][4],4.59837019790454,colorSchemes['main-blue-red'][3],5.5701643489254105,colorSchemes['main-blue-red'][2],7.279443209928305,colorSchemes['main-blue-red'][1],13.0,colorSchemes['main-blue-red'][0]], 
  'PM2.5 in the air': ['interpolate',['linear'],['get','pollution_25'],4.03,colorSchemes['blue-green-red'][8],5.51,colorSchemes['blue-green-red'][7],6.445904642694583,colorSchemes['blue-green-red'][6],7.312094466936571,colorSchemes['blue-green-red'][5],8.156013850016667,colorSchemes['blue-green-red'][4],8.961881752923183,colorSchemes['blue-green-red'][3],10.28,colorSchemes['blue-green-red'][2],12.70829715817798,colorSchemes['blue-green-red'][1],16.305040246980933,colorSchemes['blue-green-red'][0]], 
  'Diesel particulate matter exposure': ['interpolate',['linear'],['get','diesel_exposure'],0.0,colorSchemes['blue-green-red'][8],0.06147465327019687,colorSchemes['blue-green-red'][7],0.10852354637193658,colorSchemes['blue-green-red'][6],0.15859841685548656,colorSchemes['blue-green-red'][5],0.22307941769962522,colorSchemes['blue-green-red'][4],0.31470002829032157,colorSchemes['blue-green-red'][3],0.4629225844244257,colorSchemes['blue-green-red'][2],0.7455200184868711,colorSchemes['blue-green-red'][1],1.474493850580702,colorSchemes['blue-green-red'][0]], 
  'Traffic proximity and volume': ['interpolate',['linear'],['get','traffic_proximity'],0.0,colorSchemes['race-variant'][0],78.3020584908709,colorSchemes['race-variant'][1],192.1214736071315,colorSchemes['race-variant'][2],351.3412484728308,colorSchemes['race-variant'][3],611.6275468176804,colorSchemes['race-variant'][4],1099.9943666799322,colorSchemes['race-variant'][5],1959.8818202477644,colorSchemes['race-variant'][6],3628.121835283961,colorSchemes['race-variant'][7],6896.494788284379,colorSchemes['race-variant'][8]], 
  'DOT Travel Barriers Score (percentile)': ['interpolate',['linear'],['get','travel_barriers_pt'],3.0,colorSchemes['dark-blue-red'][8],25.141166933115638,colorSchemes['dark-blue-red'][7],37.55930797487854,colorSchemes['dark-blue-red'][6],47.48976821446269,colorSchemes['dark-blue-red'][5],56.76001543619305,colorSchemes['dark-blue-red'][4],65.72110742960675,colorSchemes['dark-blue-red'][3],74.96546221360994,colorSchemes['dark-blue-red'][2],85.28169696969697,colorSchemes['dark-blue-red'][1],99.0,colorSchemes['dark-blue-red'][0]], 
  'Housing burden (percent)': ['interpolate',['linear'],['get','housing_burden'],1.0,colorSchemes['main-blue-red'][8],12.24618269488347,colorSchemes['main-blue-red'][7],15.615611694578485,colorSchemes['main-blue-red'][6],18.30100452329202,colorSchemes['main-blue-red'][5],20.873880739188415,colorSchemes['main-blue-red'][4],23.769960135613427,colorSchemes['main-blue-red'][3],27.528518687518147,colorSchemes['main-blue-red'][2],33.18262882269,colorSchemes['main-blue-red'][1],50.82352072046718,colorSchemes['main-blue-red'][0]], 
  'Percent pre-1960s housing (lead paint indicator)': ['interpolate',['linear'],['get','lead_paint'],1.1744268933335729,colorSchemes['main-blue-red'][8],11.300498181484764,colorSchemes['main-blue-red'][7],17.844686648501362,colorSchemes['main-blue-red'][6],24.19239709080003,colorSchemes['main-blue-red'][5],31.26854886577718,colorSchemes['main-blue-red'][4],38.63189202839586,colorSchemes['main-blue-red'][3],46.343580236268004,colorSchemes['main-blue-red'][2],55.1281011837198,colorSchemes['main-blue-red'][1],76.19659348290251,colorSchemes['main-blue-red'][0]], 
  'Median value ($) of owner-occupied housing units': ['interpolate',['linear'],['get','house_value'],16891.676136363636,colorSchemes['yellow-blue'][0],107380.56457304164,colorSchemes['yellow-blue'][1],152819.36150359904,colorSchemes['yellow-blue'][2],212992.3290798408,colorSchemes['yellow-blue'][3],297274.41663716844,colorSchemes['yellow-blue'][4],430149.4919817704,colorSchemes['yellow-blue'][5],610506.967533192,colorSchemes['yellow-blue'][6],866518.9046391753,colorSchemes['yellow-blue'][7],1166960.7226898281,colorSchemes['yellow-blue'][8]], 
  "Share of the tract's land area that is covered by impervious surface or cropland as a percent": ['interpolate',['linear'],['get','impervious_surface'],15.0,colorSchemes['main-blue-red'][8],781.8144488539726,colorSchemes['main-blue-red'][7],1612.701486077045,colorSchemes['main-blue-red'][6],2499.017622438738,colorSchemes['main-blue-red'][5],3426.5844341607067,colorSchemes['main-blue-red'][4],4468.694672404273,colorSchemes['main-blue-red'][3],5657.342526325387,colorSchemes['main-blue-red'][2],7005.715353193185,colorSchemes['main-blue-red'][1],9260.648380776765,colorSchemes['main-blue-red'][0]], 
  'Share of homes with no kitchen or indoor plumbing (percent)': ['interpolate',['linear'],['get','no_kitchen_plumbing'],0.0,colorSchemes['main-blue-red'][8],0.0030462669357163444,colorSchemes['main-blue-red'][7],0.007170959406518297,colorSchemes['main-blue-red'][6],0.011800640446670499,colorSchemes['main-blue-red'][5],0.01755104985929721,colorSchemes['main-blue-red'][4],0.026781658224473474,colorSchemes['main-blue-red'][3],0.04114111829593001,colorSchemes['main-blue-red'][2],0.06585081585081586,colorSchemes['main-blue-red'][1],0.1375953982846284,colorSchemes['main-blue-red'][0]], 
  'Proximity to hazardous waste sites': ['interpolate',['linear'],['get','waste_proximity'],0.0,colorSchemes['race-variant'][0],0.23586662592620886,colorSchemes['race-variant'][1],0.6506746186092744,colorSchemes['race-variant'][2],1.2996198946424966,colorSchemes['race-variant'][3],2.2548893857478016,colorSchemes['race-variant'][4],3.6548849055349595,colorSchemes['race-variant'][5],6.299376716628534,colorSchemes['race-variant'][6],11.708891101108035,colorSchemes['race-variant'][7],18.86390119670698,colorSchemes['race-variant'][8]], 
  'Proximity to NPL (Superfund) sites': ['interpolate',['linear'],['get','superfund_proximity'],0.0,colorSchemes['race-variant'][0],0.02757456627638663,colorSchemes['race-variant'][1],0.0793363684118368,colorSchemes['race-variant'][2],0.15671682204283852,colorSchemes['race-variant'][3],0.2572762970014279,colorSchemes['race-variant'][4],0.4056468058383603,colorSchemes['race-variant'][5],0.618841188602857,colorSchemes['race-variant'][6],0.8777781068009082,colorSchemes['race-variant'][7],1.2637956018812764,colorSchemes['race-variant'][8]], 
  'Proximity to Risk Management Plan (RMP) facilities': ['interpolate',['linear'],['get','rmp_proximity'],0.0,colorSchemes['race-variant'][0],0.16670635615478901,colorSchemes['race-variant'][1],0.38347437582128774,colorSchemes['race-variant'][2],0.6286610961247451,colorSchemes['race-variant'][3],0.9118745818154784,colorSchemes['race-variant'][4],1.259189613381109,colorSchemes['race-variant'][5],1.6960110286585455,colorSchemes['race-variant'][6],2.2955135322212223,colorSchemes['race-variant'][7],4.059209120057,colorSchemes['race-variant'][8]], 
  'Wastewater discharge': ['interpolate',['linear'],['get','wastewater'],0.0,colorSchemes['race-variant'][0],5.7524777543126975,colorSchemes['race-variant'][1],25.248585261416444,colorSchemes['race-variant'][2],59.12553257251545,colorSchemes['race-variant'][3],110.53017240676584,colorSchemes['race-variant'][4],210.8097034175796,colorSchemes['race-variant'][5],630.0512925050417,colorSchemes['race-variant'][6],1014.3874867571835,colorSchemes['race-variant'][7],1478.9205953877367,colorSchemes['race-variant'][8]], 
  'Leaky underground storage tanks': ['interpolate',['linear'],['get','storage_tanks'],0.0,colorSchemes['race-variant'][0],0.7455837750633785,colorSchemes['race-variant'][1],1.7430406932931424,colorSchemes['race-variant'][2],3.0697716792066845,colorSchemes['race-variant'][3],5.162575612417758,colorSchemes['race-variant'][4],8.840560343242414,colorSchemes['race-variant'][5],14.179059660020753,colorSchemes['race-variant'][6],24.698939394841922,colorSchemes['race-variant'][7],42.98716055851193,colorSchemes['race-variant'][8]], 
  'Current asthma among adults aged greater than or equal to 18 years': ['interpolate',['linear'],['get','asmtha_adult'],752.511739514805,colorSchemes['pink-1'][0],852.5547138707905,colorSchemes['pink-1'][1],907.3602404465436,colorSchemes['pink-1'][2],957.1375786163522,colorSchemes['pink-1'][3],1002.1101959670548,colorSchemes['pink-1'][4],1046.2427325581396,colorSchemes['pink-1'][5],1097.8446929924676,colorSchemes['pink-1'][6],1173.8915054190547,colorSchemes['pink-1'][7],1368.1755762628738,colorSchemes['pink-1'][8]], 
  'Diagnosed diabetes among adults aged greater than or equal to 18 years': ['interpolate',['linear'],['get','diabetes_adult'],498.72537316195184,colorSchemes['blue-2'][0],847.0406161433988,colorSchemes['blue-2'][1],1014.8623956326269,colorSchemes['blue-2'][2],1155.5591274397245,colorSchemes['blue-2'][3],1292.404912698135,colorSchemes['blue-2'][4],1437.4122287968441,colorSchemes['blue-2'][5],1613.8914123616887,colorSchemes['blue-2'][6],1875.0664893617022,colorSchemes['blue-2'][7],2418.4887073522345,colorSchemes['blue-2'][8]], 
  'Coronary heart disease among adults aged greater than or equal to 18 years': ['interpolate',['linear'],['get','heart_adult'],307.02356251927495,colorSchemes['purple-1'][0],474.78601420289624,colorSchemes['purple-1'][1],574.0169638163329,colorSchemes['purple-1'][2],661.5423952512377,colorSchemes['purple-1'][3],737.4379247947745,colorSchemes['purple-1'][4],808.6418884982421,colorSchemes['purple-1'][5],884.8944212247865,colorSchemes['purple-1'][6],987.068538444295,colorSchemes['purple-1'][7],1266.3533773980332,colorSchemes['purple-1'][8]], 
  'Life expectancy (years)': ['interpolate',['linear'],['get','life_expectancy'],63,colorSchemes['main-blue-red'][1],67,colorSchemes['main-blue-red'][2],70,colorSchemes['main-blue-red'][3],74,colorSchemes['main-blue-red'][4],76,colorSchemes['main-blue-red'][5],77,colorSchemes['main-blue-red'][6],78,colorSchemes['main-blue-red'][7],79,colorSchemes['main-blue-red'][8],83,colorSchemes['main-blue-red'][9]], 
  'Median household income as a percent of area median income': ['interpolate',['linear'],['get','hhinc_divided_by_area_income'],35.966923925027565,colorSchemes['dark-blue-red'][0],65.19501849031977,colorSchemes['dark-blue-red'][1],77.76320211233798,colorSchemes['dark-blue-red'][2],88.32377937987222,colorSchemes['dark-blue-red'][3],98.7638281838734,colorSchemes['dark-blue-red'][4],109.95988650211899,colorSchemes['dark-blue-red'][5],125.41335541945968,colorSchemes['dark-blue-red'][6],148.09538648086843,colorSchemes['dark-blue-red'][7],249.83924832214765,colorSchemes['dark-blue-red'][8]], 
  'Linguistic isolation (percent)': ['interpolate',['linear'],['get','linguistic_isolation'],0.0,colorSchemes['dark-blue-red'][8],0.7950015290094798,colorSchemes['dark-blue-red'][7],2.2369935276020203,colorSchemes['dark-blue-red'][6],4.403876205933126,colorSchemes['dark-blue-red'][5],7.434180695576672,colorSchemes['dark-blue-red'][4],11.526436618317682,colorSchemes['dark-blue-red'][3],18.879452893742982,colorSchemes['dark-blue-red'][2],28.76405201342282,colorSchemes['dark-blue-red'][1],49.0,colorSchemes['dark-blue-red'][0]], 
  'Unemployment (percent)': ['interpolate',['linear'],['get','unemployment_percent'],0.0,colorSchemes['dark-blue-red'][8],2.237214591375647,colorSchemes['dark-blue-red'][7],3.744287172448161,colorSchemes['dark-blue-red'][6],5.114200450560275,colorSchemes['dark-blue-red'][5],6.6084231445387145,colorSchemes['dark-blue-red'][4],8.556372153125505,colorSchemes['dark-blue-red'][3],11.598107461387862,colorSchemes['dark-blue-red'][2],17.258901413490786,colorSchemes['dark-blue-red'][1],24.0,colorSchemes['dark-blue-red'][0]], 
  'Percent of individuals below 200 Federal Poverty Line': ['interpolate',['linear'],['get','share_poor_200'],6.847324462061155,colorSchemes['dark-blue-red'][8],19.45873786407767,colorSchemes['dark-blue-red'][7],26.074948240165632,colorSchemes['dark-blue-red'][6],31.45258267286144,colorSchemes['dark-blue-red'][5],36.75671362617461,colorSchemes['dark-blue-red'][4],42.193827160493825,colorSchemes['dark-blue-red'][3],48.30079169325767,colorSchemes['dark-blue-red'][2],56.57490434611989,colorSchemes['dark-blue-red'][1],74.13143697891122,colorSchemes['dark-blue-red'][0]], 
  'Percent of individuals < 100 Federal Poverty Line': ['interpolate',['linear'],['get','share_poor_100'],2.0,colorSchemes['dark-blue-red'][8],7.510882672133124,colorSchemes['dark-blue-red'][7],10.707883963551525,colorSchemes['dark-blue-red'][6],13.75728843597696,colorSchemes['dark-blue-red'][5],17.035368690450802,colorSchemes['dark-blue-red'][4],20.827262569832403,colorSchemes['dark-blue-red'][3],25.562008108752682,colorSchemes['dark-blue-red'][2],32.840958111022815,colorSchemes['dark-blue-red'][1],54.94163805787151,colorSchemes['dark-blue-red'][0]], 
  'Percent individuals age 25 or over with less than high school degree': ['interpolate',['linear'],['get','less_than_hs'],0.769464892412231,colorSchemes['dark-blue-red'][8],6.723437650538454,colorSchemes['dark-blue-red'][7],9.777182330710612,colorSchemes['dark-blue-red'][6],13.075577926920209,colorSchemes['dark-blue-red'][5],16.827583723442565,colorSchemes['dark-blue-red'][4],21.09138286893705,colorSchemes['dark-blue-red'][3],26.79197494617342,colorSchemes['dark-blue-red'][2],36.0,colorSchemes['dark-blue-red'][1],73.0,colorSchemes['dark-blue-red'][0]], 
  'Percent of residents who are not currently enrolled in higher ed': ['interpolate',['linear'],['get','share_not_in_higher_ed'],45.0,colorSchemes['blue-4'][0],65.4908140002682,colorSchemes['blue-4'][1],76.69262302624314,colorSchemes['blue-4'][2],83.15415118333911,colorSchemes['blue-4'][3],88.2396435749457,colorSchemes['blue-4'][4],91.63934355243786,colorSchemes['blue-4'][5],93.92063228643737,colorSchemes['blue-4'][6],95.82634369424831,colorSchemes['blue-4'][7],100.0,colorSchemes['blue-4'][8]], 
  'Percentage households below 100 of federal poverty line in 2009 (island areas) and 2010 (states and PR)': ['interpolate',['linear'],['get','poverty_2010'],0.0,colorSchemes['dark-blue-red'][8],7.888388388388388,colorSchemes['dark-blue-red'][7],11.127407741697265,colorSchemes['dark-blue-red'][6],14.173606454103924,colorSchemes['dark-blue-red'][5],17.542760823278922,colorSchemes['dark-blue-red'][4],21.603119342709928,colorSchemes['dark-blue-red'][3],27.260178117048348,colorSchemes['dark-blue-red'][2],35.63198992443325,colorSchemes['dark-blue-red'][1],49.0,colorSchemes['dark-blue-red'][0]], 
  'Percent of the Census tract that is within Tribal areas': colorSchemes['gray'], 
  'total_population': ['interpolate',['linear'],['get','total_population'],237.0,colorSchemes['main-blue-red'][0],94793.0,colorSchemes['main-blue-red'][1],291165.0,colorSchemes['main-blue-red'][2],621690.0,colorSchemes['main-blue-red'][3],1074475.0,colorSchemes['main-blue-red'][4],1757299.0,colorSchemes['main-blue-red'][5],3314006.0,colorSchemes['main-blue-red'][6],5198275.0,colorSchemes['main-blue-red'][7],10073612.0,colorSchemes['main-blue-red'][8]], 'risk': ['interpolate',['linear'],['get','risk'],10.469755154639177,colorSchemes['main-blue-red'][0],28.07292167227294,colorSchemes['main-blue-red'][1],34.2,colorSchemes['main-blue-red'][2],39.1301287162547,colorSchemes['main-blue-red'][3],43.67302596818066,colorSchemes['main-blue-red'][4],48.21116893071191,colorSchemes['main-blue-red'][5],53.07691302482378,colorSchemes['main-blue-red'][6],58.86357564860005,colorSchemes['main-blue-red'][7],74.0473828665516,colorSchemes['main-blue-red'][8]], 
  'Unemployment (percent) in 2009 (island areas) and 2010 (states and PR)': ['interpolate',['linear'],['get','unemployment_2010'],0.0,colorSchemes['dark-blue-red'][8],2.2744337890226483,colorSchemes['dark-blue-red'][7],3.95590243902439,colorSchemes['dark-blue-red'][6],5.383575051161135,colorSchemes['dark-blue-red'][5],6.929070458370743,colorSchemes['dark-blue-red'][4],8.790994334831021,colorSchemes['dark-blue-red'][3],11.49773887068,colorSchemes['dark-blue-red'][2],17.0,colorSchemes['dark-blue-red'][1],26.0,colorSchemes['dark-blue-red'][0]],
  'env_index': ['interpolate',['linear'],['get','env_index'],11.68252148,colorSchemes['main-blue-red'][8],25.64652564,colorSchemes['main-blue-red'][7],32.14523845,colorSchemes['main-blue-red'][6],37.45078653,colorSchemes['main-blue-red'][5],42.14238297,colorSchemes['main-blue-red'][4],46.56311492,colorSchemes['main-blue-red'][3],50.78171408,colorSchemes['main-blue-red'][2],55.01506542,colorSchemes['main-blue-red'][1],64.60417817,colorSchemes['main-blue-red'][0]],
  'has_mine': colorSchemes['gray'],
  'has_fuds': colorSchemes['gray'],
  'has_35_acres': colorSchemes['gray'],
  'historic_underinvestment': colorSchemes['gray'],
  'is_low_income': colorSchemes['gray'],
  'income_from_neighbor': colorSchemes['gray'],
  'disadvantaged': colorSchemes['gray'],
  'disadvantaged_with_neighbors': colorSchemes['gray'],
  'disadvantaged_without_neighbors': colorSchemes['gray'],
  'disadvanted_tribal': colorSchemes['gray'],
  'th_25_inc': colorSchemes['gray'],
  'th_ag_inc': colorSchemes['gray'],
  'th_asthma_inc': colorSchemes['gray'],
  'th_barriers_inc': colorSchemes['gray'],
  'th_building_inc': colorSchemes['gray'],
  'th_diabetes_inc': colorSchemes['gray'],
  'th_diesel_inc': colorSchemes['gray'],
  'th_energy_inc': colorSchemes['gray'],
  'th_fire': colorSchemes['gray'],
  'th_fire_inc': colorSchemes['gray'],
  'th_flood': colorSchemes['gray'],
  'th_flood_inc': colorSchemes['gray'],
  'th_fuds_inc': colorSchemes['gray'],
  'th_heart_inc': colorSchemes['gray'],
  'th_hhinc_area_hs_attainment': colorSchemes['gray'],
  'th_hhinc_area_hs_attainment_2010': colorSchemes['gray'],
  'th_housing_burden_inc': colorSchemes['gray'],
  'th_impervious': colorSchemes['gray'],
  'th_impervious_inc': colorSchemes['gray'],
  'th_lead_house_value_inc': colorSchemes['gray'],
  'th_life_expectancy_inc': colorSchemes['gray'],
  'th_linguistic_isolation_hs_attainment': colorSchemes['gray'],
  'th_mine_inc': colorSchemes['gray'],
  'th_poor_100_hs_attainment': colorSchemes['gray'],
  'th_pop_inc': colorSchemes['gray'],
  'th_poverty_100_hs_attainment_2010': colorSchemes['gray'],
  'th_rmp_inc': colorSchemes['gray'],
  'th_storage_inc': colorSchemes['gray'],
  'th_superfund_inc': colorSchemes['gray'],
  'th_traffic_inc': colorSchemes['gray'],
  'th_underinvestment_inc': colorSchemes['gray'],
  'th_unemployment_hs_attainment': colorSchemes['gray'],
  'th_unemployment_hs_attainment_2010': colorSchemes['gray'],
  'th_waste_inc': colorSchemes['gray'],
  'th_wastewater_inc': colorSchemes['gray']
}

const tract_colors = {
  'day': ['interpolate',['linear'],['get','heat'],0.0,colorSchemes['blue-green-red'][8],1.2507756349162,colorSchemes['blue-green-red'][7],2.50194131440523,colorSchemes['blue-green-red'][6],3.77503214670812,colorSchemes['blue-green-red'][5],5.07354544273029,colorSchemes['blue-green-red'][4],6.46409620853824,colorSchemes['blue-green-red'][3],8.02320344396943,colorSchemes['blue-green-red'][2],10.1188978569441,colorSchemes['blue-green-red'][1],14.603241316634,colorSchemes['blue-green-red'][0]], 
  'Income': ['interpolate',['linear'],['get','income'],2499.0,colorSchemes['main-blue-red'][0],17113.0,colorSchemes['main-blue-red'][1],23203.0,colorSchemes['main-blue-red'][2],29122.0,colorSchemes['main-blue-red'][3],36065.0,colorSchemes['main-blue-red'][4],44746.0,colorSchemes['main-blue-red'][5],56395.0,colorSchemes['main-blue-red'][6],73669.0,colorSchemes['main-blue-red'][7],133125.0,colorSchemes['main-blue-red'][8]], 
  'Housing': ['interpolate',['linear'],['get','rent'],123.0,colorSchemes['yellow-blue'][0],661.0,colorSchemes['yellow-blue'][1],879.0,colorSchemes['yellow-blue'][2],1117.0,colorSchemes['yellow-blue'][3],1394.0,colorSchemes['yellow-blue'][4],1733.0,colorSchemes['yellow-blue'][5],2170.0,colorSchemes['yellow-blue'][6],2836.0,colorSchemes['yellow-blue'][7],4001.0,colorSchemes['yellow-blue'][8]], 
  'Percent Black or African American alone': ['interpolate',['linear'],['get','share_black'],0.0,colorSchemes['race'][0],0.03,colorSchemes['race'][1],0.1,colorSchemes['race'][2],0.19,colorSchemes['race'][3],0.31,colorSchemes['race'][4],0.46,colorSchemes['race'][5],0.63,colorSchemes['race'][6],0.81,colorSchemes['race'][7],1.0,colorSchemes['race'][8]], 
  'Percent American Indian / Alaska Native': ['interpolate',['linear'],['get','share_native'],0.0,colorSchemes['race'][0],0.01,colorSchemes['race'][1],0.02,colorSchemes['race'][2],0.06,colorSchemes['race'][3],0.13,colorSchemes['race'][4],0.25,colorSchemes['race'][5],0.45,colorSchemes['race'][6],0.73,colorSchemes['race'][7],1.0,colorSchemes['race'][8]], 
  'Percent Asian': ['interpolate',['linear'],['get','share_asian'],0.0,colorSchemes['race'][0],0.01,colorSchemes['race'][1],0.05,colorSchemes['race'][2],0.1,colorSchemes['race'][3],0.17,colorSchemes['race'][4],0.27,colorSchemes['race'][5],0.4,colorSchemes['race'][6],0.57,colorSchemes['race'][7],1.0,colorSchemes['race'][8]], 
  'Percent Native Hawaiian or Pacific': ['interpolate',['linear'],['get','share_hawaiin'],0.0,colorSchemes['race'][0],0.01,colorSchemes['race'][1],0.03,colorSchemes['race'][2],0.09,colorSchemes['race'][3],0.21,colorSchemes['race'][4],0.38,colorSchemes['race'][5],0.54,colorSchemes['race'][6],0.77,colorSchemes['race'][7],0.98,colorSchemes['race'][8]], 
  'Percent two or more races': ['interpolate',['linear'],['get','share_mixed'],0.0,colorSchemes['race'][0],0.01,colorSchemes['race'][1],0.02,colorSchemes['race'][2],0.04,colorSchemes['race'][3],0.06,colorSchemes['race'][4],0.09,colorSchemes['race'][5],0.15,colorSchemes['race'][6],0.26,colorSchemes['race'][7],0.66,colorSchemes['race'][8]], 
  'Percent White': ['interpolate',['linear'],['get','share_white'],0.0,colorSchemes['race'][0],0.11,colorSchemes['race'][1],0.26,colorSchemes['race'][2],0.41,colorSchemes['race'][3],0.55,colorSchemes['race'][4],0.68,colorSchemes['race'][5],0.79,colorSchemes['race'][6],0.89,colorSchemes['race'][7],1.0,colorSchemes['race'][8]], 
  'Percent Hispanic or Latino': ['interpolate',['linear'],['get','share_hispanic'],0.0,colorSchemes['race'][0],0.05,colorSchemes['race'][1],0.13,colorSchemes['race'][2],0.23,colorSchemes['race'][3],0.35,colorSchemes['race'][4],0.5,colorSchemes['race'][5],0.66,colorSchemes['race'][6],0.84,colorSchemes['race'][7],1.0,colorSchemes['race'][8]], 
  'Percent other races': ['interpolate',['linear'],['get','share_other'],0.0,colorSchemes['race'][0],0.01,colorSchemes['race'][1],0.05,colorSchemes['race'][2],0.1,colorSchemes['race'][3],0.17,colorSchemes['race'][4],0.26,colorSchemes['race'][5],0.37,colorSchemes['race'][6],0.52,colorSchemes['race'][7],1.0,colorSchemes['race'][8]], 
  'Percent age under 10': ['interpolate',['linear'],['get','share_child'],0.0,colorSchemes['race'][0],0.04,colorSchemes['race'][1],0.07,colorSchemes['race'][2],0.1,colorSchemes['race'][3],0.12,colorSchemes['race'][4],0.15,colorSchemes['race'][5],0.18,colorSchemes['race'][6],0.24,colorSchemes['race'][7],0.52,colorSchemes['race'][8]], 
  'Percent age 10 to 64': ['interpolate',['linear'],['get','share_adult'],0.0,colorSchemes['race'][0],0.38,colorSchemes['race'][1],0.56,colorSchemes['race'][2],0.64,colorSchemes['race'][3],0.69,colorSchemes['race'][4],0.73,colorSchemes['race'][5],0.78,colorSchemes['race'][6],0.87,colorSchemes['race'][7],1.0,colorSchemes['race'][8]], 
  'Percent age over 64': ['interpolate',['linear'],['get','share_senior'],0.0,colorSchemes['race'][0],0.07,colorSchemes['race'][1],0.12,colorSchemes['race'][2],0.16,colorSchemes['race'][3],0.2,colorSchemes['race'][4],0.26,colorSchemes['race'][5],0.37,colorSchemes['race'][6],0.58,colorSchemes['race'][7],1.0,colorSchemes['race'][8]], 
  'Total threshold criteria exceeded': ['interpolate',['linear'],['get','thresholds_exceeded'],0.0,colorSchemes['main-blue-red'][8],0.5,colorSchemes['main-blue-red'][7],1.0,colorSchemes['main-blue-red'][6],2.0,colorSchemes['main-blue-red'][5],4.0,colorSchemes['main-blue-red'][4],6.0,colorSchemes['main-blue-red'][3],8.0,colorSchemes['main-blue-red'][2],11.0,colorSchemes['main-blue-red'][1],18.0,colorSchemes['main-blue-red'][0]], 
  'Total categories exceeded': ['interpolate',['linear'],['get','categories_exceeded'],0.0,colorSchemes['main-blue-red'][8],0.5,colorSchemes['main-blue-red'][7],1.0,colorSchemes['main-blue-red'][6],2.0,colorSchemes['main-blue-red'][5],3.0,colorSchemes['main-blue-red'][4],4.0,colorSchemes['main-blue-red'][3],5.0,colorSchemes['main-blue-red'][2],6.0,colorSchemes['main-blue-red'][1],8.0,colorSchemes['main-blue-red'][0]], 
  'Percentage of tract that is disadvantaged by area': ['interpolate',['linear'],['get','percent_area_disadvantaged'],0.0,colorSchemes['main-blue-red'][0],2.0,colorSchemes['main-blue-red'][1],10.0,colorSchemes['main-blue-red'][2],20.0,colorSchemes['main-blue-red'][3],33.0,colorSchemes['main-blue-red'][4],45.0,colorSchemes['main-blue-red'][5],63.0,colorSchemes['main-blue-red'][6],88.0,colorSchemes['main-blue-red'][7],100.0,colorSchemes['main-blue-red'][8]], 
  'Share of neighbors that are identified as disadvantaged': ['interpolate',['linear'],['get','share_neighbors_disadvantaged'],0.0,colorSchemes['main-blue-red'][0],6.0,colorSchemes['main-blue-red'][1],18.0,colorSchemes['main-blue-red'][2],30.0,colorSchemes['main-blue-red'][3],44.0,colorSchemes['main-blue-red'][4],58.0,colorSchemes['main-blue-red'][5],72.0,colorSchemes['main-blue-red'][6],90.0,colorSchemes['main-blue-red'][7],100.0,colorSchemes['main-blue-red'][8]], 
  'Total population': ['interpolate',['linear'],['get','total_population'],0.0,colorSchemes['blue-3'][0],2299.0,colorSchemes['blue-3'][1],3652.0,colorSchemes['blue-3'][2],4996.0,colorSchemes['blue-3'][3],6555.0,colorSchemes['blue-3'][4],8824.0,colorSchemes['blue-3'][5],13222.0,colorSchemes['blue-3'][6],23491.0,colorSchemes['blue-3'][7],72041.0,colorSchemes['blue-3'][8]], 
  'Adjusted percent of individuals below 200% Federal Poverty Line': ['interpolate',['linear'],['get','adjusted_poor_200'],0.0,colorSchemes['dark-blue-red'][8],0.06,colorSchemes['dark-blue-red'][7],0.14,colorSchemes['dark-blue-red'][6],0.22,colorSchemes['dark-blue-red'][5],0.31,colorSchemes['dark-blue-red'][4],0.41,colorSchemes['dark-blue-red'][3],0.52,colorSchemes['dark-blue-red'][2],0.65,colorSchemes['dark-blue-red'][1],1.0,colorSchemes['dark-blue-red'][0]], 
  'Expected agricultural loss rate (Natural Hazards Risk Index)': ['interpolate',['linear'],['get','ag_loss_rate'],0.0,colorSchemes['red-1'][0],0.3382,colorSchemes['red-1'][1],1.1447,colorSchemes['red-1'][2],2.5751,colorSchemes['red-1'][3],5.3275,colorSchemes['red-1'][4],10.654,colorSchemes['red-1'][5],17.4458,colorSchemes['red-1'][6],27.0013,colorSchemes['red-1'][7],47.354,colorSchemes['red-1'][8]], 
  'Expected building loss rate (Natural Hazards Risk Index)': ['interpolate',['linear'],['get','building_loss_rate'],0.0,colorSchemes['red-1'][0],0.023,colorSchemes['red-1'][1],0.0657,colorSchemes['red-1'][2],0.1519,colorSchemes['red-1'][3],0.3035,colorSchemes['red-1'][4],0.5372,colorSchemes['red-1'][5],0.8982,colorSchemes['red-1'][6],1.5242,colorSchemes['red-1'][7],2.5337,colorSchemes['red-1'][8]], 
  'Expected population loss rate (Natural Hazards Risk Index)': ['interpolate',['linear'],['get','pop_loss_rate'],0.0,colorSchemes['red-1'][0],0.0004,colorSchemes['red-1'][1],0.0016,colorSchemes['red-1'][2],0.0039,colorSchemes['red-1'][3],0.0106,colorSchemes['red-1'][4],0.0339,colorSchemes['red-1'][5],0.0764,colorSchemes['red-1'][6],0.1121,colorSchemes['red-1'][7],0.2122,colorSchemes['red-1'][8]], 
  'Share of properties at risk of flood in 30 years': ['interpolate',['linear'],['get','flood_risk'],0.0,colorSchemes['red-1'][0],4.0,colorSchemes['red-1'][1],9.0,colorSchemes['red-1'][2],16.0,colorSchemes['red-1'][3],26.0,colorSchemes['red-1'][4],40.0,colorSchemes['red-1'][5],58.0,colorSchemes['red-1'][6],82.0,colorSchemes['red-1'][7],100.0,colorSchemes['red-1'][8]], 
  'Share of properties at risk of fire in 30 years': ['interpolate',['linear'],['get','fire_risk'],0.0,colorSchemes['red-1'][0],6.0,colorSchemes['red-1'][1],20.0,colorSchemes['red-1'][2],36.0,colorSchemes['red-1'][3],52.0,colorSchemes['red-1'][4],67.0,colorSchemes['red-1'][5],81.0,colorSchemes['red-1'][6],92.0,colorSchemes['red-1'][7],100.0,colorSchemes['red-1'][8]], 
  'Energy burden': ['interpolate',['linear'],['get','energy_burden'],0.0,colorSchemes['main-blue-red'][8],1.0,colorSchemes['main-blue-red'][7],2.0,colorSchemes['main-blue-red'][6],3.0,colorSchemes['main-blue-red'][5],5.0,colorSchemes['main-blue-red'][4],8.0,colorSchemes['main-blue-red'][3],37.0,colorSchemes['main-blue-red'][2],119.0,colorSchemes['main-blue-red'][1],1322.0,colorSchemes['main-blue-red'][0]], 
  'PM2.5 in the air': ['interpolate',['linear'],['get','pollution_25'],3.93,colorSchemes['blue-green-red'][8],6.23,colorSchemes['blue-green-red'][7],7.34,colorSchemes['blue-green-red'][6],8.23,colorSchemes['blue-green-red'][5],9.06,colorSchemes['blue-green-red'][4],10.0,colorSchemes['blue-green-red'][3],11.64,colorSchemes['blue-green-red'][2],14.01,colorSchemes['blue-green-red'][1],17.75,colorSchemes['blue-green-red'][0]], 
  'Diesel particulate matter exposure': ['interpolate',['linear'],['get','diesel_exposure'],0.0,colorSchemes['blue-green-red'][8],0.13,colorSchemes['blue-green-red'][7],0.23,colorSchemes['blue-green-red'][6],0.34,colorSchemes['blue-green-red'][5],0.46,colorSchemes['blue-green-red'][4],0.63,colorSchemes['blue-green-red'][3],0.89,colorSchemes['blue-green-red'][2],1.23,colorSchemes['blue-green-red'][1],1.92,colorSchemes['blue-green-red'][0]], 
  'Traffic proximity and volume': ['interpolate',['linear'],['get','traffic_proximity'],0.0,colorSchemes['race-variant'][0],472.08,colorSchemes['race-variant'][1],1310.65,colorSchemes['race-variant'][2],2636.06,colorSchemes['race-variant'][3],4631.22,colorSchemes['race-variant'][4],7824.74,colorSchemes['race-variant'][5],12741.41,colorSchemes['race-variant'][6],21581.53,colorSchemes['race-variant'][7],42063.59,colorSchemes['race-variant'][8]], 
  'DOT Travel Barriers Score (percentile)': ['interpolate',['linear'],['get','travel_barriers_pt'],0.0,colorSchemes['dark-blue-red'][8],12.0,colorSchemes['dark-blue-red'][7],25.0,colorSchemes['dark-blue-red'][6],37.0,colorSchemes['dark-blue-red'][5],49.0,colorSchemes['dark-blue-red'][4],61.0,colorSchemes['dark-blue-red'][3],73.0,colorSchemes['dark-blue-red'][2],86.0,colorSchemes['dark-blue-red'][1],99.0,colorSchemes['dark-blue-red'][0]], 
  'Housing burden (percent)': ['interpolate',['linear'],['get','housing_burden'],0.0,colorSchemes['main-blue-red'][8],11.0,colorSchemes['main-blue-red'][7],17.0,colorSchemes['main-blue-red'][6],23.0,colorSchemes['main-blue-red'][5],29.0,colorSchemes['main-blue-red'][4],36.0,colorSchemes['main-blue-red'][3],44.0,colorSchemes['main-blue-red'][2],55.0,colorSchemes['main-blue-red'][1],100.0,colorSchemes['main-blue-red'][0]], 
  'Percent pre-1960s housing (lead paint indicator)': ['interpolate',['linear'],['get','lead_paint'],0.0,colorSchemes['main-blue-red'][8],6.0,colorSchemes['main-blue-red'][7],16.0,colorSchemes['main-blue-red'][6],27.0,colorSchemes['main-blue-red'][5],39.0,colorSchemes['main-blue-red'][4],51.0,colorSchemes['main-blue-red'][3],64.0,colorSchemes['main-blue-red'][2],78.0,colorSchemes['main-blue-red'][1],100.0,colorSchemes['main-blue-red'][0]], 
  'Median value ($) of owner-occupied housing units': ['interpolate',['linear'],['get','house_value'],9999.0,colorSchemes['yellow-blue'][0],136500.0,colorSchemes['yellow-blue'][1],234200.0,colorSchemes['yellow-blue'][2],357700.0,colorSchemes['yellow-blue'][3],518500.0,colorSchemes['yellow-blue'][4],732500.0,colorSchemes['yellow-blue'][5],1018800.0,colorSchemes['yellow-blue'][6],1493400.0,colorSchemes['yellow-blue'][7],2000001.0,colorSchemes['yellow-blue'][8]], 
  "Share of the tract's land area that is covered by impervious surface or cropland as a percent": ['interpolate',['linear'],['get','impervious_surface'],0.0,colorSchemes['main-blue-red'][8],1035.0,colorSchemes['main-blue-red'][7],2147.0,colorSchemes['main-blue-red'][6],3224.0,colorSchemes['main-blue-red'][5],4276.0,colorSchemes['main-blue-red'][4],5341.0,colorSchemes['main-blue-red'][3],6482.0,colorSchemes['main-blue-red'][2],7800.0,colorSchemes['main-blue-red'][1],9846.0,colorSchemes['main-blue-red'][0]], 
  'Share of homes with no kitchen or indoor plumbing (percent)': ['interpolate',['linear'],['get','no_kitchen_plumbing'],0.0,colorSchemes['main-blue-red'][8],0.01,colorSchemes['main-blue-red'][7],0.02,colorSchemes['main-blue-red'][6],0.03,colorSchemes['main-blue-red'][5],0.06,colorSchemes['main-blue-red'][4],0.11,colorSchemes['main-blue-red'][3],0.21,colorSchemes['main-blue-red'][2],0.4,colorSchemes['main-blue-red'][1],0.68,colorSchemes['main-blue-red'][0]], 
  'Proximity to hazardous waste sites': ['interpolate',['linear'],['get','waste_proximity'],0.0,colorSchemes['race-variant'][0],1.1,colorSchemes['race-variant'][1],2.99,colorSchemes['race-variant'][2],5.56,colorSchemes['race-variant'][3],9.14,colorSchemes['race-variant'][4],13.98,colorSchemes['race-variant'][5],20.98,colorSchemes['race-variant'][6],31.57,colorSchemes['race-variant'][7],57.75,colorSchemes['race-variant'][8]], 
  'Proximity to NPL (Superfund) sites': ['interpolate',['linear'],['get','superfund_proximity'],0.0,colorSchemes['race-variant'][0],0.09,colorSchemes['race-variant'][1],0.26,colorSchemes['race-variant'][2],0.54,colorSchemes['race-variant'][3],0.98,colorSchemes['race-variant'][4],1.66,colorSchemes['race-variant'][5],2.82,colorSchemes['race-variant'][6],4.71,colorSchemes['race-variant'][7],8.05,colorSchemes['race-variant'][8]], 
  'Proximity to Risk Management Plan (RMP) facilities': ['interpolate',['linear'],['get','rmp_proximity'],0.0,colorSchemes['race-variant'][0],0.39,colorSchemes['race-variant'][1],0.92,colorSchemes['race-variant'][2],1.59,colorSchemes['race-variant'][3],2.48,colorSchemes['race-variant'][4],3.7,colorSchemes['race-variant'][5],5.47,colorSchemes['race-variant'][6],8.54,colorSchemes['race-variant'][7],17.6,colorSchemes['race-variant'][8]], 
  'Wastewater discharge': ['interpolate',['linear'],['get','wastewater'],0.0,colorSchemes['race-variant'][0],555.26,colorSchemes['race-variant'][1],2220.4,colorSchemes['race-variant'][2],5243.1,colorSchemes['race-variant'][3],9170.52,colorSchemes['race-variant'][4],16402.87,colorSchemes['race-variant'][5],22351.43,colorSchemes['race-variant'][6],40246.61,colorSchemes['race-variant'][7],56390.56,colorSchemes['race-variant'][8]], 
  'Leaky underground storage tanks': ['interpolate',['linear'],['get','storage_tanks'],0.0,colorSchemes['race-variant'][0],1.95,colorSchemes['race-variant'][1],5.2,colorSchemes['race-variant'][2],9.77,colorSchemes['race-variant'][3],16.04,colorSchemes['race-variant'][4],24.76,colorSchemes['race-variant'][5],37.47,colorSchemes['race-variant'][6],58.42,colorSchemes['race-variant'][7],154.78,colorSchemes['race-variant'][8]], 
  'Current asthma among adults aged greater than or equal to 18 years': ['interpolate',['linear'],['get','asmtha_adult'],490.0,colorSchemes['pink-1'][0],780.0,colorSchemes['pink-1'][1],869.0,colorSchemes['pink-1'][2],950.0,colorSchemes['pink-1'][3],1030.0,colorSchemes['pink-1'][4],1120.0,colorSchemes['pink-1'][5],1240.0,colorSchemes['pink-1'][6],1400.0,colorSchemes['pink-1'][7],2150.0,colorSchemes['pink-1'][8]], 
  'Diagnosed diabetes among adults aged greater than or equal to 18 years': ['interpolate',['linear'],['get','diabetes_adult'],70.0,colorSchemes['blue-2'][0],590.0,colorSchemes['blue-2'][1],819.0,colorSchemes['blue-2'][2],1000.0,colorSchemes['blue-2'][3],1190.0,colorSchemes['blue-2'][4],1410.0,colorSchemes['blue-2'][5],1700.0,colorSchemes['blue-2'][6],2100.0,colorSchemes['blue-2'][7],4420.0,colorSchemes['blue-2'][8]], 
  'Coronary heart disease among adults aged greater than or equal to 18 years': ['interpolate',['linear'],['get','heart_adult'],30.0,colorSchemes['purple-1'][0],320.0,colorSchemes['purple-1'][1],440.0,colorSchemes['purple-1'][2],540.0,colorSchemes['purple-1'][3],650.0,colorSchemes['purple-1'][4],770.0,colorSchemes['purple-1'][5],919.0,colorSchemes['purple-1'][6],1170.0,colorSchemes['purple-1'][7],3710.0,colorSchemes['purple-1'][8]], 
  'Life expectancy (years)': ['interpolate',['linear'],['get','life_expectancy'],56.3,colorSchemes['main-blue-red'][1],70.2,colorSchemes['main-blue-red'][2],73.59,colorSchemes['main-blue-red'][3],76.0,colorSchemes['main-blue-red'][4],78.09,colorSchemes['main-blue-red'][5],80.09,colorSchemes['main-blue-red'][6],82.2,colorSchemes['main-blue-red'][7],84.9,colorSchemes['main-blue-red'][8],97.5,colorSchemes['main-blue-red'][9]], 
  'Median household income as a percent of area median income': ['interpolate',['linear'],['get','hhinc_divided_by_area_income'],4.0,colorSchemes['dark-blue-red'][0],55.0,colorSchemes['dark-blue-red'][1],77.0,colorSchemes['dark-blue-red'][2],97.0,colorSchemes['dark-blue-red'][3],119.0,colorSchemes['dark-blue-red'][4],146.0,colorSchemes['dark-blue-red'][5],183.0,colorSchemes['dark-blue-red'][6],244.0,colorSchemes['dark-blue-red'][7],492.0,colorSchemes['dark-blue-red'][8]], 
  'Linguistic isolation (percent)': ['interpolate',['linear'],['get','linguistic_isolation'],0.0,colorSchemes['dark-blue-red'][8],1.0,colorSchemes['dark-blue-red'][7],5.0,colorSchemes['dark-blue-red'][6],11.0,colorSchemes['dark-blue-red'][5],19.0,colorSchemes['dark-blue-red'][4],29.0,colorSchemes['dark-blue-red'][3],44.0,colorSchemes['dark-blue-red'][2],64.0,colorSchemes['dark-blue-red'][1],100.0,colorSchemes['dark-blue-red'][0]], 
  'Unemployment (percent)': ['interpolate',['linear'],['get','unemployment_percent'],0.0,colorSchemes['dark-blue-red'][8],2.0,colorSchemes['dark-blue-red'][7],4.0,colorSchemes['dark-blue-red'][6],7.0,colorSchemes['dark-blue-red'][5],10.0,colorSchemes['dark-blue-red'][4],15.0,colorSchemes['dark-blue-red'][3],23.0,colorSchemes['dark-blue-red'][2],39.0,colorSchemes['dark-blue-red'][1],100.0,colorSchemes['dark-blue-red'][0]], 
  'Percent of individuals below 200 Federal Poverty Line': ['interpolate',['linear'],['get','share_poor_200'],0.0,colorSchemes['dark-blue-red'][8],12.0,colorSchemes['dark-blue-red'][7],21.0,colorSchemes['dark-blue-red'][6],29.0,colorSchemes['dark-blue-red'][5],38.0,colorSchemes['dark-blue-red'][4],48.0,colorSchemes['dark-blue-red'][3],59.0,colorSchemes['dark-blue-red'][2],73.0,colorSchemes['dark-blue-red'][1],100.0,colorSchemes['dark-blue-red'][0]], 
  'Percent of individuals < 100 Federal Poverty Line': ['interpolate',['linear'],['get','share_poor_100'],0.0,colorSchemes['dark-blue-red'][8],5.0,colorSchemes['dark-blue-red'][7],10.0,colorSchemes['dark-blue-red'][6],16.0,colorSchemes['dark-blue-red'][5],23.0,colorSchemes['dark-blue-red'][4],32.0,colorSchemes['dark-blue-red'][3],43.0,colorSchemes['dark-blue-red'][2],60.0,colorSchemes['dark-blue-red'][1],100.0,colorSchemes['dark-blue-red'][0]], 
  'Percent individuals age 25 or over with less than high school degree': ['interpolate',['linear'],['get','less_than_hs'],0.0,colorSchemes['dark-blue-red'][8],4.0,colorSchemes['dark-blue-red'][7],8.0,colorSchemes['dark-blue-red'][6],13.0,colorSchemes['dark-blue-red'][5],19.0,colorSchemes['dark-blue-red'][4],26.0,colorSchemes['dark-blue-red'][3],34.0,colorSchemes['dark-blue-red'][2],45.0,colorSchemes['dark-blue-red'][1],100.0,colorSchemes['dark-blue-red'][0]], 
  'Percent of residents who are not currently enrolled in higher ed': ['interpolate',['linear'],['get','share_not_in_higher_ed'],0.0,colorSchemes['blue-4'][0],22.0,colorSchemes['blue-4'][1],46.0,colorSchemes['blue-4'][2],65.0,colorSchemes['blue-4'][3],79.0,colorSchemes['blue-4'][4],87.0,colorSchemes['blue-4'][5],91.0,colorSchemes['blue-4'][6],94.0,colorSchemes['blue-4'][7],100.0,colorSchemes['blue-4'][8]], 
  'Unemployment (percent) in 2009 (island areas) and 2010 (states and PR)': ['interpolate',['linear'],['get','unemployment_2010'],0.0,colorSchemes['dark-blue-red'][8],2.0,colorSchemes['dark-blue-red'][7],5.0,colorSchemes['dark-blue-red'][6],8.0,colorSchemes['dark-blue-red'][5],12.0,colorSchemes['dark-blue-red'][4],17.0,colorSchemes['dark-blue-red'][3],26.0,colorSchemes['dark-blue-red'][2],46.0,colorSchemes['dark-blue-red'][1],100.0,colorSchemes['dark-blue-red'][0]], 
  'Percentage households below 100 of federal poverty line in 2009 (island areas) and 2010 (states and PR)': ['interpolate',['linear'],['get','poverty_2010'],0.0,colorSchemes['dark-blue-red'][8],5.0,colorSchemes['dark-blue-red'][7],10.0,colorSchemes['dark-blue-red'][6],16.0,colorSchemes['dark-blue-red'][5],23.0,colorSchemes['dark-blue-red'][4],32.0,colorSchemes['dark-blue-red'][3],43.0,colorSchemes['dark-blue-red'][2],60.0,colorSchemes['dark-blue-red'][1],100.0,colorSchemes['dark-blue-red'][0]], 
  'Percent of the Census tract that is within Tribal areas': ['interpolate',['linear'],['get','percent_tract_tribal_area'],0.0,colorSchemes['race'][0],2.0,colorSchemes['race'][1],10.0,colorSchemes['race'][2],21.0,colorSchemes['race'][3],33.0,colorSchemes['race'][4],47.0,colorSchemes['race'][5],67.0,colorSchemes['race'][6],90.0,colorSchemes['race'][7],102.0,colorSchemes['race'][8]], 
  'env_index': ['interpolate',['linear'],['get','env_index'],0.0,colorSchemes['main-blue-red'][8],13.333333333333334,colorSchemes['main-blue-red'][7],27.9,colorSchemes['main-blue-red'][6],35.55555555555556,colorSchemes['main-blue-red'][5],42.333333333333336,colorSchemes['main-blue-red'][4],49.0,colorSchemes['main-blue-red'][3],56.333333333333336,colorSchemes['main-blue-red'][2],65.7,colorSchemes['main-blue-red'][1],84.6,colorSchemes['main-blue-red'][0]],
  'has_mine': ['case', ['==', ['get', 'has_mine_missing_data_is_false'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'has_fuds': ['case', ['==', ['get', 'has_fuds'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'has_35_acres': ['case', ['==', ['get', 'has_35_acres'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'historic_underinvestment': ['case', ['==', ['get', 'had_underinvestment'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]], 
  'is_low_income':['case', ['==', ['get', 'is_low_income'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'income_from_neighbor':['case', ['==', ['get', 'income_based_on_neighbor'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'disadvantaged':['case', ['==', ['get', 'is_disadvantaged'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'disadvantaged_with_neighbors':['case', ['==', ['get', 'is_disadvantaged_neighbors'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'disadvantaged_without_neighbors':['case', ['==', ['get', 'is_disadvantaged_alone'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'disadvanted_tribal': ['case', ['==', ['get', 'is_disadvantaged_tribal'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_25_inc': ['case', ['==', ['get', 'th_25_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_ag_inc': ['case', ['==', ['get', 'th_ag_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_asthma_inc': ['case', ['==', ['get', 'th_asthma_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_barriers_inc': ['case', ['==', ['get', 'th_barriers_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_building_inc': ['case', ['==', ['get', 'th_building_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_diabetes_inc': ['case', ['==', ['get', 'th_diabetes_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_diesel_inc': ['case', ['==', ['get', 'th_diesel_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_energy_inc': ['case', ['==', ['get', 'th_energy_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_fire': ['case', ['==', ['get', 'th_fire'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_fire_inc': ['case', ['==', ['get', 'th_fire_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_flood': ['case', ['==', ['get', 'th_flood'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_flood_inc': ['case', ['==', ['get', 'th_flood_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_fuds_inc': ['case', ['==', ['get', 'th_fuds_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_heart_inc': ['case', ['==', ['get', 'th_heart_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_hhinc_area_hs_attainment': ['case', ['==', ['get', 'th_hhinc_area_hs_attainment'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_hhinc_area_hs_attainment_2010': ['case', ['==', ['get', 'th_hhinc_area_hs_attainment_2010'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_housing_burden_inc': ['case', ['==', ['get', 'th_housing_burden_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_impervious': ['case', ['==', ['get', 'th_impervious'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_impervious_inc': ['case', ['==', ['get', 'th_impervious_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_lead_house_value_inc': ['case', ['==', ['get', 'th_lead_house_value_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_life_expectancy_inc': ['case', ['==', ['get', 'th_life_expectancy_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_linguistic_isolation_hs_attainment': ['case', ['==', ['get', 'th_linguistic_isolation_hs_attainment'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_mine_inc': ['case', ['==', ['get', 'th_mine_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_poor_100_hs_attainment': ['case', ['==', ['get', 'th_poor_100_hs_attainment'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_pop_inc': ['case', ['==', ['get', 'th_pop_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_poverty_100_hs_attainment_2010': ['case', ['==', ['get', 'th_poverty_100_hs_attainment_2010'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_rmp_inc': ['case', ['==', ['get', 'th_rmp_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_storage_inc': ['case', ['==', ['get', 'th_storage_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_superfund_inc': ['case', ['==', ['get', 'th_superfund_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_traffic_inc': ['case', ['==', ['get', 'th_traffic_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_underinvestment_inc': ['case', ['==', ['get', 'th_underinvestment_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_unemployment_hs_attainment': ['case', ['==', ['get', 'th_unemployment_hs_attainment'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_unemployment_hs_attainment_2010': ['case', ['==', ['get', 'th_unemployment_hs_attainment_2010'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_waste_inc': ['case', ['==', ['get', 'th_waste_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]],
  'th_wastewater_inc': ['case', ['==', ['get', 'th_wastewater_inc'], 'True'], colorSchemes['bool-colors'][0],colorSchemes['bool-colors'][1]]
}

  const layers_dict = {
"heat":{'name':'heat', 'layer-name': 'heat', 'percentile-layer': '', 'county-colors': county_colors_dictionary['day'], 'tract-colors': tract_colors['day'], 'tract-only': false, 'legend-county': './key-images/county-keys/heat.png', 'legend-tract': './key-images/tract-keys/heat.png', 'county-triangle': './county-triangles/heat.png', 'tract-triangle':'./tract-triangles/heat.png', 'pre': 'Heat Index: ', 'post': '', 'round': 0, 'multiple': 1, 'optional-pre': '', 'county-range': [0.007789743095204235,10.732900814343884], 'tract-range': [0.0,14.603241316634]}, 
"rent":{'name':'rent', 'layer-name': 'rent', 'percentile-layer': '', 'county-colors': county_colors_dictionary['Housing'], 'tract-colors': tract_colors['Housing'], 'tract-only': false, 'legend-county': './key-images/county-keys/rent.png', 'legend-tract': './key-images/tract-keys/rent.png', 'county-triangle': './county-triangles/rent.png', 'tract-triangle':'./tract-triangles/rent.png', 'pre': 'Rent: $', 'post': '', 'round': 0, 'multiple': 1, 'optional-pre': '', 'county-range': [274.0, 2465.2518107781157], 'tract-range': [123.0,4001.0]}, 
"income":{'name':'income', 'layer-name': 'income', 'percentile-layer': '', 'county-colors': county_colors_dictionary['Income'], 'tract-colors': tract_colors['Income'], 'tract-only': false, 'optional-pre': ''}, 
"share_black":{'name':'share_black', 'layer-name': 'share_black', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_black'], 'tract-colors': tract_colors['Percent Black or African American alone'], 'tract-only': false, 'legend-county': './key-images/county-keys/share_black.png', 'legend-tract': './key-images/tract-keys/share_black.png', 'county-triangle': './county-triangles/share_black.png', 'tract-triangle':'./tract-triangles/share_black.png', 'pre': '', 'post': '% black', 'round': 0, 'multiple': 100, 'optional-pre': '', 'county-range': [0.0,0.8694894927934868], 'tract-range': [0.0,1.0]}, 
"share_natam":{'name':'share_natam', 'layer-name': 'share_native', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_natam'], 'tract-colors': tract_colors['Percent American Indian / Alaska Native'], 'tract-only': false, 'legend-county': './key-images/county-keys/share_native.png', 'legend-tract': './key-images/tract-keys/share_native.png', 'county-triangle': './county-triangles/share_native.png', 'tract-triangle':'./tract-triangles/share_native.png', 'pre': '', 'post': '% Native American', 'round': 0, 'multiple': 100, 'optional-pre': '', 'county-range': [0.0,0.8725551741049533], 'tract-range': [0.0,1.0]},  
"share_asian":{'name':'share_asian', 'layer-name': 'share_asian', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_asian'], 'tract-colors': tract_colors['Percent Asian'], 'tract-only': false, 'legend-county': './key-images/county-keys/share_asian.png', 'legend-tract': './key-images/tract-keys/share_asian.png', 'county-triangle': './county-triangles/share_asian.png', 'tract-triangle':'./tract-triangles/share_asian.png', 'pre': '', 'post': '% asian', 'round': 0, 'multiple': 100, 'optional-pre': '', 'county-range': [0.0,0.3596216542929332], 'tract-range': [0.0,1.0]}, 
"share_pacific":{'name':'share_pacific', 'layer-name': 'share_hawaiin', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_pacific'], 'tract-colors': tract_colors['Percent Native Hawaiian or Pacific'], 'tract-only': false, 'legend-county': './key-images/county-keys/share_pacific.png', 'legend-tract': './key-images/tract-keys/share_pacific.png', 'county-triangle': './county-triangles/share_pacific.png', 'tract-triangle':'./tract-triangles/share_pacific.png', 'pre': '', 'post': '% Pacific / Hawaiian', 'round': 0, 'multiple': 100, 'optional-pre': '', 'county-range': [0.0,0.03410045558822579], 'tract-range': [0.0,0.98]},  
"share_mixed":{'name':'share_mixed', 'layer-name': 'share_mixed', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_mixed'], 'tract-colors': tract_colors['Percent two or more races'], 'tract-only': false, 'legend-county': './key-images/county-keys/share_mixed.png', 'legend-tract': './key-images/tract-keys/share_mixed.png', 'county-triangle': './county-triangles/share_mixed.png', 'tract-triangle':'./tract-triangles/share_mixed.png', 'pre': '', 'post': '% mixed', 'round': 0, 'multiple': 100, 'optional-pre': '', 'county-range': [0.0,0.17397324656543744], 'tract-range': [0.0,0.66]}, 
"share_white":{'name':'share_white', 'layer-name': 'share_white', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_white'], 'tract-colors': tract_colors['Percent White'], 'tract-only': false, 'legend-county': './key-images/county-keys/share_white.png', 'legend-tract': './key-images/tract-keys/share_white.png', 'county-triangle': './county-triangles/share_white.png', 'tract-triangle':'./tract-triangles/share_white.png', 'pre': '', 'post': '% white', 'round': 0, 'multiple': 100, 'optional-pre': '', 'county-range': [0.0047027060769686945,0.9948867159551634], 'tract-range':[0.0,1.0]}, 
"share_hispanic":{'name':'share_hispanic', 'layer-name': 'share_hispanic', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_hisp'], 'tract-colors': tract_colors['Percent Hispanic or Latino'], 'tract-only': false, 'legend-county': './key-images/county-keys/share_hispanic.png', 'legend-tract': './key-images/tract-keys/share_hispanic.png', 'county-triangle': './county-triangles/share_hispanic.png', 'tract-triangle':'./tract-triangles/share_hispanic.png', 'pre': '', 'post': '% hispanic', 'round': 0, 'multiple': 100, 'optional-pre': '', 'county-range': [0.0,0.987817035487999], 'tract-range': [0.0,1.0]}, 
"share_other":{'name':'share_other', 'layer-name': 'share_other', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_other'], 'tract-colors': tract_colors['Percent other races'], 'tract-only': false, 'legend-county': './key-images/county-keys/share_other.png', 'legend-tract': './key-images/tract-keys/share_other.png', 'county-triangle': './county-triangles/share_other.png', 'tract-triangle':'./tract-triangles/share_other.png', 'pre': '', 'post': '% other', 'round': 0, 'multiple': 100, 'optional-pre': '', 'county-range': [0.0,0.55], 'tract-range': [0.0,1.0]}, 
"share_child":{'name':'share_child', 'layer-name': 'share_child', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_kid'], 'tract-colors': tract_colors['Percent age under 10'], 'tract-only': false, 'legend-county': './key-images/county-keys/share_child.png', 'legend-tract': './key-images/tract-keys/share_child.png', 'county-triangle': './county-triangles/share_child.png', 'tract-triangle':'./tract-triangles/share_child.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 100, 'optional-pre': 'Ages Under 10: ', 'county-range': [0.030654089760404336,0.24000000000000002], 'tract-range': [0.0,0.52]},  
"share_adult":{'name':'share_adult', 'layer-name': 'share_adult', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_adult'], 'tract-colors': tract_colors['Percent age 10 to 64'], 'tract-only': false, 'legend-county': './key-images/county-keys/share_adult.png', 'legend-tract': './key-images/tract-keys/share_adult.png', 'county-triangle': './county-triangles/share_adult.png', 'tract-triangle':'./tract-triangles/share_adult.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 100, 'optional-pre': 'Ages 10-64: ', 'county-range': [0.392116694923387,0.8460612740941722], 'tract-range': [0.0,1.0]}, 
"share_senior":{'name':'share_senior', 'layer-name': 'share_senior', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_sr'], 'tract-colors': tract_colors['Percent age over 64'], 'tract-only': false, 'legend-county': './key-images/county-keys/share_senior.png', 'legend-tract': './key-images/tract-keys/share_senior.png', 'county-triangle': './county-triangles/share_senior.png', 'tract-triangle':'./tract-triangles/share_senior.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 100, 'optional-pre': 'Ages 65+: ', 'county-range': [0.031059659090909093,0.5618616646940278], 'tract-range': [0.0,1.0]},  
"thresh_exceeded":{'name':'thresh_exceeded', 'layer-name': 'thresholds_exceeded', 'percentile-layer': '', 'county-colors': county_colors_dictionary['thresh_exceeded'], 'tract-colors': tract_colors['Total threshold criteria exceeded'], 'tract-only': false, 'legend-county': './key-images/county-keys/thresholds_exceeded.png', 'legend-tract': './key-images/tract-keys/thresholds.png', 'county-triangle': './county-triangles/thresholds.png', 'tract-triangle':'./tract-triangles/thresholds.png', 'pre': '', 'post': ' thresholds exceeded', 'round': 0, 'multiple': 1, 'optional-pre': '', 'county-range': [0.0,12.0], 'tract-range': [0.0,18.0]},  
"cat_exceeded":{'name':'categories_exceeded', 'layer-name': 'categories_exceeded', 'percentile-layer': '', 'county-colors': county_colors_dictionary['cat_exceeded'], 'tract-colors': tract_colors['Total categories exceeded'], 'tract-only': false, 'legend-county': './key-images/county-keys/categories_exceeded.png', 'legend-tract': './key-images/tract-keys/categories.png', 'county-triangle': './county-triangles/categories.png', 'tract-triangle':'./tract-triangles/categories.png', 'pre': '', 'post': ' categories exceeded', 'round': 0, 'multiple': 1, 'optional-pre': '', 'county-range': [0.0,7.0], 'tract-range': [0.0,8.0]},  
"percent_area_disadvantaged":{'name':'percent_area_disadvantaged', 'layer-name': 'percent_area_disadvantaged', 'percentile-layer': '', 'county-colors': county_colors_dictionary['percent_disadvantaged'], 'tract-colors': tract_colors['Percentage of tract that is disadvantaged by area'], 'tract-only': false, 'optional-pre': '', 'county-range': [0.0,100.0], 'tract-range': [0.0,100.0]}, 
"share_neighbors_disadvantaged":{'name':'share_neighbors_disadvantaged', 'layer-name': 'share_neighbors_disadvantaged', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_neighbors_disadvantaged'], 'tract-colors': tract_colors['Share of neighbors that are identified as disadvantaged'], 'tract-only': false, 'optional-pre': '', 'county-range': [0.0,100.0], 'tract-range': [0.0,100.0]}, 
"total_population":{'name':'total_population', 'layer-name': 'total_population', 'percentile-layer': '', 'county-colors': county_colors_dictionary['total_pop'], 'tract-colors': tract_colors['Total population'], 'tract-only': false, 'legend-county': './key-images/county-keys/total_population.png', 'legend-tract': './key-images/tract-keys/total_population.png', 'county-triangle': './county-triangles/total_population.png', 'tract-triangle':'./tract-triangles/total_population.png', 'pre': 'Population: ', 'post': 'k', 'round': 1, 'multiple': 0.001, 'optional-pre': '', 'county-range': [237.0,10073612.0], 'tract-range': [0.0,72041.0]}, 
"adjusted_poor_200":{'name':'adjusted_poor_200', 'layer-name': 'adjusted_poor_200', 'percentile-layer': 'adjusted_poor_200_pt', 'county-colors': county_colors_dictionary['adjusted_poverty_200'], 'tract-colors': tract_colors['Adjusted percent of individuals below 200% Federal Poverty Line'], 'tract-only': false, 'legend-county': './key-images/county-keys/adjusted_poor.png', 'legend-tract': './key-images/tract-keys/adjusted_poor.png', 'county-triangle': './county-triangles/adjusted_poor.png', 'tract-triangle':'./tract-triangles/adjusted_poor.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 100, 'optional-pre': 'Poverty Rate: ', 'county-range': [0.0,0.7013143697891123], 'tract-range': [0.0,1.0]}, 
"ag_loss_rate":{'name':'ag_loss_rate', 'layer-name': 'ag_loss_rate', 'percentile-layer': 'ag_loss_pt', 'county-colors': county_colors_dictionary['ag_loss'], 'tract-colors': tract_colors['Expected agricultural loss rate (Natural Hazards Risk Index)'], 'tract-only': false, 'legend-county': './key-images/county-keys/ag_loss.png', 'legend-tract': './key-images/tract-keys/ag_loss.png', 'county-triangle': './county-triangles/ag_loss.png', 'tract-triangle':'./tract-triangles/ag_loss.png', 'pre': 'Risk Index: ', 'post': '', 'round': 0, 'multiple': 1, 'optional-pre': '', 'county-range': [0.0,39.8912], 'tract-range': [0.0,47.354]}, 
"building_loss_rate":{'name':'building_loss_rate', 'layer-name': 'building_loss_rate', 'percentile-layer': 'building_loss_pt', 'county-colors': county_colors_dictionary['building_loss'], 'tract-colors': tract_colors['Expected building loss rate (Natural Hazards Risk Index)'], 'tract-only': false, 'legend-county': './key-images/county-keys/building_loss.png', 'legend-tract': './key-images/tract-keys/building_loss.png', 'county-triangle': './county-triangles/building_loss.png', 'tract-triangle':'./tract-triangles/building_loss.png', 'pre': 'Risk Index: ', 'post': '', 'round': 0, 'multiple': 100, 'optional-pre': '', 'county-range': [0.0003105651566184093,1.5242], 'tract-range': [0.0,2.5337]},  
"pop_loss_rate":{'name':'pop_loss_rate', 'layer-name': 'pop_loss_rate', 'percentile-layer': 'pop_loss_pt', 'county-colors': county_colors_dictionary['pop_loss'], 'tract-colors': tract_colors['Expected population loss rate (Natural Hazards Risk Index)'], 'tract-only': false, 'legend-county': './key-images/county-keys/pop_loss.png', 'legend-tract': './key-images/tract-keys/pop_loss.png', 'county-triangle': './county-triangles/pop_loss.png', 'tract-triangle':'./tract-triangles/pop_loss.png', 'pre': 'Risk Index: ', 'post': '', 'round': 2, 'multiple': 100, 'optional-pre': '', 'county-range': [0.0,0.0764], 'tract-range': [0.0,0.2122]}, 
"flood_risk":{'name':'flood_risk', 'layer-name': 'flood_risk', 'percentile-layer': 'flood_risk_pt', 'county-colors': county_colors_dictionary['flood_risk'], 'tract-colors': tract_colors['Share of properties at risk of flood in 30 years'], 'tract-only': false, 'legend-county': './key-images/county-keys/flood_risk.png', 'legend-tract': './key-images/tract-keys/flood_risk.png', 'county-triangle': './county-triangles/flood_risk.png', 'tract-triangle':'./tract-triangles/flood_risk.png', 'pre': '', 'post': '% of properties', 'round': 0, 'multiple': 1, 'optional-pre': '', 'county-range': [0.0,99.40963126269831], 'tract-range': [0.0,100.0]}, 
"fire_risk":{'name':'fire_risk', 'layer-name': 'fire_risk', 'percentile-layer': 'fire_risk_pt', 'county-colors': county_colors_dictionary['Share of properties at risk of fire in 30 years'], 'tract-colors': tract_colors['Share of properties at risk of fire in 30 years'], 'tract-only': false, 'legend-county': './key-images/county-keys/fire_risk.png', 'legend-tract': './key-images/tract-keys/fire_risk.png', 'county-triangle': './county-triangles/fire_risk.png', 'tract-triangle':'./tract-triangles/fire_risk.png', 'pre': '', 'post': '% of properties', 'round': 0, 'multiple': 1, 'optional-pre': '', 'county-range': [0.0,98.6033288590604], 'tract-range': [0.0,100.0]},  
"energy_burden":{'name':'energy_burden', 'layer-name': 'energy_burden', 'percentile-layer': 'energy_burden_pt', 'county-colors': county_colors_dictionary['Energy burden'], 'tract-colors': tract_colors['Energy burden'], 'tract-only': false, 'legend-county': './key-images/county-keys/energy_burden.png', 'legend-tract': './key-images/tract-keys/energy_burden.png', 'county-triangle': './county-triangles/energy_burden.png', 'tract-triangle':'./tract-triangles/energy_burden.png', 'pre': 'Energy Burden: ', 'post': '', 'round': 0, 'multiple': 1, 'optional-pre': '', 'county-range': [0.0,13.0], 'tract-range': [0.0,1322.0]},  
"PM25":{'name':'PM25', 'layer-name': 'pollution_25', 'percentile-layer': 'pollution_25_pt', 'county-colors': county_colors_dictionary['PM2.5 in the air'], 'tract-colors': tract_colors['PM2.5 in the air'], 'tract-only': false, 'legend-county': './key-images/county-keys/pm25.png', 'legend-tract': './key-images/tract-keys/pm25.png', 'county-triangle': './county-triangles/pm25.png', 'tract-triangle':'./tract-triangles/pm25.png', 'pre': '', 'post': ' &#956/m<sup>3</sup>', 'round': 1, 'multiple': 1, 'optional-pre': 'Pollution: ', 'county-range': [4.03,16.305040246980933], 'tract-range': [3.93,17.75]},  
"diesel":{'name':'diesel', 'layer-name': 'diesel_exposure', 'percentile-layer': 'diesel_exposure_pt', 'county-colors': county_colors_dictionary['Diesel particulate matter exposure'], 'tract-colors': tract_colors['Diesel particulate matter exposure'], 'tract-only': false, 'legend-county': './key-images/county-keys/diesel.png', 'legend-tract': './key-images/tract-keys/diesel.png', 'county-triangle': './county-triangles/diesel.png', 'tract-triangle':'./tract-triangles/diesel.png', 'pre': '', 'post': ' &#956/m<sup>3</sup>', 'round': 2, 'multiple': 1, 'optional-pre': 'Pollution: ', 'county-range': [0.0,1.474493850580702], 'tract-range': [0.0,1.92]},  
"traffic":{'name':'traffic', 'layer-name': 'traffic_proximity', 'percentile-layer': 'traffic_proximity_pt', 'county-colors': county_colors_dictionary['Traffic proximity and volume'], 'tract-colors': tract_colors['Traffic proximity and volume'], 'tract-only': false, 'legend-county': './key-images/county-keys/traffic.png', 'legend-tract': './key-images/tract-keys/traffic.png', 'county-triangle': './county-triangles/traffic.png', 'tract-triangle':'./tract-triangles/traffic.png', 'pre': '', 'post': ' vehicles/meter', 'round': 0, 'multiple': 1, 'optional-pre': '', 'county-range': [0.0,6896.494788284379], 'tract-range': [0.0,42063.59]},  
"travel_barriers_pt":{'name':'travel_barriers_pt', 'layer-name': 'travel_barriers_pt', 'percentile-layer': 'travel_barriers_pt', 'county-colors': county_colors_dictionary['DOT Travel Barriers Score (percentile)'], 'tract-colors': tract_colors['DOT Travel Barriers Score (percentile)'], 'tract-only': false, 'legend-county': './key-images/county-keys/transit_barriers.png', 'legend-tract': './key-images/tract-keys/transit_barriers.png', 'county-triangle': './county-triangles/transit_barriers.png', 'tract-triangle':'./tract-triangles/transit_barriers.png', 'pre': '', 'post': 'th percentile', 'round': 0, 'multiple': 1, 'optional-pre': '', 'county-range': [3.0,99.0], 'tract-range': [0.0,99.0]}, 
"housing_burden":{'name':'housing_burden', 'layer-name': 'housing_burden', 'percentile-layer': 'housing_burden_pt', 'county-colors': county_colors_dictionary['Housing burden (percent)'], 'tract-colors': tract_colors['Housing burden (percent)'], 'tract-only': false, 'legend-county': './key-images/county-keys/housing_burden.png', 'legend-tract': './key-images/tract-keys/housing_burden.png', 'county-triangle': './county-triangles/housing_burden.png', 'tract-triangle':'./tract-triangles/housing_burden.png', 'pre': 'Housing Burden: ', 'post': '', 'round': 0, 'multiple': 1, 'optional-pre': '', 'county-range': [1.0,50.82352072046718], 'tract-range': [0.0,100.0]},  
"lead":{'name':'lead', 'layer-name': 'lead_paint', 'percentile-layer': 'lead_pain_pt', 'county-colors': county_colors_dictionary['Percent pre-1960s housing (lead paint indicator)'], 'tract-colors': tract_colors['Percent pre-1960s housing (lead paint indicator)'], 'tract-only': false, 'legend-county': './key-images/county-keys/lead.png', 'legend-tract': './key-images/tract-keys/lead.png', 'county-triangle': './county-triangles/lead.png', 'tract-triangle':'./tract-triangles/lead.png', 'pre': '', 'post': '% of homes at risk', 'round': 0, 'multiple': 1, 'optional-pre': '', 'county-range': [1.1744268933335729,76.19659348290251], 'tract-range': [0.0,100.0]},  
"house_value":{'name':'house_value', 'layer-name': 'house_value', 'percentile-layer': 'house_value_pt', 'county-colors': county_colors_dictionary['Median value ($) of owner-occupied housing units'], 'tract-colors': tract_colors['Median value ($) of owner-occupied housing units'], 'tract-only': false, 'legend-county': './key-images/county-keys/house_value.png', 'legend-tract': './key-images/tract-keys/home_value.png', 'county-triangle': './county-triangles/house_value.png', 'tract-triangle':'./tract-triangles/house_value.png', 'pre': '$', 'post': 'k', 'round': 0, 'multiple': 0.001, 'optional-pre': 'Median Value: ', 'county-range': [16891.676136363636,1166960.7226898281], 'tract-range': [9999.0,2000001.0]}, 
"impervious":{'name':'impervious', 'layer-name': 'impervious_surface', 'percentile-layer': 'impervious_surface_pt', 'county-colors': county_colors_dictionary["Share of the tract's land area that is covered by impervious surface or cropland as a percent"], 'tract-colors': tract_colors["Share of the tract's land area that is covered by impervious surface or cropland as a percent"], 'tract-only': false, 'legend-county': './key-images/county-keys/impervious.png', 'legend-tract': './key-images/tract-keys/impervious.png', 'county-triangle': './county-triangles/impervious.png', 'tract-triangle':'./tract-triangles/impervious.png', 'pre': '', 'post': '% of land', 'round': 0, 'multiple': .01, 'optional-pre': '', 'county-range': [15.0,9260.648380776765], 'tract-range': [0.0,9846.0]},  
"no_kitchen_plumbing":{'name':'no_kitchen_plumbing', 'layer-name': 'no_kitchen_plumbing', 'percentile-layer': 'no_kitchen_plumbing_pt', 'county-colors': county_colors_dictionary['Share of homes with no kitchen or indoor plumbing (percent)'], 'tract-colors': tract_colors['Share of homes with no kitchen or indoor plumbing (percent)'], 'tract-only': false, 'legend-county': './key-images/county-keys/no_kitchen.png', 'legend-tract': './key-images/tract-keys/no_kitchen.png', 'county-triangle': './county-triangles/no_kitchen.png', 'tract-triangle':'./tract-triangles/no_kitchen.png', 'pre': '', 'post': '% of homes', 'round': 0, 'multiple': 100, 'optional-pre': '', 'county-range': [0.0,0.1375953982846284], 'tract-range': [0.0,0.68]},  
"waste_proximity":{'name':'waste_proximity', 'layer-name': 'waste_proximity', 'percentile-layer': 'waste_proximity_pt', 'county-colors': county_colors_dictionary['Proximity to hazardous waste sites'], 'tract-colors': tract_colors['Proximity to hazardous waste sites'], 'tract-only': false, 'legend-county': './key-images/county-keys/waste_proximity.png', 'legend-tract': './key-images/tract-keys/waste_proximity.png', 'county-triangle': './county-triangles/waste.png', 'tract-triangle':'./tract-triangles/waste.png', 'pre': 'Proximity: ', 'post': '', 'round': 1, 'multiple': 1, 'optional-pre': '', 'county-range': [0.0,18.86390119670698], 'tract-range': [0.0,57.75]}, 
"superfund_proximity":{'name':'superfund_proximity', 'layer-name': 'superfund_proximity', 'percentile-layer': 'superfund_proximity_pt', 'county-colors': county_colors_dictionary['Proximity to NPL (Superfund) sites'], 'tract-colors': tract_colors['Proximity to NPL (Superfund) sites'], 'tract-only': false, 'legend-county': './key-images/county-keys/superfund.png', 'legend-tract': './key-images/tract-keys/superfund.png', 'county-triangle': './county-triangles/superfund.png', 'tract-triangle':'./tract-triangles/superfund.png', 'pre': 'Proximity: ', 'post': '', 'round': 1, 'multiple': 1, 'optional-pre': '', 'county-range': [0.0,1.2637956018812764], 'tract-range': [0.0,8.05]}, 
"rmp_proximity":{'name':'rmp_proximity', 'layer-name': 'rmp_proximity', 'percentile-layer': 'rmp_proximity_pt', 'county-colors': county_colors_dictionary['Proximity to Risk Management Plan (RMP) facilities'], 'tract-colors': tract_colors['Proximity to Risk Management Plan (RMP) facilities'], 'tract-only': false, 'legend-county': './key-images/county-keys/rmp.png', 'legend-tract': './key-images/tract-keys/rmp.png', 'county-triangle': './county-triangles/rmp.png', 'tract-triangle':'./tract-triangles/rmp.png', 'pre': 'Proximity: ', 'post': '', 'round': 1, 'multiple': 1, 'optional-pre': '', 'county-range': [0.0,4.059209120057], 'tract-range': [0.0,17.6]}, 
"wastewater":{'name':'wastewater', 'layer-name': 'wastewater', 'percentile-layer': 'wastewater_pt', 'county-colors': county_colors_dictionary['Wastewater discharge'], 'tract-colors': tract_colors['Wastewater discharge'], 'tract-only': false, 'legend-county': './key-images/county-keys/wastewater.png', 'legend-tract': './key-images/tract-keys/wastewater.png', 'county-triangle': './county-triangles/wastewater.png', 'tract-triangle':'./tract-triangles/wastewater.png', 'pre': '', 'post': ' ppm/m', 'round': 0, 'multiple': 1, 'optional-pre': '', 'county-range': [0.0,1478.9205953877367], 'tract-range': [0.0,56390.56]},  
"storage_tanks":{'name':'storage_tanks', 'layer-name': 'storage_tanks', 'percentile-layer': 'storage_tanks_pt', 'county-colors': county_colors_dictionary['Leaky underground storage tanks'], 'tract-colors': tract_colors['Leaky underground storage tanks'], 'tract-only': false, 'legend-county': './key-images/county-keys/tanks.png', 'legend-tract': './key-images/tract-keys/tanks.png', 'county-triangle': './county-triangles/tanks.png', 'tract-triangle':'./tract-triangles/tanks.png', 'pre': 'Proximity: ', 'post': '', 'round': 1, 'multiple': 1, 'optional-pre': '', 'county-range': [0.0,42.98716055851193], 'tract-range': [0.0,154.78] },
"asthma":{'name':'asthma', 'layer-name': 'asmtha_adult', 'percentile-layer': 'asthma_adult_pt', 'county-colors': county_colors_dictionary['Current asthma among adults aged greater than or equal to 18 years'], 'tract-colors': tract_colors['Current asthma among adults aged greater than or equal to 18 years'], 'tract-only': false, 'legend-county': './key-images/county-keys/asthma.png', 'legend-tract': './key-images/tract-keys/asthma.png', 'county-triangle': './county-triangles/asthma.png', 'tract-triangle':'./tract-triangles/asthma.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 0.01, 'optional-pre': 'Asthma Rate: ', 'county-range': [752.511739514805,1368.1755762628738], 'tract-range': [490.0,2150.0]},  
"diabetes":{'name':'diabetes', 'layer-name': 'diabetes_adult', 'percentile-layer': 'diabetes_adult_pt', 'county-colors': county_colors_dictionary['Diagnosed diabetes among adults aged greater than or equal to 18 years'], 'tract-colors': tract_colors['Diagnosed diabetes among adults aged greater than or equal to 18 years'], 'tract-only': false, 'legend-county': './key-images/county-keys/diabetes.png', 'legend-tract': './key-images/tract-keys/diabetes.png', 'county-triangle': './county-triangles/diabetes.png', 'tract-triangle':'./tract-triangles/diabetes.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 0.01, 'optional-pre': 'Diabetes Rate: ', 'county-range': [498.72537316195184, 2418.4887073522345], 'tract-range': [70.0,4420.0]},  
"heart":{'name':'heart', 'layer-name': 'heart_adult', 'percentile-layer': 'heart_adult_pt', 'county-colors': county_colors_dictionary['Coronary heart disease among adults aged greater than or equal to 18 years'], 'tract-colors': tract_colors['Coronary heart disease among adults aged greater than or equal to 18 years'], 'tract-only': false, 'legend-county': './key-images/county-keys/heart.png', 'legend-tract': './key-images/tract-keys/heart.png', 'county-triangle': './county-triangles/heart.png', 'tract-triangle':'./tract-triangles/heart.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 0.01, 'optional-pre': 'Heart Disease: ', 'county-range': [307.02356251927495,1266.3533773980332], 'tract-range': [30.0,3710.0]},  
"life_expectancy":{'name':'life_expectancy', 'layer-name': 'life_expectancy', 'percentile-layer': 'low_life_expectancy_pt', 'county-colors': county_colors_dictionary['Life expectancy (years)'], 'tract-colors': tract_colors['Life expectancy (years)'], 'tract-only': false, 'legend-county': './key-images/county-keys/life_expectancy.png', 'legend-tract': './key-images/tract-keys/life_expectancy.png', 'county-triangle': './county-triangles/life_expectancy.png', 'tract-triangle':'./tract-triangles/life_expectancy.png', 'pre': '', 'post': ' years', 'round': 0, 'multiple': 1, 'optional-pre': 'Life Expect.: ', 'county-range': [17.536761363636366,89.5], 'tract-range': [56.3,97.5]},  
"hhinc_divided_area":{'name':'hhinc_divided_area', 'layer-name': 'hhinc_divided_by_area_income', 'percentile-layer': 'hhinc_area_income_pt', 'county-colors': county_colors_dictionary['Median household income as a percent of area median income'], 'tract-colors': tract_colors['Median household income as a percent of area median income'], 'tract-only': false, 'legend-county': './key-images/county-keys/relative_hhinc.png', 'legend-tract': './key-images/tract-keys/relative_hhinc.png', 'county-triangle': './county-triangles/relative_hhinc.png', 'tract-triangle':'./tract-triangles/relative_hhinc.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 1, 'optional-pre': 'Relative Income: ', 'county-range': [35.966923925027565,249.83924832214765], 'tract-range': [4.0,492.0]}, 
"linguistic_isolation":{'name':'linguistic_isolation', 'layer-name': 'linguistic_isolation', 'percentile-layer': 'linguistic_isolation_pt', 'county-colors': county_colors_dictionary['Linguistic isolation (percent)'], 'tract-colors': tract_colors['Linguistic isolation (percent)'], 'tract-only': false, 'legend-county': './key-images/county-keys/linguistic_isolation.png', 'legend-tract': './key-images/tract-keys/linguistic_isolation.png', 'county-triangle': './county-triangles/linguistic_isolation.png', 'tract-triangle':'./tract-triangles/linguistic_isolation.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 1, 'optional-pre': 'Isolated: ', 'county-range': [0.0,49.0], 'tract-range': [0.0,100.0]}, 
"unemployment":{'name':'unemployment', 'layer-name': 'unemployment_percent', 'percentile-layer': 'unemployment_pt', 'county-colors': county_colors_dictionary['Unemployment (percent)'], 'tract-colors': tract_colors['Unemployment (percent)'], 'tract-only': false, 'legend-county': './key-images/county-keys/unemployment.png', 'legend-tract': './key-images/tract-keys/unemployment.png', 'county-triangle': './county-triangles/unemployment.png', 'tract-triangle':'./tract-triangles/unemployment.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 1, 'optional-pre': 'Unemployment: ', 'county-range': [0.0,24.0], 'tract-range': [0.0,100.0]},  
"poor_200":{'name':'poor_200', 'layer-name': 'share_poor_200', 'percentile-layer': 'share_poor_200_pt', 'county-colors': county_colors_dictionary['Percent of individuals below 200 Federal Poverty Line'], 'tract-colors': tract_colors['Percent of individuals below 200 Federal Poverty Line'], 'tract-only': false, 'legend-county': './key-images/county-keys/poor_200.png', 'legend-tract': './key-images/tract-keys/poverty.png', 'county-triangle': './county-triangles/poor_200.png', 'tract-triangle':'./tract-triangles/poor_200.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 1, 'optional-pre': 'Poverty Rate: ', 'county-range': [6.847324462061155,74.13143697891122], 'tract-range': [0.0,100.0]},  
"poor_100":{'name':'poor_100', 'layer-name': 'share_poor_100', 'percentile-layer': 'share_poor_100_pt', 'county-colors': county_colors_dictionary['Percent of individuals < 100 Federal Poverty Line'], 'tract-colors': tract_colors['Percent of individuals < 100 Federal Poverty Line'], 'tract-only': false, 'legend-county': './key-images/county-keys/poor_100.png', 'legend-tract': './key-images/tract-keys/poor_100.png', 'county-triangle': './county-triangles/poor_100.png', 'tract-triangle':'./tract-triangles/poor_100.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 1, 'optional-pre': 'Poverty Rate: ', 'county-range': [2.0,54.94163805787151], 'tract-range': [0.0,100.0]},  
"less_than_hs":{'name':'less_than_hs', 'layer-name': 'less_than_hs', 'percentile-layer': 'less_than_hs_pt', 'county-colors': county_colors_dictionary['Percent individuals age 25 or over with less than high school degree'], 'tract-colors': tract_colors['Percent individuals age 25 or over with less than high school degree'], 'tract-only': false, 'legend-county': './key-images/county-keys/no_hs.png', 'legend-tract': './key-images/tract-keys/no_hs.png', 'county-triangle': './county-triangles/no_hs.png', 'tract-triangle':'./tract-triangles/no_hs.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 1, 'optional-pre': 'Low Education: ', 'county-range': [0.769464892412231,73.0], 'tract-range': [0.0,100.0]}, 
"not_in_higher_ed":{'name':'not_in_higher_ed', 'layer-name': 'share_not_in_higher_ed', 'percentile-layer': '', 'county-colors': county_colors_dictionary['Percent of residents who are not currently enrolled in higher ed'], 'tract-colors': tract_colors['Percent of residents who are not currently enrolled in higher ed'], 'tract-only': false, 'legend-tract': './key-images/tract-keys/no_higher_ed.png', 'legend-county': './key-images/county-keys/no_higher_ed.png', 'county-triangle': './county-triangles/not_enrolled.png', 'tract-triangle':'./tract-triangles/not_enrolled.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 1, 'optional-pre': 'Not in Higher Ed: ', 'county-range': [45.0, 100.0], 'tract-range': [0.0,100.0]},  
"unemployment_2010":{'name':'unemployment_2010', 'layer-name': 'unemployment_2010', 'percentile-layer': '', 'county-colors': county_colors_dictionary['Unemployment (percent) in 2009 (island areas) and 2010 (states and PR)'], 'tract-colors': tract_colors['Unemployment (percent) in 2009 (island areas) and 2010 (states and PR)'], 'tract-only': false, 'legend-county': './key-images/county-keys/unemployment_2010.png', 'legend-tract': './key-images/tract-keys/unemployment_2010.png', 'county-triangle': './county-triangles/unemployment_2010.png', 'tract-triangle':'./tract-triangles/unemployment_2010.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 1, 'optional-pre': '2010 Rate: ', 'county-range': [0.0,26.0], 'tract-range': [0.0,100.0]},  
"poor_2010":{'name':'poor_2010', 'layer-name': 'poverty_2010', 'percentile-layer': '', 'county-colors': county_colors_dictionary['Percentage households below 100 of federal poverty line in 2009 (island areas) and 2010 (states and PR)'], 'tract-colors': tract_colors['Percentage households below 100 of federal poverty line in 2009 (island areas) and 2010 (states and PR)'], 'tract-only': false, 'legend-county': './key-images/county-keys/poor_2010.png', 'legend-tract': './key-images/tract-keys/poor_2010.png', 'county-triangle': './county-triangles/poor_2010.png', 'tract-triangle':'./tract-triangles/poor_2010.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 1, 'optional-pre': '2010 Poverty: ', 'county-range': [0.0,49.0], 'tract-range': [0.0,100.0]},  
"percentage_tribal_area":{'name':'percentage_tribal_area', 'layer-name': 'percent_tract_tribal_area', 'percentile-layer': '', 'county-colors': county_colors_dictionary['Percent of the Census tract that is within Tribal areas'], 'tract-colors': tract_colors['Percent of the Census tract that is within Tribal areas'], 'tract-only': true, 'legend-county': './key-images/unavailable.png', 'legend-tract': './key-images/tract-keys/tribal.png', 'county-triangle': './county-triangles/tribal.png', 'tract-triangle':'./tract-triangles/tribal.png', 'pre': '', 'post': '%', 'round': 0, 'multiple': 1, 'optional-pre': '', 'county-range': [0.0,100.0], 'tract-range': [0.0,100.0]},  
"env_index":{'name':'env_index', 'layer-name': 'env_index', 'percentile-layer': '', 'county-colors': county_colors_dictionary['env_index'], 'tract-colors': tract_colors['env_index'], 'tract-only': false, 'pre': 'Risk Index: ', 'post': '', 'round': 0, 'multiple': 1, 'legend-county': './key-images/county-keys/env_index.png', 'legend-tract': './key-images/tract-keys/env_index.png', 'county-triangle': './county-triangles/env_index.png', 'tract-triangle':'./tract-triangles/env_index.png', 'optional-pre': '', 'county-range': [11.68252148,64.60417817], 'tract-range': [0.0,84.6]},
"has_fuds":{'name':'has_fuds', 'layer-name': 'has_fuds', 'percentile-layer': '', 'county-colors': county_colors_dictionary['has_fuds'], 'tract-colors': tract_colors['has_fuds'], 'tract-only': true, 'legend-tract': './key-images/has_fuds.png', 'legend-county': './key-images/unavailable.png', 'optional-pre': ''},
"has_mine":{'name':'has_mine', 'layer-name': 'has_mine_missing_data_is_false', 'percentile-layer': '', 'county-colors': county_colors_dictionary['has_mine'], 'tract-colors': tract_colors['has_mine'], 'tract-only': true, 'legend-tract': './key-images/has_mine.png', 'legend-county': './key-images/unavailable.png', 'optional-pre': ''},
"has_35_acres":{'name':'has_35_acres', 'layer-name': 'has_35_acres', 'percentile-layer': '', 'county-colors': county_colors_dictionary['has_35_acres'], 'tract-colors': tract_colors['has_35_acres'], 'tract-only': true, 'legend-tract': './key-images/has_25_acres.png', 'legend-county': './key-images/unavailable.png', 'optional-pre': ''},
"historic_underinvestment":{'name':'historic_underinvestment', 'layer-name': 'had_underinvestment', 'percentile-layer': '', 'county-colors': county_colors_dictionary['historic_underinvestment'], 'tract-colors': tract_colors['historic_underinvestment'], 'tract-only': true, 'legend-tract': './key-images/historic_underinvestment.png', 'legend-county': './key-images/unavailable.png', 'optional-pre': ''},
"is_low_income":{'name':'is_low_income', 'layer-name': 'is_low_income', 'percentile-layer': '', 'county-colors': county_colors_dictionary['is_low_income'], 'tract-colors': tract_colors['is_low_income'], 'tract-only': true, 'legend-tract': './key-images/is_low_income.png', 'legend-county': './key-images/unavailable.png', 'optional-pre': ''},
"income_from_neighbor":{'name':'income_from_neighbor', 'layer-name': 'income_based_on_neighbor', 'percentile-layer': '', 'county-colors': county_colors_dictionary['income_from_neighbor'], 'tract-colors': tract_colors['income_from_neighbor'], 'tract-only': true, 'legend-tract': './key-images/income_from_neighbor.png', 'legend-county': './key-images/unavailable.png', 'optional-pre': ''},
"disadvantaged":{'name':'disadvantaged', 'layer-name': 'is_disadvantaged', 'percentile-layer': '', 'county-colors': county_colors_dictionary['disadvantaged'], 'tract-colors': tract_colors['disadvantaged'], 'tract-only': true, 'legend-tract': './key-images/disadvantaged.png', 'legend-county': './key-images/unavailable.png', 'optional-pre': ''},
"disadvantaged_with_neighbors":{'disadvantaged_with_neighbors':'has_35_acres', 'layer-name': 'is_disadvantaged_neighbors', 'percentile-layer': '', 'county-colors': county_colors_dictionary['disadvantaged_with_neighbors'], 'tract-colors': tract_colors['disadvantaged_with_neighbors'], 'tract-only': true, 'legend-tract': './key-images/disadvantaged_with_neighbors.png', 'legend-county': './key-images/unavailable.png', 'optional-pre': ''},
"disadvantaged_without_neighbors":{'name':'disadvantaged_without_neighbors', 'layer-name': 'is_disadvantaged_alone', 'percentile-layer': '', 'county-colors': county_colors_dictionary['disadvantaged_without_neighbors'], 'tract-colors': tract_colors['disadvantaged_without_neighbors'], 'tract-only': true, 'legend-tract': './key-images/disadvantaged_without_neighbors.png', 'legend-county': './key-images/unavailable.png', 'optional-pre': ''},
"disadvanted_tribal":{'name':'disadvanted_tribal', 'layer-name': 'is_disadvantaged_tribal', 'percentile-layer': '', 'county-colors': county_colors_dictionary['disadvanted_tribal'], 'tract-colors': tract_colors['disadvanted_tribal'], 'tract-only': true, 'legend-tract': './key-images/disadvantaged_tribal.png', 'legend-county': './key-images/unavailable.png', 'optional-pre': ''},
"th_25_inc":{'name':'th_25_inc', 'layer-name': 'th_25_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_25_inc'], 'tract-colors': tract_colors['th_25_inc'], 'tract-only': true, 'legend-tract': './key-images/th_25_inc.png', 'legend-county': './key-images/unavailable.png', 'optional-pre': ''},
"th_ag_inc":{'name':'th_ag_inc', 'layer-name': 'th_ag_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_ag_inc'], 'tract-colors': tract_colors['th_ag_inc'], 'tract-only': true, 'legend-tract': './key-images/th_ag_inc.png', 'legend-county': './key-images/unavailable.png', 'optional-pre': ''},
"th_asthma_inc":{'name':'th_asthma_inc', 'layer-name': 'th_asthma_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_asthma_inc'], 'tract-colors': tract_colors['th_asthma_inc'], 'tract-only': true, 'legend-tract': './key-images/th_asthma_inc.png', 'legend-county': './key-images/unavailable.png', 'optional-pre': ''},
"th_barriers_inc":{'name':'th_barriers_inc', 'layer-name': 'th_barriers_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_barriers_inc'], 'tract-colors': tract_colors['th_barriers_inc'], 'tract-only': true, 'legend-tract': './key-images/th_barriers_inc.png', 'legend-county': './key-images/unavailable.png', 'optional-pre': ''},
"th_building_inc":{'name':'th_building_inc', 'layer-name': 'th_building_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_building_inc'], 'tract-colors': tract_colors['th_building_inc'], 'tract-only': true, 'legend-tract': './key-images/th_building_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_diabetes_inc":{'name':'th_diabetes_inc', 'layer-name': 'th_diabetes_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_diabetes_inc'], 'tract-colors': tract_colors['th_diabetes_inc'], 'tract-only': true, 'legend-tract': './key-images/th_diabetes_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_diesel_inc":{'name':'th_diesel_inc', 'layer-name': 'th_diesel_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_diesel_inc'], 'tract-colors': tract_colors['th_diesel_inc'], 'tract-only': true, 'legend-tract': './key-images/th_diesel_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_energy_inc":{'name':'th_energy_inc', 'layer-name': 'th_energy_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_energy_inc'], 'tract-colors': tract_colors['th_energy_inc'], 'tract-only': true, 'legend-tract': './key-images/th_energy_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_fire":{'name':'th_fire', 'layer-name': 'th_fire', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_fire'], 'tract-colors': tract_colors['th_fire'], 'tract-only': true, 'legend-tract': './key-images/th_fire.png', 'legend-county': './key-images/unavailable.png'},
"th_fire_inc":{'name':'th_fire_inc', 'layer-name': 'th_fire_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_fire_inc'], 'tract-colors': tract_colors['th_fire_inc'], 'tract-only': true, 'legend-tract': './key-images/th_fire_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_flood":{'name':'th_flood', 'layer-name': 'th_flood', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_flood'], 'tract-colors': tract_colors['th_flood'], 'tract-only': true, 'legend-tract': './key-images/th_flood.png', 'legend-county': './key-images/unavailable.png'},
"th_flood_inc":{'name':'th_flood_inc', 'layer-name': 'th_flood_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_flood_inc'], 'tract-colors': tract_colors['th_flood_inc'], 'tract-only': true, 'legend-tract': './key-images/th_flood_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_fuds_inc":{'name':'th_fuds_inc', 'layer-name': 'th_fuds_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_fuds_inc'], 'tract-colors': tract_colors['th_fuds_inc'], 'tract-only': true, 'legend-tract': './key-images/th_fuds_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_heart_inc":{'name':'th_heart_inc', 'layer-name': 'th_heart_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_heart_inc'], 'tract-colors': tract_colors['th_heart_inc'], 'tract-only': true, 'legend-tract': './key-images/th_heart_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_hhinc_area_hs_attainment":{'name':'th_hhinc_area_hs_attainment', 'layer-name': 'th_hhinc_area_hs_attainment', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_hhinc_area_hs_attainment'], 'tract-colors': tract_colors['th_hhinc_area_hs_attainment'], 'tract-only': true, 'legend-tract': './key-images/th_hhinc_area_hs_attainment.png', 'legend-county': './key-images/unavailable.png'},
"th_hhinc_area_hs_attainment_2010":{'name':'th_hhinc_area_hs_attainment_2010', 'layer-name': '', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_hhinc_area_hs_attainment_2010'], 'tract-colors': tract_colors['th_hhinc_area_hs_attainment_2010'], 'tract-only': true, 'legend-tract': './key-images/th_hhinc_area_hs_attainment_2010.png', 'legend-county': './key-images/unavailable.png'},
"th_housing_burden_inc":{'name':'th_housing_burden_inc', 'layer-name': 'th_housing_burden_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_housing_burden_inc'], 'tract-colors': tract_colors['th_housing_burden_inc'], 'tract-only': true, 'legend-tract': './key-images/th_housing_burden_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_impervious":{'name':'th_impervious', 'layer-name': 'th_impervious', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_impervious'], 'tract-colors': tract_colors['th_impervious'], 'tract-only': true, 'legend-tract': './key-images/th_impervious.png', 'legend-county': './key-images/unavailable.png'},
"th_impervious_inc":{'name':'th_impervious_inc', 'layer-name': 'th_impervious_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_impervious_inc'], 'tract-colors': tract_colors['th_impervious_inc'], 'tract-only': true, 'legend-tract': './key-images/th_impervious_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_lead_house_value_inc":{'name':'th_lead_house_value_inc', 'layer-name': 'th_lead_house_value_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_lead_house_value_inc'], 'tract-colors': tract_colors['th_lead_house_value_inc'], 'tract-only': true, 'legend-tract': './key-images/th_lead_house_value_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_life_expectancy_inc":{'name':'th_life_expectancy_inc', 'layer-name': 'th_life_expectancy_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_life_expectancy_inc'], 'tract-colors': tract_colors['th_life_expectancy_inc'], 'tract-only': true, 'legend-tract': './key-images/th_life_expectancy_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_linguistic_isolation_hs_attainment":{'name':'th_linguistic_isolation_hs_attainment', 'layer-name': 'th_linguistic_isolation_hs_attainment', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_linguistic_isolation_hs_attainment'], 'tract-colors': tract_colors['th_linguistic_isolation_hs_attainment'], 'tract-only': true, 'legend-tract': './key-images/th_linguistic_isolation_hs_attainment.png', 'legend-county': './key-images/unavailable.png'},
"th_mine_inc":{'name':'th_mine_inc', 'layer-name': 'th_mine_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_mine_inc'], 'tract-colors': tract_colors['th_mine_inc'], 'tract-only': true, 'legend-tract': './key-images/th_mine_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_poor_100_hs_attainment":{'name':'th_poor_100_hs_attainment', 'layer-name': 'th_poor_100_hs_attainment', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_poor_100_hs_attainment'], 'tract-colors': tract_colors['th_poor_100_hs_attainment'], 'tract-only': true, 'legend-tract': './key-images/th_poor_100_hs_attainment.png', 'legend-county': './key-images/unavailable.png'},
"th_pop_inc":{'name':'th_pop_inc', 'layer-name': 'th_pop_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_pop_inc'], 'tract-colors': tract_colors['th_pop_inc'], 'tract-only': true, 'legend-tract': './key-images/th_pop_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_poverty_100_hs_attainment_2010":{'name':'th_poverty_100_hs_attainment_2010', 'layer-name': 'th_poverty_100_hs_attainment_2010', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_poverty_100_hs_attainment_2010'], 'tract-colors': tract_colors['th_poverty_100_hs_attainment_2010'], 'tract-only': true, 'legend-tract': './key-images/th_poverty_100_hs_attainment_2010.png', 'legend-county': './key-images/unavailable.png'},
"th_rmp_inc":{'name':'th_rmp_inc', 'layer-name': 'th_rmp_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_rmp_inc'], 'tract-colors': tract_colors['th_rmp_inc'], 'tract-only': true, 'legend-tract': './key-images/th_rmp_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_storage_inc":{'name':'th_storage_inc', 'layer-name': 'th_storage_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_storage_inc'], 'tract-colors': tract_colors['th_storage_inc'], 'tract-only': true, 'legend-tract': './key-images/th_storage_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_superfund_inc":{'name':'th_superfund_inc', 'layer-name': 'th_superfund_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_superfund_inc'], 'tract-colors': tract_colors['th_superfund_inc'], 'tract-only': true, 'legend-tract': './key-images/th_superfund_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_traffic_inc":{'name':'th_traffic_inc', 'layer-name': 'th_traffic_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_traffic_inc'], 'tract-colors': tract_colors['th_traffic_inc'], 'tract-only': true, 'legend-tract': './key-images/th_traffic_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_underinvestment_inc":{'name':'th_underinvestment_inc', 'layer-name': 'th_underinvestment_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_underinvestment_inc'], 'tract-colors': tract_colors['th_underinvestment_inc'], 'tract-only': true, 'legend-tract': './key-images/th_underinvestment_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_unemployment_hs_attainment":{'name':'th_unemployment_hs_attainment', 'layer-name': 'th_unemployment_hs_attainment', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_unemployment_hs_attainment'], 'tract-colors': tract_colors['th_unemployment_hs_attainment'], 'tract-only': true, 'legend-tract': './key-images/th_unemployment_hs_attainment.png', 'legend-county': './key-images/unavailable.png'},
"th_unemployment_hs_attainment_2010":{'name':'th_unemployment_hs_attainment_2010', 'layer-name': 'th_unemployment_hs_attainment_2010', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_unemployment_hs_attainment_2010'], 'tract-colors': tract_colors['th_unemployment_hs_attainment_2010'], 'tract-only': true, 'legend-tract': './key-images/th_unemployment_hs_attainment_2010.png', 'legend-county': './key-images/unavailable.png'},
"th_waste_inc":{'name':'th_waste_inc', 'layer-name': 'th_waste_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_waste_inc'], 'tract-colors': tract_colors['th_waste_inc'], 'tract-only': true,'legend-tract': './key-images/th_waste_inc.png', 'legend-county': './key-images/unavailable.png'},
"th_wastewater_inc":{'name':'th_wastewater_inc', 'layer-name': 'th_wastewater_inc', 'percentile-layer': '', 'county-colors': county_colors_dictionary['th_wastewater_inc'], 'tract-colors': tract_colors['th_wastewater_inc'], 'tract-only': true, 'legend-tract': './key-images/th_wastewater_inc.png', 'legend-county': './key-images/unavailable.png'}
}

const blankPoints = {
'type': 'FeatureCollection',
'features': []
}

