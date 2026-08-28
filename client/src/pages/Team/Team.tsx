import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import styles from "./Team.module.css";

import { useState } from "react";
import { useTeam } from "./hooks/useTeam";

import Header from "../../components/Header/Header";
import TeamOverview from "./components/TeamOverview/TeamOverview";
import WeeklySchedule from "./components/WeeklySchedule/WeeklySchedule";
import Availability from "./components/Availability/Availability";

type TeamTab = "team" | "schedule" | "availability";

export default function Team() {
  const [activeTab, setActiveTab] = useState<TeamTab>("team");
  const { weeklyShifts, teamAvailability } = useTeam();

  return (
    <div className={styles.team}>
      <Header />

      <section className={styles.heading}>
        <div className={styles.headingIcon}>
          <FontAwesomeIcon icon={faUsers} />
        </div>

        <div>
          <h1>Team</h1>
          <p>Manage your team, shifts and availability</p>
        </div>
      </section>

      <div className={styles.selector}>
        <button
          type="button"
          className={`${styles.selectorButton} ${
            activeTab === "team" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("team")}
        >
          Team
        </button>

        <button
          type="button"
          className={`${styles.selectorButton} ${
            activeTab === "schedule" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule
        </button>

        <button
          type="button"
          className={`${styles.selectorButton} ${
            activeTab === "availability" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("availability")}
        >
          Availability
        </button>
      </div>

      {activeTab === "team" && <TeamOverview />}

      {activeTab === "schedule" && weeklyShifts && (
        <WeeklySchedule weeklyShifts={weeklyShifts} />
      )}

      {activeTab === "availability" && (
        <Availability teamAvailability={teamAvailability} />
      )}
    </div>
  );
}
