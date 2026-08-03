import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { Lock, Eye, EyeOff, ArrowRight, ArrowLeft, KeyRound } from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import { ROUTES } from "../../routes/routeConstants";
import { resetPassword } from "../../api/authApi";

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: 48,
    borderRadius: "8px",
    backgroundColor: "rgba(255,255,255,0.035)",
    color: "#fff",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&.Mui-focused fieldset": { borderColor: "#e50914" },
    "&.Mui-error fieldset": { borderColor: "rgba(239,68,68,0.7)" },
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.4)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#e50914" },
  "& .MuiFormHelperText-root": { color: "#f87171", marginLeft: 0 },
};

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

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

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Use at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your new password.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setApiError("");

    if (!token) {
      setApiError("This reset link is missing its token. Please request a new one.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword({ token, password: formData.password });
      setIsDone(true);
    } catch (error) {
      console.error("Reset password failed:", error);

      if (!error.response) {
        setApiError("Unable to connect to the server. Please try again.");
        return;
      }

      const responseData = error.response.data;
      let message = "This reset link is invalid or has expired.";

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
          p-[clamp(1.25rem,4vw,2.5rem)]
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

        {!isDone ? (
          <>
            {/* HEADER */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e50914]">
                Account recovery
              </p>

              <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-black tracking-[-0.035em] text-white">
                Reset password
              </h1>

              <p className="mt-2 text-sm leading-6 text-white/40">
                Choose a new password to secure your account.
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
            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
              <TextField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="New password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                error={Boolean(errors.password)}
                helperText={errors.password}
                fullWidth
                sx={textFieldSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={18} className="text-white/30" />
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
                          sx={{ color: "rgba(255,255,255,0.35)", "&:hover": { color: "#fff" } }}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm new password"
                autoComplete="new-password"
                placeholder="Re-enter your new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isSubmitting}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                fullWidth
                sx={textFieldSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={18} className="text-white/30" />
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
                          sx={{ color: "rgba(255,255,255,0.35)", "&:hover": { color: "#fff" } }}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                disabled={isSubmitting}
                endIcon={!isSubmitting && <ArrowRight size={18} />}
                sx={{
                  minHeight: 48,
                  borderRadius: "8px",
                  backgroundColor: "#e50914",
                  color: "#fff",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#f6121d" },
                  "&:active": { transform: "scale(0.99)" },
                  "&.Mui-disabled": { backgroundColor: "#e50914", opacity: 0.6, color: "#fff" },
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <CircularProgress size={16} thickness={5} sx={{ color: "#fff" }} />
                    Resetting password...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
              <KeyRound size={28} className="text-emerald-400" />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
              Password updated
            </p>

            <h1 className="mt-3 text-[clamp(1.6rem,4vw,2.2rem)] font-black tracking-[-0.035em] text-white">
              You're all set
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/40">
              Your password has been reset successfully. You can now sign in
              with your new password.
            </p>

            <Link
              to={ROUTES.LOGIN}
              className="
                mt-8 inline-flex
                min-h-12 w-full
                items-center justify-center
                rounded-lg
                bg-[#e50914]
                px-5 py-3
                font-bold text-white
                transition duration-200
                hover:bg-[#f6121d]
                active:scale-[0.99]
              "
            >
              Continue to Sign In
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        )}

        {/* BACK TO LOGIN */}
        {!isDone && (
          <div className="mt-7 border-t border-white/[0.07] pt-6 text-center">
            <Link
              to={ROUTES.LOGIN}
              className="inline-flex items-center gap-2 text-sm font-bold text-white/40 transition-colors duration-200 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}

export default ResetPassword;