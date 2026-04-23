import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * Splits a word so the letter "O" (or any chosen letter) becomes interactive.
 * Hover on desktop scales it up; click expands a circular info panel.
 */
export function InteractiveOHeading({
  word,
  prefix = "",
  suffix = "",
  panel,
}: {
  word: string;
  prefix?: string;
  suffix?: string;
  panel: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const idx = word.toUpperCase().indexOf("O");
  const before = idx >= 0 ? word.slice(0, idx) : word;
  const after = idx >= 0 ? word.slice(idx + 1) : "";
  const letter = idx >= 0 ? word[idx] : "";

  return (
    <div className="relative inline-block">
      <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground select-none">
        {prefix && <span className="text-primary">{prefix} </span>}
        <span>{before}</span>
        {idx >= 0 && (
          <button
            type="button"
            aria-label={`Toggle ${word} details`}
            onClick={() => setOpen((v) => !v)}
            className="group relative inline-flex items-center justify-center align-baseline mx-1 cursor-pointer focus:outline-none"
          >
            <span className="relative inline-block transition-transform duration-500 ease-out group-hover:scale-150 group-hover:text-primary">
              {letter}
              <span className="pointer-events-none absolute inset-[-12%] rounded-full border-2 border-dashed border-primary/0 group-hover:border-primary/60 group-hover:animate-spin-slow transition-colors duration-500" />
            </span>
          </button>
        )}
        <span>{after}</span>
        {suffix && <span className="text-primary"> {suffix}</span>}
      </h2>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,560px)] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-primary text-primary-foreground shadow-elegant grid place-items-center p-10"
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 45, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-6 right-6 h-10 w-10 grid place-items-center rounded-full bg-white/15 hover:bg-white/30 transition"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="text-center max-w-[80%] max-h-full overflow-auto">
                {panel}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
