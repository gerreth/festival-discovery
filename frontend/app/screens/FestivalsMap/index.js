/*
 * Map
 */
import React from 'react';

import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { styles } from './mapStyles';
import Marker from './Marker';
import MarkerMini from './MarkerMini';

class FestivalsMap extends React.Component {
  static defaultProps = {
    center: {
      lat: null,
      lng: null,
    },
    festivals: [],
    zoom: 5,
  };

  constructor(props) {
    super(props);

    const festivals = props.festivals.filter(this.hasLatLng);

    const position = this.getCenter(festivals);

    this.state = {
      festivals,
      position,
    };
  }

  componentDidMount() {
    const setPosition = position => {
      this.setState({
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  hasLatLng = ({ location: { lat, lng } }) => !(lat === null || lng === null);

  getOptions = () => ({
    overviewMapControl: false,
    streetViewControl: false,
    rotateControl: true,
    mapTypeControl: false,
    styles: [...styles],
    minZoom: 4,
  });

  latLngReducer = (sum, { location: { lat, lng } }) => ({
    lat: sum.lat + lat,
    lng: sum.lng + lng,
  });

  getCenter = festivals => {
    const latLngSum = festivals.reduce(this.latLngReducer, { lat: 0, lng: 0 });

    return {
      position: {
        lat: parseInt(latLngSum.lat, 10) / parseInt(festivals.length, 10),
        lng: parseInt(latLngSum.lng, 10) / parseInt(festivals.length, 10),
      },
    };
  };

  getRoute = (lat, lng) => {
    const {
      DirectionsService,
      directionsRenderer,
      maps,
      position,
    } = this.state;

    DirectionsService.route(
      {
        origin: new maps.LatLng(position.lat, position.lng),
        destination: new maps.LatLng(lat, lng),
        travelMode: maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === maps.DirectionsStatus.OK) {
          console.log({ distance: result.routes[0].legs[0].distance });
          console.log({ duration: result.routes[0].legs[0].duration });
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      },
    );
  };

  renderMarker = festivals =>
    festivals.map(({ bands, name, location: { lat, lng } }) => (
      <Marker
        lat={lat}
        lng={lng}
        name={name}
        bands={bands}
        onClick={this.getRoute}
      />
    ));

  apiLoaded = ({ map, maps }) => {
    const directionsRenderer = new maps.DirectionsRenderer();
    const DirectionsService = new maps.DirectionsService();

    directionsRenderer.setMap(map);

    this.setState({
      directionsRenderer,
      DirectionsService,
      maps,
    });
  };

  render() {
    const { zoom } = this.props;
    const { position, festivals } = this.state;

    const defaultCenter = this.getCenter(festivals);
    const options = this.getOptions();

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_KEY }}
          defaultCenter={defaultCenter}
          center={position}
          defaultZoom={zoom}
          options={options}
          onGoogleApiLoaded={this.apiLoaded}
        >
          {this.renderMarker(festivals)}
          <MarkerMini lat={position.lat} lng={position.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

FestivalsMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  festivals: PropTypes.array,
  zoom: PropTypes.number,
};

const mapStateToProps = state => ({
  festivals: state.get('festivals').festivals,
});

export default connect(mapStateToProps)(FestivalsMap);
