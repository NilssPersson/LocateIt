export const initialRegion = {
  latitude: 10,
  longitude: 20,
  latitudeDelta: 100,
  longitudeDelta: 120
};

export const costomMapStyle = [
  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "landscape.natural.terrain",
    elementType: "all",
    stylers: [
      {
        saturation: "7"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "landscape.natural.landcover",
    elementType: "geometry",
    stylers: [
      {
        //lightness: "100",
      },
      {
        //color: "#1e825f",
      },
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.attraction",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.business",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.government",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.medical",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: "10"
      }
    ]
  }
];
