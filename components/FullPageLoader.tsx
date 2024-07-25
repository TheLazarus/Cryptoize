"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BitcoinIcon } from "lucide-react";
import { useRef } from "react";

export default function FullPageLoader() {
  const loaderRef = useRef(null);

  useGSAP(() => {
    if (loaderRef.current) {
      gsap.to(loaderRef.current, {
        rotateX: 200,
        repeat: Infinity,
      });
    }
  }, []);

  return (
    <main className="min-h-screen grid place-items-center">
      <BitcoinIcon ref={loaderRef} size={40} />
    </main>
  );
}
