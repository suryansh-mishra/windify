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
import PlaceholderText from './components/placeholders/placeholder.text.component';
import { AnimatePresence, easeIn, easeOut } from 'framer-motion';

const PrimeSectionContainer = styled.main`
  display: flex;
  flex-flow: column;
  position: relative;
  padding-top: 2rem;
  flex-basis: 0;
  flex-grow: 1;
  z-index: 5;
  border-bottom-right-radius: var(--border-radius-soft-corner);
  border-top-right-radius: var(--border-radius-soft-corner);
  /* background-image: var(--color--container--prime); */
  background-image: url('/public/bg1.jpg');
  box-shadow: var(--box--shadow);
  background-size: 40px 40px;
  background-image: linear-gradient(
      to right,
      rgba(200, 200, 200, 0.3) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(200, 200, 200, 0.3) 1px, #fff 1px);

  @media only screen and (max-width: 700px) {
    border-radius: 0;
    background: transparent;
    padding-inline: 1rem;
    box-shadow: none;
  }
  ::after {
    content: '';
    position: absolute;
    width: 75%;
    z-index: -10;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    aspect-ratio: 2/1;

    background: linear-gradient(315deg, #01ff12c9 0%, #3bbeffce 74%);
    border-radius: 0 0 50rem 50rem;
  }

  ::before {
    content: '';
    position: absolute;
    width: 45%;
    z-index: -1;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    aspect-ratio: 2/1.05;
    /* background-color #aee1f9;
background-image: linear-gradient(315deg, #d6bbff 0%, #ffefe7 74%); */

    background: linear-gradient(45deg, #d0ffd2 0%, #fee5f7 74%);

    border-radius: 0rem 0rem 50rem 50rem;
  }
  > * {
    z-index: 10;
  }
`;

const ApplicationContainer = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
  flex-flow: row;
  gap: 1.75rem;
  padding-block: 2.5rem;
  background-color: #ffffff2f;
  backdrop-filter: blur(1px);

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
  const setInstructionsRead = useStore((state) => state.setInstructionsRead);

  const initialLocation = useStore((state) => state.initialLocation);
  const showModal = useStore((state) => state.showModal);
  const setShowModal = useStore((state) => state.setShowModal);
  const cardsCollection = useStore((state) => state.cardsCollection);
  const instructionsReadHandler = () => {
    localStorage.setItem('windify_instructions_read', 'READ');
    setShowModal(false);
    setInstructionsRead(true);
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
      if (localStorage.getItem('windify_instructions_read') !== 'READ') {
        setShowModal(true);
      } else {
        useStore.setState({ instructionsRead: true });
        const browserLocationPermissions = await navigator.permissions.query({
          name: 'geolocation',
        });
        if (browserLocationPermissions.state === 'granted') {
          setLocationPermissions();
        } else if (navigator.onLine && navigator.geolocation) {
          setLocationPermissions();
        } else {
          // SET MODAL SAYING NO PERMISSIONS, SO MAY TAKE THE TAP TAP ROUTE
        }
      }
    };
    foo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructionsRead]);

  useEffect(() => {
    if (
      instructionsRead &&
      locationPermissions &&
      initialLocation.length === 0
    ) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationPermissions, instructionsRead]);
  return (
    <>
      <ApplicationContainer>
        <PrimeSectionContainer>
          <Header />
          {/* <section> */}
          <AnimatePresence>
            {cardsCollection.length === 0 && (
              <PlaceholderText>
                <p>Ooops, looks like you&apos;ll need to tap on Map! 🍃</p>
              </PlaceholderText>
            )}
            <CardList></CardList>
          </AnimatePresence>
          {/* </section> */}
        </PrimeSectionContainer>
        {showModal && (
          <InitialModal clickHandler={instructionsReadHandler}></InitialModal>
        )}
        <MapComponent />
      </ApplicationContainer>
    </>
  );
};

export default App;
