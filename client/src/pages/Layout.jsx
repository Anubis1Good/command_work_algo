import { Suspense } from "react";
import { AuthProvider } from "../components/AuthProvider";
import Header from "../components/Header/Header";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (<>

        <Toaster />
      <AuthProvider>
        <Header />
        {children}
      </AuthProvider>
      </>
  );
}
