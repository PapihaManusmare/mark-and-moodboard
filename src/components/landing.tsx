import { useCallback, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Download,
  ImageIcon,
  Layers,
  Megaphone,
  Scan,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  UploadCloud,
  Wand2,
} from "lucide-react";
import logoAsset from "@/assets/snapcut-logo.png.asset.json";
import demoOriginal from "@/assets/demo-original.png";
import demoCutout from "@/assets/demo-cutout.png";

const LOGO_URL = logoAsset.url;

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 10;

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="SnapCut AI logo" className="h-10 w-auto" />
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#demo" className="transition-colors hover:text-foreground">
            Demo
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="#use-cases" className="transition-colors hover:text-foreground">
            Use cases
          </a>
        </nav>
        <a
          href="#upload"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-background shadow-md transition-transform hover:scale-[1.03]"
        >
          Remove Background
          <ArrowRight className="size-4" />
        </a>
      </div>
    </header>
  );
}

function UploadCard() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptFile = useCallback((candidate: File | undefined) => {
    if (!candidate) return;
    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      setError("Unsupported format. Use JPG, PNG or WEBP.");
      return;
    }
    if (candidate.size > MAX_SIZE_MB * 1024 * 1024) {
      setError("File is too large. Maximum size is 10 MB.");
      return;
    }
    setError(null);
    setNote(null);
    setFile(candidate);
    setPreviewUrl(URL.createObjectURL(candidate));
  }, []);

  const clearFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setNote(null);
  }, [previewUrl]);

  return (
    <div
      id="upload"
      className="w-full max-w-xl rounded-3xl border border-brand-border bg-card p-6 shadow-xl sm:p-8"
    >
      <div className="mb-5 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Sparkles className="size-4 text-brand-cyan" />
        Instant background removal
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        onChange={(e) => {
          acceptFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            acceptFile(e.dataTransfer.files?.[0]);
          }}
          className={`flex w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-all ${
            dragging
              ? "border-brand-cyan bg-brand-cyan/5 glow-cyan"
              : "border-brand-border hover:border-brand-blue/70 hover:bg-muted/40"
          }`}
        >
          <span
            className={`flex size-16 items-center justify-center rounded-2xl bg-gradient-brand transition-transform ${
              dragging ? "scale-110 glow-cyan" : ""
            }`}
          >
            <UploadCloud className="size-8 text-background" />
          </span>
          <span className="text-lg font-semibold text-foreground">
            Drop your image here
          </span>
          <span className="text-sm text-muted-foreground">or click to browse</span>
          <span className="text-xs font-medium tracking-wide text-muted-foreground/80">
            JPG • PNG • WEBP • Max 10MB
          </span>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-muted">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Selected image preview"
                className="mx-auto max-h-64 w-auto object-contain"
              />
            )}
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <ImageIcon className="size-4 shrink-0 text-brand-cyan" />
              <span className="truncate text-sm text-foreground">{file.name}</span>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
              <button
                type="button"
                onClick={clearFile}
                aria-label="Remove selected image"
                className="text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              setNote(
                "Upload, preview and validation are live — the AI removal engine is wired up in the next build step.",
              )
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand py-3.5 text-base font-semibold text-background shadow-lg transition-transform hover:scale-[1.01]"
          >
            <Wand2 className="size-5" />
            Remove Background
          </button>
        </div>
      )}

      {error && (
        <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          {error}
        </p>
      )}
      {note && (
        <p className="mt-4 rounded-lg bg-brand-violet/10 px-4 py-2.5 text-sm text-brand-muted-text">
          {note}
        </p>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle brand glow inspired by the logo — decorative only */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand-cyan), var(--brand-blue) 45%, var(--brand-violet) 75%, transparent)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:pt-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-card px-4 py-1.5 text-xs font-semibold text-brand-cyan">
            <Sparkles className="size-3.5" />
            AI-powered background removal
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Remove Image Backgrounds in{" "}
            <span className="text-gradient">One Click.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            SnapCut AI uses artificial intelligence to remove backgrounds in
            seconds and give you clean, transparent images ready to use.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#upload"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-7 py-3.5 text-base font-semibold text-background shadow-lg transition-transform hover:scale-[1.03]"
            >
              <Wand2 className="size-5" />
              Remove Background
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              See How It Works
            </a>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <BadgeCheck className="size-4 text-success" />
            Free daily removals • No editing skills needed • Transparent PNG output
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <UploadCard />
        </div>
      </div>
    </section>
  );
}

