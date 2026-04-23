"use client";

import { useEffect, useState } from "react";


import { Navbar } from "./Components/Layout/Navbar";
import Loading from "./loading";
import { Providers } from "./Provider";
import Footer from "./Components/Layout/Footer";
import { Toaster } from "react-hot-toast";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const visited = localStorage.getItem("visited");

    if (!visited) {
      setTimeout(() => {
        localStorage.setItem("visited", "true");
        setLoading(false);
      }, 4000);
    } else {
      setLoading(false);
    }
  }, []);

  // 🔥 BLOCK EVERYTHING
  if (loading) {
    return <Loading/>;
  }

  // ✅ AFTER LOADING
  return (
    <>
      <Navbar />
        <Providers>
          {children}
          <Toaster  position="top-right"/>
        </Providers>
        <Footer />
    </>
  );
}