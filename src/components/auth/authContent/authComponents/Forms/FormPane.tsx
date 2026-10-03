import { forwardRef } from "react";
import { LogoMark } from "../../icons";
import { useAuthUI } from "../../../store/auth-ui";
import { ParticleField } from "../ParticleField";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

const HEAD = {
  login: { h: "Sign in to NexaCore Systems", s: "Welcome back — enter your details to continue." },
  register: { h: "Create your account", s: "Start your studio account — takes less than a minute." },
};

export const FormPane = forwardRef<HTMLElement>(function FormPane(_, ref) {


  
  const { shownMode, animating, toggle } = useAuthUI();




  const head = HEAD[shownMode];
  return (
    <main ref={ref} className="absolute inset-y-0 left-0 flex w-full items-center justify-center overflow-y-auto bg-background p-6 sm:p-8 lg:w-1/2 xl:p-14">
      <ParticleField />



      <div className="relative z-10 w-full max-w-xl">

        <div inert={animating || undefined} className="-m-2 rounded-card p-2">
          <div data-reveal className="mb-10 flex items-center gap-2 text-lg font-semibold lg:hidden">
            <LogoMark className="text-xl text-accent" /> NexaCore Systems
          </div>
          <header data-reveal className="mb-8 flex flex-col gap-1.5">
            <h2 className="text-2xl font-semibold tracking-[-0.01em] sm:text-3xl">{head.h}</h2>
            <p className="text-sm text-foreground/55">{head.s}</p>
          </header>


          {shownMode === "login" ? <LoginForm key="login" /> : <RegisterForm key="register" />}

          <p data-reveal className="mt-6 text-center text-sm text-foreground/60">
            {shownMode === "login" ? "Don't have an account? " : "Already have an account? "}


            <button type="button" onClick={toggle} disabled={animating} className="font-medium text-accent hover:underline">
              {shownMode === "login" ? "Create one" : "Sign in instead"}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
});
