import styles from "./UsersMenu.module.css";
import { useUsers } from "../../hooks/useUsers";

type Props = {
  onClose: () => void;
  variant: "header" | "sidebar";
};

export default function UserMenu({ onClose, variant }: Props) {
  const { users, currentUser, setCurrentUser } = useUsers();

  return (
    <div
      className={`${styles.userMenu} ${
        variant === "sidebar" ? styles.sidebar : ""
      }`}
    >
      <div className={styles.dropdown}>
        <p className={styles.title}>Switch user</p>

        <div className={`${styles.option} ${styles.currentOption}`} onClick={onClose}>
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

        {users
          .filter((user) => user.id !== currentUser?.id)
          .map((user) => (
            <div
              key={user.id}
              className={styles.option}
              onClick={() => {
                setCurrentUser(user);
                onClose();
              }}
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
      </div>
    </div>
  );
}
