import styles from "./Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/react";
import { useState } from "react";

import { createDemoSignInToken } from "../../services/authService";
import DemoLogin from "./DemoLogin/DemoLogin";
import LoginForm from "./LoginForm/LoginForm";
import CreateAccount from "./CreateAccount/CreateAccount";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useSignIn();

  const [demoError, setDemoError] = useState("");
  const [demoLoading, setDemoLoading] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

async function handleDemoLogin() {
  setDemoError("");
  setDemoLoading(true);

  try {
    const demoToken = await createDemoSignInToken();

    const { error } = await signIn.ticket({
      ticket: demoToken,
    });

    if (error) {
      setDemoError("Unable to start demo. Please try again later");
      return;
    }

    if (signIn.status === "complete") {
      const { error: finalizeError } = await signIn.finalize();

      if (finalizeError) {
        setDemoError("Unable to start demo. Please try again.");
        return;
      }

      navigate("/dashboard");
    }
  } finally {
    setDemoLoading(false);
  }
}

  return (
    <div className={styles.login}>
      <div className={styles.glow} />

      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <FontAwesomeIcon icon={faBagShopping} />
          </div>

          <div className={styles.brandText}>
            <span>ShopFloor</span>
            <small>Store Management</small>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.introduction}>
            <span className={styles.eyebrow}>Welcome to ShopFloor</span>
            <h1>
              Your store.
              <br />
              Simplified.
            </h1>
            <p>
              Monitor performance, stay on top of daily priorities and keep your
              team aligned from one clear workspace.
            </p>

            <div className={styles.features}>
              <div>
                <strong>Performance</strong>
                <span>KPIs, targets and weekly sales</span>
              </div>

              <div>
                <strong>Operations</strong>
                <span>Tasks, handovers and notifications</span>
              </div>

              <div>
                <strong>Team</strong>
                <span>Schedules and availability</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>
                {showCreateAccount
                  ? "Create your account"
                  : "Explore ShopFloor"}
              </h2>

              <p>
                {showCreateAccount
                  ? "Set up your ShopFloor workspace."
                  : "Experience the store management workspace with demo data."}
              </p>
            </div>

            {showCreateAccount ? (
              <CreateAccount
                onSignIn={() => setShowCreateAccount(false)}
              />
            ) : (
              <>
                <DemoLogin
                  onDemoLogin={handleDemoLogin}
                  error={demoError}
                  loading={demoLoading} 
                />

                <div className={styles.divider}>
                  <span>or sign in to your account</span>
                </div>

                <LoginForm
                  onCreateAccount={() => setShowCreateAccount(true)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}