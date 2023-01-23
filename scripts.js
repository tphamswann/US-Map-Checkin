window.onload = function() {
    var div1 = document.getElementById("div1");
    var firstRadio = div1.getElementsByTagName("input")[0];
    firstRadio.checked = true;
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
      div1.style.display = "block";
    } else if (selected === "2env-health") {
      div2.style.display = "block";
    } else if (selected === "3soc-econ") {
      div3.style.display = "block";
    } else if (selected === "4pub-health") {
      div4.style.display = "block";
    } else if (selected === "5clim-risk") {
      div5.style.display = "block";
    } else if (selected === "6econ") {
      div6.style.display = "block";
    } else if (selected === "7demo") {
      div7.style.display = "block";
    } else if (selected === "8cejs-status") {
      div8.style.display = "block";
    } else if (selected === "9thresh-1") {
      div9.style.display = "block";
    } else if (selected === "10thresh-2") {
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

});



function colorSwitch(layer){
map.setPaintProperty('countyLayer', 'fill-color', layer['county-colors']) 
map.setPaintProperty('tractLayer', 'fill-color', layer['tract-colors']) 

}

map.on('zoom', () => {
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
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

map.on('click', 'countyLayer', (e) => { 
  
  if (map.getZoom() < 10){
    var bounds = map.queryRenderedFeatures(e.point)[0].geometry.coordinates;
    tractPolygon = turf.polygon(bounds)
    mbVersion = new mapboxgl.LngLat(turf.centerOfMass(tractPolygon).geometry.coordinates[0]+ 0, turf.centerOfMass(tractPolygon).geometry.coordinates[1])
    let area = map.queryRenderedFeatures(e.point)[0].properties['ALAND']
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

    if (highlightOn == true && highlightedLayer == map.queryRenderedFeatures(e.point)[0].properties['GEOID']){
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
          map.queryRenderedFeatures(e.point)[0].properties['GEOID']
          ]);
          map.setFilter('countyOutlineInner', [
            'in',
            'GEOID',
            map.queryRenderedFeatures(e.point)[0].properties['GEOID']
            ]);
        }
      highlightedLayer = (map.queryRenderedFeatures(e.point)[0].properties['GEOID'])
      highlightOn = true;
  }
});
map.on('click', 'tractLayer', (e) => { 

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
    } else {
      tractSelected = true
      map.setFilter('tractOutlines', [
        'in',
        'GEOID',
        map.queryRenderedFeatures(e.point)[0].properties['GEOID']
        ]);
        map.setFilter('tractOutlineInner', [
          'in',
          'GEOID',
          map.queryRenderedFeatures(e.point)[0].properties['GEOID']
          ]);
    highlightedLayer = (map.queryRenderedFeatures(e.point)[0].properties['GEOID'])
    highlightOn = true;
    }
  }
});

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//Below Here is where all the color fills will be:

