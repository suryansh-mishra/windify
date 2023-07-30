import 'leaflet/dist/leaflet.css'; // Import the Leaflet CSS file
import MapComponent from './components/map/map.component';
import './App.css';
import styled from '@emotion/styled';
import CardList from './components/cardList/cardList.component';
import InitialModal from './components/initialModal/initialModal.component';
import Header from './components/header/header.component';
import { useEffect } from 'react';
import useStore from './store/store';
import { Marker, Card as CardClass } from './store/store.classes';
import getLocation from './utils/getLocation';
import getWeather from './utils/getWeather';

const PrimeSectionContainer = styled.main`
  display: flex;
  flex-flow: column;
  padding-top: 2rem;
  flex-basis: 0;
  flex-grow: 1;
  border-bottom-right-radius: var(--border-radius-soft-corner);
  border-top-right-radius: var(--border-radius-soft-corner);
  background-image: var(--color--container--prime);
  box-shadow: var(--box--shadow);

  @media only screen and (max-width: 700px) {
    border-radius: 0;
    background: transparent;
    padding-inline: 1rem;
    box-shadow: none;
  }
`;

const ApplicationContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-flow: row;
  gap: 1.75rem;
  padding-block: 2.5rem;
  @media only screen and (min-width: 700px) {
    max-height: 100vh;
  }
  @media only screen and (max-width: 700px) {
    flex-flow: column;
    min-height: 100vh;
    padding-block: 0;
    gap: 0;
    background-image: var(--color--container--prime);
  }
`;

const App = () => {
  const instructionsRead = useStore((state) => state.instructionsRead);
  const setLocationPermissions = useStore(
    (state) => state.setLocationPermissions
  );
  const locationPermissions = useStore((state) => state.locationPermissions);

  const initialLocation = useStore((state) => state.initialLocation);
  const showModal = useStore((state) => state.showModal);
  const setShowModal = useStore((state) => state.setShowModal);
  const setInstructionsRead = () => {
    localStorage.setItem('instructionsRead', 'READ');
    setShowModal(false);
  };

  const setInitialLocation = async (pos) => {
    // I AM THINKING LIKE WHY TO DESTRUCTURE, WHY NOT FIX IT, SINCE ITS THE FIRST TIME ANYWAYS
    useStore.setState({ initialLocation: pos });
    const location = await getLocation(pos[0], pos[1]);
    const weatherData = await getWeather(pos[0], pos[1]);
    const markerId = Date.now().toString(); // Have to find a good ID fix
    const newMarker = new Marker(markerId, pos, location);
    const newCard = new CardClass(markerId, location, weatherData);
    useStore.setState({
      markers: [newMarker],
      cardsCollection: [newCard],
    });
  };

  useEffect(() => {
    const foo = async () => {
      console.log(instructionsRead, locationPermissions, initialLocation);
      if (localStorage.getItem('instructionsRead') !== 'READ') {
        console.log('Setting up modal and instructions as not read');
        setInstructionsRead(false);
        setShowModal(true);
      } else {
        setInstructionsRead(true);

        const browserLocationPermissions = await navigator.permissions.query({
          name: 'geolocation',
        });
        if (browserLocationPermissions.state === 'granted') {
          console.log('Found browser location permissions');
          setLocationPermissions();
        } else if (navigator.onLine && navigator.geolocation) {
          setLocationPermissions();
        } else {
          // SET MODAL SAYING NO PERMISSIONS, SO MAY TAKE THE TAP TAP ROUTE
        }
      }
    };
    foo();
    // };

    // if (useStore.getStore().initialLocation.length === 0) {
    //   console.log('App Use effect ran again');
    //   const locationPermissions = localStorage.getItem('locationPermissions');
    //   if (locationPermissions === 'GRANTED') setLocationPermissions();
    //   if (
    //     localStorage.getItem('instructionsRead') === 'READ' &&
    //     (locationPermissions === 'GRANTED' ||
    //       (navigator.onLine && navigator.geolocation))
    //   ) {
    //     // Set the placeholder text here to loading or something
    //     if (locationPermissions !== 'GRANTED')
    //       localStorage.setItem('locationPermissions', 'GRANTED');
    //     navigator.geolocation.getCurrentPosition(
    //       (pos) => {
    //         const position = [pos.coords.latitude, pos.coords.longitude];
    //         setInitialLocation(position);
    //       },
    //       () => alert('Location permission denied or services not available!')
    //     );
    //   }
    // }
  }, [instructionsRead]);

  useEffect(() => {
    if (locationPermissions && initialLocation.length === 0) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const position = [pos.coords.latitude, pos.coords.longitude];
            setInitialLocation(position);
          },
          () => alert('Location permission denied or services not available!')
        );
      }
    }
  }, [locationPermissions]);
  return (
    <>
      <ApplicationContainer>
        <PrimeSectionContainer>
          <Header />
          <CardList></CardList>
        </PrimeSectionContainer>
        {showModal && (
          <InitialModal clickHandler={setInstructionsRead}></InitialModal>
        )}
        <MapComponent />
      </ApplicationContainer>
    </>
  );
};

export default App;
