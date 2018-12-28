/*
 * Map
 */
/*global google*/
import React from 'react';
import GoogleMapReact from 'google-map-react';

import { styles } from './mapStyles';
import Marker from './Marker';
import MarkerMini from './MarkerMini';

export default class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 5,
  };

  constructor(props) {
    super(props);

    const festivals = props.festivals.filter(this.hasLatLng);

    const center = this.getCenter(festivals);

    this.state = {
      directions: undefined,
      festivals,
      ...center,
    };
  }

  componentDidMount() {
    // const directionsRenderer = new google.maps.DirectionsRenderer();
    // const DirectionsService = new google.maps.DirectionsService();

    // DirectionsService.route(
    //   {
    //     origin: new google.maps.LatLng(41.85073, -87.65126),
    //     destination: new google.maps.LatLng(41.85258, -87.65141),
    //     travelMode: google.maps.TravelMode.DRIVING,
    //   },
    //   (result, status) => {
    //     if (status === google.maps.DirectionsStatus.OK) {
    //       this.setState({
    //         directions: result,
    //       });
    //     } else {
    //       console.error(`error fetching directions ${result}`);
    //     }
    //   },
    // );

    const setPosition = position => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  hasLatLng = ({ location: { lat, lng } }) => {
    return !(lat === null || lng === null);
  };

  getOptions = () => ({
    overviewMapControl: false,
    streetViewControl: false,
    rotateControl: true,
    mapTypeControl: false,
    styles: [...styles],
    minZoom: 4,
  });

  latLngReducer = (sum, { location: { lat, lng } }) => {
    return {
      lat: sum.lat + lat,
      lng: sum.lng + lng,
    };
  };

  getCenter = festivals => {
    const latLngSum = festivals.reduce(this.latLngReducer, { lat: 0, lng: 0 });

    return {
      lat: parseInt(latLngSum.lat / festivals.length),
      lng: parseInt(latLngSum.lng / festivals.length),
    };
  };

  renderMarker = festivals =>
    festivals.map(({ name, location: { lat, lng } }) => {
      return <Marker lat={lat} lng={lng} name={name} />;
    });

  render() {
    let { zoom } = this.props;
    const { lat, lng, festivals } = this.state;

    const defaultCenter = this.getCenter(festivals);
    const options = this.getOptions();

    return (
      <div style={{ height: '800px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA3yAbsBqKBODjiTBB0oxSz4dGIEwr5dQk' }}
          defaultCenter={defaultCenter}
          center={{ lat, lng }}
          defaultZoom={zoom}
          options={options}
        >
          {this.renderMarker(festivals)}
          <MarkerMini lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    );
  }
}