const county_colors_dictionary = {'day': ['interpolate',['linear'],['get','heat'],0.007789743095204235,'#313695',0.7153913680410227,'#4575b4',1.392383223641127,'#abd9e9',2.078345535133533,'#e0f3f8',2.807044483530952,'#fee090',3.698324652782635,'#fdae61',4.764807076089621,'#f46d43',6.126092319567801,'#d73027',7.914438114585207,'#d73027',10.732900814343884,'#a50026'], 

'Income': ['interpolate',['linear'],['get','income'],8090.0,'#a50026',18378.132711321545,'#d73027',21325.34073343723,'#f46d43',23840.365205843293,'#fdae61',26416.461668355285,'#fee090',29474.694762541418,'#e0f3f8',33505.891908305784,'#abd9e9',38751.40418650067,'#74add1',47847.42655788599,'#4575b4',61188.081849878356,'#313695'], 

'Housing': ['interpolate',['linear'],['get','rent'],274.0,'#313695',530.295279668541,'#4575b4',640.0799335425512,'#abd9e9',754.5057200811359,'#e0f3f8',885.0524253179533,'#fee090',1034.2352024922118,'#fdae61',1214.7593950880282,'#f46d43',1450.4909015715468,'#d73027',1788.2914652215156,'#d73027',2465.2518107781157,'#a50026'], 

'share_black': ['interpolate',['linear'],['get','share_black'],0.0,'#Fcfcbf',0.028522204671577744,'#Fed99e',0.0808214042263122,'#Fdb480',0.15073139930543375,'#Fb8d67',0.2313247677872601,'#Ec6966',0.31212146743900293,'#D14b6c',0.39723608160845725,'#Ac337c',0.5025790160585599,'#81257b',0.6453716148779026,'#571a72',0.8694894927934868,'#2d1160'], 

'share_natam': ['interpolate',['linear'],['get','share_native'],0.0,'#Fcfcbf',0.009195328335639137,'#Fed99e',0.03398220826792256,'#Fdb480',0.07507631230701367,'#Fb8d67',0.12540248086566377,'#Ec6966',0.1813258897418004,'#D14b6c',0.29339761570827494,'#Ac337c',0.4381908190819082,'#81257b',0.6880722891566265,'#571a72',0.8725551741049533,'#2d1160'], 

'share_asian': ['interpolate',['linear'],['get','share_asian'],0.0,'#Fcfcbf',0.004534159831137948,'#Fed99e',0.013704493177740043,'#Fdb480',0.027808240525844175,'#Fb8d67',0.04831096929208434,'#Ec6966',0.08008673396843452,'#D14b6c',0.1250841787698734,'#Ac337c',0.18084475140079062,'#81257b',0.2479164960456818,'#571a72',0.3596216542929332,'#2d1160'], 

'share_pacific': ['interpolate',['linear'],['get','share_hawaiin'],0.0,'#Fcfcbf',0.0004056932610379551,'#Fed99e',0.0013410291341029133,'#Fdb480',0.002623970279437894,'#Fb8d67',0.004087562640489988,'#Ec6966',0.006211588646286233,'#D14b6c',0.008722104118387487,'#Ac337c',0.013481171548117154,'#81257b',0.020653496291257872,'#571a72',0.03410045558822579,'#2d1160'], 

'share_mixed': ['interpolate',['linear'],['get','share_mixed'],0.0,'#Fcfcbf',0.005729003964916497,'#Fed99e',0.012280779873413696,'#Fdb480',0.01862649897630886,'#Fb8d67',0.02650425870862076,'#Ec6966',0.03748109365910413,'#D14b6c',0.05324869914111968,'#Ac337c',0.07765571319923423,'#81257b',0.11604299465792664,'#571a72',0.17397324656543744,'#2d1160'], 

'share_white': ['interpolate',['linear'],['get','share_white'],0.0047027060769686945,'#Fcfcbf',0.2096174863387978,'#Fed99e',0.3630735239965632,'#Fdb480',0.48444123561697683,'#Fb8d67',0.5924058140506223,'#Ec6966',0.6853045006494997,'#D14b6c',0.7770225718194256,'#Ac337c',0.8538796244035096,'#81257b',0.9149920025591811,'#571a72',0.9948867159551634,'#2d1160'], 

'share_hisp': ['interpolate',['linear'],['get','share_hispanic'],0.0,'#Fcfcbf',0.03660100286532952,'#Fed99e',0.08580459770114943,'#Fdb480',0.15926348137697074,'#Fb8d67',0.25205244041272884,'#Ec6966',0.3604070529946083,'#D14b6c',0.4802956516490808,'#Ac337c',0.6118798397863819,'#81257b',0.7703799841372847,'#571a72',0.987817035487999,'#2d1160'], 

'share_other': ['interpolate',['linear'],['get','share_other'],0.0,'#Fcfcbf',0.008197447251888512,'#Fed99e',0.022908313285217856,'#Fdb480',0.044570797212306654,'#Fb8d67',0.07537305958938408,'#Ec6966',0.12000000000000001,'#D14b6c',0.182708539382017,'#Ac337c',0.27015475369646824,'#81257b',0.36,'#571a72',0.55,'#2d1160'], 

'share_kid': ['interpolate',['linear'],['get','share_child'],0.030654089760404336,'#313695',0.07465972661380552,'#4575b4',0.09285398606153324,'#abd9e9',0.10521156430844657,'#e0f3f8',0.11536870167955213,'#fee090',0.12512261749549886,'#fdae61',0.13676493792301625,'#f46d43',0.15241714641356777,'#d73027',0.17490098823774392,'#d73027',0.24000000000000002,'#a50026'], 

'share_adult': ['interpolate',['linear'],['get','share_adult'],0.392116694923387,'#313695',0.5600093683849191,'#4575b4',0.6136410476599399,'#abd9e9',0.6430582524271844,'#e0f3f8',0.6657224915239989,'#fee090',0.6846893813244525,'#fdae61',0.7030761951279075,'#f46d43',0.723826164728309,'#d73027',0.7530797339156879,'#d73027',0.8460612740941722,'#a50026'], 

'share_sr': ['interpolate',['linear'],['get','share_senior'],0.031059659090909093,'#313695',0.11477054845635427,'#4575b4',0.14239062640558936,'#abd9e9',0.1648458494693121,'#e0f3f8',0.1855471207355432,'#fee090',0.2076895479550347,'#fdae61',0.23547956515756158,'#f46d43',0.27239662072032017,'#d73027',0.325970335954253,'#d73027',0.5618616646940278,'#a50026'], 

'thresh_exceeded': ['interpolate',['linear'],['get','thresholds_exceeded'],0.0,'#313695',0.39054884509429966,'#4575b4',0.9743737402821768,'#abd9e9',1.6160683525115414,'#e0f3f8',2.441709554710226,'#fee090',3.457111686894859,'#fdae61',4.639455782312925,'#f46d43',6.157208296220893,'#d73027',8.418522860492379,'#d73027',12.0,'#a50026'], 

'cat_exceeded': ['interpolate',['linear'],['get','categories_exceeded'],0.0,'#313695',0.2534092776165179,'#4575b4',0.6503590485809032,'#abd9e9',1.070756361101429,'#e0f3f8',1.5511838140335772,'#fee090',2.0929016189290164,'#fdae61',2.6999119115200156,'#f46d43',3.4298887122416533,'#d73027',4.3432713168102035,'#d73027',7.0,'#a50026'], 

'percent_disadvantaged': ['interpolate',['linear'],['get','area_percent_disadvantaged'],0.0,'#313695',5.86412982412961,'#4575b4',17.271171796913382,'#abd9e9',28.999326503846017,'#e0f3f8',40.084158030078704,'#fee090',50.890429145645825,'#fdae61',62.4539404938679,'#f46d43',75.06134969325153,'#d73027',90.3873758303806,'#d73027',100.0,'#a50026'], 

'share_neighbors_disadvantaged': ['interpolate',['linear'],['get','share_neighbors_disadvantaged'],0.0,'#313695',8.425344041466655,'#4575b4',18.860212069061234,'#abd9e9',29.568691182584377,'#e0f3f8',40.63693350167816,'#fee090',51.96781354051054,'#fdae61',63.998629336235915,'#f46d43',76.57702369109465,'#d73027',89.66921985815603,'#d73027',100.0,'#a50026'], 

'total_pop': ['interpolate',['linear'],['get','total_population'],237.0,'#313695',94793.0,'#4575b4',291165.0,'#abd9e9',621690.0,'#e0f3f8',1074475.0,'#fee090',1656754.0,'#fdae61',2475492.0,'#f46d43',3314006.0,'#d73027',5198275.0,'#d73027',10073612.0,'#a50026'], 

'adjusted_poverty_200': ['interpolate',['linear'],['get','adjusted_poor_200'],0.0,'#313695',0.13011348833537284,'#4575b4',0.19312699425654115,'#abd9e9',0.2426439704675964,'#e0f3f8',0.2877647147486623,'#fee090',0.3364287128059643,'#fdae61',0.3901298909557408,'#f46d43',0.45115162274113524,'#d73027',0.529879638291238,'#d73027',0.7013143697891123,'#a50026'], 

'ag_loss': ['interpolate',['linear'],['get','ag_loss_rate'],0.0,'#313695',0.43301705218887393,'#4575b4',1.0866961865527798,'#abd9e9',2.179745732406603,'#e0f3f8',4.058648363189813,'#fee090',7.009594293719969,'#fdae61',12.196240948491676,'#f46d43',19.893150433897674,'#d73027',29.637788495770504,'#d73027',39.8912,'#a50026'], 

'building_loss': ['interpolate',['linear'],['get','building_loss_rate'],0.0003105651566184093,'#313695',0.02694510399271292,'#4575b4',0.05605149952907352,'#abd9e9',0.09541409684065934,'#e0f3f8',0.1549,'#fee090',0.25102298025134645,'#fdae61',0.38260401052242937,'#f46d43',0.5199240509041049,'#d73027',0.8259218282590084,'#d73027',1.5242,'#a50026'], 

'pop_loss': ['interpolate',['linear'],['get','pop_loss_rate'],0.0,'#313695',0.0004482822928936004,'#4575b4',0.000924990668159761,'#abd9e9',0.0016078001469507716,'#e0f3f8',0.0029,'#fee090',0.005188619881736026,'#fdae61',0.008987538659793815,'#f46d43',0.0182,'#d73027',0.0439,'#d73027',0.0764,'#a50026'], 

'flood_risk': ['interpolate',['linear'],['get','flood_risk'],0.0,'#313695',6.392230854605994,'#4575b4',9.617007913578696,'#abd9e9',13.264796087533156,'#e0f3f8',18.219135802469136,'#fee090',25.158313169720014,'#fdae61',35.55110041265475,'#f46d43',51.13671223741247,'#d73027',74.09152801757966,'#d73027',99.40963126269831,'#a50026'], 

'Share of properties at risk of fire in 30 years': ['interpolate',['linear'],['get','fire_risk'],0.0,'#313695',4.756285752294798,'#4575b4',14.253777121435874,'#abd9e9',26.0,'#e0f3f8',38.49006801495428,'#fee090',50.446878163579235,'#fdae61',61.868816038065916,'#f46d43',73.68800663550256,'#d73027',85.48849945235487,'#d73027',98.6033288590604,'#a50026'], 

'Energy burden': ['interpolate',['linear'],['get','energy_burden'],0.0,'#313695',1.8738391022026593,'#4575b4',2.618793168279602,'#abd9e9',3.247702045100347,'#e0f3f8',3.857717041800643,'#fee090',4.560770356572645,'#fdae61',5.430746076112664,'#f46d43',6.786467679110683,'#d73027',9.21499878256635,'#d73027',13.0,'#a50026'], 

'PM2.5 in the air': ['interpolate',['linear'],['get','pollution_25'],4.03,'#313695',5.469296641462986,'#4575b4',6.359551136127691,'#abd9e9',7.125664247533789,'#e0f3f8',7.821961106947295,'#fee090',8.461855849730144,'#fdae61',9.108219033829144,'#f46d43',10.351103710365457,'#d73027',12.70829715817798,'#d73027',16.305040246980933,'#a50026'], 

'Diesel particulate matter exposure': ['interpolate',['linear'],['get','diesel_exposure'],0.0,'#313695',0.05769950218735858,'#4575b4',0.10049867899603698,'#abd9e9',0.14183893305975895,'#e0f3f8',0.19301856979473905,'#fee090',0.26097995545657016,'#fdae61',0.35676712050955933,'#f46d43',0.49442894228913326,'#d73027',0.7455200184868711,'#d73027',1.474493850580702,'#a50026'], 

'Traffic proximity and volume': ['interpolate',['linear'],['get','traffic_proximity'],0.0,'#313695',78.3020584908709,'#4575b4',192.1214736071315,'#abd9e9',351.3412484728308,'#e0f3f8',611.6275468176804,'#fee090',1064.5770339967642,'#fdae61',1681.5283892507814,'#f46d43',2474.4680182811912,'#d73027',3628.121835283961,'#d73027',6896.494788284379,'#a50026'], 

'DOT Travel Barriers Score (percentile)': ['interpolate',['linear'],['get','travel_barriers_pt'],3.0,'#313695',24.33107042887938,'#4575b4',36.29465846747453,'#abd9e9',45.733597128922426,'#e0f3f8',54.560786084681624,'#fee090',63.18816591506021,'#fdae61',71.59917041133771,'#f46d43',79.84870967741935,'#d73027',87.84851586489253,'#d73027',99.0,'#a50026'], 

'Housing burden (percent)': ['interpolate',['linear'],['get','housing_burden'],1.0,'#313695',11.432447097124253,'#4575b4',14.779803166452718,'#abd9e9',17.22649388737468,'#e0f3f8',19.460289057123195,'#fee090',21.73262079847569,'#fdae61',24.40181578888666,'#f46d43',27.898342059336823,'#d73027',33.18262882269,'#d73027',50.82352072046718,'#a50026'], 

'Percent pre-1960s housing (lead paint indicator)': ['interpolate',['linear'],['get','lead_paint'],1.1744268933335729,'#313695',10.781385834824853,'#4575b4',17.169424262775504,'#abd9e9',23.16769784410182,'#e0f3f8',29.668106599322122,'#fee090',36.42156862745098,'#fdae61',43.03210222845566,'#f46d43',50.16657920055978,'#d73027',58.34845154845155,'#d73027',76.19659348290251,'#a50026'], 

'Median value ($) of owner-occupied housing units': ['interpolate',['linear'],['get','house_value'],16891.676136363636,'#313695',100163.8989169675,'#4575b4',137482.0814356604,'#abd9e9',182521.62411933547,'#e0f3f8',239756.32185877065,'#fee090',316497.36221265123,'#fdae61',439548.00842589047,'#f46d43',610506.967533192,'#d73027',866518.9046391753,'#d73027',1166960.7226898281,'#a50026'], 

"Share of the tract's land area that is covered by impervious surface or cropland as a percent": ['interpolate',['linear'],['get','impervious_surface'],15.0,'#313695',674.4452572676403,'#4575b4',1394.236607142857,'#abd9e9',2187.2495384270537,'#e0f3f8',3028.761290926683,'#fee090',3918.914545684178,'#fdae61',4868.886130849718,'#f46d43',5942.465358931552,'#d73027',7149.6603385356,'#d73027',9260.648380776765,'#a50026'], 

'Share of homes with no kitchen or indoor plumbing (percent)': ['interpolate',['linear'],['get','no_kitchen_plumbing'],0.0,'#313695',0.002054158405509757,'#4575b4',0.005199361773910644,'#abd9e9',0.008413611196322876,'#e0f3f8',0.012525165749881969,'#fee090',0.01800520059435364,'#fdae61',0.026781658224473474,'#f46d43',0.04114111829593001,'#d73027',0.06585081585081586,'#d73027',0.1375953982846284,'#a50026'], 

'Proximity to hazardous waste sites': ['interpolate',['linear'],['get','waste_proximity'],0.0,'#313695',0.22401562649947213,'#4575b4',0.6069358608893957,'#abd9e9',1.1436447972882566,'#e0f3f8',1.8224087811450036,'#fee090',2.7795309916923654,'#fdae61',4.2382543303458435,'#f46d43',6.84953184636585,'#d73027',11.708891101108035,'#d73027',18.86390119670698,'#a50026'], 

'Proximity to NPL (Superfund) sites': ['interpolate',['linear'],['get','superfund_proximity'],0.0,'#313695',0.02367040141866839,'#4575b4',0.06514108410903564,'#abd9e9',0.122758631652572,'#e0f3f8',0.19497046819944738,'#fee090',0.2862879554031721,'#fdae61',0.42759407542629546,'#f46d43',0.618841188602857,'#d73027',0.8777781068009082,'#d73027',1.2637956018812764,'#a50026'], 

'Proximity to Risk Management Plan (RMP) facilities': ['interpolate',['linear'],['get','rmp_proximity'],0.0,'#313695',0.15412436167017124,'#4575b4',0.35363201094391244,'#abd9e9',0.5788623808476099,'#e0f3f8',0.8337478924432434,'#fee090',1.1292715299454885,'#fdae61',1.4718286755771566,'#f46d43',1.9004240282685516,'#d73027',2.5,'#d73027',4.059209120057,'#a50026'], 

'Wastewater discharge': ['interpolate',['linear'],['get','wastewater'],0.0,'#313695',2.586792029022986,'#4575b4',10.209441449104691,'#abd9e9',25.248585261416444,'#e0f3f8',59.12553257251545,'#fee090',110.53017240676584,'#fdae61',210.8097034175796,'#f46d43',630.0512925050417,'#d73027',1014.3874867571835,'#d73027',1478.9205953877367,'#a50026'], 

'Leaky underground storage tanks': ['interpolate',['linear'],['get','storage_tanks'],0.0,'#313695',0.6220470697891181,'#4575b4',1.4787422544495719,'#abd9e9',2.5672916382352367,'#e0f3f8',4.033062852281186,'#fee090',6.417729606025287,'#fdae61',10.617963614088822,'#f46d43',16.12189648764771,'#d73027',24.698939394841922,'#d73027',42.98716055851193,'#a50026'], 

'Current asthma among adults aged greater than or equal to 18 years': ['interpolate',['linear'],['get','asmtha_adult'],752.511739514805,'#313695',841.5378551205702,'#4575b4',891.4134092282893,'#abd9e9',937.2249981869606,'#e0f3f8',978.2834149755073,'#fee090',1017.9866716726112,'#fdae61',1057.0262378687603,'#f46d43',1103.355787179279,'#d73027',1175.2974548556804,'#d73027',1368.1755762628738,'#a50026'], 

'Diagnosed diabetes among adults aged greater than or equal to 18 years': ['interpolate',['linear'],['get','diabetes_adult'],498.72537316195184,'#313695',771.7635479413037,'#4575b4',929.4938406340166,'#abd9e9',1057.119465168104,'#e0f3f8',1176.4509927049173,'#fee090',1305.2741738540556,'#fdae61',1445.7026681735542,'#f46d43',1613.8914123616887,'#d73027',1875.0664893617022,'#d73027',2418.4887073522345,'#a50026'], 

'Coronary heart disease among adults aged greater than or equal to 18 years': ['interpolate',['linear'],['get','heart_adult'],307.02356251927495,'#313695',464.751411487243,'#4575b4',556.9734723781613,'#abd9e9',634.6020308193779,'#e0f3f8',701.540192926045,'#fee090',764.5069814308334,'#fdae61',829.2871240601504,'#f46d43',902.8705773052208,'#d73027',1005.1335193304105,'#d73027',1266.3533773980332,'#a50026'], 

'Life expectancy (years)': ['interpolate',['linear'],['get','low_life_expectancy_pt'],17.536761363636366,'#313695',31.65391366765637,'#4575b4',50.97803117994701,'#abd9e9',60.29286789125643,'#e0f3f8',67.07654593792851,'#fee090',71.87793024028562,'#fdae61',75.22415356832319,'#f46d43',77.80875314477396,'#d73027',80.65056090577824,'#d73027',89.5,'#a50026'], 

'Median household income as a percent of area median income': ['interpolate',['linear'],['get','hhinc_divided_by_area_income'],35.966923925027565,'#313695',61.45648277884584,'#4575b4',73.06112214968303,'#abd9e9',81.91134955244435,'#e0f3f8',90.66393046837277,'#fee090',99.83213354560347,'#fdae61',110.31588227750706,'#f46d43',125.41335541945968,'#d73027',148.09538648086843,'#d73027',249.83924832214765,'#a50026'], 

'Linguistic isolation (percent)': ['interpolate',['linear'],['get','linguistic_isolation'],0.0,'#313695',0.6013869382022472,'#4575b4',1.6881593017542846,'#abd9e9',3.3222380060696066,'#e0f3f8',5.577018974201949,'#fee090',8.517084838426243,'#fdae61',12.192004528012776,'#f46d43',18.879452893742982,'#d73027',28.76405201342282,'#d73027',49.0,'#a50026'], 

'Unemployment (percent)': ['interpolate',['linear'],['get','unemployment_percent'],0.0,'#313695',1.8039716312056737,'#4575b4',3.226762158357053,'#abd9e9',4.452212189242709,'#e0f3f8',5.729756949107023,'#fee090',7.240464811170462,'#fdae61',9.176563737133808,'#f46d43',12.094480615566736,'#d73027',17.258901413490786,'#d73027',24.0,'#a50026'], 

'Percent of individuals below 200 Federal Poverty Line': ['interpolate',['linear'],['get','share_poor_200'],6.847324462061155,'#313695',19.45873786407767,'#4575b4',25.541054101734783,'#abd9e9',30.17928739444639,'#e0f3f8',34.33543752108874,'#fee090',38.57540294323756,'#fdae61',43.23468611570988,'#f46d43',48.84523081016363,'#d73027',56.739425379090186,'#d73027',74.13143697891122,'#a50026'], 

'Percent of individuals < 100 Federal Poverty Line': ['interpolate',['linear'],['get','share_poor_100'],2.0,'#313695',7.510882672133124,'#4575b4',10.627894525498595,'#abd9e9',13.504097781545854,'#e0f3f8',16.461080102579576,'#fee090',19.727717440086167,'#fdae61',23.624507840022105,'#f46d43',28.796350507416083,'#d73027',36.23256450619397,'#d73027',54.94163805787151,'#a50026'], 

'Percent individuals age 25 or over with less than high school degree': ['interpolate',['linear'],['get','less_than_hs'],0.769464892412231,'#313695',6.723437650538454,'#4575b4',9.777182330710612,'#abd9e9',13.075577926920209,'#e0f3f8',16.77336148338535,'#fee090',20.936296151592106,'#fdae61',26.615858537365977,'#f46d43',35.0,'#d73027',46.064546334155246,'#d73027',73.0,'#a50026'], 

'Percent of residents who are not currently enrolled in higher ed': ['interpolate',['linear'],['get','share_not_in_higher_ed'],45.0,'#313695',65.4908140002682,'#4575b4',76.69262302624314,'#abd9e9',83.15415118333911,'#e0f3f8',87.71320020095453,'#fee090',90.8474228719698,'#fdae61',93.03584704280298,'#f46d43',94.76193890721353,'#d73027',96.31292910591684,'#d73027',100.0,'#a50026'], 

'Unemployment (percent) in 2009 (island areas) and 2010 (states and PR)': ['interpolate',['linear'],['get','unemployment_2010'],0.0,'#313695',1.8203304747960678,'#4575b4',3.423132123258759,'#abd9e9',4.783705180938136,'#e0f3f8',6.065704575678471,'#fee090',7.532187993680885,'#fdae61',9.383560551702145,'#f46d43',12.044706864381812,'#d73027',17.0,'#d73027',26.0,'#a50026'], 

'Percentage households below 100 of federal poverty line in 2009 (island areas) and 2010 (states and PR)': ['interpolate',['linear'],['get','poverty_2010'],0.0,'#313695',7.507315554633185,'#4575b4',10.63269079763925,'#abd9e9',13.538719825760785,'#e0f3f8',16.5165391199275,'#fee090',19.67395865994549,'#fdae61',23.499205403257847,'#f46d43',28.930804349695507,'#d73027',36.94957009573754,'#d73027',49.0,'#a50026'], 

'Percent of the Census tract that is within Tribal areas': ['interpolate',['linear'],['get','percent_tract_tribal_area'],0.0,'#313695',3.3046999373834605,'#4575b4',9.629353233830846,'#abd9e9',17.6234798019923,'#e0f3f8',25.096388542963886,'#fee090',38.568893377578995,'#fdae61',54.78693368351937,'#f46d43',72.26184618675794,'#d73027',88.49735114783594,'#d73027',100.0,'#a50026'], 

'total_population': ['interpolate',['linear'],['get','total_population'],237.0,'#313695',94793.0,'#4575b4',291165.0,'#abd9e9',621690.0,'#e0f3f8',1074475.0,'#fee090',1656754.0,'#fdae61',2475492.0,'#f46d43',3314006.0,'#d73027',5198275.0,'#d73027',10073612.0,'#a50026'], 

'risk': ['interpolate',['linear'],['get','env_index'],10.469755154639177,'#313695',27.75784452359435,'#4575b4',33.810948659462284,'#abd9e9',38.62874679452608,'#e0f3f8',42.94448540167339,'#fee090',46.737200811359024,'#fdae61',50.471929740671676,'#f46d43',54.66158248546511,'#d73027',59.8875277303992,'#d73027',74.0473828665516,'#a50026']
}

