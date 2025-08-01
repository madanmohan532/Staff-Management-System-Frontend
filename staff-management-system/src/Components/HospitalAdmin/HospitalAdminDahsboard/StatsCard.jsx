import React from "react";
import NurseStatsCard from "./NurseStatsCard";

const StatsCards = ({
  workingNurses,
  requestedNurses,
  acceptedNurses,
  activeTab,
  onCardClick,
}) => {
  return (
    <div className="stats-cards">
      <NurseStatsCard
        title="Currently Working"
        count={workingNurses.length}
        isActive={activeTab === "working"}
        onClick={() => onCardClick("working")}
      />
      <NurseStatsCard
        title="Requested Nurses"
        count={requestedNurses.length}
        isActive={activeTab === "requested"}
        onClick={() => onCardClick("requested")}
      />
      <NurseStatsCard
        title="Accepted by Nurses"
        count={acceptedNurses.length}
        isActive={activeTab === "accepted"}
        onClick={() => onCardClick("accepted")}
      />
      {/* <NurseStatsCard
        title="Acknowledged"
        count={nurseData.acknowledged}
        isActive={activeTab === "acknowledged"}
        onClick={() => onCardClick("acknowledged")}
      /> */}
    </div>
  );
};

export default StatsCards;
