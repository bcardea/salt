import { StylePreset } from '../services/imageGeneration';

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: "photoreal",
    title: "Photographic",
    description: "Professional portrait style with cinematic lighting & subtle environmental storytelling",
    promptModifiers: JSON.stringify({
      style: "photorealistic, cinematic portrait",
      lighting: "professional studio lighting with dramatic shadows",
      composition: "rule of thirds, selective focus",
      mood: "contemplative, emotional depth",
      color_grading: {
        shadows: "rich blacks",
        midtones: "natural, slightly warm",
        highlights: "controlled, not blown out"
      },
      post_processing: [
        "sophisticated color grading",
        "subtle vignette",
        "professional depth of field"
      ]
    }),
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9d9cd8fb87c29ba7f0.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9d9cd8fb87c29ba7f0.png"
  },
  {
    id: "minimalist",
    title: "Modern Minimal",
    description: "Clean, editorial layout with purposeful negative space",
    promptModifiers: JSON.stringify({
      style: "modern editorial, minimalist",
      composition: {
        layout: "asymmetric grid",
        negative_space: "purposeful, dominant",
        elements: "geometric shapes, clean lines"
      },
      typography: {
        primary: "sans-serif, bold weight",
        hierarchy: "strong size contrast",
        treatment: "clean, crisp edges"
      },
      color_palette: {
        scheme: "monochromatic or analogous",
        count: "maximum 3 colors",
        application: "intentional, restrained"
      }
    }),
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c183ce57ad6921011.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c183ce57ad6921011.png"
  },
  {
    id: "retro80s",
    title: "Retro 80s",
    description: "Synthwave-inspired design with bold energy",
    promptModifiers: JSON.stringify({
      style: "retro-futuristic, synthwave",
      elements: [
        "bold color gradients",
        "neon accents",
        "chrome effects",
        "geometric grids"
      ],
      color_palette: {
        primary: ["hot pink", "electric blue"],
        secondary: ["purple", "teal"],
        accents: "neon yellow"
      },
      lighting: "dramatic neon glow",
      effects: [
        "light trails",
        "lens flares",
        "chrome reflections"
      ]
    }),
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9db098801ec44508d0.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9db098801ec44508d0.png"
  },
  {
    id: "biblical",
    title: "Cinematic",
    description: "Epic, dramatic artwork inspired by ancient narratives",
    promptModifiers: JSON.stringify({
      style: "cinematic, epic scale",
      lighting: {
        type: "dramatic chiaroscuro",
        source: "divine rays, natural phenomena",
        mood: "awe-inspiring, transcendent"
      },
      composition: {
        scale: "epic, grandiose",
        perspective: "low angle or bird's eye",
        depth: "multiple layers, atmospheric"
      },
      elements: [
        "architectural grandeur",
        "natural phenomena",
        "symbolic artifacts",
        "rich textures"
      ]
    }),
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251c81183ce502b0921294.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251c81183ce502b0921294.png"
  },
  {
    id: "youth",
    title: "Youthful Collage",
    description: "Modern grunge collage full of energy and layers",
    promptModifiers: JSON.stringify({
      style: "dynamic collage, modern grunge",
      layers: [
        {
          type: "base",
          texture: "distressed, grungy patterns"
        },
        {
          type: "shapes",
          elements: ["torn paper", "geometric forms"],
          treatment: "overlapping, dynamic"
        },
        {
          type: "typography",
          style: "experimental, breaking boundaries",
          integration: "part of composition"
        },
        {
          type: "decorative",
          elements: [
            "paint splatters",
            "tape pieces",
            "paper clips",
            "handwritten marks"
          ]
        }
      ],
      effects: {
        shadows: "subtle, creating depth",
        texture: "paper grain, slight noise"
      }
    }),
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9dc469326aedc5682b.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9dc469326aedc5682b.png"
  },
  {
    id: "vintage",
    title: "Vintage Print",
    description: "Classic aesthetic with authentic print textures",
    promptModifiers: JSON.stringify({
      style: "vintage print design",
      textures: {
        paper: "aged, subtle grain",
        ink: "slightly uneven coverage",
        printing: "mild misalignment, authentic artifacts"
      },
      typography: {
        style: "classic letterpress",
        treatment: "slightly worn edges"
      },
      color_palette: {
        base: "aged paper tones",
        ink: "rich, slightly faded"
      },
      effects: [
        "subtle ink spread",
        "gentle paper texture",
        "authentic print artifacts"
      ]
    }),
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c9cd8fb4b3d9ba7ed.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c9cd8fb4b3d9ba7ed.png"
  },
  {
    id: "kids-church",
    title: "Kids Church",
    description: "Bright, energetic design for children's ministry",
    promptModifiers: JSON.stringify({
      scene: "bright, high-energy children's ministry logo slide with a fun 1990s Memphis-pattern backdrop",
      image_dimensions: "1920×1440",
      aspect_ratio: "4:3",
      style: [
        "Saturday-morning-cartoon title card",
        "bold comic-book outlines",
        "subtle paper-grain overlay (5% noise)",
        "scattered flat-fill geometric confetti in pastel brights"
      ],
      color_palette: {
        background_white: "#fefefe",
        navy_outline: "#003d66",
        headline_teal: "#005d7f",
        kid_k: ["#ffce38", "#ff9b16"],
        kid_i_stem: ["#ff5d8f", "#d83d6c"],
        kid_i_dot: "#e03b6c",
        kid_d: ["#6dc1b3", "#30a4a2"],
        kid_s: ["#ff9953", "#ff6a1d"],
        bottom_bar: "#004d73",
        confetti_orange: "#ff6533",
        confetti_teal: "#2db5ad",
        confetti_pink: "#ff73ab",
        confetti_violet: "#a25cf4"
      }
    }),
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682875473ba5d8098fbf73f3.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682875473ba5d8098fbf73f3.jpeg"
  }
];