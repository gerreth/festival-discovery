const features = {
  landscape: [{ elementType: 'geometry', color: '#fafafa' }],
  poi: [
    { elementType: 'geometry', color: '#fafafa' },
    { elementType: 'labels.text.fill', color: '#757575' },
  ],
  'poi.park': [
    { elementType: 'geometry', color: '#e5e5e5' },
    { elementType: 'geometry.fill', color: '#81c99a' },
    { elementType: 'labels.text.fill', color: '#9e9e9e' },
  ],
  road: [
    { elementType: 'geometry', color: '#dadada' },
    { elementType: 'geometry.fill', color: '#ffffff' },
    { elementType: 'labels.text.fill', color: '#000000' },
    { elementType: 'labels.text.stroke', color: '#ffffff' },
  ],
  'road.local': [
    // { elementType: 'geometry', color: '#dadada' },
    // { elementType: 'geometry.fill', color: '#ffffff' },
    // { elementType: 'labels.text.fill', color: '#000000' },
    // { elementType: 'labels.text.stroke', color: '#ffffff' },
  ],
  'road.arterial': [
    // { elementType: 'geometry', color: '#dadada' },
    // { elementType: 'geometry.fill', color: '#ffffff' },
    // { elementType: 'labels.text.fill', color: '#000000' },
    // { elementType: 'labels.text.stroke', color: '#ffffff' },
  ],
  'road.highway': [
    // { elementType: 'geometry', color: '#dadada' },
    // { elementType: 'geometry.fill', color: '#ffffff' },
    // { elementType: 'labels.text.fill', color: '#000000' },
    // { elementType: 'labels.text.stroke', color: '#ffffff' },
  ],
  water: [
    { elementType: 'geometry', color: '#75aec9' },
    { elementType: 'labels.text.fill', visibility: 'off' },
  ],
};

const mapped = Object.keys(features).reduce(
  (carry, feature) => [
    ...carry,
    ...features[feature].map(type => {
      const { elementType } = type;
      const featureType = feature;
      const stylers = [];

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
  ],
  [],
);

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
