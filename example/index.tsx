import React from "react";
import ReactDOM from "react-dom/client";
import { useGoogleIdentity } from "../src/index";

const UnitTestComponent = () => {
  const CLIENT_ID = "my client id";
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
    <UnitTestComponent />
  </React.StrictMode>
);
