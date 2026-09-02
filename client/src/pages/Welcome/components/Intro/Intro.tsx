import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Intro.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faGear } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
      });

      timeline
        // Logo
        .from(`.${styles.logo}`, {
          opacity: 0,
          scale: 0.97,
          duration: 1.05,
        })

        // ShopFloor
        .from(
          `.${styles.brand} h1`,
          {
            opacity: 0,
            duration: 0.9,
          },
          "-=0.3",
        )

        // Welcome to ShopFloor
        .from(
          `.${styles.brand} p`,
          {
            opacity: 0,
            y: 3,
            duration: 0.75,
          },
          "-=0.25",
        )

        // Gear
        .from(
          `.${styles.gear}`,
          {
            opacity: 0,
            scale: 0.94,
            duration: 0.65,
          },
          "-=0.05",
        )

        // Management
        .to(`.${styles.gear}`, {
          rotation: 30,
          duration: 0.58,
          ease: "power2.inOut",
        })
        .from(
          `.${styles.word}:nth-child(1)`,
          {
            opacity: 0,
            y: 4,
            duration: 0.52,
          },
          "-=0.3",
        )

        // made
        .to(`.${styles.gear}`, {
          rotation: 60,
          duration: 0.58,
          ease: "power2.inOut",
        })
        .from(
          `.${styles.word}:nth-child(2)`,
          {
            opacity: 0,
            y: 4,
            duration: 0.52,
          },
          "-=0.3",
        )

        // simple.
        .to(`.${styles.gear}`, {
          rotation: 90,
          duration: 0.58,
          ease: "power2.inOut",
        })
        .from(
          `.${styles.word}:nth-child(3)`,
          {
            opacity: 0,
            y: 4,
            duration: 0.52,
          },
          "-=0.3",
        )

        // Exit
        .to(contentRef.current, {
          opacity: 0,
          duration: 0.75,
          delay: 0.35,
          ease: "power2.inOut",
          onComplete: () => navigate("/login"),
        });
    }, contentRef);

    return () => ctx.revert();
  }, [navigate]);

  return (
    <div className={styles.intro}>
      <div className={styles.glow} />

      <div ref={contentRef} className={styles.content}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <FontAwesomeIcon icon={faBagShopping} />
          </div>

          <h1>ShopFloor</h1>
          <p>Welcome to ShopFloor</p>
        </div>

        <div className={styles.loading}>
          <div className={styles.gear}>
            <FontAwesomeIcon icon={faGear} />
          </div>

          <div className={styles.message}>
            <span className={styles.word}>Management</span>
            <span className={styles.word}>made</span>
            <span className={styles.word}>simple.</span>
          </div>
        </div>
      </div>
    </div>
  );
}