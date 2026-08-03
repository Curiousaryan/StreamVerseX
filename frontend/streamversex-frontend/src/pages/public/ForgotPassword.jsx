import { useState } from "react";
import { Link } from "react-router-dom";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { Mail, ArrowRight, ArrowLeft, MailCheck } from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import { ROUTES } from "../../routes/routeConstants";
import { forgotPassword } from "../../api/authApi";

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

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);

    if (error) {
      setError("");
    }

    if (apiError) {
      setApiError("");
    }
  };

  const validate = () => {
    const trimmed = email.trim();

    if (!trimmed) {
      setError("Email is required.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setApiError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await forgotPassword(email.trim());
      setIsSent(true);
    } catch (error) {
      console.error("Forgot password request failed:", error);

      if (!error.response) {
        setApiError("Unable to connect to the server. Please try again.");
        return;
      }

      const responseData = error.response.data;
      let message = "Unable to send the reset link. Please try again.";

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

        {!isSent ? (
          <>
            {/* HEADER */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e50914]">
                Account recovery
              </p>

              <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-black tracking-[-0.035em] text-white">
                Forgot password?
              </h1>

              <p className="mt-2 text-sm leading-6 text-white/40">
                Enter the email linked to your account and we'll send you a
                link to reset your password.
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
                id="email"
                name="email"
                type="email"
                label="Email address"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleChange}
                disabled={isSubmitting}
                error={Boolean(error)}
                helperText={error}
                fullWidth
                sx={textFieldSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={18} className="text-white/30" />
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
                    Sending link...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
              <MailCheck size={28} className="text-emerald-400" />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
              Check your inbox
            </p>

            <h1 className="mt-3 text-[clamp(1.6rem,4vw,2.2rem)] font-black tracking-[-0.035em] text-white">
              Reset link sent
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/40">
              We've sent a password reset link to{" "}
              <span className="font-semibold text-white/70">{email}</span>.
              Follow the link to choose a new password.
            </p>

            <Button
              onClick={() => setIsSent(false)}
              fullWidth
              sx={{
                mt: 4,
                minHeight: 48,
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.035)",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.07)", color: "#fff" },
              }}
            >
              Use a different email
            </Button>
          </div>
        )}

        {/* BACK TO LOGIN */}
        <div className="mt-7 border-t border-white/[0.07] pt-6 text-center">
          <Link
            to={ROUTES.LOGIN}
            className="inline-flex items-center gap-2 text-sm font-bold text-white/40 transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;


// function ForgotPassword(){
//     return(<>
    
//     <h1>ForgotPassword Page</h1>
    
//     </>);
// }

// export default ForgotPassword;