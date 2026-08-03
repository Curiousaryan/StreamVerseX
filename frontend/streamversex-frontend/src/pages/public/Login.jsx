import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import { ROUTES } from "../../routes/routeConstants";
import { login as loginApi } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  // AuthContext login function
  const { login } = useAuth();

  // =========================
  // FORM STATE
  // =========================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }

    if (apiError) {
      setApiError("");
    }
  };

  // =========================
  // VALIDATION
  // =========================

  const validateForm = () => {
    const newErrors = {};

    const email = formData.email.trim();

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // LOGIN
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setApiError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Call Spring Boot login API
      const data = await loginApi({
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("Login successful:", data);

      // 2. Store authentication through AuthContext
      login(data);

      // 3. Redirect according to role
      if (data.role === "ADMIN") {
        navigate(ROUTES.ADMIN_DASHBOARD, {
          replace: true,
        });
      } else {
        navigate(ROUTES.HOME, {
          replace: true,
        });
      }
    } catch (error) {
      console.error("Login failed:", error);

      if (!error.response) {
        setApiError(
          "Unable to connect to the server. Please try again."
        );

        return;
      }

      const responseData = error.response.data;

      let message =
        "Unable to sign in. Check your email and password.";

      if (typeof responseData === "string") {
        message = responseData;
      } else if (responseData?.message) {
        message = responseData.message;
      } else if (responseData?.error) {
        message = responseData.error;
      }

      setApiError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <AuthLayout>
      <div
        className="
          relative overflow-hidden
          rounded-[clamp(1rem,2vw,1.5rem)]
          border border-white/10
          bg-[#0a0a0a]/90
          p-[clamp(1.25rem,4vw,2.5rem)]
          shadow-2xl shadow-black/50
          backdrop-blur-xl
        "
      >
        {/* Top red highlight */}

        <div
          aria-hidden="true"
          className="
            absolute inset-x-[15%]
            top-0 h-px
            bg-gradient-to-r
            from-transparent
            via-[#e50914]/80
            to-transparent
          "
        />

        {/* =========================
            HEADER
        ========================= */}

        <div>
          <p
            className="
              text-xs font-bold
              uppercase
              tracking-[0.2em]
              text-[#e50914]
            "
          >
            Welcome back
          </p>

          <h1
            className="
              mt-3
              text-[clamp(1.8rem,4vw,2.6rem)]
              font-black
              tracking-[-0.035em]
              text-white
            "
          >
            Sign in
          </h1>

          <p
            className="
              mt-2
              text-sm leading-6
              text-white/40
            "
          >
            Enter your account details to continue.
          </p>
        </div>

        {/* =========================
            BACKEND ERROR
        ========================= */}

        {apiError && (
          <div
            role="alert"
            className="
              mt-6
              rounded-lg
              border border-red-500/20
              bg-red-500/10
              px-4 py-3
              text-sm
              text-red-300
            "
          >
            {apiError}
          </div>
        )}

        {/* =========================
            FORM
        ========================= */}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 space-y-5"
        >
          {/* EMAIL */}

          <div>
            <label
              htmlFor="email"
              className="
                mb-2 block
                text-sm font-semibold
                text-white/70
              "
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "email-error" : undefined
              }
              className={`
                min-h-12
                w-full
                rounded-lg
                border
                bg-white/[0.035]
                px-4
                text-[16px]
                text-white
                outline-none
                transition
                duration-200
                placeholder:text-white/20
                focus:bg-white/[0.05]
                disabled:cursor-not-allowed
                disabled:opacity-60

                ${
                  errors.email
                    ? `
                      border-red-500/70
                      focus:border-red-500
                    `
                    : `
                      border-white/10
                      focus:border-[#e50914]/70
                    `
                }
              `}
            />

            {errors.email && (
              <p
                id="email-error"
                className="
                  mt-2
                  text-xs
                  text-red-400
                "
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}

          <div>
            <div
              className="
                mb-2
                flex items-center
                justify-between
                gap-4
              "
            >
              <label
                htmlFor="password"
                className="
                  text-sm font-semibold
                  text-white/70
                "
              >
                Password
              </label>

              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="
                  text-xs font-semibold
                  text-white/40
                  transition-colors
                  duration-200
                  hover:text-[#ff3944]
                "
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password
                    ? "password-error"
                    : undefined
                }
                className={`
                  min-h-12
                  w-full
                  rounded-lg
                  border
                  bg-white/[0.035]
                  px-4
                  pr-16
                  text-[16px]
                  text-white
                  outline-none
                  transition
                  duration-200
                  placeholder:text-white/20
                  focus:bg-white/[0.05]
                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  ${
                    errors.password
                      ? `
                        border-red-500/70
                        focus:border-red-500
                      `
                      : `
                        border-white/10
                        focus:border-[#e50914]/70
                      `
                  }
                `}
              />

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="
                  absolute
                  right-3 top-1/2
                  -translate-y-1/2
                  px-1 py-2
                  text-xs font-semibold
                  text-white/35
                  transition-colors
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p
                id="password-error"
                className="
                  mt-2
                  text-xs
                  text-red-400
                "
              >
                {errors.password}
              </p>
            )}
          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              inline-flex
              min-h-12
              w-full
              items-center
              justify-center
              rounded-lg
              bg-[#e50914]
              px-5 py-3
              font-bold
              text-white
              transition
              duration-200
              hover:bg-[#f6121d]
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span
                  className="
                    h-4 w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-white/30
                    border-t-white
                  "
                />

                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* REGISTER */}

        <div
          className="
            mt-7
            border-t
            border-white/[0.07]
            pt-6
            text-center
          "
        >
          <p className="text-sm text-white/40">
            New to StreamVerseX?{" "}

            <Link
              to={ROUTES.REGISTER}
              className="
                font-bold
                text-white
                transition-colors
                duration-200
                hover:text-[#e50914]
              "
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;