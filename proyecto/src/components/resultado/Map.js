import React, {useState, useContext, Fragment} from 'react';
import GoogleMapReact from 'google-map-react';
import ubi from '../../img/ubi.png';
import {ImagenContext} from '../../context/ImagenContext';

const AnyReactComponent = ({ text }) => <div><img src={ubi} alt={text} height="70px"/></div>;

const Map = () => {

    //State de la imagen que viene desde el context
    const { info } = useContext(ImagenContext);

    //State de la ubicacion
    const [ubicacion, guarrdarUbicacion] = useState({
        latitud: null,
        longitud: null
    });

    //State lugar
    const [lugar, guardarLugar] = useState('Arco Antigua');

    //State resultado marker
    const [resultado, guardarResultado] = useState('');

    let contentString;

    //Al cargar la API
    const apiHasLoaded = (map, maps) =>{
        
        var request = {
            query: info.nombre,
            fields: ['name', 'geometry'],
          };
        
          var service = new window.google.maps.places.PlacesService(map);
          service.findPlaceFromQuery(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
              guardarResultado(results[0].name);
              contentString =
              '<div id="content">' +
              '<div id="siteNotice" class="center">' +
              "</div>" +
              `<h1 id="firstHeading" class="firstHeading">${results[0].name}</h1>` +
              '<div id="bodyContent" class="center">' +
              `<img src=${info.urlImagen} width="200px" height: 50px/>`+
              "</div>" +
              "</div>";
              createMarker(results[0], map);
              map.setCenter(results[0].geometry.location);
            }
          });
    }

    // console.log(resultado);

    const createMarker = (place, map) => {
      console.log(resultado);
      let infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      });
      if (!place.geometry || !place.geometry.location) return;
    
      const marker = new window.google.maps.Marker({
        map,
        position: place.geometry.location,
        title: "Tikal",
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
      <Fragment>
        <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ 
            // key: "AIzaSyA0NVVStVIJVAnm95X0VbQ_XGinxY9R-do", 
            key: "AIzaSyC84b6fImY9rHugYUEuZ7p61Iwr9E6RToA",
          libraries: ['places', 'geometry']}}
          defaultCenter={{lat: 14.636840, lng: -90.506297}}
          defaultZoom={12}
          yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
        >
            {/* <AnyReactComponent
            lat={14.636840}
            lng={-90.506297}
            text="My Marker"
          /> */}
        </GoogleMapReact>
      </div>
      </Fragment>
     );
}
 
export default Map;