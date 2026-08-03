import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { Loader2, CheckCircle2, XCircle } from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import { ROUTES } from "../../routes/routeConstants";
import { verifyEmail } from "../../api/authApi";

function VerifyEmail() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const verificationStarted = useRef(false);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(
    "We're verifying your email address."
  );

  useEffect(() => {
    /*
     * React StrictMode can run effects twice during development.
     * Prevent duplicate verification requests.
     */
    if (verificationStarted.current) {
      return;
    }

    verificationStarted.current = true;

    const handleVerification = async () => {
      if (!token) {
        setStatus("error");
        setMessage("The verification link is missing its token.");
        return;
      }

      try {
        const data = await verifyEmail(token);

        setStatus("success");

        if (typeof data === "string") {
          setMessage(data);
        } else {
          setMessage(
            data?.message || "Your email has been verified successfully."
          );
        }
      } catch (error) {
        console.error("Email verification failed:", error);

        setStatus("error");

        if (!error.response) {
          setMessage("Unable to connect to the server. Please try again.");
          return;
        }

        const responseData = error.response.data;

        if (typeof responseData === "string") {
          setMessage(responseData);
        } else {
          setMessage(
            responseData?.message ||
              responseData?.error ||
              "The verification link is invalid or has expired."
          );
        }
      }
    };

    handleVerification();
  }, [token]);

  return (
    <AuthLayout>
      <div
        className="
          relative overflow-hidden
          rounded-[clamp(1rem,2vw,1.5rem)]
          border border-white/10
          bg-[#0a0a0a]/90
          p-[clamp(1.5rem,5vw,3rem)]
          text-center
          shadow-2xl shadow-black/50
          backdrop-blur-xl
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute inset-x-[15%] top-0 h-px
            bg-gradient-to-r
            from-transparent
            via-[#e50914]/80
            to-transparent
          "
        />

        {/* LOADING */}
        {status === "loading" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#e50914]/20 bg-[#e50914]/10">
              <CircularProgress size={28} thickness={4} sx={{ color: "#e50914" }} />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#e50914]">
              StreamVerseX
            </p>

            <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-black tracking-[-0.035em] text-white">
              Verifying your email
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/40">
              {message}
            </p>

            <p className="mt-5 flex items-center justify-center gap-2 text-xs text-white/20">
              <Loader2 size={14} className="animate-spin" />
              This should only take a moment.
            </p>
          </>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
              <CheckCircle2 size={30} className="text-emerald-400" />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
              Verification complete
            </p>

            <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-black tracking-[-0.035em] text-white">
              Email verified
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/40">
              {message}
            </p>

            <Button
              component={Link}
              to={ROUTES.LOGIN}
              fullWidth
              sx={{
                mt: 4,
                minHeight: 48,
                borderRadius: "8px",
                backgroundColor: "#e50914",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { backgroundColor: "#f6121d" },
                "&:active": { transform: "scale(0.99)" },
              }}
            >
              Continue to Sign In
            </Button>
          </>
        )}

        {/* ERROR */}
        {status === "error" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
              <XCircle size={30} className="text-red-400" />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              Verification failed
            </p>

            <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-black tracking-[-0.035em] text-white">
              Link couldn't be verified
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/40">
              {message}
            </p>

            <div className="mt-8 space-y-3">
              <Button
                component={Link}
                to={ROUTES.LOGIN}
                fullWidth
                sx={{
                  minHeight: 48,
                  borderRadius: "8px",
                  backgroundColor: "#e50914",
                  color: "#fff",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#f6121d" },
                }}
              >
                Go to Sign In
              </Button>

              <Button
                component={Link}
                to={ROUTES.REGISTER}
                fullWidth
                sx={{
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
                Create Account
              </Button>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}

export default VerifyEmail;