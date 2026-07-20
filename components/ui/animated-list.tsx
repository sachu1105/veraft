"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Ambient notification stack (Magic-UI-style "AnimatedList"): a new card drops
 * in at the top on a fixed interval, pushing the others down and dropping the
 * oldest off the bottom. The list is a fixed window of `maxVisible` cards, so
 * height stays stable. Reduced motion → a static seeded stack, no cycling.
 */

const SPRING = {
  type: "spring",
  stiffness: 320,
  damping: 34,
  mass: 0.9,
} as const;

type Card<T> = { item: T; uid: number };

export function AnimatedList<T>({
  items,
  renderItem,
  interval = 2400,
  maxVisible = 4,
  paused = false,
  className,
}: {
  items: T[];
  /**
   * Renders one card. `ord` is the card's stable ordinal (increments by one
   * per drop), so `ord % 2` gives a strict, non-flickering alternation that
   * survives cards shifting position.
   */
  renderItem: (item: T, ord: number) => ReactNode;
  /** Milliseconds between drops. */
  interval?: number;
  /** How many cards are shown at once. */
  maxVisible?: number;
  /** When true, cycling stops and the current stack holds. */
  paused?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const uidRef = useRef(maxVisible);
  const cursorRef = useRef(maxVisible % Math.max(items.length, 1));

  // Seed with the first `maxVisible` items, newest on top.
  const [stack, setStack] = useState<Card<T>[]>(() =>
    items
      .slice(0, maxVisible)
      .map((item, i) => ({ item, uid: i }))
      .reverse(),
  );

  useEffect(() => {
    if (reduce || paused || items.length === 0) return;
    const id = setInterval(() => {
      setStack((prev) => {
        const next = items[cursorRef.current % items.length];
        cursorRef.current += 1;
        return [{ item: next, uid: uidRef.current++ }, ...prev].slice(
          0,
          maxVisible,
        );
      });
    }, interval);
    return () => clearInterval(id);
  }, [items, interval, maxVisible, reduce, paused]);

  return (
    <div className={className}>
      <AnimatePresence mode="popLayout" initial={false}>
        {stack.map(({ item, uid }) => (
          <motion.div
            key={uid}
            layout
            initial={{ opacity: 0, scale: 0.92, y: -28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={SPRING}
          >
            {renderItem(item, uid)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
