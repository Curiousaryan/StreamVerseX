import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import { ROUTES } from "../../routes/routeConstants";
import { register } from "../../api/authApi";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: 52,
    borderRadius: "10px",
    backgroundColor: "rgba(255,255,255,0.03)",
    color: "#fff",
    fontSize: "0.95rem",
    transition: "background-color 0.2s ease, border-color 0.2s ease",
    "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.16)" },
    "&.Mui-focused": { backgroundColor: "rgba(255,255,255,0.045)" },
    "&.Mui-focused fieldset": { borderColor: "#e50914", borderWidth: "1.5px" },
    "&.Mui-error fieldset": { borderColor: "rgba(239,68,68,0.6)" },
  },
  "& .MuiOutlinedInput-input": { padding: "14px 12px" },
  "& .MuiOutlinedInput-input::placeholder": {
    color: "rgba(255,255,255,0.2)",
    opacity: 1,
  },
  "& .MuiFormHelperText-root": {
    color: "#f87171",
    marginLeft: 0,
    marginTop: "6px",
    fontSize: "0.75rem",
  },
};

const labelClass = "mb-2 block text-sm font-semibold text-white/70";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({ ...previous, [name]: value }));

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: "" }));
    }

    if (apiError) {
      setApiError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name) {
      newErrors.name = "Full name is required.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Use at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setApiError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      navigate(ROUTES.LOGIN, {
        replace: true,
        state: { registered: true },
      });
    } catch (error) {
      console.error("Registration failed:", error);

      if (!error.response) {
        setApiError("Unable to connect to the server. Please try again.");
        return;
      }

      const responseData = error.response.data;
      let message = "Unable to create your account. Please try again.";

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

  return (
    <AuthLayout>
      <div
        className="
          relative overflow-hidden
          rounded-[clamp(1rem,2vw,1.5rem)]
          border border-white/10
          bg-[#0a0a0a]/90
          p-[clamp(1.5rem,4vw,2.75rem)]
          shadow-2xl shadow-black/50
          backdrop-blur-xl
        "
      >
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

        {/* HEADER */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e50914]">
            Join StreamVerseX
          </p>

          <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-black tracking-[-0.035em] text-white">
            Create account
          </h1>

          <p className="mt-2 text-sm leading-6 text-white/40">
            Sign up to start building your watchlist.
          </p>
        </div>

        {/* BACKEND ERROR */}
        {apiError && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {apiError}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} noValidate className="mt-9 space-y-6">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full name
            </label>
            <TextField
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              error={Boolean(errors.name)}
              helperText={errors.name}
              fullWidth
              sx={fieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={17} className="text-white/25" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email address
            </label>
            <TextField
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              error={Boolean(errors.email)}
              helperText={errors.email}
              fullWidth
              sx={fieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={17} className="text-white/25" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <TextField
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              error={Boolean(errors.password)}
              helperText={errors.password}
              fullWidth
              sx={fieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={17} className="text-white/25" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((previous) => !previous)}
                        edge="end"
                        size="small"
                        disabled={isSubmitting}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        sx={{ color: "rgba(255,255,255,0.3)", "&:hover": { color: "#fff" } }}
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm password
            </label>
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isSubmitting}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              fullWidth
              sx={fieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={17} className="text-white/25" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword((previous) => !previous)
                        }
                        edge="end"
                        size="small"
                        disabled={isSubmitting}
                        aria-label={
                          showConfirmPassword ? "Hide password" : "Show password"
                        }
                        sx={{ color: "rgba(255,255,255,0.3)", "&:hover": { color: "#fff" } }}
                      >
                        {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            endIcon={!isSubmitting && <ArrowRight size={18} />}
            sx={{
              mt: 2,
              minHeight: 52,
              borderRadius: "10px",
              backgroundColor: "#e50914",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.95rem",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#f6121d", boxShadow: "none" },
              "&:active": { transform: "scale(0.99)" },
              "&.Mui-disabled": { backgroundColor: "#e50914", opacity: 0.6, color: "#fff" },
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <CircularProgress size={16} thickness={5} sx={{ color: "#fff" }} />
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        {/* LOGIN LINK */}
        <div className="mt-8 border-t border-white/[0.07] pt-6 text-center">
          <p className="text-sm text-white/40">
            Already have an account?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="font-bold text-white transition-colors duration-200 hover:text-[#e50914]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
} 

export default Register;