# figures/

Tracked (unlike `data/`) — figures are project deliverables, small, and each
one is mapped to exactly one claim (`PROJECT_KSIARTE.md` §5). Populated from
Session 2 onward; empty at scaffold time.

| Figure | Produced in | Content |
|---|---|---|
| `f1_*` | Session 2 (Stage 0) | Cylinder-wake DMD spectrum + top-2 mode shapes — the calibration record. |
| `f2_*` | Session 4 (Stage 1b/2) | Latent trajectory, top-2 PCs, phase-colored — exploratory-until-tested. |
| `f3_*` | Session 5 (Stage 3) | Per-seed DMD eigenvalues at q*, BOP-DMD ellipses, surrogate cloud. |
| `f4_*` | Session 5 (Stage 3) | Surrogate null VAF distribution vs. observed per-seed VAFs. |
| `f5_*` | Session 4 (working) → Session 5 (final) | VAF vs. delay count q, per seed, with pixel-DMD baseline. |
| `f6_*` | Session 5 (Stage 3) | Recovered frequency per seed with BOP-DMD CIs, forest plot vs. f₀. |

All figures are produced only via `src/viz/style.py` + `src/viz/koopman.mplstyle`
— no one-off styling in experiment scripts (`PROJECT_KSIARTE.md` §5). Each
figure is saved as both SVG and 200 dpi PNG.
