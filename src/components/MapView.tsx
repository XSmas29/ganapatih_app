import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import React from 'react';

import TripInfo from './tripInfo';

import { TaxiData } from '@/types'

interface MapViewProps {
  data: TaxiData[]
}

const MapView: React.FC<MapViewProps> = ({data}) => {
  return (
    <MapContainer center={[40.7392683, -73.978627]} scrollWheelZoom={true} zoom={13}>
      <TileLayer
        attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((item, index) => (
        <>
          <Polyline key={index} pathOptions={
            {color: 'black', weight: 0.8, opacity: 0.5, lineCap: 'round'}
          } positions={
            [[item.pickup_latitude, item.pickup_longitude], [item.dropoff_latitude, item.dropoff_longitude]]
          } >
            <Marker key={index} position={[item.dropoff_latitude, item.dropoff_longitude]}>
              <TripInfo item={item}/>
            </Marker>
            <Marker key={index} position={[item.pickup_latitude, item.pickup_longitude]}>
              <TripInfo item={item}/>
            </Marker>
          </Polyline>
        </>
      ))}
    </MapContainer>
  )
}

export default MapView;