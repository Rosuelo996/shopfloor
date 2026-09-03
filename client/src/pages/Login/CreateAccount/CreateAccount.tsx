import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreateAccount.module.css";

type Props = {
  onSignIn: () => void;
};

export default function CreateAccount({ onSignIn }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className={styles.createAccount}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.nameFields}>
          <div className={styles.field}>
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="createEmail">Email</label>
          <input
            id="createEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>

        <button type="submit" className={styles.createButton}>
          Create account
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </form>

      <p className={styles.signIn}>
        Already have an account?{" "}
        <button type="button" onClick={onSignIn}>
          Sign in
        </button>
      </p>
    </div>
  );
}