/* eslint-disable react/prop-types */
import { AuthProvider } from "../components/AuthProvider";
import Header from "../components/Header/Header";
import { Toaster } from "react-hot-toast";
import {isMobile } from "react-device-detect";

export default function Layout({ children }) {
  return (<>

        <Toaster position={isMobile ? "top-right" : "bottom-right"} />
      <AuthProvider>
        <Header />
        {children}
      </AuthProvider>
      </>
  );
}