const tract_colors = {'day': ['interpolate',['linear'],['get','heat'],0.0,'#313695',1.10433759964485,'#4575b4',2.19376658910019,'#74add1',3.29991960576622,'#abd9e9',4.44056560053613,'#e0f3f8',5.63054902619206,'#fee090',6.91924417902064,'#fdae61',8.39188468818747,'#f46d43',10.4008068743818,'#d73027',14.603241316634,'#a50026'], 

'Income': ['interpolate',['linear'],['get','income'],2499.0,'#313695',13581.0,'#4575b4',19232.0,'#abd9e9',24197.0,'#e0f3f8',29648.0,'#fee090',36418.0,'#fdae61',45008.0,'#f46d43',56572.0,'#d73027',73750.0,'#d73027',133125.0,'#a50026'],

'Housing': ['interpolate',['linear'],['get','rent'],123.0,'#313695',633.0,'#4575b4',831.0,'#abd9e9',1042.0,'#e0f3f8',1277.0,'#fee090',1546.0,'#fdae61',1872.0,'#f46d43',2295.0,'#d73027',2930.0,'#d73027',4001.0,'#a50026'], 

'Percent Black or African American alone': ['interpolate',['linear'],['get','share_black'],0.0,'#313695',0.03,'#4575b4',0.09,'#abd9e9',0.17,'#e0f3f8',0.27,'#fee090',0.39,'#fdae61',0.53,'#f46d43',0.68,'#d73027',0.84,'#d73027',1.0,'#a50026'], 

'Percent American Indian / Alaska Native': ['interpolate',['linear'],['get','share_native'],0.0,'#313695',0.0,'#4575b4',0.02,'#abd9e9',0.06,'#e0f3f8',0.13,'#fee090',0.25,'#fdae61',0.42,'#f46d43',0.64,'#d73027',0.85,'#d73027',1.0,'#a50026'], 

'Percent Asian': ['interpolate',['linear'],['get','share_asian'],0.0,'#313695',0.01,'#4575b4',0.04,'#abd9e9',0.08,'#e0f3f8',0.14,'#fee090',0.22,'#fdae61',0.32,'#f46d43',0.44,'#d73027',0.6,'#d73027',1.0,'#a50026'], 

'Percent Native Hawaiian or Pacific': ['interpolate',['linear'],['get','share_hawaiin'],0.0,'#313695',0.0,'#4575b4',0.02,'#abd9e9',0.05,'#e0f3f8',0.1,'#fee090',0.21,'#fdae61',0.38,'#f46d43',0.54,'#d73027',0.77,'#d73027',0.98,'#a50026'], 

'Percent two or more races': ['interpolate',['linear'],['get','share_mixed'],0.0,'#313695',0.0,'#4575b4',0.01,'#abd9e9',0.03,'#e0f3f8',0.05,'#fee090',0.08,'#fdae61',0.12,'#f46d43',0.19,'#d73027',0.3,'#d73027',0.66,'#a50026'], 

'Percent White': ['interpolate',['linear'],['get','share_white'],0.0,'#313695',0.09,'#4575b4',0.22,'#abd9e9',0.35,'#e0f3f8',0.47,'#fee090',0.59,'#fdae61',0.7,'#f46d43',0.8,'#d73027',0.89,'#d73027',1.0,'#a50026'], 

'Percent Hispanic or Latino': ['interpolate',['linear'],['get','share_hispanic'],0.0,'#313695',0.04,'#4575b4',0.1,'#abd9e9',0.18,'#e0f3f8',0.27,'#fee090',0.38,'#fdae61',0.52,'#f46d43',0.68,'#d73027',0.85,'#d73027',1.0,'#a50026'], 

'Percent other races': ['interpolate',['linear'],['get','share_other'],0.0,'#313695',0.01,'#4575b4',0.04,'#abd9e9',0.08,'#e0f3f8',0.14,'#fee090',0.22,'#fdae61',0.31,'#f46d43',0.42,'#d73027',0.56,'#d73027',1.0,'#a50026'], 

'Percent age under 10': ['interpolate',['linear'],['get','share_child'],0.0,'#313695',0.04,'#4575b4',0.07,'#abd9e9',0.09,'#e0f3f8',0.11,'#fee090',0.13,'#fdae61',0.16,'#f46d43',0.19,'#d73027',0.26,'#d73027',0.52,'#a50026'], 

'Percent age 10 to 64': ['interpolate',['linear'],['get','share_adult'],0.0,'#313695',0.35,'#4575b4',0.53,'#abd9e9',0.62,'#e0f3f8',0.67,'#fee090',0.71,'#fdae61',0.75,'#f46d43',0.8,'#d73027',0.89,'#d73027',1.0,'#a50026'], 

'Percent age over 64': ['interpolate',['linear'],['get','share_senior'],0.0,'#313695',0.07,'#4575b4',0.11,'#abd9e9',0.15,'#e0f3f8',0.19,'#fee090',0.24,'#fdae61',0.31,'#f46d43',0.43,'#d73027',0.63,'#d73027',1.0,'#a50026'], 

'Total threshold criteria exceeded': ['interpolate',['linear'],['get','thresholds_exceeded'],0.0,'#313695',0.0,'#4575b4',1.0,'#abd9e9',2.0,'#e0f3f8',3.0,'#fee090',5.0,'#fdae61',7.0,'#f46d43',9.0,'#d73027',11.0,'#d73027',18.0,'#a50026'], 

'Total categories exceeded': ['interpolate',['linear'],['get','categories_exceeded'],0.0,'#313695',0.0,'#4575b4',1.0,'#abd9e9',2.0,'#e0f3f8',3.0,'#fee090',4.0,'#fdae61',5.0,'#f46d43',6.0,'#d73027',7.0,'#d73027',8.0,'#a50026'], 

'Percentage of tract that is disadvantaged by area': ['interpolate',['linear'],['get','area_percent_disadvantaged'],0.0,'#313695',2.0,'#4575b4',10.0,'#abd9e9',20.0,'#e0f3f8',33.0,'#fee090',45.0,'#fdae61',58.0,'#f46d43',72.0,'#d73027',91.0,'#d73027',100.0,'#a50026'], 

'Share of neighbors that are identified as disadvantaged': ['interpolate',['linear'],['get','share_neighbors_disadvantaged'],0.0,'#313695',6.0,'#4575b4',18.0,'#abd9e9',30.0,'#e0f3f8',43.0,'#fee090',55.0,'#fdae61',66.0,'#f46d43',78.0,'#d73027',91.0,'#d73027',100.0,'#a50026'], 

'Total population': ['interpolate',['linear'],['get','total_population'],0.0,'#313695',2034.0,'#4575b4',3275.0,'#abd9e9',4449.0,'#e0f3f8',5733.0,'#fee090',7327.0,'#fdae61',9796.0,'#f46d43',14491.0,'#d73027',24985.0,'#d73027',72041.0,'#a50026'], 

'Adjusted percent of individuals below 200% Federal Poverty Line': ['interpolate',['linear'],['get','adjusted_poor_200'],0.0,'#313695',0.05,'#4575b4',0.12,'#abd9e9',0.2,'#e0f3f8',0.28,'#fee090',0.36,'#fdae61',0.45,'#f46d43',0.55,'#d73027',0.68,'#d73027',1.0,'#a50026'], 

'Expected agricultural loss rate (Natural Hazards Risk Index)': ['interpolate',['linear'],['get','ag_loss_rate'],0.0,'#313695',0.3241,'#4575b4',1.098,'#abd9e9',2.4391,'#e0f3f8',4.7796,'#fee090',8.6204,'#fdae61',14.7683,'#f46d43',21.4013,'#d73027',28.6585,'#d73027',47.354,'#a50026'], 

'Expected building loss rate (Natural Hazards Risk Index)': ['interpolate',['linear'],['get','building_loss_rate'],0.0,'#313695',0.0199,'#4575b4',0.0558,'#abd9e9',0.118,'#e0f3f8',0.2174,'#fee090',0.3612,'#fdae61',0.5982,'#f46d43',0.9995,'#d73027',1.6887,'#d73027',2.5337,'#a50026'], 

'Expected population loss rate (Natural Hazards Risk Index)': ['interpolate',['linear'],['get','pop_loss_rate'],0.0,'#313695',0.0004,'#4575b4',0.0015,'#abd9e9',0.0037,'#e0f3f8',0.0093,'#fee090',0.0208,'#fdae61',0.0439,'#f46d43',0.0764,'#d73027',0.1121,'#d73027',0.2122,'#a50026'], 

'Share of properties at risk of flood in 30 years': ['interpolate',['linear'],['get','flood_risk'],0.0,'#313695',3.0,'#4575b4',7.0,'#abd9e9',12.0,'#e0f3f8',19.0,'#fee090',29.0,'#fdae61',43.0,'#f46d43',61.0,'#d73027',83.0,'#d73027',100.0,'#a50026'], 

'Share of properties at risk of fire in 30 years': ['interpolate',['linear'],['get','fire_risk'],0.0,'#313695',5.0,'#4575b4',17.0,'#abd9e9',30.0,'#e0f3f8',44.0,'#fee090',58.0,'#fdae61',71.0,'#f46d43',83.0,'#d73027',93.0,'#d73027',100.0,'#a50026'], 

'Energy burden': ['interpolate',['linear'],['get','energy_burden'],0.0,'#313695',1.0,'#4575b4',2.0,'#abd9e9',3.0,'#e0f3f8',4.0,'#fee090',6.0,'#fdae61',9.0,'#f46d43',37.0,'#d73027',119.0,'#d73027',1322.0,'#a50026'], 

'PM2.5 in the air': ['interpolate',['linear'],['get','pollution_25'],3.93,'#313695',6.07,'#4575b4',7.12,'#abd9e9',7.96,'#e0f3f8',8.7,'#fee090',9.43,'#fdae61',10.32,'#f46d43',11.82,'#d73027',14.06,'#d73027',17.75,'#a50026'], 

'Diesel particulate matter exposure': ['interpolate',['linear'],['get','diesel_exposure'],0.0,'#313695',0.11,'#4575b4',0.19,'#abd9e9',0.28,'#e0f3f8',0.38,'#fee090',0.5,'#fdae61',0.67,'#f46d43',0.95,'#d73027',1.29,'#d73027',1.92,'#a50026'], 

'Traffic proximity and volume': ['interpolate',['linear'],['get','traffic_proximity'],0.0,'#313695',404.27,'#4575b4',1090.13,'#abd9e9',2143.08,'#e0f3f8',3752.25,'#fee090',6134.29,'#fdae61',9832.38,'#f46d43',15497.86,'#d73027',23072.08,'#d73027',42063.59,'#a50026'], 

'DOT Travel Barriers Score (percentile)': ['interpolate',['linear'],['get','travel_barriers_pt'],0.0,'#313695',11.0,'#4575b4',22.0,'#abd9e9',33.0,'#e0f3f8',44.0,'#fee090',55.0,'#fdae61',66.0,'#f46d43',77.0,'#d73027',88.0,'#d73027',99.0,'#a50026'], 

'Housing burden (percent)': ['interpolate',['linear'],['get','housing_burden'],0.0,'#313695',10.0,'#4575b4',15.0,'#abd9e9',20.0,'#e0f3f8',25.0,'#fee090',31.0,'#fdae61',38.0,'#f46d43',46.0,'#d73027',56.0,'#d73027',100.0,'#a50026'], 

'Percent pre-1960s housing (lead paint indicator)': ['interpolate',['linear'],['get','lead_paint'],0.0,'#313695',6.0,'#4575b4',15.0,'#abd9e9',24.0,'#e0f3f8',34.0,'#fee090',45.0,'#fdae61',56.0,'#f46d43',68.0,'#d73027',80.0,'#d73027',100.0,'#a50026'], 

'Median value ($) of owner-occupied housing units': ['interpolate',['linear'],['get','house_value'],9999.0,'#313695',125200.0,'#4575b4',204400.0,'#abd9e9',297500.0,'#e0f3f8',407500.0,'#fee090',549600.0,'#fdae61',748600.0,'#f46d43',1026900.0,'#d73027',1497700.0,'#d73027',2000001.0,'#a50026'], 

"Share of the tract's land area that is covered by impervious surface or cropland as a percent": ['interpolate',['linear'],['get','impervious_surface'],0.0,'#313695',908.0,'#4575b4',1888.0,'#abd9e9',2851.0,'#e0f3f8',3793.0,'#fee090',4728.0,'#fdae61',5694.0,'#f46d43',6747.0,'#d73027',7960.0,'#d73027',9846.0,'#a50026'], 

'Share of homes with no kitchen or indoor plumbing (percent)': ['interpolate',['linear'],['get','no_kitchen_plumbing'],0.0,'#313695',0.0,'#4575b4',0.01,'#abd9e9',0.02,'#e0f3f8',0.04,'#fee090',0.07,'#fdae61',0.12,'#f46d43',0.22,'#d73027',0.4,'#d73027',0.68,'#a50026'], 

'Proximity to hazardous waste sites': ['interpolate',['linear'],['get','waste_proximity'],0.0,'#313695',0.92,'#4575b4',2.47,'#abd9e9',4.54,'#e0f3f8',7.27,'#fee090',10.83,'#fdae61',15.58,'#f46d43',22.74,'#d73027',33.19,'#d73027',57.75,'#a50026'], 

'Proximity to NPL (Superfund) sites': ['interpolate',['linear'],['get','superfund_proximity'],0.0,'#313695',0.07,'#4575b4',0.19,'#abd9e9',0.39,'#e0f3f8',0.69,'#fee090',1.13,'#fdae61',1.81,'#f46d43',2.97,'#d73027',4.71,'#d73027',8.05,'#a50026'], 

'Proximity to Risk Management Plan (RMP) facilities': ['interpolate',['linear'],['get','rmp_proximity'],0.0,'#313695',0.34,'#4575b4',0.78,'#abd9e9',1.31,'#e0f3f8',1.96,'#fee090',2.77,'#fdae61',3.9,'#f46d43',5.58,'#d73027',8.54,'#d73027',17.6,'#a50026'], 

'Wastewater discharge': ['interpolate',['linear'],['get','wastewater'],0.0,'#313695',312.45,'#4575b4',1340.64,'#abd9e9',3128.09,'#e0f3f8',5665.36,'#fee090',9170.52,'#fdae61',16402.87,'#f46d43',22351.43,'#d73027',40246.61,'#d73027',56390.56,'#a50026'], 

'Leaky underground storage tanks': ['interpolate',['linear'],['get','storage_tanks'],0.0,'#313695',1.61,'#4575b4',4.19,'#abd9e9',7.69,'#e0f3f8',12.51,'#fee090',19.05,'#fdae61',27.83,'#f46d43',40.34,'#d73027',60.66,'#d73027',154.78,'#a50026'], 

'Current asthma among adults aged greater than or equal to 18 years': ['interpolate',['linear'],['get','asthma_adult'],490.0,'#313695',760.0,'#4575b4',840.0,'#abd9e9',910.0,'#e0f3f8',980.0,'#fee090',1050.0,'#fdae61',1140.0,'#f46d43',1260.0,'#d73027',1420.0,'#d73027',2150.0,'#a50026'], 

'Diagnosed diabetes among adults aged greater than or equal to 18 years': ['interpolate',['linear'],['get','diabetes_adult'],70.0,'#313695',560.0,'#4575b4',780.0,'#abd9e9',940.0,'#e0f3f8',1100.0,'#fee090',1280.0,'#fdae61',1490.0,'#f46d43',1770.0,'#d73027',2160.0,'#d73027',4420.0,'#a50026'], 

'Coronary heart disease among adults aged greater than or equal to 18 years': ['interpolate',['linear'],['get','heart_adult'],30.0,'#313695',310.0,'#4575b4',430.0,'#abd9e9',530.0,'#e0f3f8',630.0,'#fee090',730.0,'#fdae61',840.0,'#f46d43',990.0,'#d73027',1250.0,'#d73027',3710.0,'#a50026'], 

'Life expectancy (years)': ['interpolate',['linear'],['get','low_life_expectancy_pt'],56.3,'#313695',69.8,'#4575b4',73.0,'#abd9e9',75.2,'#e0f3f8',77.09,'#fee090',78.9,'#fdae61',80.7,'#f46d43',82.7,'#d73027',85.3,'#d73027',97.5,'#a50026'], 

'Median household income as a percent of area median income': ['interpolate',['linear'],['get','hhinc_divided_by_area_income'],4.0,'#313695',52.0,'#4575b4',73.0,'#abd9e9',92.0,'#e0f3f8',111.0,'#fee090',133.0,'#fdae61',161.0,'#f46d43',198.0,'#d73027',257.0,'#d73027',492.0,'#a50026'], 

'Linguistic isolation (percent)': ['interpolate',['linear'],['get','linguistic_isolation'],0.0,'#313695',1.0,'#4575b4',4.0,'#abd9e9',9.0,'#e0f3f8',15.0,'#fee090',23.0,'#fdae61',34.0,'#f46d43',50.0,'#d73027',68.0,'#d73027',100.0,'#a50026'], 

'Unemployment (percent)': ['interpolate',['linear'],['get','unemployment_percent'],0.0,'#313695',2.0,'#4575b4',4.0,'#abd9e9',6.0,'#e0f3f8',9.0,'#fee090',13.0,'#fdae61',19.0,'#f46d43',28.0,'#d73027',48.0,'#d73027',100.0,'#a50026'], 

'Percent of individuals below 200% Federal Poverty Line': ['interpolate',['linear'],['get','share_poor_200'],0.0,'#313695',11.0,'#4575b4',19.0,'#abd9e9',27.0,'#e0f3f8',35.0,'#fee090',43.0,'#fdae61',52.0,'#f46d43',62.0,'#d73027',75.0,'#d73027',100.0,'#a50026'], 

'Percent of individuals < 100% Federal Poverty Line': ['interpolate',['linear'],['get','share_poor_100'],0.0,'#313695',5.0,'#4575b4',10.0,'#abd9e9',15.0,'#e0f3f8',21.0,'#fee090',28.0,'#fdae61',36.0,'#f46d43',47.0,'#d73027',65.0,'#d73027',100.0,'#a50026'], 

'Percent individuals age 25 or over with less than high school degree': ['interpolate',['linear'],['get','less_than_hs'],0.0,'#313695',3.0,'#4575b4',7.0,'#abd9e9',11.0,'#e0f3f8',16.0,'#fee090',21.0,'#fdae61',27.0,'#f46d43',35.0,'#d73027',46.0,'#d73027',100.0,'#a50026'], 

'Percent of residents who are not currently enrolled in higher ed': ['interpolate',['linear'],['get','share_not_in_higher_ed'],0.0,'#313695',21.0,'#4575b4',44.0,'#abd9e9',62.0,'#e0f3f8',75.0,'#fee090',84.0,'#fdae61',89.0,'#f46d43',92.0,'#d73027',95.0,'#d73027',100.0,'#a50026'], 

'Unemployment (percent) in 2009 (island areas) and 2010 (states and PR)': ['interpolate',['linear'],['get','unemployment_2010'],0.0,'#313695',2.0,'#4575b4',4.0,'#abd9e9',7.0,'#e0f3f8',10.0,'#fee090',14.0,'#fdae61',20.0,'#f46d43',30.0,'#d73027',52.0,'#d73027',100.0,'#a50026'], 

'Percentage households below 100% of federal poverty line in 2009 (island areas) and 2010 (states and PR)': ['interpolate',['linear'],['get','poverty_2010'],0.0,'#313695',4.0,'#4575b4',9.0,'#abd9e9',14.0,'#e0f3f8',20.0,'#fee090',27.0,'#fdae61',36.0,'#f46d43',48.0,'#d73027',66.0,'#d73027',100.0,'#a50026'], 

'Percent of the Census tract that is within Tribal areas': ['interpolate',['linear'],['get','percent_tract_tribal_area'],0.0,'#313695',2.0,'#4575b4',10.0,'#abd9e9',21.0,'#e0f3f8',33.0,'#fee090',47.0,'#fdae61',64.0,'#f46d43',79.0,'#d73027',92.0,'#d73027',102.0,'#a50026'], 

'risk': ['interpolate', ['linear'], ['get','env_index'],0.0,'#313695',14.857142857142858,'#4575b4',30.22222222222222,'#abd9e9',37.833333333333336,'#e0f3f8',44.55555555555556,'#fee090',51.125,'#fdae61',58.0,'#f46d43',65.8,'#d73027',75.0,'#d73027',92.4,'#a50026']}

