import styles from "./Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/react";
import { useState } from "react";

type FormErrors = {
  email?: string;
  password?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { signIn, fetchStatus } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Enter your email.";
    }

    if (!password) {
      newErrors.password = "Enter your password.";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setFormErrors({});

    const { error } = await signIn.password({
      emailAddress: email.trim(),
      password,
    });

    console.log("error:", error);
console.log("status:", signIn.status);
console.log("supported second factors:", signIn.supportedSecondFactors);

    if (error) {
      setFormErrors({
        password: "Email or password is incorrect.",
      });
      return;
    }

    if (signIn.status === "complete") {
      const { error: finalizeError } = await signIn.finalize();

      if (finalizeError) {
        setFormErrors({
          password: "Unable to complete sign in.",
        });
        return;
      }

      navigate("/dashboard");
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
              <h2>Explore ShopFloor</h2>
              <p>Experience the store management workspace with demo data.</p>
            </div>

            <button
              type="button"
              className={styles.demo}
              onClick={() => navigate("/dashboard")}
            >
              Explore Demo
              <FontAwesomeIcon icon={faArrowRight} />
            </button>

            <p className={styles.demoNote}>No account required.</p>

            <div className={styles.divider}>
              <span>or sign in to your account</span>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFormErrors((current) => ({
                      ...current,
                      email: undefined,
                    }));
                  }}
                  placeholder="you@company.com"
                />

                {formErrors.email && (
                  <span className={styles.fieldError}>{formErrors.email}</span>
                )}
              </div>

              <div className={styles.field}>
                <div className={styles.passwordLabel}>
                  <label htmlFor="password">Password</label>
                  <button type="button">Forgot password?</button>
                </div>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFormErrors((current) => ({
                      ...current,
                      password: undefined,
                    }));
                  }}
                  placeholder="Enter your password"
                />

                {formErrors.password && (
                  <span className={styles.fieldError}>
                    {formErrors.password}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className={styles.signIn}
                disabled={fetchStatus === "fetching"}
              >
                {fetchStatus === "fetching" ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign in
                    <FontAwesomeIcon icon={faArrowRight} />
                  </>
                )}
              </button>

              <p className={styles.createAccount}>
                New to ShopFloor?{" "}
                <button type="button">Create an account</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
