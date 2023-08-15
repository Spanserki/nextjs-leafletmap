import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import { useEffect, useState } from 'react';
import { icon } from "leaflet"

const ICON = icon({
    iconUrl: '/local.png',
    iconSize: [32, 32],
})

interface MapProps {
    defaultCenter: string;
    zoom: number;
}[]

const cityLocals = [
    { id: 1, name: 'Ilumisol Matriz', city: 'Londrina', Uf: 'PR', latlong: [-23.301891, -51.183638] },
    { id: 2, name: 'Ilumisol Matriz', city: 'Cascavel', Ud: 'PR', latlong: [-24.9686668, -53.4313725] },
    { id: 3, name: 'Ilumisol Matriz', city: 'Primavera do Leste', Uf: 'MT', latlong: [-15.550391, -54.296726] },
    { id: 4, name: 'Ilumisol Matriz', city: 'Nova Monte Verde', Ud: 'MT', latlong: [-9.976787, -57.465469] },
]

const Map = ({ defaultCenter, zoom }: MapProps) => {
    const selectDistances: any = defaultCenter.split(",")
    let formatDistance = selectDistances.map((res: any) => Number(res))
    if (formatDistance[0] === 0) {
        formatDistance = [-10.089198, -51.975657]
    }
    return (
        <MapContainer
            center={formatDistance}
            zoom={zoom}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cityLocals.map((item: any) => {
                return (
                    <Marker
                        key={item.id}
                        position={item.latlong}
                        icon={ICON}
                    >
                        <Popup>
                            {item.name}
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
    )
}

export default Map