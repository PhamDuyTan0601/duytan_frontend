import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AlertSystem({ petData, selectedPet }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (petData && petData.length > 0) {
      checkAlerts(petData[0]);
    }
  }, [petData]);

  const checkAlerts = (latestData) => {
    const newAlerts = [];

    // Kiểm tra pin yếu
    if (latestData.batteryLevel < 20) {
      newAlerts.push({
        type: "battery",
        message: `Pin thấp: ${latestData.batteryLevel}%`,
        level: "warning",
      });
    }

    // Kiểm tra ra khỏi vùng an toàn (demo)
    const safeZoneCenter = [10.8231, 106.6297];
    const distance = calculateDistance(
      safeZoneCenter[0],
      safeZoneCenter[1],
      latestData.latitude,
      latestData.longitude
    );

    if (distance > 0.5) {
      newAlerts.push({
        type: "location",
        message: "Pet ra khỏi vùng an toàn!",
        level: "danger",
      });
    }

    // Hiển thị alert mới
    newAlerts.forEach((alert) => {
      if (
        !alerts.find(
          (a) => a.type === alert.type && a.message === alert.message
        )
      ) {
        toast[alert.level === "danger" ? "error" : "warning"](alert.message);
        setAlerts((prev) => [...prev, { ...alert, id: Date.now() }]);
      }
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="alert-system">
      <h2>🚨 Thông báo</h2>

      {alerts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#718096",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "10px" }}>✅</div>
          <p>Không có cảnh báo nào</p>
          <p style={{ fontSize: "14px", marginTop: "5px" }}>
            Mọi thứ đều ổn định
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert-item ${
                alert.level === "danger" ? "alert-danger" : "alert-warning"
              }`}
            >
              <div>
                <div className="alert-message">{alert.message}</div>
                <div className="alert-time">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
              <button
                onClick={() => removeAlert(alert.id)}
                className="alert-close"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
