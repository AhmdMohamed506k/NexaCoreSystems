import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

type WelcomeLoaderProps = {userName: string; onComplete?: () => void;};

export function WelcomeLoader({ userName, onComplete,}: WelcomeLoaderProps) {


  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const center = el.querySelector<HTMLElement>(".hd-loader-center");
    const progressBar =el.querySelector<HTMLElement>(".hd-loader-progress");
    const counter = el.querySelector<HTMLElement>(".hd-loader-counter");
    const bottomProgress = el.querySelector<HTMLElement>( ".hd-loader-bottom-progress");
    const copy = el.querySelector<HTMLElement>(".hd-loader-copy");



    if (!center ||!progressBar || !counter || !bottomProgress ||!copy) {return;}

    document.body.classList.add("hd-lock-scroll");

   
    if ( window.matchMedia("(prefers-reduced-motion: reduce)").matches) {


      gsap.set(el, { yPercent: 0,});
      gsap.set(progressBar, {scaleX: 1,});
      gsap.set(bottomProgress, { scaleX: 1,});

      counter.textContent = "100";

      const timer = window.setTimeout(() => { document.body.classList.remove( "hd-lock-scroll"); onComplete?.();}, 350);

      return () => {window.clearTimeout(timer); document.body.classList.remove("hd-lock-scroll"); };
    }

  
    gsap.set(el, { yPercent: -100,});
    gsap.set(center, {opacity: 0, y: 18,});
    gsap.set(progressBar, {scaleX: 0, transformOrigin: "left center", });
    gsap.set(bottomProgress, { scaleX: 0,transformOrigin: "left center", });
    counter.textContent = "000";
    const proxy = {value: 0, };

 
    const tl = gsap.timeline({

      delay: 0.08,
      onComplete: () => { document.body.classList.remove("hd-lock-scroll"); onComplete?.();},

    });

    tl.to(el, { yPercent: 0, duration: 0.72, ease: "power4.out",}) .to(center,{ opacity: 1, y: 0,duration: 0.42,ease: "power3.out",},"-=0.2")
    .to(proxy, {value: 100,duration: 1.35,ease: "power3.inOut",

    onUpdate: () => {
      const value = proxy.value / 100;
      progressBar.style.transform =`scaleX(${value})`;
      bottomProgress.style.transform = `scaleX(${value})`;
      counter.textContent =String( Math.round(proxy.value) ).padStart(3, "0");},
    })



    .to(copy,{opacity: 0,y: -12,duration: 0.22,ease: "power2.out",},"-=0.18")
    .to(center,{ opacity: 0, y: -10, duration: 0.22, ease: "power2.out",},"<")
    .to(el,{yPercent: -100,duration: 0.75,ease: "power4.inOut",},"+=0.05");

    return () => {tl.kill();document.body.classList.remove("hd-lock-scroll");};


  }, [userName, onComplete]);




  return (
    <div ref={ref} className="hd-loader" aria-label="Loading your Lumora dashboard">
      {/* ============================================
          TOP / WELCOME COPY
          ============================================ */}

      <div className="hd-loader-copy">
        <div className="hd-loader-logo">
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="currentColor"
            aria-hidden="true"
            className="text-[30px] text-accent-from"
          >
            <path d="M12 2c.6 4.6 2.4 6.9 7 7.5v1c-4.6.6-6.4 2.9-7 7.5h-1c-.6-4.6-2.4-6.9-7-7.5v-1c4.6-.6 6.4-2.9 7-7.5h1Z" />
            <circle
              cx="19"
              cy="19"
              r="2.2"
            />
          </svg>

          <span>LUMORA</span>
        </div>

        <div>
          <p className="hd-eyebrow hd-eyebrow-light">
            <span />
            Private studio
          </p>

          <h2>
            Welcome back, {firstNameFor(userName)}.
          </h2>

          <p>
            Loading your studio…
          </p>
        </div>
      </div>

      {/* ============================================
          CENTER LOADER
          ============================================ */}

      <div className="hd-loader-center" aria-hidden="true" >
        <div className="hd-loader-center-logo">
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="currentColor"
            aria-hidden="true"
            className="text-[30px] text-accent-from"
          >
            <path d="M12 2c.6 4.6 2.4 6.9 7 7.5v1c-4.6.6-6.4 2.9-7 7.5h-1c-.6-4.6-2.4-6.9-7-7.5v-1c4.6-.6 6.4-2.9 7-7.5h1Z" />
            <circle
              cx="19"
              cy="19"
              r="2.2"
            />
          </svg>

          <span>LUMORA</span>
        </div>

        <p className="hd-loader-center-label">
          Preparing your workspace
        </p>

        <div className="hd-loader-center-track">
          <span className="hd-loader-progress" />
        </div>

        <div className="hd-loader-counter-row">
          <span>Loading</span>

          <span className="hd-loader-counter">
            000
          </span>
        </div>
      </div>

      {/* ============================================
          BOTTOM PROGRESS
          ============================================ */}

      <div className="hd-loader-track hd-loader-bottom-track">
        <span className="hd-loader-bottom-progress" />
      </div>
    </div>
  );
}

function firstNameFor(name: string) {
  return (name.trim().split(/\s+/)[0] ||"there");
}