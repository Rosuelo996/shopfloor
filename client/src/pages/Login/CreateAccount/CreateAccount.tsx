import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./CreateAccount.module.css";
import { createUser } from "../../../services/usersService";

type Props = {
  onSignIn: () => void;
};

type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  submit?: string;
};

export default function CreateAccount({ onSignIn }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "Enter your first name.";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Enter your last name.";
    }

    if (!email.trim()) {
      newErrors.email = "Enter your email.";
    }

    if (!password) {
      newErrors.password = "Enter a password.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setFormErrors({});

      await createUser(firstName, lastName, email, password);

      setIsSuccess(true);
    } catch (err) {
      console.error("Failed to create account:", err);

      let message = "Unable to create account. Please try again.";

      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data?.message;

        if (typeof serverMessage === "string") {
          message = serverMessage;
        }
      }

      setFormErrors({
        submit: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>
          <FontAwesomeIcon icon={faCheck} />
        </div>

        <h3>Account created</h3>

        <p>
          Your ShopFloor account is ready. You can now sign in with your email
          and password.
        </p>

        <button
          type="button"
          className={styles.createButton}
          onClick={onSignIn}
        >
          Sign in
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    );
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
              disabled={isSubmitting}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFormErrors((current) => ({
                  ...current,
                  firstName: undefined,
                  submit: undefined,
                }));
              }}
              placeholder="First name"
            />

            {formErrors.firstName && (
              <span className={styles.fieldError}>
                {formErrors.firstName}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              disabled={isSubmitting}
              onChange={(e) => {
                setLastName(e.target.value);
                setFormErrors((current) => ({
                  ...current,
                  lastName: undefined,
                  submit: undefined,
                }));
              }}
              placeholder="Last name"
            />

            {formErrors.lastName && (
              <span className={styles.fieldError}>
                {formErrors.lastName}
              </span>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="createEmail">Email</label>
          <input
            id="createEmail"
            type="email"
            value={email}
            disabled={isSubmitting}
            onChange={(e) => {
              setEmail(e.target.value);
              setFormErrors((current) => ({
                ...current,
                email: undefined,
                submit: undefined,
              }));
            }}
            placeholder="you@company.com"
          />

          {formErrors.email && (
            <span className={styles.fieldError}>
              {formErrors.email}
            </span>
          )}
        </div>

        <div className={styles.passwordFields}>
          <div className={styles.field}>
            <label htmlFor="createPassword">Password</label>

            <div className={styles.passwordInput}>
              <input
                id="createPassword"
                type={showPassword ? "text" : "password"}
                value={password}
                disabled={isSubmitting}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFormErrors((current) => ({
                    ...current,
                    password: undefined,
                    confirmPassword: undefined,
                    submit: undefined,
                  }));
                }}
                placeholder="Enter password"
              />

              <button
                type="button"
                className={styles.passwordToggle}
                disabled={isSubmitting}
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                />
              </button>
            </div>

            {formErrors.password && (
              <span className={styles.fieldError}>
                {formErrors.password}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword">Confirm password</label>

            <div className={styles.passwordInput}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                disabled={isSubmitting}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setFormErrors((current) => ({
                    ...current,
                    confirmPassword: undefined,
                    submit: undefined,
                  }));
                }}
                placeholder="Confirm password"
              />

              <button
                type="button"
                className={styles.passwordToggle}
                disabled={isSubmitting}
                onClick={() =>
                  setShowConfirmPassword((current) => !current)
                }
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                />
              </button>
            </div>

            {formErrors.confirmPassword && (
              <span className={styles.fieldError}>
                {formErrors.confirmPassword}
              </span>
            )}
          </div>
        </div>

        {formErrors.submit && (
          <p className={styles.submitError}>{formErrors.submit}</p>
        )}

        <button
          type="submit"
          className={styles.createButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className={styles.spinner} />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <FontAwesomeIcon icon={faArrowRight} />
            </>
          )}
        </button>
      </form>

      <p className={styles.signIn}>
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSignIn}
          disabled={isSubmitting}
        >
          Sign in
        </button>
      </p>
    </div>
  );
}