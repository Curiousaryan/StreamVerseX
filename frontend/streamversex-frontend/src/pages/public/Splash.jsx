import { useState } from "react";
import { Navigate } from "react-router-dom";

import SplashLogo from "../../components/splash/SplashLogo";
import { ROUTES } from "../../routes/routeConstants";

function Splash() {
  const [introFinished, setIntroFinished] = useState(false);

  if (introFinished) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      return <Navigate to={ROUTES.LANDING} replace />;
    }

    if (role === "ADMIN") {
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    }

    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <main
      className="fixed inset-0 overflow-hidden bg-black"
      aria-label="StreamVerseX loading"
      aria-busy="true"
    >
      <SplashLogo
        onAnimationComplete={() => setIntroFinished(true)}
      />
    </main>
  );
}

export default Splash;