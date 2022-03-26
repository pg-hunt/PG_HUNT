import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useStoreState } from "easy-peasy";

function RequireHost() {
  //   const isHost = useStoreState((state) => state.auth.isHost);
  const isHost = true;
  let location = useLocation();

  if (!isHost) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}

export default RequireHost;
