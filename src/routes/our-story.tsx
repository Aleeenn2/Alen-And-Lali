import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart, Sparkles, Feather } from "lucide-react";
import { SpiderLily } from "@/components/SpiderLily";
import { MET_DATE, TOGETHER_DATE, THOUGHTS_DATE, NAMES } from "@/lib/dates";

export const Route = createFileRoute("/our-story")({
  component: OurStory,
});

function useTimeSince(date: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  let years = now.getFullYear() - date.getFullYear();
  let months = now.getMonth() - date.getMonth();
  let days = now.getDate() - date.getDate();
  let hours = now.getHours() - date.getHours();
  let minutes = now.getMinutes() - date.getMinutes();
  let seconds = now.getSeconds() - date.getSeconds();

  if (seconds < 0) { seconds += 60; minutes -= 1; }
  if (minutes < 0) { minutes += 60; hours -= 1; }
  if (hours < 0) { hours += 24; days -= 1; }
  if (days < 0) {
    const prev = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prev; months -= 1;
  }
  if (months < 0) { months += 12; years -= 1; }

  return { years, months, days, hours, minutes, seconds };
}

function TimerUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-card/70 shadow-soft ring-1 ring-border backdrop-blur sm:h-20 sm:w-20 md:h-24 md:w-24">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: -28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 28, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center font-display text-2xl text-foreground sm:text-4xl md:text-5xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[10px] sm:tracking-[0.25em]">{label}</span>
    </div>
  );
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function OurStory() {
  const since = useTimeSince(TOGETHER_DATE);
  const metToTogether = daysBetween(MET_DATE, TOGETHER_DATE);

  return (
    <section className="relative mx-auto min-h-screen max-w-5xl px-5 pt-28 pb-36 sm:px-6 sm:pt-32 sm:pb-24">
      <div className="pointer-events-none absolute -right-16 top-40 opacity-30 hidden md:block">
        <SpiderLily size={280} />
      </div>
      <div className="pointer-events-none absolute -left-16 bottom-20 opacity-30 hidden md:block">
        <SpiderLily size={220} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-rose-deep sm:text-sm">Together since</p>
        <h1 className="mt-2 font-display text-3xl italic text-foreground sm:text-5xl md:text-6xl">
          {formatDate(TOGETHER_DATE)}
        </h1>
      </motion.div>

      {/* Live timer */}
      <div className="relative z-10 mx-auto mt-8 grid grid-cols-3 justify-items-center gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 md:gap-4">
        <TimerUnit value={since.years} label="Years" />
        <TimerUnit value={since.months} label="Months" />
        <TimerUnit value={since.days} label="Days" />
        <TimerUnit value={since.hours} label="Hours" />
        <TimerUnit value={since.minutes} label="Min" />
        <TimerUnit value={since.seconds} label="Sec" />
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="relative z-10 mx-auto mt-24 max-w-3xl"
      >
        <h2 className="text-center font-display text-2xl italic text-foreground sm:text-3xl">The days that made us</h2>

        <div className="relative mt-12">
          {/* gradient line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-soft via-heart to-rose-deep md:left-1/2 md:-translate-x-1/2" />

          {/* Met */}
          <TimelineItem
            side="left"
            icon={<Heart className="h-5 w-5 fill-current" />}
            date={formatDate(MET_DATE)}
            title="The day we met"
            text="The first time our worlds touched."
          />

          {/* First thoughts */}
          <TimelineItem
            side="right"
            icon={<Feather className="h-5 w-5" />}
            date={formatDate(THOUGHTS_DATE)}
            title="The first spark"
            text="The first time my thoughts changed for love."
          />

          {/* Together */}
          <TimelineItem
            side="left"
            icon={<Sparkles className="h-5 w-5" />}
            date={formatDate(TOGETHER_DATE)}
            title="The day we became us"
            text="And every day since has been the best one yet."
            highlight
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="relative z-10 mt-20 text-center font-display text-xl italic text-rose-deep"
      >
        {NAMES.him} &nbsp;♥&nbsp; {NAMES.her}
      </motion.p>
    </section>
  );
}

function TimelineItem({
  side,
  icon,
  date,
  title,
  text,
  highlight,
}: {
  side: "left" | "right";
  icon: React.ReactNode;
  date: string;
  title: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative mb-12 md:mb-16"
    >
      {/* Icon node on the line */}
      <div className="absolute left-6 top-4 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft md:left-1/2">
        {icon}
      </div>

      {/* Card: mobile = full width offset from line; desktop = left or right half */}
      <div
        className={`pl-16 md:pl-0 md:w-1/2 ${
          side === "left" ? "md:pr-12" : "md:ml-auto md:pl-12"
        }`}
      >
        <div
          className={`rounded-2xl bg-card/85 p-5 shadow-soft ring-1 backdrop-blur sm:p-6 ${
            highlight ? "ring-heart/40" : "ring-border"
          }`}
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-rose-deep sm:text-xs sm:tracking-[0.3em]">{date}</p>
          <h3 className="mt-1 font-display text-xl italic text-foreground sm:text-2xl">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/75">{text}</p>
        </div>
      </div>
    </motion.div>
  );
}
