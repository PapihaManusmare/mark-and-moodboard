<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- The product is SnapCut AI, an AI background-removal SaaS. The uploaded logo
  (`src/assets/snapcut-logo.png.asset.json`) is the primary source of truth for
  the visual identity; never redesign it and never introduce an unrelated color
  palette. The brand palette (deep midnight navy surfaces, cyan → blue → violet
  → magenta gradient) lives as oklch tokens in `src/styles.css`.
- The theme is dark-only (the logo's midnight navy). Do not add a light mode or
  light/dark toggle.
- The brand gradient is applied selectively (CTAs, highlights, active states,
  progress indicators) via the `bg-gradient-brand` / `text-gradient` utilities —
  never as whole-page fills or heavy neon/glassmorphism effects.
- The full product brief lives in the user's pasted spec (SnapCut AI SaaS);
  architecture decisions for later phases (auth, credits, n8n orchestration,
  payments) should follow it rather than inventing alternatives.

