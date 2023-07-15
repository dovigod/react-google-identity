import React from "react";
import ReactDOM from "react-dom/client";
import { useGoogleIdentity } from "../dist/index";
const A = () => {
  const CLIENT_ID =
    "195840463461-tcb4a2p2o10of6kpvpeqnnbmj2k075hr.apps.googleusercontent.com";
  const { hostRef } = useGoogleIdentity({
    clientId: CLIENT_ID,
    callback: (res: any) => alert(res),
    buttonRenderOption: {
      text: "signup_with",
    },
  });
  return <div ref={hostRef} />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <A />
  </React.StrictMode>
);