const layers_dict = {
"heat":{'name':'heat', 'layer-name': 'heat', 'percentile-layer': '', 'county-colors': county_colors_dictionary['day'], 'tract-colors': tract_colors['day']}, 
"rent":{'name':'rent', 'layer-name': 'income', 'percentile-layer': '', 'county-colors': county_colors_dictionary['Housing'], 'tract-colors': tract_colors['']}, 
"income":{'name':'income', 'layer-name': 'rent', 'percentile-layer': '', 'county-colors': county_colors_dictionary['Income'], 'tract-colors': tract_colors['']}, 
"share_black":{'name':'share_black', 'layer-name': 'share_black', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_black'], 'tract-colors': tract_colors['']}, 
"share_natam":{'name':'share_natam', 'layer-name': 'share_native', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_natam'], 'tract-colors': tract_colors['']},  
"share_asian":{'name':'share_asian', 'layer-name': 'share_asian', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_asian'], 'tract-colors': tract_colors['']}, 
"share_pacific":{'name':'share_pacific', 'layer-name': 'share_hawaiin', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_pacific'], 'tract-colors': tract_colors['']},  
"share_mixed":{'name':'share_mixed', 'layer-name': 'share_mixed', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_mixed'], 'tract-colors': tract_colors['']}, 
"share_white":{'name':'share_white', 'layer-name': 'share_white', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_white'], 'tract-colors': tract_colors['']}, 
"share_hispanic":{'name':'share_hispanic', 'layer-name': 'share_hispanic', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_hisp'], 'tract-colors': tract_colors['']}, 
"share_other":{'name':'share_other', 'layer-name': 'share_other', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_other'], 'tract-colors': tract_colors['']}, 
"share_child":{'name':'share_child', 'layer-name': 'share_child', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_kid'], 'tract-colors': tract_colors['']},  
"share_adult":{'name':'share_adult', 'layer-name': 'share_adult', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_adult'], 'tract-colors': tract_colors['']}, 
"share_senior":{'name':'share_senior', 'layer-name': 'share_senior', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_sr'], 'tract-colors': tract_colors['']},  
"thresh_exceeded":{'name':'thresh_exceeded', 'layer-name': 'thresholds_exceeded', 'percentile-layer': '', 'county-colors': county_colors_dictionary['thresh_exceeded'], 'tract-colors': tract_colors['']},  
"cat_exceeded":{'name':'categories_exceeded', 'layer-name': 'categories_exceeded', 'percentile-layer': '', 'county-colors': county_colors_dictionary['cat_exceeded'], 'tract-colors': tract_colors['Total categories exceeded']},  
"percent_area_disadvantaged":{'name':'percent_area_disadvantaged', 'layer-name': 'percent_area_disadvantaged', 'percentile-layer': '', 'county-colors': county_colors_dictionary['percent_disadvantaged'], 'tract-colors': tract_colors['']}, 
"share_neighbors_disadvantaged":{'name':'share_neighbors_disadvantaged', 'layer-name': 'share_neighbors_disadvantaged', 'percentile-layer': '', 'county-colors': county_colors_dictionary['share_neighbors_disadvantaged'], 'tract-colors': tract_colors['']}, 
"total_population":{'name':'total_population', 'layer-name': 'total_population', 'percentile-layer': '', 'county-colors': county_colors_dictionary['total_pop'], 'tract-colors': tract_colors['']}, 
"adjusted_poor_200":{'name':'adjusted_poor_200', 'layer-name': 'adjusted_poor_200', 'percentile-layer': 'adjusted_poor_200_pt', 'county-colors': county_colors_dictionary['adjusted_poverty_200'], 'tract-colors': tract_colors['']}, 
"ag_loss_rate":{'name':'ag_loss_rate', 'layer-name': 'ag_loss_rate', 'percentile-layer': 'ag_loss_pt', 'county-colors': county_colors_dictionary['ag_loss'], 'tract-colors': tract_colors['']}, 
"building_loss_rate":{'name':'building_loss_rate', 'layer-name': 'building_loss_rate', 'percentile-layer': 'building_loss_pt', 'county-colors': county_colors_dictionary['building_loss'], 'tract-colors': tract_colors['']},  
"pop_loss_rate":{'name':'pop_loss_rate', 'layer-name': 'pop_loss_rate', 'percentile-layer': 'pop_loss_pt', 'county-colors': county_colors_dictionary['pop_loss'], 'tract-colors': tract_colors['']}, 
"flood_risk":{'name':'flood_risk', 'layer-name': 'flood_risk', 'percentile-layer': 'flood_risk_pt', 'county-colors': county_colors_dictionary['flood_risk'], 'tract-colors': tract_colors['']}, 
"fire_risk":{'name':'fire_risk', 'layer-name': 'fire_risk', 'percentile-layer': 'fire_risk_pt', 'county-colors': county_colors_dictionary['Share of properties at risk of fire in 30 years'], 'tract-colors': tract_colors['']},  
"energy_burden":{'name':'energy_burden', 'layer-name': 'energy_burden', 'percentile-layer': 'energy_burden_pt', 'county-colors': county_colors_dictionary['Energy burden'], 'tract-colors': tract_colors['']},  
"PM25":{'name':'PM25', 'layer-name': 'pollution_25', 'percentile-layer': 'pollution_25_pt', 'county-colors': county_colors_dictionary['PM2.5 in the air'], 'tract-colors': tract_colors['PM2.5 in the air']},  
"diesel":{'name':'diesel', 'layer-name': 'diesel_exposure', 'percentile-layer': 'diesel_exposure_pt', 'county-colors': county_colors_dictionary['Diesel particulate matter exposure'], 'tract-colors': tract_colors['']},  
"traffic":{'name':'traffic', 'layer-name': 'traffic_proximity', 'percentile-layer': 'traffic_proximity_pt', 'county-colors': county_colors_dictionary['Traffic proximity and volume'], 'tract-colors': tract_colors['']},  
"travel_barriers_pt":{'name':'travel_barriers_pt', 'layer-name': 'travel_barriers_pt', 'percentile-layer': 'travel_barriers_pt', 'county-colors': county_colors_dictionary['DOT Travel Barriers Score (percentile)'], 'tract-colors': tract_colors['']}, 
"housing_burden":{'name':'housing_burden', 'layer-name': 'housing_burden', 'percentile-layer': 'housing_burden_pt', 'county-colors': county_colors_dictionary['Housing burden (percent)'], 'tract-colors': tract_colors['']},  
"lead":{'name':'lead', 'layer-name': 'lead_paint', 'percentile-layer': 'lead_pain_pt', 'county-colors': county_colors_dictionary['Percent pre-1960s housing (lead paint indicator)'], 'tract-colors': tract_colors['']},  
"house_value":{'name':'house_value', 'layer-name': 'house_value', 'percentile-layer': 'house_value_pt', 'county-colors': county_colors_dictionary['Median value ($) of owner-occupied housing units'], 'tract-colors': tract_colors['']}, 
"impervious":{'name':'impervious', 'layer-name': 'impervious_surface', 'percentile-layer': 'impervious_surface_pt', 'county-colors': county_colors_dictionary["Share of the tract's land area that is covered by impervious surface or cropland as a percent"], 'tract-colors': tract_colors['']},  
"no_kitchen_plumbing":{'name':'no_kitchen_plumbing', 'layer-name': 'no_kitchen_plumbing', 'percentile-layer': 'no_kitchen_plumbing_pt', 'county-colors': county_colors_dictionary['Share of homes with no kitchen or indoor plumbing (percent)'], 'tract-colors': tract_colors['']},  
"waste_proximity":{'name':'waste_proximity', 'layer-name': 'waste_proximity', 'percentile-layer': 'waste_proximity_pt', 'county-colors': county_colors_dictionary['Proximity to hazardous waste sites'], 'tract-colors': tract_colors['']}, 
"superfund_proximity":{'name':'superfund_proximity', 'layer-name': 'superfund_proximity', 'percentile-layer': 'superfund_proximity_pt', 'county-colors': county_colors_dictionary['Proximity to NPL (Superfund) sites'], 'tract-colors': tract_colors['']}, 
"rmp_proximity":{'name':'rmp_proximity', 'layer-name': 'rmp_proximity', 'percentile-layer': 'rmp_proximity_pt', 'county-colors': county_colors_dictionary['Proximity to Risk Management Plan (RMP) facilities'], 'tract-colors': tract_colors['']}, 
"wastewater":{'name':'wastewater', 'layer-name': 'wastewater', 'percentile-layer': 'wastewater_pt', 'county-colors': county_colors_dictionary['Wastewater discharge'], 'tract-colors': tract_colors['']},  
"storage_tanks":{'name':'storage_tanks', 'layer-name': 'storage_tanks', 'percentile-layer': 'storage_tanks_pt', 'county-colors': county_colors_dictionary['Leaky underground storage tanks'], 'tract-colors': tract_colors['']},
"asthma":{'name':'asthma', 'layer-name': 'asmtha_adult', 'percentile-layer': 'asthma_adult_pt', 'county-colors': county_colors_dictionary['Current asthma among adults aged greater than or equal to 18 years'], 'tract-colors': tract_colors['']},  
"diabetes":{'name':'diabetes', 'layer-name': 'diabetes_adult', 'percentile-layer': 'diabetes_adult_pt', 'county-colors': county_colors_dictionary['Diagnosed diabetes among adults aged greater than or equal to 18 years'], 'tract-colors': tract_colors['']},  
"heart":{'name':'heart', 'layer-name': 'heart_adult', 'percentile-layer': 'heart_adult_pt', 'county-colors': county_colors_dictionary['Coronary heart disease among adults aged greater than or equal to 18 years'], 'tract-colors': tract_colors['']},  
"life_expectancy":{'name':'life_expectancy', 'layer-name': 'low_life_expectancy_pt', 'percentile-layer': 'low_life_expectancy_pt', 'county-colors': county_colors_dictionary['Life expectancy (years)'], 'tract-colors': tract_colors['']},  
"hhinc_divided_area":{'name':'hhinc_divided_area', 'layer-name': 'hhinc_divided_by_area_income', 'percentile-layer': 'hhinc_area_income_pt', 'county-colors': county_colors_dictionary['Median household income as a percent of area median income'], 'tract-colors': tract_colors['']}, 
"linguistic_isolation":{'name':'linguistic_isolation', 'layer-name': 'linguistic_isolation', 'percentile-layer': 'linguistic_isolation_pt', 'county-colors': county_colors_dictionary['Linguistic isolation (percent)'], 'tract-colors': tract_colors['']}, 
"unemployment":{'name':'unemployment', 'layer-name': 'unemployment_percent', 'percentile-layer': 'unemployment_pt', 'county-colors': county_colors_dictionary['Unemployment (percent)'], 'tract-colors': tract_colors['']},  
"poor_200":{'name':'poor_200', 'layer-name': 'share_poor_200', 'percentile-layer': 'share_poor_200_pt', 'county-colors': county_colors_dictionary['Percent of individuals below 200 Federal Poverty Line'], 'tract-colors': tract_colors['']},  
"poor_100":{'name':'poor_100', 'layer-name': 'share_poor_100', 'percentile-layer': 'share_poor_100_pt', 'county-colors': county_colors_dictionary['Percent of individuals < 100 Federal Poverty Line'], 'tract-colors': tract_colors['']},  
"less_than_hs":{'name':'less_than_hs', 'layer-name': 'less_than_hs', 'percentile-layer': 'less_than_hs_pt', 'county-colors': county_colors_dictionary['Percent individuals age 25 or over with less than high school degree'], 'tract-colors': tract_colors['']}, 
"not_in_higher_ed":{'name':'not_in_higher_ed', 'layer-name': 'share_not_in_higher_ed', 'percentile-layer': '', 'county-colors': county_colors_dictionary['Percent of residents who are not currently enrolled in higher ed'], 'tract-colors': tract_colors['']},  
"unemployment_2010":{'name':'unemployment_2010', 'layer-name': 'unemployment_2010', 'percentile-layer': '', 'county-colors': county_colors_dictionary['Unemployment (percent) in 2009 (island areas) and 2010 (states and PR)'], 'tract-colors': tract_colors['']},  
"poor_2010":{'name':'poor_2010', 'layer-name': 'poverty_2010', 'percentile-layer': '', 'county-colors': county_colors_dictionary['Percentage households below 100 of federal poverty line in 2009 (island areas) and 2010 (states and PR)'], 'tract-colors': tract_colors['']},  
"percentage_tribal_area":{'name':'percentage_tribal_area', 'layer-name': 'percent_tract_tribal_area', 'percentile-layer': '', 'county-colors': county_colors_dictionary['Percent of the Census tract that is within Tribal areas'], 'tract-colors': tract_colors['']},  
"env_index":{'name':'env_index', 'layer-name': 'risk', 'percentile-layer': '', 'county-colors': county_colors_dictionary['risk'], 'tract-colors': tract_colors['risk']}
}