import { useState } from "react";
import styles from "./UsersMenu.module.css";
import { useUsers } from "../../hooks/useUsers";

type Props = {
  onClose: () => void;
  variant: "header" | "sidebar";
};

export default function UserMenu({ onClose, variant }: Props) {
  const { demoUsers, currentUser, handleUserSwitch, handleLogout } = useUsers();

  const [isSwitching, setIsSwitching] = useState(false);
  const [switchError, setSwitchError] = useState<string | null>(null);

  async function handleSwitch(userId: number) {
    if (isSwitching) {
      return;
    }

    try {
      setIsSwitching(true);
      setSwitchError(null);

      await handleUserSwitch(userId);

      onClose();
    } catch (err) {
      console.error("Failed to switch user:", err);
      setSwitchError("Unable to switch user. Please try again.");
    } finally {
      setIsSwitching(false);
    }
  }

  return (
    <div
      className={`${styles.userMenu} ${
        variant === "sidebar" ? styles.sidebar : ""
      }`}
    >
      <div className={styles.dropdown}>
        <p className={styles.title}>
          {currentUser?.isDemo ? "Switch user" : "Account"}
        </p>

        {switchError && <p className={styles.switchError}>{switchError}</p>}

        <div
          className={`${styles.option} ${styles.currentOption}`}
          onClick={onClose}
        >
          <div className={`${styles.optionAvatar} ${styles.currentAvatar}`}>
            <span>
              {currentUser?.firstName[0]}
              {currentUser?.lastName[0]}
            </span>
          </div>

          <div className={styles.optionDetails}>
            <h4>
              {currentUser?.firstName} {currentUser?.lastName.slice(0, 1)}.
            </h4>
            <p>{currentUser?.role}</p>
          </div>

          <span className={styles.currentLabel}>Current</span>
        </div>

        {currentUser?.isDemo &&
          demoUsers
            .filter((user) => user.id !== currentUser?.id)
            .map((user) => (
              <div
                key={user.id}
                className={`${styles.option} ${
                  isSwitching ? styles.switching : ""
                }`}
                onClick={() => handleSwitch(user.id)}
              >
                <div className={styles.optionAvatar}>
                  <span>
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </span>
                </div>

                <div>
                  <h4>
                    {user.firstName} {user.lastName.slice(0, 1)}.
                  </h4>
                  <p>{user.role}</p>
                </div>
              </div>
            ))}

        <button
          type="button"
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
