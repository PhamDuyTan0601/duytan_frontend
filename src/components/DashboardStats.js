import { useState, useEffect } from "react";

export default function DashboardStats({ petData, selectedPet }) {
  const [stats, setStats] = useState({
    batteryLevel: 0,
    lastUpdate: null,
    activityType: "unknown",
  });

  useEffect(() => {
    if (petData && petData.length > 0) {
      calculateStats(petData);
    }
  }, [petData]);

  const calculateStats = (data) => {
    const latestData = data[0];
    setStats({
      batteryLevel: latestData?.batteryLevel || 0,
      lastUpdate: latestData?.timestamp,
      activityType: latestData?.activityType || "unknown",
    });
  };

  const ActivityBadge = ({ activityType }) => {
    const activityConfig = {
      resting: {
        class: "activity-resting",
        icon: "🛌",
        label: "Nghỉ ngơi",
      },
      walking: {
        class: "activity-walking",
        icon: "🚶",
        label: "Đang đi",
      },
      running: {
        class: "activity-running",
        icon: "🏃",
        label: "Đang chạy",
      },
      playing: {
        class: "activity-playing",
        icon: "🎾",
        label: "Đang chơi",
      },
      unknown: {
        class: "activity-resting",
        icon: "❓",
        label: "Không xác định",
      },
    };

    const config = activityConfig[activityType] || activityConfig.unknown;

    return (
      <div className={`activity-badge ${config.class}`}>
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </div>
    );
  };

  return (
    <div className="stats-grid">
      {/* Battery Level */}
      <div className="stat-card battery">
        <div className="stat-content">
          <div className="stat-icon">🔋</div>
          <div className="stat-info">
            <h3>Mức pin</h3>
            <p className="stat-value">
              {stats.batteryLevel}
              <span className="stat-unit">%</span>
            </p>
          </div>
        </div>
      </div>

      {/* Activity Status */}
      <div className="stat-card activity">
        <div className="stat-content">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Trạng thái</h3>
            <div style={{ marginTop: "8px" }}>
              <ActivityBadge activityType={stats.activityType} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
