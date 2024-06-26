import MapComponent from './components/map/map.component';
import './App.css';
import CardList from './components/cardList/cardList.component';
import InitialModal from './components/initialModal/initialModal.component';
import Header from './components/header/header.component';
import { useEffect } from 'react';
import useStore from './store/store';
import Placeholder from './components/placeholders/placeholder.component';
import { AnimatePresence } from 'framer-motion';
import ApplicationContainer from './components/containers/application.container';
import PrimeContainer from './components/containers/prime.container';
import Spinner from './components/spinner/spinner.component';
import SearchBox from './components/searchbox/searchbox.component';

const App = () => {
  const instructionsRead = useStore((state) => state.instructionsRead);
  const loading = useStore((state) => state.loading);
  const setLoading = useStore((state) => state.setLoading);
  const setLocationPermissions = useStore(
    (state) => state.setLocationPermissions
  );
  const locationPermissions = useStore((state) => state.locationPermissions);
  const setInstructionsRead = useStore((state) => state.setInstructionsRead);
  const addMarker = useStore((state) => state.addMarker);

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
    useStore.setState({ initialLocation: pos });
    addMarker(pos);
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
          setLoading(true);
        } else if (navigator.onLine && navigator.geolocation) {
          setLocationPermissions();
          setLoading(true);
        } else setLoading(false);
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
          () => {
            setLoading(false);
            alert('Location permission denied or services not available!');
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationPermissions, instructionsRead]);

  return (
    <ApplicationContainer>
      <PrimeContainer>
        <Header />
        <SearchBox />
        <AnimatePresence>
          {loading && cardsCollection.length === 0 && (
            <Placeholder key="placeholder-spinner">
              <Spinner></Spinner>
            </Placeholder>
          )}
          {!loading && cardsCollection.length === 0 && (
            <Placeholder
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { type: 'ease-out', delay: 0.15, duration: 0.15 },
              }}
              key="placeholder-text"
            >
              <p>Ooops, looks like you&apos;ll need to tap on Map! 🍃</p>
            </Placeholder>
          )}
          {cardsCollection.length > 0 && <CardList></CardList>}
        </AnimatePresence>
      </PrimeContainer>
      {showModal && (
        <InitialModal clickHandler={instructionsReadHandler}></InitialModal>
      )}
      <MapComponent />
    </ApplicationContainer>
  );
};

export default App;
