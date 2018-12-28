const features = {
  poi: [
    { elementType: 'geometry', color: '#fafafa' },
    { elementType: 'labels.text.fill', color: '#757575' },
  ],
  'poi.park': [
    { elementType: 'geometry', color: '#e5e5e5' },
    { elementType: 'geometry.fill', color: '#81c99a' },
    { elementType: 'labels.text.fill', color: '#9e9e9e' },
  ],
  'road.highway': [
    { elementType: undefined, color: '#ff0000' },
    { elementType: 'geometry', color: '#dadada' },
    { elementType: 'geometry.fill', color: '#fffffd' },
    { elementType: 'labels.text.fill', color: '#000000' },
    { elementType: 'labels.text.stroke', color: '#ffffff' },
  ],
  water: [
    { elementType: 'geometry', color: '#75aec9' },
    { elementType: 'labels.text.fill', visibility: 'off' },
  ],
};

const mapped = Object.keys(features).reduce((carry, feature) => {
  return [
    ...carry,
    ...features[feature].map(type => {
      const elementType = type.elementType;
      const featureType = feature;
      let stylers = [];

      if (type.color) stylers.push({ color: type.color });
      if (type.visibility) stylers.push({ visibility: type.visibility });

      if (!elementType)
        return {
          featureType,
          stylers,
        };

      return {
        featureType,
        elementType,
        stylers,
      };
    }),
  ];
}, []);

export const styles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    stylers: [
      {
        color: '#81c99a',
      },
      {
        lightness: 100,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  ...mapped,
];
