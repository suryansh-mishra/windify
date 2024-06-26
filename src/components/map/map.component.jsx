import { useEffect, useMemo, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useMapEvent } from 'react-leaflet/hooks';
import styled from '@emotion/styled';
import useStore from '../../store/store';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapContainerStyled = styled.div`
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
  flex-grow: 2;
  display: flex;
  overflow: hidden;
  background-image: var(--background-image);
  @media only screen and (max-width: 768px) {
    border-radius: 1rem;
    margin: 1rem;
    flex-basis: 400px;
    max-width: 100%;
  }
`;

function MyComponent() {
  const addMarker = useStore((state) => state.addMarker);
  const map = useMapEvent('click', (e) => {
    const position = [e.latlng.lat, e.latlng.lng];
    addMarker(position);
    map.flyTo(position);
  });
  return null;
}

function DraggableMarker({ markerId, coords, popupText, mapRef, icon }) {
  const markerRef = useRef(null);
  const popupRef = useRef(null);
  const updateMarker = useStore((state) => state.updateMarker);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        const newCoords = marker?.getLatLng();
        updateMarker(markerId, [newCoords.lat, newCoords.lng]);
        mapRef.current.flyTo([newCoords.lat, newCoords.lng]);
      },
    }),
    []
  );
  useEffect(() => {
    // MAKE POPUP OPEN HERE ---------
    markerRef?.current?.openPopup();
  }, [popupText]);

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={coords}
      ref={markerRef}
      autoPan={true}
      icon={icon}
    >
      <Popup minWidth={200} ref={popupRef}>
        <span>{popupText}</span>
      </Popup>
    </Marker>
  );
}

function MapComponent() {
  const markers = useStore((state) => state.markers);
  const position = [28.7041, 78];
  const initialLocation = useStore((state) => state.initialLocation);
  const mapRef = useRef(null);
  useEffect(() => {
    if (initialLocation?.length > 0)
      mapRef?.current?.setView(initialLocation, 6);
  }, [initialLocation, mapRef]);

  return (
    <MapContainerStyled>
      <MapContainer
        center={initialLocation.length > 0 ? initialLocation : position}
        zoom={6}
        scrollWheelZoom={true}
        ref={mapRef}
        markerIcon
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.length > 0 &&
          markers.map((marker) => (
            <DraggableMarker
              key={marker.id}
              markerId={marker.id}
              coords={marker.coords}
              popupText={marker.popupText}
              mapRef={mapRef}
              icon={DefaultIcon}
            />
          ))}
        <MyComponent />
      </MapContainer>
    </MapContainerStyled>
  );
}

export default MapComponent;
