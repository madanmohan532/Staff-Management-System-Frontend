import React from "react";

const NurseStatsCard = ({ title, count, isActive, onClick }) => {
  return (
    <div className={`stats-card ${isActive ? "active" : ""}`} onClick={onClick}>
      <h3>{title}</h3>
      <div className="count">{count}</div>
    </div>
  );
};

export default NurseStatsCard;
