import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/react";
import styles from "./LoginForm.module.css";

type FormErrors = {
  email?: string;
  password?: string;
};

type Props = {
  onCreateAccount: () => void;
};

export default function LoginForm({ onCreateAccount }: Props) {
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
      emailAddress: email.trim().toLowerCase(),
      password,
    });

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
          <span className={styles.fieldError}>{formErrors.password}</span>
        )}
      </div>

      <button
        type="submit"
        className={styles.signIn}
        disabled={fetchStatus === "fetching"}
      >
        {fetchStatus === "fetching" ? (
          <>
            <span className={styles.spinner} />
            Signing in...
          </>
        ) : (
          <>
            Sign in
            <FontAwesomeIcon icon={faArrowRight} />
          </>
        )}
      </button>

      <p className={styles.createAccount}>
        New to ShopFloor?{" "}
        <button type="button" onClick={onCreateAccount}>
          Create an account
        </button>
      </p>
    </form>
  );
}