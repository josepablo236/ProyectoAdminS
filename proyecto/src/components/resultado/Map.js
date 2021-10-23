import React, {useState, useContext, Fragment} from 'react';
import GoogleMapReact from 'google-map-react';
import {ImagenContext} from '../../context/ImagenContext';

const Map = () => {

    //State de la imagen que viene desde el context
    const { imagen, guardarUbicacion, guardarErrormapa } = useContext(ImagenContext);

    let contentString;

    //Al cargar la API
    const apiHasLoaded = (map, maps) =>{
        
        var request = {
            query: imagen.nombre,
            fields: ['name', 'geometry'],
            locationBias: {radius: 20000000, center: {lat: 0, lng: 0}}
          };
        
          var service = new window.google.maps.places.PlacesService(map);
          service.findPlaceFromQuery(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
              contentString =
              '<div id="content">' +
              '<div id="siteNotice" class="center">' +
              "</div>" +
              `<h1 id="firstHeading" class="firstHeading">${results[0].name}</h1>` +
              '<div id="bodyContent" class="center">' +
              `<img src=${imagen.urlImagen} width="200px" height: 50px/>`+
              "</div>" +
              "</div>";
              guardarErrormapa(false);
              createMarker(results[0], map);
              map.setCenter(results[0].geometry.location);
            }
            else{
              //error
              guardarErrormapa(true);
            }
          });
    }

    const createMarker = (place, map) => {
      console.log(place);
      let infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      });
      if (!place.geometry || !place.geometry.location) return;
    
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      var dir = place.formatted_address;
      guardarUbicacion({
        latitud: lat,
        longitud: lng,
        direccion: dir
      });
      const marker = new window.google.maps.Marker({
        map,
        position: place.geometry.location
      });

      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    
      window.google.maps.event.addListener(marker, "click", () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
    }
    return ( 
      <div className="container">
        <div style={{ height: '400px', width: '100%' }}>
          <GoogleMapReact
          bootstrapURLKeys={{ 
            // key2: "AIzaSyA0NVVStVIJVAnm95X0VbQ_XGinxY9R-do", 
            key: "AIzaSyC84b6fImY9rHugYUEuZ7p61Iwr9E6RToA",
          libraries: ['places', 'geometry']}}
          defaultCenter={{lat: 14.636840, lng: -90.506297}}
          defaultZoom={12}
          yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
        >
        </GoogleMapReact>
      </div>
      </div>
     );
}
 
export default Map;