import { create } from 'zustand';
import { Card, Marker } from './store.classes';
import getLocation from '../utils/getLocation';
import getWeather from '../utils/getWeather';

const useStore = create((set) => ({
  showModal: false,
  initialLocation: [],
  markers: [],
  cardsCollection: [],
  instructionsRead: false,
  locationPermissions: false,
  // loading: false,
  // error: false,
  // snackBarText: '',

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

    const updatedMarkers = useStore
      .getState()
      .markers.map((m) =>
        m.id === markerId ? new Marker(m.id, pos, location) : m
      );

    const updatedCards = useStore.getState().cardsCollection.map((c) => {
      if (c.markerId === markerId) {
        return new Card(markerId, location, weatherData);
      }
      return c;
    });
    set(() => ({
      markers: updatedMarkers,
      cardsCollection: updatedCards,
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
