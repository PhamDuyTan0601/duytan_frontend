import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix cho marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function RealTimeMap({ petData, selectedPet }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [path, setPath] = useState([]);
  const mapRef = useRef();

  // Cập nhật vị trí real-time
  useEffect(() => {
    if (
      petData &&
      petData.length > 0 &&
      petData[0].latitude &&
      petData[0].longitude
    ) {
      const latestData = petData[0];
      const newPosition = [latestData.latitude, latestData.longitude];

      setCurrentPosition(newPosition);
      setPath((prev) => [...prev.slice(-50), newPosition]);

      // Tự động pan map đến vị trí mới
      if (mapRef.current) {
        mapRef.current.setView(newPosition, 16);
      }
    } else {
      // Set default position if no data
      const defaultPosition = [10.8231, 106.6297]; // HCM City
      setCurrentPosition(defaultPosition);
    }
  }, [petData]);

  if (!currentPosition) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
          backgroundColor: "#f7fafc",
          borderRadius: "10px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #e2e8f0",
              borderTop: "3px solid #4299e1",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          ></div>
          <p style={{ color: "#718096" }}>Đang chờ dữ liệu vị trí...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-container">
      <MapContainer
        center={currentPosition}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Vẽ đường đi */}
        {path.length > 1 && (
          <Polyline positions={path} color="#3B82F6" weight={4} opacity={0.7} />
        )}

        {/* Marker hiện tại */}
        {currentPosition && (
          <Marker position={currentPosition}>
            <Popup>
              <div style={{ minWidth: "200px" }}>
                <strong>{selectedPet?.name || "Pet"}</strong>
                <br />
                📍 {currentPosition[0].toFixed(6)},{" "}
                {currentPosition[1].toFixed(6)}
                <br />
                🏃 {petData?.[0]?.activityType || "unknown"}
                <br />⚡ {petData?.[0]?.batteryLevel || "N/A"}%
                <br />
                🕐{" "}
                {petData?.[0]?.timestamp
                  ? new Date(petData[0].timestamp).toLocaleTimeString()
                  : "N/A"}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
