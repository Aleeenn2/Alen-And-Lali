import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SpiderLily } from "@/components/SpiderLily";
import { NAMES } from "@/lib/dates";

export const Route = createFileRoute("/letter")({
  component: LetterPage,
});

const GEORGIAN = `ჰეი პატარავ, ეს შენი დიდი დღეა, ის მომენტი, რომელსაც ამდენი ხანი ველოდებოდი. მინდა გითხრა, რომ ჩემი სიყვარული შენდამი ვერ აიხსნება, ვერ გამოჩნდება ისე, როგორც არის — მსოფლიო ამას ვერ გაუძლებდა. მაგრამ მინდა ყველაფერი გაჩვენო, რომ მიხვდე, რამდენად გულწრფელად და ძლიერ მიყვარხარ.

იმედი მაქვს, შენი ეს ლამაზი ღიმილი დღესაც და კიდევ ბევრ მომავალ დღეშიც არ მოგშორდება სახიდან. იმედი მაქვს, კარგად ერთობი მეგობრებთან და ოჯახთან ერთად და ყველა ძალიან კარგად გექცევა. იღიღინე, იცინე, გაიღიმე, იყავი ის პრინცესა, როგორიც ყოველთვის იმსახურებდი რომ ყოფილიყავი. ატარე გვირგვინი, ლამაზი მაისური, ლამაზი კაბა, ლამაზი შორტები ან შარვალი, ლამაზი ფეხსაცმელი, წინდები და ყველაფერი. შენი განსაკუთრებული დღისთვის, 3 ივნისისთვის, მხოლოდ ის მინდა, რომ თავი განსაკუთრებულად იგრძნო და ბედნიერების ცრემლები იტირო — აღარასდროს სევდიანი. ვერ ვითმენ შემდეგი დაბადების დღის და ყველა დანარჩენის შენთან ერთად, პირადად გატარებას. ყოველთვის შენთან ვიქნები, ჩემო ძვირფასო, ჩემო ბაჭია, ჩემო საყვარელო, ჩემო ტკბილო, ჩემო პრინცესავ, ჩემო ცოლო, ჩემო გოგო, ჩემო სიყვარულო. ყოველთვის ატარე ეს ლამაზი ღიმილი, ის ადამიანების დღეებს ანათებს, ჩემსასაც. გილოცავ დაბადების დღეს, ლალი, შენი უსაყვარლესი ბიჭის/ქმრისგან ჰიჰიჰიჰი`;

const ENGLISH = `Haiii cutieeee its meee ykkk the boy the mann who loves you ykk (baby its me Alen) anyways Honey BIG DAY TODAYYYY HELLOOOO BIRTHDAYYY TIMEEEE just look how cute you are everyday but today wowwwwwww gorgeousss thats my girlll im so so so proud of you honey your eyes shine like the first time i crossed them your smile is as beautiful as sunrise i just am so proud of you i know i keep saying it but i cant say enough just how much you did for the past week and how much you fought for tests and art and its really amazing my dear you did it you beat it you proved them all wrong just you with your hardwork nobody else can do this but you Lali you my dear i will always be by your side no matter what happens and just a little bit more time and i can officially call you my wife.

I love you   ·   Volim te   ·   miyvarxar   ·   MWAH`;

type PageKey = "ka" | "en";

