# GSAP Animatron

A small React + GSAP practice app. Three demos on one page — timelines, scroll animation, and a custom cursor.

## 🚀 Quick start

```bash
yarn install
yarn dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## 🧪 Demos


| Section        | Try it                  | GSAP focus                        |
| -------------- | ----------------------- | --------------------------------- |
| Rotating Boxes | Click **Rotate**        | Timelines, play/reverse           |
| Scroll Crawl   | Scroll into the section | ScrollTrigger, DrawSVG, SplitText |
| Custom Cursor  | Move the mouse          | `quickTo`, match media            |


## 🧩 Project structure

```
src/components/
├── CustomCursor/              → useCustomCursor.ts
├── RotatingBoxesSection/      → useRotateBoxes.ts
└── ScrollCrawlSection/        → useScrollCrawl.ts (+ LetterB/ SVG)
```

Each demo folder has a component, a `use*.ts` hook for GSAP, and a `.module.css` file.

## 🛠️ Scripts


| Command              | Description                                    |
| -------------------- | ---------------------------------------------- |
| `yarn dev`           | Dev server                                     |
| `yarn build`         | Type-check + production build                  |
| `yarn build:analyze` | Build + open bundle report (`dist/stats.html`) |
| `yarn preview`       | Preview production build                       |
| `yarn lint`          | ESLint                                         |


## ⚙️ GSAP setup

- `useGSAP` is registered globally in `src/gsap/register.ts`
- ScrollTrigger, DrawSVG, and SplitText register in `useScrollCrawl.ts` and load with the scroll section (lazy chunk)

## 📚 Links

- [GSAP docs](https://gsap.com/docs/v3/)
- [useGSAP](https://gsap.com/docs/v3/Plugins/React/useGSAP/)
- [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

