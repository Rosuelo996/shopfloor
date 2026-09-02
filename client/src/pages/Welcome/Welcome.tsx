import { useState } from "react";
import styles from "./Welcome.module.css";
import Intro from "./components/Intro/Intro";
import Login from "./components/Login/Login";

export default function Welcome() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <section className={styles.welcome}>
      {introComplete ? (
        <Login />
      ) : (
        <Intro onComplete={() => setIntroComplete(true)} />
      )}
    </section>
  );
}