function LetterPage() {
  const [page, setPage] = useState<PageKey>("ka");
  const toggle = () => setPage((p) => (p === "ka" ? "en" : "ka"));

  return (
    <section className="relative mx-auto min-h-screen max-w-4xl px-4 pt-28 pb-36 sm:px-6 sm:pt-32 sm:pb-24">
      <div className="pointer-events-none absolute -right-16 top-32 opacity-20 hidden md:block">
        <SpiderLily size={260} />
      </div>
      <div className="pointer-events-none absolute -left-16 bottom-24 opacity-20 hidden md:block">
        <SpiderLily size={220} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-rose-deep sm:text-sm">A letter for {NAMES.her}</p>
        <h1 className="mt-2 font-display text-4xl italic text-foreground sm:text-5xl md:text-6xl">
          With all my heart
        </h1>
      </motion.div>

      {/* Letter stack */}
      <div className="relative z-10 mx-auto mt-10 w-full max-w-3xl sm:mt-12">
        {/* Decorative paper shadows underneath — gives a "stack of letters" feel */}
        <div
          aria-hidden
          className="absolute inset-0 translate-y-2 translate-x-1 rotate-[-1.2deg] rounded-[3px] bg-[oklch(0.96_0.02_30)] shadow-soft"
        />
        <div
          aria-hidden
          className="absolute inset-0 translate-y-1 -translate-x-1 rotate-[0.8deg] rounded-[3px] bg-[oklch(0.97_0.015_30)] shadow-soft"
        />

        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 24, rotate: -0.6, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, rotate: 0.6, filter: "blur(6px)" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              onClick={toggle}
              className="relative cursor-pointer"
            >
              {page === "ka" ? <GeorgianLetter /> : <EnglishLetter />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p className="relative z-10 mt-8 px-4 text-center font-display text-sm italic text-rose-deep sm:mt-10 sm:text-base">
        {page === "ka"
          ? "(tap the page — a second letter waits underneath)"
          : "(tap the page to return to the first letter)"}
      </p>
    </section>
  );
}


/* ---------- Paper ---------- */

function Paper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[3px] px-5 py-9 sm:px-8 sm:py-12 md:px-16 md:py-16"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.985 0.012 60) 0%, oklch(0.975 0.018 30) 100%)",
        boxShadow:
          "0 30px 80px -30px color-mix(in oklab, var(--rose-deep) 35%, transparent), 0 1px 0 rgba(255,255,255,0.7) inset",
        backgroundImage: [
          // subtle paper grain
          "radial-gradient(circle at 18% 12%, color-mix(in oklab, var(--rose-soft) 22%, transparent), transparent 45%)",
          "radial-gradient(circle at 88% 92%, color-mix(in oklab, var(--heart) 14%, transparent), transparent 45%)",
          "repeating-linear-gradient(0deg, transparent 0 38px, color-mix(in oklab, var(--rose-deep) 6%, transparent) 38px 39px)",
          "linear-gradient(180deg, oklch(0.985 0.012 60) 0%, oklch(0.975 0.018 30) 100%)",
        ].join(", "),
      }}
    >
      {/* deckle / aged edges */}
      <div className="pointer-events-none absolute inset-0 rounded-[3px] ring-1 ring-inset ring-[color-mix(in_oklab,var(--rose-deep)_18%,transparent)]" />
      <div
        className="pointer-events-none absolute inset-0 rounded-[3px]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, color-mix(in oklab, var(--rose-deep) 12%, transparent) 100%)",
        }}
      />
      {/* corner flourish */}
      <div className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l border-t border-rose-deep/30 sm:left-6 sm:top-6 sm:h-10 sm:w-10" />
      <div className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r border-t border-rose-deep/30 sm:right-6 sm:top-6 sm:h-10 sm:w-10" />
      <div className="pointer-events-none absolute left-3 bottom-3 h-6 w-6 border-l border-b border-rose-deep/30 sm:left-6 sm:bottom-6 sm:h-10 sm:w-10" />
      <div className="pointer-events-none absolute right-3 bottom-3 h-6 w-6 border-r border-b border-rose-deep/30 sm:right-6 sm:bottom-6 sm:h-10 sm:w-10" />

      <div className="relative">{children}</div>
    </div>
  );
}

/* ---------- Pages ---------- */

function GeorgianLetter() {
  return (
    <Paper>
      <p
        className="text-rose-deep"
        style={{
          fontFamily: '"Dancing Script", cursive',
          fontSize: "clamp(1.15rem, 4vw, 1.5rem)",
        }}
      >
        ჩემო ლალის,
      </p>
      <p
        className="mt-5 whitespace-pre-line text-foreground sm:mt-6"
        style={{
          fontFamily:
            '"Noto Serif Georgian", "Cormorant Garamond", Georgia, serif',
          fontWeight: 500,
          fontStyle: "italic",
          fontSize: "clamp(0.95rem, 3.2vw, 1.15rem)",
          lineHeight: 1.85,
          letterSpacing: "0.005em",
          textAlign: "justify",
        }}
      >
        {GEORGIAN}
      </p>
      <div className="mt-8 flex flex-col items-end sm:mt-10">
        <p
          className="text-rose-deep"
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: "clamp(0.95rem, 3vw, 1.1rem)",
            opacity: 0.85,
          }}
        >
          yours, always —
        </p>
        <p
          className="-mt-1 text-foreground"
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: "clamp(2rem, 7vw, 2.6rem)",
            transform: "rotate(-4deg)",
          }}
        >
          {NAMES.him}
        </p>
      </div>
    </Paper>
  );
}

function EnglishLetter() {
  return (
    <Paper>
      <p
        className="text-rose-deep"
        style={{
          fontFamily: '"Dancing Script", cursive',
          fontSize: "clamp(1.15rem, 4vw, 1.5rem)",
        }}
      >
        Hey my girl,
      </p>
      <p
        className="mt-5 whitespace-pre-line text-foreground sm:mt-6"
        style={{
          fontFamily: '"Dancing Script", "Cormorant Garamond", cursive',
          fontSize: "clamp(1.15rem, 4.2vw, 1.5rem)",
          lineHeight: 1.7,
        }}
      >
        {ENGLISH}
      </p>
      <div className="mt-8 flex flex-col items-end sm:mt-10">
        <p
          className="text-rose-deep"
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: "clamp(0.95rem, 3vw, 1.1rem)",
            opacity: 0.85,
          }}
        >
          your boy —
        </p>
        <p
          className="-mt-1 text-foreground"
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: "clamp(2rem, 7vw, 2.6rem)",
            transform: "rotate(-4deg)",
          }}
        >
          {NAMES.him}
        </p>
      </div>
    </Paper>
  );
}
