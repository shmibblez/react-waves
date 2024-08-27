# plan
- read mic from browser (permission required for app to work)
  - request mic permission
  - if permission granted show ui
  - if permission not granted show message on page that says audio permission is required for app to work
- determine what chord is being played
  - determine baseline volume (background noise)
  - use dft to find loudest 6 notes and their relative volume
  - filter out notes that are actually played by comparing relative note volumes
  - convert frequency to note names
  - after chord is determined pause mic input
- show button to play new chord
- show multiple chord fingerings
  - create algorithm that determines possible chord fingerings
  - create ui component that receives chord fingering and draws, in this order:
    1. starting fret number
    2. frets
    3. strings
    4. points for where to put fingers
# constraints
- frequency range
  - only standard tuning supported (lowest note is E2 -> 82.41 Hz, on low E string)
  - max 21 frets supported (highest note is E4 -> 329.628 Hz, on high E string)
  - frequency range is 82.41-329.628 Hz
  - number of bins is 
    - minimum frequency interval $f_{int}$ is between D#4 and E4: $f_{int}((329.62 - 311.127) Hz = 18.501 Hz)$ minimum interval
    - maximum frequency $f_{max}$ depends on sample rate $f_s$: $f_{max}=\frac{f_s}{2}$
    - number of bins $N=\ceil(\frac{f_{max}}{f_{int}})$, multiply by 2 or 3 for more resolution
      - make N next biggest power of 2, makes fft more efficient
# ui
- color scheme: dark, gray gradients with red and green highlights
## small screens (phone)
- top bar with tab blocks
- tabs render underneath
- tabs:
  - chord finder
    - same as on large screens
    - chord fingerings table only has 1 column (becomes list that fills width)
  - tuner
    - same as on large screens
## large screens (pc)
- left side bar with list of tabs
- right side bar with selected tab
- tabs:
  - chord finder
    - canvas graph view that shows 1-6 most prominent frequencies while playing
    - 2 buttons underneath for record and stop recording
    - table with chord fingerings shown below, while loading show 3 dots
  - tuner
    - canvas that shows frequency line in background, tuner in foreground (similar to GuitarTuna)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
