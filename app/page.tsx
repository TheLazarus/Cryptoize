"use client";

import CryptoDetails from "@/components/CryptoDetails";
import { Bitcoin } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Home() {
  const bitcoinRef = useRef(null);
  const binRefOne = useRef(null);
  const binRefTwo = useRef(null);
  const dotRef = useRef(null);

  useGSAP(() => {
    if (bitcoinRef.current) {
      gsap.to(bitcoinRef.current, {
        rotation: "+=360",
      });
    }

    if (dotRef.current) {
      gsap.to(dotRef.current, {
        opacity: 0,
        duration: 2,
        repeat: Infinity,
      });
    }

    if (binRefOne.current && binRefTwo.current) {
      const timeline = gsap.timeline();
      timeline.from(binRefOne.current, { y: -200, rotateZ: 100 });
      timeline.from(binRefTwo.current, { y: -200, rotateZ: 200 });
    }
  }, []);

  return (
    <main className="min-h-screen">
      <div className="p-2 grid place-items-center">
        <h1 className="text-black font-normal text-[3rem] relative md:text-[6rem]">
          <span className="font-extralight">Cryp</span>t
          <span ref={binRefOne} className="text-red-400 inline-block">
            0
          </span>
          <span ref={binRefTwo} className="text-red-400 inline-block">
            1
          </span>
          ze
          <p className="hidden md:inline-block" ref={dotRef}>
            .
          </p>
          <Bitcoin
            ref={bitcoinRef}
            size={200}
            className="absolute top-0 left-0 opacity-10"
          />
        </h1>
        <h2 className="hidden md:block">
          Track Crypto with ease!
        </h2>
      </div>

      <CryptoDetails />
    </main>
  );
}
