import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { SpiderLily } from "@/components/SpiderLily";
import { NAMES } from "@/lib/dates";

export const Route = createFileRoute("/")({
  component: Index,
});

const MESSAGE = `From the first moment I saw you, the world felt a little warmer. You are my favorite thought in every quiet moment, my softest smile, my home. Every day with you blooms like your spider lilies — bright, delicate, and impossibly beautiful. I love you, always.`;

function Index() {
  const words = MESSAGE.split(" ");

  return (
    <section className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 pt-28 pb-36 text-center sm:px-6 sm:pt-32 sm:pb-24">
      {/* Spider lily floating behind */}
      <div className="pointer-events-none absolute -right-24 top-16 opacity-40 sm:-right-10 sm:top-24 sm:opacity-70 md:right-0 md:top-16">
        <SpiderLily size={420} />
      </div>
      <div className="pointer-events-none absolute -left-20 bottom-10 hidden opacity-40 md:block">
        <SpiderLily size={260} />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 mb-4 text-xs uppercase tracking-[0.4em] text-rose-deep sm:text-sm"
      >
        For {NAMES.her}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative z-10 text-5xl italic leading-[1.05] text-foreground sm:text-6xl md:text-8xl"
      >
        my whole heart,
        <br />
        <span className="text-heart">in one girl.</span>
      </motion.h1>

      <p className="relative z-10 mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 sm:mt-8 sm:text-lg md:text-xl">
        {words.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 + i * 0.05 }}
            className="inline-block"
          >
            {w}&nbsp;
          </motion.span>
        ))}
      </p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 + words.length * 0.05 + 0.4, duration: 1 }}
        className="relative z-10 mt-10 font-display text-2xl italic text-rose-deep"
      >
        — {NAMES.him}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="relative z-10 mt-14"
      >
        <Link
          to="/our-story"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground shadow-soft transition hover:scale-105"
        >
          <Heart className="h-4 w-4 fill-current transition group-hover:scale-125" />
          Our story
        </Link>
      </motion.div>
    </section>
  );
}
