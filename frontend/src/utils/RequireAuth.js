import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useStoreState } from "easy-peasy";

function RequireAuth() {
  //   const isLoggedIn = useStoreState((state) => state.auth.isLoggedIn);
  const isLoggedIn = true;
  let location = useLocation();

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/landing" state={{ from: location }} />;
  }

  return <Outlet />;
}

export default RequireAuth;
