import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

var yellowIcon = L.icon({
    iconUrl: '/localDealer.png',
    shadowUrl: '/shadowcycle.png',
    iconSize: [42, 42],
    shadowSize: [16, 16],
    iconAnchor: [42, 42],
    shadowAnchor: [29, 7],
    popupAnchor: [-3, -76]
});

var blueIcon = L.icon({
    iconUrl: '/localAuthorized.png',
    shadowUrl: '/shadowcycle.png',
    iconSize: [42, 42],
    shadowSize: [16, 16],
    iconAnchor: [42, 42],
    shadowAnchor: [29, 7],
    popupAnchor: [-3, -76]
});
interface MapProps {
    defaultLocal: { lat: number, lgt: number };
    values: any[];
    zoomMap: number;
}

const Map = ({ defaultLocal, values, zoomMap }: MapProps) => {
    return (
        <MapContainer
            center={[defaultLocal.lat, defaultLocal.lgt]}
            zoom={zoomMap}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {!!values && values.map((item: any) => {
                return (
                    <Marker
                        key={item.id}
                        position={[item.lat, item.lgt]}
                        icon={item.isAuthorized === 'true' ? blueIcon : yellowIcon}
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