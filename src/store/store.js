import { create } from 'zustand';
import { Card, Marker } from './store.classes';
import getLocation from '../utils/getLocation';
import getWeather from '../utils/getWeather';
import getCoordinates from '../utils/getCoordinates';

const useStore = create((set) => ({
  showModal: false,
  initialLocation: [],
  markers: [],
  cardsCollection: [],
  instructionsRead: false,
  locationPermissions: false,
  loading: true,
  lastMarker: null,
  // error: false,
  // snackBarText: '',
  setLoading: (val) => {
    set(() => ({
      loading: val,
    }));
  },
  setLocationPermissions: () => {
    set(() => ({
      locationPermissions: true,
    }));
  },
  setInstructionsRead: (val) => {
    set(() => ({
      instructionsRead: val,
    }));
  },

  setShowModal: (val) => {
    set(() => ({
      showModal: val,
    }));
  },
  updateMarker: async (markerId, pos) => {
    const location = await getLocation(pos[0], pos[1]);
    const weatherData = await getWeather(pos[0], pos[1]);
    const newMarker = new Marker(markerId, pos, location);
    const updatedMarkers = useStore
      .getState()
      .markers.map((m) => (m.id === markerId ? newMarker : m));

    const updatedCards = useStore.getState().cardsCollection.map((c) => {
      if (c.markerId === markerId) {
        return new Card(markerId, location, weatherData);
      }
      return c;
    });
    set(() => ({
      markers: updatedMarkers,
      cardsCollection: updatedCards,
      lastMarker: markerId,
    }));
  },
  addMarkerByCityName: async (cityName) => {
    const coords_ = await getCoordinates(cityName);
    const coords = [coords_[1], coords_[0]];
    console.log(coords);
    const location = await getLocation(coords[0], coords[1], true);

    const weatherData = await getWeather(coords[0], coords[1]);
    const markerId = Date.now().toString();
    const newMarker = new Marker(markerId, coords, location);
    const newCard = new Card(markerId, location, weatherData);
    set((state) => ({
      markers: [...state.markers, newMarker],
      cardsCollection: [...state.cardsCollection, newCard],
      loading: false,
      lastMarker: markerId,
    }));
  },
  addMarker: async (marker) => {
    const pos = marker;
    const markerId = Date.now().toString();
    const location = await getLocation(pos[0], pos[1]);
    const weatherData = await getWeather(pos[0], pos[1]);
    const newMarker = new Marker(markerId, marker, location);
    const newCard = new Card(markerId, location, weatherData);
    set((state) => ({
      markers: [...state.markers, newMarker],
      cardsCollection: [...state.cardsCollection, newCard],
      loading: false,
      lastMarker: markerId,
    }));
  },

  deleteCard: (markerId) => {
    const updatedCards = useStore
      .getState()
      .cardsCollection.filter((c) => c.markerId !== markerId);
    const updatedMarkers = useStore
      .getState()
      .markers.filter((m) => m.id !== markerId);
    set(() => ({
      markers: updatedMarkers,
      cardsCollection: updatedCards,
    }));
  },
}));

export default useStore;
