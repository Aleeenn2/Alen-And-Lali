import { Outlet, Link, createRootRoute, useRouter, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { MusicPlayer } from "@/components/MusicPlayer";
import { FloatingHearts } from "@/components/FloatingHearts";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl text-foreground">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">This page got lost in the petals.</p>
        <div className="mt-6">
          <Link to="/" className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:opacity-90">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl text-foreground">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function Nav() {
  return (
    <nav className="fixed top-4 left-1/2 z-40 -translate-x-1/2 rounded-full bg-card/70 px-1.5 py-1 shadow-soft backdrop-blur-md ring-1 ring-border sm:top-6 sm:px-2 sm:py-1.5">
      <div className="flex items-center gap-0.5 text-xs sm:gap-1 sm:text-sm">
        <Link
          to="/"
          className="rounded-full px-3 py-1.5 transition hover:text-heart sm:px-4"
          activeProps={{ className: "rounded-full px-3 py-1.5 bg-primary text-primary-foreground sm:px-4" }}
          activeOptions={{ exact: true }}
        >
          For Lali
        </Link>
        <Link
          to="/our-story"
          className="rounded-full px-3 py-1.5 transition hover:text-heart sm:px-4"
          activeProps={{ className: "rounded-full px-3 py-1.5 bg-primary text-primary-foreground sm:px-4" }}
        >
          Our Story
        </Link>
        <Link
          to="/letter"
          className="rounded-full px-3 py-1.5 transition hover:text-heart sm:px-4"
          activeProps={{ className: "rounded-full px-3 py-1.5 bg-primary text-primary-foreground sm:px-4" }}
        >
          Letter
        </Link>
      </div>
    </nav>
  );
}

function RootComponent() {
  const pathname = useLocation({ select: (l) => l.pathname });
  return (
    <div className="relative min-h-screen">
      <FloatingHearts count={20} />
      <Nav />
      <main className="relative z-10">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 14, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.div>
      </main>
      <MusicPlayer />
    </div>
  );
}
