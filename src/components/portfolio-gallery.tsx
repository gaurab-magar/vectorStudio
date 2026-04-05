"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { scaleIn } from "@/components/motion-config";
import { getScaleInVariants } from "@/components/motion-variants";

type Category = "All" | "Portraits" | "Weddings" | "Editorial" | "Events";

type GalleryItem = {
  id: string;
  src: string;
  title: string;
  category: Exclude<Category, "All">;
  width: number;
  height: number;
};

const GALLERY: GalleryItem[] = [
  { id: "g1",  src: "portrait-1.jpg",  title: "Studio Portrait",  category: "Portraits", width: 800, height: 1100 },
  { id: "g2",  src: "portrait-2.jpg",  title: "Soft Focus",       category: "Portraits", width: 800, height: 950  },
  { id: "g3",  src: "portrait-3.jpg",  title: "Monochrome",       category: "Portraits", width: 800, height: 1000 },
  { id: "g4",  src: "wedding-1.jpg",   title: "Ceremony Light",   category: "Weddings",  width: 800, height: 1050 },
  { id: "g5",  src: "wedding-2.jpg",   title: "Coastal Vows",     category: "Weddings",  width: 800, height: 900  },
  { id: "g6",  src: "editorial-1.jpg", title: "Magazine Spread",  category: "Editorial", width: 800, height: 1000 },
  { id: "g7",  src: "editorial-2.jpg", title: "Campaign Still",   category: "Editorial", width: 800, height: 880  },
  { id: "g8",  src: "event-1.jpg",     title: "Night Gala",       category: "Events",    width: 800, height: 900  },
  { id: "g9",  src: "event-2.jpg",     title: "Runway",           category: "Events",    width: 800, height: 1120 },
  { id: "g10", src: "event-3.jpg",     title: "Live Stage",       category: "Events",    width: 800, height: 960  },
];

const FILTERS: Category[] = ["All", "Portraits", "Weddings", "Editorial", "Events"];

export function PortfolioGallery() {
  const [filter, setFilter] = useState<Category>("All");
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const scaleVariants = getScaleInVariants(reduce);

  const visible = useMemo(() => {
    if (filter === "All") return GALLERY;
    return GALLERY.filter((g) => g.category === filter);
  }, [filter]);

  const activeItem = useMemo(() => {
    if (!lightboxId) return null;
    return visible.find((g) => g.id === lightboxId) ?? null;
  }, [lightboxId, visible]);

  const goNext = useCallback(() => {
    if (!lightboxId || visible.length === 0) return;
    const idx = visible.findIndex((g) => g.id === lightboxId);
    if (idx < 0) return;
    const next = visible[(idx + 1) % visible.length];
    setLightboxId(next.id);
  }, [lightboxId, visible]);

  const goPrev = useCallback(() => {
    if (!lightboxId || visible.length === 0) return;
    const idx = visible.findIndex((g) => g.id === lightboxId);
    if (idx < 0) return;
    const prev = visible[(idx - 1 + visible.length) % visible.length];
    setLightboxId(prev.id);
  }, [lightboxId, visible]);

  const open = Boolean(activeItem);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxId(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, goNext, goPrev]);

  return (
    <section id="work" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <motion.div
        className="mb-10 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={scaleVariants}
      >
        <p className="mb-3 text-xs tracking-[0.35em] text-[#c9a96e] uppercase">
          Portfolio
        </p>
        
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Selected work
        </h2>
      </motion.div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              setFilter(f);
              setLightboxId(null);
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === f
                ? "bg-[#c9a96e] text-zinc-950"
                : "glass-panel text-zinc-700 dark:text-zinc-200"
            }`}
            aria-label={`Filter by ${f}`}
            aria-pressed={filter === f}
          >
            {f}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <motion.div
          className="masonry-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduce ? 0 : 0.08 },
            },
          }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((item) => (
              <motion.div
                key={item.id}
                layout
                layoutId={item.id}
                className="masonry-item"
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: reduce ? 0.15 : 0.35 }}
              >
                <button
                  type="button"
                  onClick={() => setLightboxId(item.id)}
                  className="group relative block w-full overflow-hidden rounded-2xl"
                  aria-label={`Open ${item.title} in lightbox`}
                >
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: `${item.width} / ${item.height}` }}
                  >
                    <Image
                      src={`/gallery/${item.src}`}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="glass-panel pointer-events-none absolute inset-x-0 bottom-0 p-3 text-left">
                    <p className="text-xs tracking-widest text-[#c9a96e] uppercase">
                      {item.category}
                    </p>
                    <p className="text-sm font-medium tracking-tight text-[var(--foreground)]">
                      {item.title}
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <AnimatePresence>
        {open && activeItem ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxId(null)}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-5xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: reduce ? 0.15 : 0.35 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute -top-10 right-0 text-sm text-zinc-300 hover:text-white md:-right-2 md:top-0"
                onClick={() => setLightboxId(null)}
                aria-label="Close lightbox"
              >
                Close
              </button>
              <div className="relative aspect-[4/5] w-[min(90vw,900px)]">
                <Image
                      src={`/gallery/${activeItem.src}`}
                  alt={activeItem.title}
                  fill
                  className="rounded-lg object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
              <p className="mt-4 text-center text-sm text-zinc-300">{activeItem.title}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