function Demo() {
  return (
    <section id="demo" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Before <span className="text-gradient">/</span> After
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          The subject stays pixel-perfect. The background disappears — leaving a
          clean transparent PNG you can drop anywhere.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <figure className="overflow-hidden rounded-3xl border border-brand-border bg-card">
          <img
            src={demoOriginal}
            alt="Original product photo with background"
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover"
          />
          <figcaption className="flex items-center gap-2 border-t border-brand-border px-5 py-3 text-sm font-medium text-muted-foreground">
            <ImageIcon className="size-4" />
            Original
          </figcaption>
        </figure>
        <figure className="overflow-hidden rounded-3xl border border-brand-border bg-card">
          <div className="checkerboard flex aspect-square w-full items-center justify-center">
            <img
              src={demoCutout}
              alt="Product photo with background removed, shown on a transparency checkerboard"
              loading="lazy"
              width={825}
              height={620}
              className="max-h-[80%] w-auto object-contain drop-shadow-2xl"
            />
          </div>
          <figcaption className="flex items-center gap-2 border-t border-brand-border px-5 py-3 text-sm font-medium text-brand-cyan">
            <Scan className="size-4" />
            Background removed
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

const STEPS = [
  {
    icon: UploadCloud,
    title: "Upload your image",
    text: "Drag and drop or browse — JPG, PNG or WEBP up to 10 MB.",
  },
  {
    icon: Wand2,
    title: "AI removes the background",
    text: "SnapCut AI detects the main subject and erases everything behind it in seconds.",
  },
  {
    icon: Download,
    title: "Download your PNG",
    text: "Preview the transparent result and download it ready for any project.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-brand-border bg-brand-surface/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Three steps. No timelines, no masks, no manual editing.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-3xl border border-brand-border bg-card p-8"
            >
              <span className="absolute -top-5 left-8 flex size-10 items-center justify-center rounded-xl bg-gradient-brand font-display text-base font-bold text-background shadow-md">
                {i + 1}
              </span>
              <step.icon className="mt-3 size-8 text-brand-cyan" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const USE_CASES = [
  {
    icon: ShoppingBag,
    title: "E-commerce sellers",
    text: "Clean product shots that meet marketplace requirements.",
  },
  {
    icon: Layers,
    title: "Graphic designers",
    text: "Instant cutouts for composites, mockups and layouts.",
  },
  {
    icon: Megaphone,
    title: "Marketers",
    text: "Campaign-ready visuals without waiting on a designer.",
  },
  {
    icon: Sparkles,
    title: "Content creators",
    text: "Transparent stickers, thumbnails and posts in seconds.",
  },
];

function UseCases() {
  return (
    <section id="use-cases" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Made for people who ship visuals
        </h2>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {USE_CASES.map((c) => (
          <div
            key={c.title}
            className="rounded-3xl border border-brand-border bg-card p-6 transition-colors hover:border-brand-blue/60"
          >
            <c.icon className="size-7 text-brand-violet" />
            <h3 className="mt-4 font-semibold text-foreground">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-2xl items-center justify-center gap-3 rounded-2xl border border-brand-border bg-card px-6 py-5 text-center">
        <ShieldCheck className="size-6 shrink-0 text-success" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Privacy-focused:</span>{" "}
          uploaded and processed images are temporary and automatically deleted
          after processing.
        </p>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-brand-border">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand-violet), var(--brand-magenta) 55%, transparent)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Your next image is{" "}
          <span className="text-gradient">one click away.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
          Try SnapCut AI free — no software to install, no skills required.
        </p>
        <a
          href="#upload"
          className="mt-9 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-8 py-4 text-base font-semibold text-background shadow-lg transition-transform hover:scale-[1.03]"
        >
          <Wand2 className="size-5" />
          Remove Background
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-surface/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
        <img src={LOGO_URL} alt="SnapCut AI logo" className="h-12 w-auto" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} SnapCut AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Demo />
        <HowItWorks />
        <UseCases />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
