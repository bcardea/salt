import { StylePreset } from '../services/imageGeneration';

export const STYLE_PRESETS: StylePreset[] = [
  {
  id: "fathers-day-3d",
  title: "Father's Day 3D",
  description: "Playful, balloon-style 3D Father's Day design with classic hat and mustache, festive accents, and a crisp modern vibe.",
  categories: ["3d", "holiday", "father's day", "playful", "balloon", "modern", "celebratory"],
  promptModifiers: `{
    "scene": "A playful, three-dimensional Father's Day greeting composed of glossy blue balloon-style letters spelling '{sermon_title}', decorated with a classic bowler hat, a shiny black mustache, and a scattering of celebratory elements against a soft blue background.",
    "image_dimensions": "1536x1024",
    "aspect_ratio": "3:2 landscape",
    "composition": "The central focus is the large, extruded balloon letters '{sermon_title}', centered horizontally and positioned just above the vertical midpoint. The top of the middle letter is capped with a 3D bowler hat, and a large black mustache is centered under the crossbar of the central letter, visually 'wearing' the mustache. Around the word, floating in the foreground and background, are decorative elements: metallic gold and white stars, glossy streamers, and abstract shapes. The phrase '{sermon_topic}' appears in crisp, dark blue sans-serif capitals below the main composition, centered horizontally.",
    "color_palette": {
      "background_blue": "#d4e4ed",
      "balloon_light_blue": "#65a9db",
      "balloon_dark_blue": "#2473a6",
      "mustache_black": "#181d31",
      "hat_navy": "#32425b",
      "hat_gold_band": "#f8c55a",
      "star_gold": "#c0a75a",
      "star_white": "#f4f4f4",
      "accent_mint": "#7ed2c5",
      "accent_teal": "#38b2be",
      "accent_dark_blue": "#2e4a67",
      "text_navy": "#23355c"
    },
    "lighting": "Soft, high-key studio lighting with gentle falloff. Subtle reflections and highlights define the glossy, inflatable look of the balloon letters and accessories. Each 3D element has smooth, realistic shadowing and specular highlights, adding depth and volume.",
    "mood": "Festive, cheerful, and whimsical—conveying a sense of celebration and warmth for Father’s Day. The playful colors and cartoon-like forms evoke joy and a family-friendly vibe.",
    "texture": [
      "Smooth, high-gloss plastic for the balloon letters and 3D accents",
      "Metallic shine on gold stars and hat band",
      "Matte, slightly fuzzy finish on mustache",
      "Soft, diffused background with faint shadows beneath the main elements"
    ],
    "background": {
      "elements": [
        "Solid pale blue background with a hint of vignette for gentle depth",
        "No visible seams, gradients, or patterns aside from subtle soft shadowing around central objects"
      ],
      "depth_of_field": "Mild, all elements in crisp focus except slight background blur on distant accents"
    },
    "subjects": [
      {
        "type": "balloon_letters",
        "description": "'{sermon_title}' in uppercase balloon-style lettering; thick, rounded, and extruded with a smooth, reflective finish. The letters are colored in light-to-mid blue with subtle highlights and shadow gradients, giving a semi-transparent, air-filled look.",
        "position": "center"
      },
      {
        "type": "hat",
        "description": "Classic bowler hat resting on the top of the central letter, rendered in matte navy blue with a shiny gold band around the crown. The hat casts a soft shadow on the balloon below.",
        "position": "center, top of middle letter"
      },
      {
        "type": "mustache",
        "description": "Large, curved, glossy black mustache with exaggerated handlebar tips, positioned to look as if it’s attached to the central letter. High-gloss highlights give it a stylized, playful effect.",
        "position": "center, below crossbar of central letter"
      }
    ],
    "graphic_elements": [
      {
        "type": "star_gold",
        "description": "Three-dimensional, rounded, metallic gold star, four-pointed with extruded center. Two placed to the left of the word, one to the right.",
        "positions": ["left-top", "left-center", "right-bottom"]
      },
      {
        "type": "star_white",
        "description": "Matte white, puffy four-pointed star, placed above the hat on the right.",
        "positions": ["right-top"]
      },
      {
        "type": "streamer_blue",
        "description": "Curved, shiny blue 3D streamer, with reflective highlights, positioned top-left and bottom-center.",
        "positions": ["top-left", "bottom-center"]
      },
      {
        "type": "streamer_mint",
        "description": "Matte mint-green, twisted streamer shape placed lower left and upper right.",
        "positions": ["lower-left", "upper-right"]
      },
      {
        "type": "starburst_teal",
        "description": "Small, six-pointed, teal burst resembling a stylized flower or asterisk, placed to the right of the first letter.",
        "positions": ["right"]
      },
      {
        "type": "round_pearl",
        "description": "Small, white, glossy pearl ball, adding extra 3D effect, positioned lower right of the composition.",
        "positions": ["lower-right"]
      }
    ],
    "typography": {
      "title": {
        "text": "{sermon_title}",
        "font": "Custom 3D balloon style (not standard)",
        "weight": "extra bold, inflated",
        "size": "extra large, main focus",
        "color": "light blue with deep blue shadows and specular white highlights",
        "position": "center"
      },
      "subtitle": {
        "text": "{sermon_topic}",
        "font": "Geometric sans-serif, spaced capitals",
        "weight": "medium",
        "size": "small, label",
        "color": "text_navy",
        "letter_spacing": "very wide",
        "position": "centered horizontally, below main objects"
      }
    },
    "style": "3D rendered illustration, merging playful toy-like forms with a modern, minimal studio backdrop. The design is influenced by balloon sculpture, children’s party decor, and classic Father's Day icons (mustache, hat). Colors are saturated yet soothing, and every element is rendered with cartoon-like exaggeration.",
    "post_processing": [
      "Subtle vignette around the background perimeter for focus",
      "Gentle drop shadows below all 3D objects to enhance depth",
      "High-gloss, ray-traced reflections for realism on balloon letters, mustache, and stars",
      "Slight color grading to boost contrast and keep the scene light and bright"
    ]
  }`,
  previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682bbf7619f31d05a0c540f3.jpeg",
  referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682bbf7619f31d05a0c540f3.jpeg"
},
  {
  id: "luminous-dove",
  title: "Luminous Dove",
  description: "Ethereal worship art with monumental Didone typography",
  categories: ["ethereal", "worship", "modern", "light", "editorial", "christian"],
  promptModifiers: `{
    "scene": "ethereal worship graphic fusing luminous flowing-fiber motifs with a radiant dove silhouette and monumental Didone typography reading \\"{sermon_title}\\"",
    "image_dimensions": "1536×1024",
    "aspect_ratio": "3:2 landscape",
    "style": [
      "contemporary Christian worship art",
      "long-exposure light-painting wisps rendered with volumetric depth",
      "iridescent foil-stamp letterforms (subtle RGB shift)",
      "film-grain & low-contrast Kodak Ektachrome palette"
    ],
    "color_palette": {
      "midnight_black": "#0b0f14",
      "azure_flame": "#1e7ad7",
      "electric_cyan": "#35baff",
      "ember_orange": "#f47b4a",
      "iridescent_silver": "#d8e1e0",
      "grain_speck": "#2d2d2d"
    },
    "background": {
      "base_fill": "midnight_black",
      "light_fiber_field": {
        "color_gradient": ["azure_flame", "electric_cyan"],
        "secondary_burn": "ember_orange (10% fringe)",
        "stroke_width_px": 4,
        "motion_blur_px": 12,
        "turbulence_noise_seed": 42,
        "density_pct": 70,
        "flow_map": "sinusoidal swirl emanating from dove center",
        "blend_mode": "screen"
      },
      "texture_overlay": {
        "kind": "fine film grain",
        "color": "grain_speck",
        "opacity_pct": 8
      }
    },
    "subjects": [
      {
        "type": "photo_cutout",
        "description": "dove mid-flight, wings fully spread; color treated with ember orange and cyan glows; object appears light-emissive with no shadow",
        "position": "center (52% x, 52% y)",
        "scale": "58%"
      },
      {
        "type": "typographic element",
        "description": "{sermon_title} in monumental Didone (Didot Display) font, iridescent silver stroke with pastel foil gradient, centered over dove",
        "position": "centered, 54% y"
      }
    ],
    "graphic_elements": [
      {
        "type": "corner_caption_cycle",
        "words": ["{sermon_topic}"],
        "font": "Neo-Grotesque ExtraLight",
        "size_px": 80,
        "tracking_px": 12,
        "color": "iridescent_silver",
        "positions": [
          { "anchor": "top_left",     "offset_px": { "x": 60,  "y": 38 } },
          { "anchor": "top_center",   "offset_px": { "x": 0,   "y": 38 } },
          { "anchor": "top_right",    "offset_px": { "x": -60, "y": 38 } },
          { "anchor": "right_top",    "offset_px": { "x": -60, "y": 380 } },
          { "anchor": "bottom_right", "offset_px": { "x": -60, "y": -38 } },
          { "anchor": "bottom_left",  "offset_px": { "x": 60,  "y": -38 } }
        ],
        "blend_mode": "overlay",
        "opacity_pct": 78
      }
    ],
    "typography": {
      "hierarchy": [
        {
          "text": "{sermon_title}",
          "font": "Didot Display / Modern Didone",
          "weight": "bold",
          "size": "monumental",
          "color": "iridescent_silver",
          "letter_spacing": "wide",
          "case": "uppercase",
          "position": "centered"
        }
      ],
      "footer": {
        "text": "{sermon_topic}",
        "font": "Neo-Grotesque ExtraLight",
        "weight": "regular",
        "size": "small",
        "color": "iridescent_silver",
        "letter_spacing": "wide",
        "position": "corner cycle"
      }
    },
    "post_processing": [
      "add 9% blue channel chromatic aberration on outer 8% frame",
      "soft bloom on highlights (threshold 0.85, radius 12)",
      "very subtle vignette: −4% brightness at corners"
    ],
    "export_settings": {
      "format": "PNG",
      "compression": "lossless",
      "color_profile": "sRGB"
    }
  }`,
  previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682bb92bf08c4628785c8f5e.jpeg",
  referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682bb92bf08c4628785c8f5e.jpeg"
},
 {
    id: "folded-paper-minimal",
    title: "Folded Paper Minimal",
    description: "Neutral folded-paper minimal design",
     categories: ["minimal", "modern", "editorial", "neutral"],
    promptModifiers: `{
      "scene": "flat, neutral-toned paper background with subtle center fold lines and minute grain texture",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": "centered title text in upper-mid frame; visual weight balances toward bottom-right with logo and label block",
      "color_palette": {
        "background": "#f6f3ee",
        "text_color": "#222222",
        "accent_yellow": "#d8c747",
        "logo_stroke": "#222222"
      },
      "lighting": "flat and even; no shadows or gradients—natural ambient daylight simulation",
      "mood": "modern, professional, clean with an approachable institutional character",
      "texture": [
        "fine paper grain throughout",
        "visible vertical and horizontal fold creases faintly pressed into surface"
      ],
      "background": {
        "elements": [
          "aged white paper with natural wrinkles",
          "soft speckle and fiber details to break uniformity"
        ],
        "depth_of_field": "flat 2D surface focus"
      },
      "subjects": [
        {
          "type": "typographic element",
          "description": "{sermon_title}",
          "position": "center-left"
        },
        {
          "type": "label block",
          "description": "{sermon_topic}",
          "position": "bottom-right"
        }
      ],
      "graphic_elements": [],
      "typography": {
        "hierarchy": [
          {
            "text": "{sermon_title}",
            "font": "geometric sans-serif",
            "weight": "regular",
            "size": "large",
            "color": "#222222",
            "letter_spacing": "normal",
            "case": "title",
            "position": "centered upper-middle"
          }
        ],
        "footer": {
          "text": "{sermon_topic}",
          "font": "uppercase sans-serif",
          "weight": "medium",
          "size": "extra small",
          "color": "#222222",
          "letter_spacing": "wide",
          "position": "bottom-right inside yellow block"
        }
      },
      "style": "contemporary minimalism with editorial sensibility; branding-forward composition",
      "post_processing": [
        "preserve visible fold lines and grain for tactile realism",
        "no filters or color overlays—natural material integrity"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22e5ca6c4b88f32b74.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22e5ca6c4b88f32b74.jpeg"
  },
  {
    id: "vintage-floral",
    title: "Vintage Floral",
    description: "Broken-vase floral illustration with sacred iconography",
    categories: ["vintage", "floral", "sacred", "iconography", "illustrative"],
    promptModifiers: `{
      "scene": "centered symbolic illustration of a broken clay vase with flowers, placed within an arched gold frame on a deep navy background",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": "vertical visual symmetry; vase and bouquet aligned in center; title text overlays midsection, series subtitle at bottom",
      "color_palette": {
        "background": "#0f1f2c",
        "floral_blue": "#6e8fb0",
        "floral_yellow": "#f2d15c",
        "floral_white": "#f1f0eb",
        "floral_green": "#4e7266",
        "vase_gold": "#d9b679",
        "linework_gold": "#b89e65",
        "text_primary": "#ffffff"
      },
      "lighting": "flat print-style lighting; no dynamic shadows; elements pop due to color contrast against dark background",
      "mood": "contemplative, reverent, emotionally resonant—acknowledging human frailty and spiritual dignity",
      "texture": [
        "etched linework in vase and flower details",
        "clean vector shapes with hand-drawn aesthetic",
        "subtle grain overlay on background for depth"
      ],
      "background": {
        "elements": [
          "solid navy blue field",
          "thin gold arch and outer rectangle framing main subject"
        ],
        "depth_of_field": "flat illustration, all elements uniformly sharp"
      },
      "subjects": [
        {
          "type": "vase",
          "description": "gold-trimmed ceramic vase cracked down the middle, spilling pottery shards at its base",
          "position": "center-bottom"
        },
        {
          "type": "bouquet",
          "description": "wildflower arrangement rising from vase",
          "position": "center"
        },
        {
          "type": "typographic element",
          "description": "{sermon_title}",
          "position": "overlapping the vase midsection"
        },
        {
          "type": "text block",
          "description": "{sermon_topic}",
          "position": "bottom center"
        }
      ],
      "graphic_elements": [
        {
          "type": "arch and border",
          "description": "thin gold arch and matching base frame around subject",
          "position": "centered and symmetrical"
        }
      ],
      "typography": {
        "hierarchy": [
          {
            "text": "{sermon_title}",
            "font": "elegant cursive script with high contrast strokes",
            "weight": "regular",
            "size": "large",
            "color": "#ffffff",
            "letter_spacing": "tight",
            "case": "title case",
            "position": "center"
          }
        ],
        "subtitle": {
          "text": "{sermon_topic}",
          "font": "modern sans-serif",
          "weight": "light",
          "size": "small",
          "color": "#ffffff",
          "letter_spacing": "wide",
          "position": "bottom center"
        }
      },
      "style": "modern sacred iconography with vintage botanical flair; illustrative print-style elegance",
      "post_processing": [
        "slight noise overlay for tactile depth",
        "clean separation of color blocks to retain print clarity"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22d083852cb5168da6.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22d083852cb5168da6.jpeg"
  },
  {
    id: "neon-compass",
    title: "Neon Compass",
    description: "Synthwave compass with glowing type",
    categories: ["retro", "synthwave", "neon", "adventure", "bold"],
    promptModifiers: `{
      "scene": "hand holding a compass, layered under glowing vintage typography on a neon duotone background with scratched light streak texture",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": "center-focused with large title text over compass image; subtitle aligned underneath; repeat text in corners for rhythm",
      "color_palette": {
        "main_duotone": ["#a04ce3", "#3b51d0"],
        "compass_outline": "#ff6fcf",
        "title_text": "#ffffff",
        "subtitle_text": "#ffffff"
      },
      "lighting": "artificial neon glow; highlights around text and object edges; ambient light haze for atmosphere",
      "mood": "reflective and directional, adventurous and energized by divine clarity",
      "texture": [
        "light scratches and scanline overlays across image",
        "soft gradient haze behind title for glow effect"
      ],
      "background": {
        "elements": [
          "macro photo of hand holding a compass",
          "soft radial gradient from center outwards"
        ],
        "depth_of_field": "foreground compass and hand are soft but discernible; background fades to texture"
      },
      "subjects": [
        {
          "type": "photographic object",
          "description": "human hand grasping a classic analog compass",
          "position": "centered behind title text"
        },
        {
          "type": "typographic element",
          "description": "{sermon_title}",
          "position": "center"
        },
        {
          "type": "typographic element",
          "description": "{sermon_topic}",
          "position": "below title"
        }
      ],
      "graphic_elements": [
        {
          "type": "repeat text",
          "description": "faded duplicated text '{sermon_reference}' in upper-right and lower-left corners",
          "position": "corner faded overlays"
        }
      ],
      "typography": {
        "hierarchy": [
          {
            "text": "{sermon_title}",
            "font": "flared serif with high contrast",
            "weight": "light",
            "size": "very large",
            "color": "#ffffff",
            "letter_spacing": "tight",
            "case": "uppercase",
            "position": "center"
          }
        ],
        "subtitle": {
          "text": "{sermon_topic}",
          "font": "modern sans-serif",
          "weight": "medium",
          "size": "small",
          "color": "#ffffff",
          "letter_spacing": "wide",
          "position": "centered beneath title"
        }
      },
      "style": "spiritual synthwave aesthetic; retro-futuristic with photographic realism blended with glowing typography",
      "post_processing": [
        "add chromatic blur around bright text",
        "scanline and speckle texture over entire frame",
        "neon bloom effects on compass rim and title strokes"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682930d3954010285f797ab2.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682930d3954010285f797ab2.jpeg"
  },
  {
    id: "neon-pastel",
    title: "Neon Pastel",
    description: "Pastel dawn gradient with prayer hands line art",
    categories: ["minimal", "pastel", "spiritual", "modern", "gradient"],
    promptModifiers: `{
      "scene": "calming, pastel-hued sky gradient fading from light lavender to peach and blue, suggesting dawn or spiritual awakening",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": "centered vertical balance; main title across middle third, line art of hands behind it; subtitle in wide letter spacing below",
      "color_palette": {
        "background_top": "#a7b8da",
        "background_middle": "#d2b3d4",
        "background_bottom": "#f4c7bd",
        "text_color": "#2e2e2e",
        "line_art_color": "#ffffff"
      },
      "lighting": "soft, diffuse ambient glow from bottom-left, simulating early morning light",
      "mood": "peaceful, reverent, introspective; evokes sacred stillness and spiritual clarity",
      "texture": [
        "very fine mist-like gradient grain across sky",
        "slight glow around hand outline for divine aura"
      ],
      "background": {
        "elements": [
          "cloudy gradient with smooth transitions in soft pinks, blues, and lavenders",
          "no distinct objects or landscape elements"
        ],
        "depth_of_field": "flat background gradient"
      },
      "subjects": [
        {
          "type": "line illustration",
          "description": "white outline of praying hands behind title",
          "position": "centered behind main title text"
        },
        {
          "type": "typographic element",
          "description": "{sermon_title}",
          "position": "center middle"
        },
        {
          "type": "typographic element",
          "description": "{sermon_topic}",
          "position": "below main title, center-aligned"
        }
      ],
      "graphic_elements": [],
      "typography": {
        "hierarchy": [
          {
            "text": "{sermon_title}",
            "font": "refined serif",
            "weight": "medium",
            "size": "large",
            "color": "#2e2e2e",
            "letter_spacing": "slight",
            "case": "uppercase",
            "position": "center"
          }
        ],
        "subtitle": {
          "text": "{sermon_topic}",
          "font": "clean geometric sans-serif",
          "weight": "regular",
          "size": "small",
          "color": "#2e2e2e",
          "letter_spacing": "200",
          "position": "directly below title"
        }
      },
      "style": "minimalist spiritual poster with atmospheric gradients and thin line art",
      "post_processing": [
        "gentle Gaussian blur across background gradient",
        "light outer glow effect on hand illustration",
        "no harsh shadows or high-contrast areas to maintain softness"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682930d3a6cf1574cd66f04e.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682930d3a6cf1574cd66f04e.jpeg"
  },
  {
    id: "retro-revival",
    title: "Retro Revival",
    description: "Vintage revival flyer with praying hands",
     categories: ["vintage", "revival", "spiritual", "bold", "print"],
    promptModifiers: `{
      "scene": "centered revival-style print featuring praying hands with typographic layering on a textured off-white background",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": "symmetrical vertical layout with arched and mirrored text; cursive script overlays engraved hands; radial line burst for energy",
      "color_palette": {
        "background": "#f8f4ec",
        "engraving_red": "#e14b3c",
        "text_blue": "#0033cc",
        "text_yellow": "#f4c542"
      },
      "lighting": "flat, screenprint-style tonal contrast with no shadows",
      "mood": "spiritually urgent, motivational, communal call to faith through vintage revival tone",
      "texture": [
        "grainy print texture across full image",
        "slight ink misregistration feel on linework and edges"
      ],
      "background": {
        "elements": [
          "light paper texture in cream tone"
        ],
        "depth_of_field": "flat illustrative depth"
      },
      "subjects": [
        {
          "type": "illustration",
          "description": "engraved praying hands in red, surrounded by radiating red lines",
          "position": "center"
        },
        {
          "type": "typographic element",
          "description": "{sermon_title_word1}",
          "position": "top arc"
        },
        {
          "type": "typographic element",
          "description": "{sermon_title_word2}",
          "position": "horizontal base left"
        },
        {
          "type": "typographic element",
          "description": "{sermon_title_word3}",
          "position": "horizontal base right"
        },
        {
          "type": "typographic element",
          "description": "{sermon_topic}",
          "position": "center overlay"
        },
        {
          "type": "auxiliary text",
          "description": "{sermon_reference}",
          "position": "outer flanks"
        }
      ],
      "graphic_elements": [
        {
          "type": "radial burst",
          "description": "thin red lines radiating outward behind hands",
          "position": "centered behind illustration"
        }
      ],
      "typography": {
        "hierarchy": [
          {
            "text": "{sermon_title_word1}",
            "font": "bold condensed sans-serif",
            "weight": "heavy",
            "size": "large",
            "color": "#0033cc",
            "letter_spacing": "tight",
            "case": "uppercase",
            "position": "top arc"
          },
          {
            "text": "{sermon_title_word2}",
            "font": "bold sans-serif",
            "weight": "bold",
            "size": "medium",
            "color": "#0033cc",
            "letter_spacing": "normal",
            "case": "uppercase",
            "position": "horizontal bottom left"
          },
          {
            "text": "{sermon_title_word3}",
            "font": "bold sans-serif",
            "weight": "bold",
            "size": "medium",
            "color": "#0033cc",
            "letter_spacing": "normal",
            "case": "uppercase",
            "position": "horizontal bottom right"
          },
          {
            "text": "{sermon_topic}",
            "font": "script cursive",
            "weight": "regular",
            "size": "large",
            "color": "#f4c542",
            "letter_spacing": "natural",
            "case": "title",
            "position": "center overlay"
          },
          {
            "text": "{sermon_reference}",
            "font": "monospace uppercase",
            "weight": "light",
            "size": "small",
            "color": "#0033cc",
            "letter_spacing": "normal",
            "case": "uppercase",
            "position": "vertical stack sides"
          }
        ]
      },
      "style": "retro Americana gospel flyer with modern faith-forward twist",
      "post_processing": [
        "slight halftone grain across image",
        "ink-bleed simulation around red linework",
        "print offset misalignment for vintage authenticity"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22a6cf15956b66dbe5.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22a6cf15956b66dbe5.jpeg"
  },
  {
    id: "vintage-hoops",
    title: "Vintage Hoops",
    description: "Retro sports-inspired crossroads poster",
    categories: ["vintage", "sports", "retro", "illustrative", "bold"],
    promptModifiers: `{
      "scene": "layered vintage backdrop blending an ancient world map with starry outer space textures; central panel shaped like a medieval shield or stone tablet",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": "title block centered; arched top and bottom; basketball hoop centered bottom foreground; starbursts at both ends of the word 'CROSSROADS'",
      "color_palette": {
        "background_map": "#e0ded4",
        "title_fill": "#c79a5c",
        "title_shadow": "#3b2f2b",
        "subtitle_text": "#f1f1f1",
        "series_text": "#c7884f",
        "map_lines": "#b4b0a3",
        "starbursts": "#ffffff",
        "hoop_red": "#c65a45",
        "net_white": "#f8f6f0",
        "outer_space": "#1a1a1a"
      },
      "lighting": "even flat lighting across the entire graphic; no strong shadows; slight vignette around the corners",
      "mood": "reflective and decisive; evokes a tension between direction and identity",
      "texture": [
        "aged paper grain on map section",
        "cosmic noise texture with faint white star specks",
        "burnt-edge border with subtle roughness"
      ],
      "background": {
        "elements": [
          "celestial star field with white speckles in outer border",
          "old-world map faintly visible behind central panel"
        ],
        "depth_of_field": "flat depth; all layers in sharp focus to maintain collage clarity"
      },
      "subjects": [
        {
          "type": "text block",
          "description": "{sermon_title}",
          "font": "condensed block serif with angled shadows",
          "position": "centered top-middle"
        },
        {
          "type": "text block",
          "description": "{sermon_topic}",
          "font": "narrow serif, slightly curved layout",
          "position": "just below title"
        },
        {
          "type": "text block",
          "description": "{sermon_reference}",
          "font": "modern geometric sans-serif",
          "position": "bottom third, centered"
        },
        {
          "type": "basketball hoop",
          "description": "retro-styled basketball hoop and net",
          "position": "centered at bottom"
        }
      ],
      "graphic_elements": [
        {
          "type": "starburst",
          "description": "hand-drawn white 8-point stars",
          "position": "left and right of the title text"
        },
        {
          "type": "wireframe globe icon",
          "description": "golden outline of a globe beneath subtitle",
          "position": "centered below subtitle"
        }
      ],
      "typography": {
        "hierarchy": [
          {
            "text": "{sermon_title}",
            "font": "bold extended serif",
            "weight": "heavy",
            "size": "extra-large",
            "color": "#c79a5c",
            "letter_spacing": "tight",
            "case": "uppercase",
            "position": "centered top-middle"
          }
        ],
        "subtitle": {
          "text": "{sermon_topic}",
          "font": "serif",
          "weight": "bold",
          "size": "medium",
          "color": "#f1f1f1",
          "letter_spacing": "wide",
          "position": "under title"
        },
        "caption": {
          "text": "{sermon_reference}",
          "font": "condensed sans-serif",
          "weight": "medium",
          "size": "small",
          "color": "#c7884f",
          "letter_spacing": "200",
          "position": "bottom-center"
        }
      },
      "style": "retro-futurist sermon poster with nostalgic sports motifs; faith-based message with pop-cultural visual flair",
      "post_processing": [
        "burnt edge vignette",
        "paper grain overlay",
        "light starfield blur around corners"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682930d3a6cf15371566f04d.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682930d3a6cf15371566f04d.jpeg"
  },
  {
    id: "ancient-maps",
    title: "Ancient Maps",
    description: "Antique parchment map with decision-point typography",
    categories: ["vintage", "map", "ancient", "cartography", "editorial"],
    promptModifiers: `{
      "scene": "antique parchment map background centered on Corinth region, faintly labeled with aged, classical text and hand-drawn geographic lines",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": "central vertical symmetry; primary text in middle third; top corners host globe and bird; bottom corners balance church and broken column",
      "color_palette": {
        "background_map": "#ece5cf",
        "main_text_gradient_top": "#1f1f1f",
        "main_text_gradient_bottom": "#a5b58e",
        "subtitle_text": "#f3f2ed",
        "linework_illustrations": "#1b1b1b",
        "globe_icon": "#2a2a2a"
      },
      "lighting": "flat retro print tone; no dynamic shadows; aged paper uniform illumination",
      "mood": "reflective, urgent decision point, spiritual crossroad with historic weight",
      "texture": [
        "aged paper fibers and small specks scattered across frame",
        "light ink bleed effect around map labels",
        "textured gradient on title typography simulating silkscreen print"
      ],
      "background": {
        "elements": [
          "ancient map labeling Peloponnesus, Corinth, and surrounding regions"
        ],
        "depth_of_field": "flat print design"
      },
      "subjects": [
        {
          "type": "typographic element",
          "description": "{sermon_title}",
          "position": "centered upper-middle"
        },
        {
          "type": "typographic element",
          "description": "{sermon_topic}",
          "position": "centered below title"
        },
        {
          "type": "icon",
          "description": "globe symbol",
          "position": "center of lower-middle"
        },
        {
          "type": "text block",
          "description": "{sermon_reference}",
          "position": "bottom center"
        }
      ],
      "graphic_elements": [
        {
          "type": "starburst",
          "description": "white eight-point radial bursts",
          "color": "#ffffff",
          "position": "top-left and bottom-right corners"
        }
      ],
      "typography": {
        "hierarchy": [
          {
            "text": "{sermon_title}",
            "font": "bold varsity-style block serif",
            "weight": "heavy",
            "size": "very large",
            "color": "gradient from #1f1f1f to #a5b58e",
            "letter_spacing": "tight",
            "case": "uppercase",
            "position": "center"
          }
        ],
        "subtitle": {
          "text": "{sermon_topic}",
          "font": "condensed slab serif",
          "weight": "bold",
          "size": "medium",
          "color": "#f3f2ed",
          "letter_spacing": "wide",
          "position": "under title"
        },
        "caption": {
          "text": "{sermon_reference}",
          "font": "modern sans-serif",
          "weight": "medium",
          "size": "small",
          "color": "#f3f2ed",
          "letter_spacing": "normal",
          "position": "bottom center"
        }
      },
      "style": "retro cartography meets faith-based decision poster",
      "post_processing": [
        "aged-paper grain overlay",
        "ink-bleed softening on text edges"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682930d395401013a9797ab3.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682930d395401013a9797ab3.jpeg"
  },
  {
    id: "tropical-easter",
    title: "Tropical Easter",
    description: "Dense tropical foliage around modern type",
    categories: ["nature", "tropical", "modern", "botanical", "joyful", "holiday"],
    promptModifiers: `{
      "scene": "dense tropical foliage bursting with detailed leaves and vibrant blossoms over a deep forest green background",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": "centralized modern typography surrounded by layered overlapping plants and natural elements; fauna scattered around edge zones",
      "color_palette": {
        "background": "#294b33",
        "leafy_greens": "#5b7c52",
        "bright_yellow_flower": "#f4cc57",
        "coral_flower": "#e35771",
        "orange_flower": "#f67829",
        "pink_flower": "#db68ad",
        "text_color": "#f1ede4",
        "bird_feathers": "#8c9d4b",
        "butterfly_wings": "#a0c89a"
      },
      "lighting": "even, natural daylight glow; soft illumination to suggest morning sun through canopy",
      "mood": "joyful, refreshing, spiritual awakening; full of hopeful promise and renewal",
      "texture": [
        "hand-etched botanical detailing on all plant forms",
        "subtle grain overlay across entire piece for depth"
      ],
      "background": {
        "elements": [
          "large banana and palm leaves with visible vein lines",
          "layered fronds and curling vines intertwined throughout"
        ],
        "depth_of_field": "uniform clarity"
      },
      "subjects": [
        {
          "type": "typographic element",
          "description": "{sermon_title}",
          "position": "centered upper-middle"
        },
        {
          "type": "typographic element",
          "description": "{sermon_topic}",
          "position": "centered below title"
        },
        {
          "type": "bird",
          "description": "small songbird perched on twig",
          "position": "bottom-right quadrant"
        },
        {
          "type": "butterfly",
          "description": "pale green butterfly",
          "position": "top-right quadrant"
        }
      ],
      "graphic_elements": [
        {
          "type": "floral clusters",
          "description": "detailed groupings of tropical blooms",
          "position": "dispersed throughout corners and side edges"
        }
      ],
      "typography": {
        "hierarchy": [
          {
            "text": "{sermon_title}",
            "font": "geometric sans-serif",
            "weight": "bold",
            "size": "large",
            "color": "#f1ede4",
            "letter_spacing": "wide",
            "case": "uppercase",
            "position": "center"
          }
        ],
        "subtitle": {
          "text": "{sermon_topic}",
          "font": "modern sans-serif",
          "weight": "medium",
          "size": "small",
          "color": "#f1ede4",
          "letter_spacing": "normal",
          "position": "directly below main title"
        }
      },
      "style": "vintage botanical illustration meets modern minimalist typography",
      "post_processing": [
        "slight color burn to enhance saturation of florals",
        "uniform matte filter over entire artwork for cohesive tone"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22e5ca6c6882f32b73.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22e5ca6c6882f32b73.jpeg"
  },
  {
    id: "retro-cartoon-fruit",
    title: "Retro Cartoon Fruit",
    description: "Playful vintage fruit characters poster",
    categories: ["kids", "fun", "retro", "cartoon", "vintage", "playful"],
    promptModifiers: `{
      "scene": "cheerful lineup of colorful cartoon fruit characters on a lightly textured vintage paper background",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": "centralized character arrangement; title above, theme label and date below; symmetry achieved through equal spacing of fruits",
      "color_palette": {
        "background": "#f3e8d1",
        "title_text_fill": "#f7e7c6",
        "title_text_outline": "#1a6c87",
        "character_colors": ["#8ce3b0", "#ffd939", "#ff9271", "#ff5050", "#ffb840", "#f15252"],
        "shadows": "#004d60",
        "accent_stars": "#ffffff",
        "footer_text": "#07586c"
      },
      "lighting": "flat cel-shading with slight drop shadow under characters",
      "mood": "fun, energetic, nostalgic, designed to evoke childlike joy and retro animation flair",
      "texture": [
        "fine linen paper grain texture across entire background",
        "halftone-style shadow under characters for depth"
      ],
      "background": {
        "elements": [
          "off-white textured paper backdrop"
        ],
        "depth_of_field": "uniform flat illustration"
      },
      "subjects": [
        { "type": "fruit character", "description": "green pear", "position": "far left" },
        { "type": "fruit character", "description": "yellow mango", "position": "left-center" },
        { "type": "fruit character", "description": "peach", "position": "center-left" },
        { "type": "fruit character", "description": "red apple", "position": "center" },
        { "type": "fruit character", "description": "orange", "position": "center-right" },
        { "type": "fruit character", "description": "strawberry", "position": "far right" }
      ],
      "graphic_elements": [
        {
          "type": "sparkle stars",
          "description": "simple white four-point stars scattered between fruit characters",
          "position": "interspersed background"
        }
      ],
      "typography": {
        "hierarchy": [
          {
            "text": "{sermon_title}",
            "font": "bold retro comic block",
            "weight": "heavy",
            "size": "extra large",
            "color": "fill: #f7e7c6, outline: #1a6c87",
            "letter_spacing": "tight",
            "case": "uppercase",
            "position": "top center"
          }
        ],
        "subtitle": {
          "text": "{sermon_reference}",
          "font": "bold slab serif cartoon style",
          "weight": "bold",
          "size": "medium",
          "color": "#07586c",
          "letter_spacing": "normal",
          "position": "below characters"
        },
        "footer": {
          "text": "{sermon_topic}",
          "font": "all caps condensed sans-serif",
          "weight": "regular",
          "size": "small",
          "color": "#07586c",
          "letter_spacing": "normal",
          "position": "bottom center"
        }
      },
      "style": "vintage comic strip with playful mid-century cartoon character design",
      "post_processing": [
        "subtle paper crease overlay",
        "slight drop shadow under characters"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22a6cf15107266dbe2.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22a6cf15107266dbe2.jpeg"
  },
  {
    id: "retro-gym-poster",
    title: "Retro Gym Poster",
    description: "Boxing-glove spiritual warfare poster",
    categories: ["bold", "vintage", "gym", "spiritual", "poster"],
    promptModifiers: `{
  "scene": "centered minimalist layout with crossed boxing gloves illustration on a red textured background",
  "image_dimensions": "1536×1024",
  "aspect_ratio": "3:2 landscape",
  "composition": "oversized 'SPIRITUAL WARFARE' text sits mid-frame; crossed boxing gloves overlap the very bottom of this headline, creating depth; subtitle 'FIGHT THE GOOD FIGHT' is layered in front of the gloves, aligned just below the X-intersection",
  "color_palette": {
    "background_red": "#d9453a",
    "engraving_blue": "#1c2441",
    "text_white": "#ffffff"
  },
  "lighting": "flat poster-style lighting with no realistic shadows; emphasis on bold color contrast",
  "mood": "resolute, commanding, spiritually militant and motivational",
  "texture": [
    "gritty red stucco or wall texture across background",
    "fine crosshatch engraving on gloves and hanging laces",
    "paper-like matte finish on typography"
  ],
  "background": {
    "elements": [
      "solid red wash with subtle grunge overlay"
    ],
    "depth_of_field": "flat, screenprint effect"
  },
  "subjects": [
    {
      "type": "typographic element",
      "description": "{SERMON_TITLE}' in bold all-caps sans-serif, very large, spanning most of the width; serves as backdrop layer",
      "position": "centered",
      "layer": "background"
    },
    {
      "type": "illustration",
      "description": "vintage boxing gloves crossed at 45° with long loose strings hanging straight down; gloves positioned so their lowest edge barely covers the bottom stroke of the headline letters, emphasizing overlap and depth",
      "position": "centered over headline",
      "layer": "midground"
    },
    {
      "type": "typographic element",
      "description": "'{SERMON_TOPIC}' in clean uppercase sans-serif, slightly smaller than headline, placed in front of the gloves, horizontally centered, tight to the glove laces",
      "position": "just below glove intersection",
      "layer": "foreground"
    }
  ],
  "graphic_elements": [],
  "typography": {
    "hierarchy": [
      {
        "text": "{SERMON_TITLE}",
        "font": "bold geometric sans-serif (e.g., Helvetica Neue, Montserrat)",
        "weight": "heavy",
        "size": "extra large",
        "color": "#ffffff",
        "letter_spacing": "wide",
        "case": "uppercase",
        "layer": "background"
      }
    ],
    "subtitle": {
      "text": "{SERMON_TOPIC}}",
      "font": "modern sans-serif",
      "weight": "medium",
      "size": "medium",
      "color": "#ffffff",
      "letter_spacing": "normal",
      "layer": "foreground"
    }
  },
  "style": "vintage gym poster meets spiritual illustration; bold, heroic, mission-driven aesthetic",
  "post_processing": [
    "vibrancy boost on red background",
    "grainy ink overlay on illustration lines",
    "slight transparency on headline to keep gloves readable",
    "maintain flat print look—no drop shadows"
  ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682937dfd0838545fb16a768.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682937dfd0838545fb16a768.jpeg"
  },
  {
    id: "luminous-desert-cross",
    title: "Luminous Desert Cross",
    description: "Night desert with glowing cross and script",
    categories: ["spiritual", "desert", "night", "cinematic", "hopeful"],
    promptModifiers: `{
      "scene": "desert landscape under a starry night sky with a luminous cross embedded in the sand, radiating light outward into the dunes",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": "cross at lower center; main message in flowing script fills upper third; small subtitle at bottom center",
      "color_palette": {
        "sky_night": "#0b1f35",
        "sand_dune": "#2b2b2b",
        "cross_glow": "#ffffff",
        "title_script": "#e7a4c5",
        "subtitle_text": "#f1f1f1"
      },
      "lighting": "spotlight-style glow from the cross illuminating surrounding sand",
      "mood": "hopeful, reverent, reflective—a visual meditation on resurrection and new life",
      "texture": [
        "fine grain overlay in the sand",
        "soft atmospheric haze around the cross glow"
      ],
      "background": {
        "elements": [
          "star-strewn indigo sky"
        ],
        "depth_of_field": "sharp foreground on cross, softer background toward horizon"
      },
      "subjects": [
        {
          "type": "cross",
          "description": "white glowing cross",
          "position": "lower center"
        },
        {
          "type": "typographic element",
          "description": "{sermon_title}",
          "position": "center top"
        },
        {
          "type": "typographic element",
          "description": "{sermon_topic}",
          "position": "bottom center"
        }
      ],
      "graphic_elements": [],
      "typography": {
        "hierarchy": [
          {
            "text": "{sermon_title}",
            "font": "elegant high-loop script",
            "weight": "light",
            "size": "extra large",
            "color": "#e7a4c5",
            "letter_spacing": "normal",
            "case": "title",
            "position": "center top"
          }
        ],
        "subtitle": {
          "text": "{sermon_topic}",
          "font": "condensed sans-serif",
          "weight": "regular",
          "size": "small",
          "color": "#f1f1f1",
          "letter_spacing": "250",
          "position": "bottom center"
        }
      },
      "style": "modern sacred desert vision with cinematic lighting and elegant calligraphy",
      "post_processing": [
        "Gaussian glow on cross",
        "star enhancement in sky layer"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682930d3d083856dad16a0d9.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682930d3d083856dad16a0d9.jpeg"
  },

  {
    id: "desert-vintage",
    title: "Desert Vintage Poster",
    description: "Cinematic desert scene with vintage poster aesthetics",
    categories: ["cinematic", "vintage", "desert", "photoreal", "film"],
    promptModifiers: `Hyper detailed, filmic, photorealistic shot on Sony a7iii: Create a hyper detailed filmic image using the following json prompt: {
      "scene": "vast, windswept desert under a hazy beige-grey sky, rendered in warm sepia tones with a subtle vintage paper grain overlay",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": "rule-of-thirds: horizon line and crest of main dune sit on lower third; text block occupies central third; ample negative space in upper right sky",
      "color_palette": {
        "sky": "#d9d2bd",
        "dune_highlights": "#c89a64",
        "dune_shadows": "#7d4e2d",
        "distant_rocks": "#8c6f54",
        "title_text": "#f5f1e6",
        "accent_text": "#ff4b1d",
        "subtitle_text": "#d7d4cb",
        "starburst": "#7a5c42"
      },
      "lighting": "soft late-afternoon sunlight diffused by airborne dust; gentle warm highlights, long muted shadows behind every foreground figure",
      "mood": "solemn yet hopeful, adventurous faith in uncharted territory",
      "texture": [
        "fine film grain across entire frame (40–50% opacity)",
        "subtle mottled paper-fiber texture especially visible in sky gradients"
      ],
      "background": {
        "elements": [
          "softly blurred mesas / sandstone cliffs on left horizon, partially obscured by atmospheric haze",
          "rolling dunes sweeping rightward with natural ripples and ridges",
          "distant faint rock outcrops on far right horizon, barely visible through dust"
        ],
        "depth_of_field": "sharp mid-ground on main subjects, increasingly soft toward distant background"
      },
      "subjects": [
        {
          "type": "adult female",
          "description": "wearing ankle-length black robe and muted blue head-scarf, left hand clasped with companion",
          "pose": "walking away from viewer, slight forward lean",
          "position": "left foreground, just right of first vertical third"
        },
        {
          "type": "adult male",
          "description": "tunic and dark trousers, dusty blue head-wrap, right arm extended to hold partner's hand",
          "pose": "striding forward beside female",
          "position": "just right of female, lower left quadrant"
        },
        {
          "type": "camel with rider",
          "description": "tall, tan-brown camel carrying a robed rider (dark garments, faint red accent at shoulder)",
          "pose": "walking in step with the people",
          "position": "dead center bottom-middle, camel legs casting elongated shadows"
        },
        {
          "type": "child",
          "description": "small figure in dark brown robe, white head-scarf, following camel",
          "pose": "walking briskly, slight turn toward camel",
          "position": "right of camel, center-bottom"
        }
      ],
      "graphic_elements": [
        {
          "type": "radial_lines",
          "description": "hand-drawn starburst of ~40 irregular rays, imperfect line weight for vintage feel",
          "color": "#7a5c42",
          "position": "centered behind main title block, rays extending roughly one text-height above and around"
        }
      ],
      "typography": {
        "hierarchy": [
          {
            "text": "{sermon_title}",
            "font": "classic transitional serif (e.g., Baskerville)",
            "weight": "regular",
            "size": "medium",
            "color": "#5c4027",
            "letter_spacing": "normal",
            "case": "title",
            "position": "immediately below starburst apex, centered"
          }
        ],
        "subtitle": {
          "text": "{sermon_topic}",
          "font": "condensed geometric sans-serif (e.g., Futura Condensed Extra Bold), all caps",
          "weight": "medium",
          "size": "small",
          "color": "#d7d4cb",
          "letter_spacing": "150",
          "position": "just below title, right-aligned to end of title"
        }
      },
      "style": "cinematic, vintage poster aesthetic with modern font pairing; warm filmic color grade, subtle split-toning in shadows and highlights",
      "post_processing": [
        "light sepia color grade",
        "slight vignette (10% darkening at corners)",
        "film-burn dust specks randomly distributed",
        "very soft Gaussian bloom around bright text to integrate with background"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827ba33dbfc243b8dfdee35.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827ba33dbfc243b8dfdee35.jpeg"
  },
  {
    id: "ink-clouds",
    title: "Colorful Ink Clouds",
    description: "Dynamic ink clouds with modern typography",
    categories: ["modern", "artistic", "abstract", "bold", "colorful"],
    promptModifiers: `{
      "scene": "high-speed macro photography of acrylic ink clouds diffusing in clear water, captured against a soft light-grey studio backdrop",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": "central focus; ink mass takes up the middle two vertical thirds and spreads horizontally from left edge to two-thirds right; negative space in far left/right edges and upper corners keeps composition balanced; text is horizontally and vertically centered over the densest ink area",
      "color_palette": {
        "background": "#d8dcd8",
        "ink_teal": "#0fa3a5",
        "ink_deep_teal": "#045d66",
        "ink_olive": "#698a37",
        "ink_burnt_orange": "#934a1c",
        "star_white": "#f6f6f6",
        "text_white": "#ffffff"
      },
      "lighting": "even diffused soft-box lighting from both upper left and upper right, eliminating harsh shadows; slight top highlight on ink plumes; background illuminated evenly to a pale neutral grey",
      "mood": "curious, introspective, modern",
      "texture": [
        "smooth bokeh in background due to shallow depth-of-field",
        "fine suspended micro-bubbles visible inside the ink (10–15% opacity)",
        "very subtle grain overlay (film-like, 8% opacity) for cohesion"
      ],
      "background": {
        "elements": [
          "clean glass tank wall faintly visible as horizontal line along top fifth (blurred)",
          "gradual vignette darkening toward extreme corners (5% strength)"
        ],
        "depth_of_field": "sharpest focus on forward ink folds and front edge of white star; gradual blur toward rear edges of ink cloud and background glass"
      },
      "subjects": [
        {
          "type": "ink_cloud_teal",
          "description": "billowing, cauliflower-like plumes of vibrant teal and cyan hues with occasional darker turquoise veins",
          "position": "left-center, extending to just right of image center"
        },
        {
          "type": "ink_cloud_olive",
          "description": "overlapping olive-green ink with hints of yellow-green, merging with burnt orange wisps near the top",
          "position": "right-center, blending into teal toward middle"
        },
        {
          "type": "ink_cloud_burnt_orange",
          "description": "narrow streaks of warm burnt orange emerging from the top-center of olive cloud, providing warm contrast",
          "position": "top-center"
        }
      ],
      "graphic_elements": [],
      "typography": {
        "main_title": {
          "text": "{SERMON_TITLE}",
          "font": "condensed modern sans-serif with high verticality (similar to 'Oswald Light' with stylised open counters in M and G)",
          "weight": "semi-bold",
          "size": "extra-large (spanning ~55% image width)",
          "color": "#ffffff",
          "letter_spacing": "200",
          "case": "uppercase",
          "alignment": "center",
          "position": "center, slightly below vertical midpoint of frame"
        }
      },
      "style": "cinematic macro-ink photography with minimalist typography overlay; emphasis on color contrast between cool teal/cyan and warm olive/orange; clean futuristic vibe",
      "post_processing": [
        "10% gaussian blur applied to entire frame then masked out from central ink mass and star to create subtle depth",
        "overall contrast boosted by +12 to deepen shadows within ink folds",
        "slight clarity increase (+15) on star edges to keep geometric object crisp",
        "gentle desaturation of background by −20 to keep focus on ink colors",
        "linear white text layer with drop opacity 100%, no shadow or effects"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682934d49540100fc9797e22.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682934d49540100fc9797e22.jpeg"
  },
  {
    id: "bw-double-exposure",
    title: "BW Double Exposure",
    description: "High-contrast monochrome double-exposure artwork",
    categories: ["modern", "bw", "double-exposure", "photoreal", "gritty"],
    promptModifiers: `{
      "scene": "high-contrast monochrome double-exposure artwork: a young woman's left-facing profile blended with a mist-covered mountain landscape, set on a distressed white concrete background",
       "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": {
        "grid": "rule-of-thirds; face occupies the entire left vertical third, text spans the central third, right third remains largely negative space",
        "flow": "viewer eye enters at woman's nose tip, follows river valley inward toward center, then across headline to right edge"
      },
      "color_palette": {
        "paper_white": "#f1f1f1",
        "pale_gray": "#d9d9d9",
        "mid_gray": "#9b9b9b",
        "charcoal_gray": "#3a3a3a",
        "near_black": "#151515"
      },
      "lighting": "even studio lighting flattened to grayscale; shadows within facial features kept soft; landscape retains natural light gradients but compressed for high contrast",
      "mood": "introspective, cerebral, modern-minimalist with a raw gritty texture",
      "textures": [
        "heavy concrete / plaster wall texture across entire canvas (50% opacity overlay)",
        "vertical dry-brush streaks descending from top right to mid-right, 15% opacity",
        "random black dust specks and white paint flecks (2-4 px) scattered sparsely (~0.5% coverage)",
        "fine film grain noise layered uniformly (20% opacity)"
      ],
      "background": {
        "base_color": "paper_white",
        "distress": "subtle charcoal smudges and hand-rubbed graphite shading radiating from center-right outward",
        "vignette": "extremely light inward vignette (-6 exposure at corners)"
      },
      "subjects": [
        {
          "type": "female_profile_silhouette",
          "description": "side profile of a young woman with relaxed, meditative expression; eyelids closed, lips gently pressed; neck and hair strands taper toward bottom edge",
          "position": "left third, nose almost touching left border",
          "opacity_mask": "100% inside mountain exposure, fades to 0% beyond silhouette edge"
        },
        {
          "type": "mountain_valley",
          "description": "rocky alpine valley viewed from above, steep slopes on each side, winding river / trail snaking from lower center up toward distant cloud bank",
          "blend_mode": "screen + hard light combo for deep blacks and bright whites",
          "position": "conforms to entire head silhouette, river path aligned with woman's neck-to-jaw line"
        },
        {
          "type": "cloud_bank",
          "description": "low-hanging misty clouds partially obscuring mountain peaks, fine soft-edge transition into scalp region",
          "opacity": "70%",
          "position": "upper cranial region within silhouette"
        }
      ],
      "graphic_elements": [],
      "typography": {
        "headline": {
          "text": "{sermon_title}",
          "split_render": [
            {
              "segment": "{sermon_title_first_half}",
              "font": "extended geometric sans-serif (similar to 'Bebas Neue', uppercase)",
              "weight": "bold",
              "color": "#cfd1d3",
              "texture_mask": "concrete texture clipping mask to introduce speckled erosion",
              "letter_spacing": "215",
              "opacity": "90%"
            },
            {
              "segment": "{sermon_title_second_half}",
              "font": "same family, bold weight",
              "color": "#1d1f22",
              "texture_mask": "same concrete mask but inverted to keep darker fills mostly solid",
              "letter_spacing": "215",
              "opacity": "100%"
            }
          ],
          "size": "ultra-large (cap height ≈ 18% of canvas height)",
          "alignment": "horizontal centerline, starts slightly right of facial silhouette and ends ~160 px from right edge",
          "baseline_shift": "first half baseline perfectly aligned to second half baseline"
        }
      },
      "style": "high-key B&W double-exposure poster; brutalist typography meets ethereal nature imagery; tactile, weathered paper aesthetic",
      "post_processing": [
        "convert composite to monochrome, apply red-filter B&W preset to darken sky, brighten skin",
        "curves adjustment: raise whites, deepen shadows to pure #151515 blacks",
        "add concrete JPEG texture overlay, set to multiply at 50% opacity then masked off around headline to keep characters legible",
        "apply brushed graphite texture layer, angled 20° from vertical, soft light 35% opacity on right half only",
        "apply high-pass sharpen (radius 1.2 px, soft-light blend) limited to mountain details for crispness",
        "final noise layer: monochrome, 3% opacity, film grain size 400 dpi"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827bcc3c519288e6a28f831.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827bcc3c519288e6a28f831.jpeg"
  },
  {
    id: "pop-art-devotional",
    title: "Pop-Art Devotional",
    description: "Contemporary sermon graphic with vintage halftone aesthetics",
    categories: ["pop-art", "modern", "vintage", "halftone", "illustrative"],
    promptModifiers: `{
      "scene": "contemporary sermon–series title graphic combining vintage halftone print aesthetics with a classical 19th-century painting of Jesus preaching (Sermon on the Mount)",
     "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": {
        "split": "50% left typographic block, 50% right illustrative block",
        "padding_left": 150,
        "balance": "large text mass anchors left; golden halo + red robe create focal counter-weight on right; crowd of listeners forms a low horizontal base tying both halves together",
        "eye_flow": "viewer reads downward through stacked headline, pops to red #Matthew 28 tag, tracks right to Jesus' up-raised hand, then loops around disciples and back to headline"
      },
      "color_palette": {
        "canvas_cream": "#dad7c9",
        "halftone_dot": "#4a4a4a",
        "headline_black": "#1e1e1e",
        "halo_mustard": "#e4c440",
        "paint_stroke_red": "#c93313",
        "hash_tag_white": "#ffffff",
        "subtitle_black": "#262626",
        "robe_red": "#b6341f",
        "robe_blue_grey": "#2e4455",
        "earth_green": "#505536"
      },
      "lighting": "flat, even illumination emulating ink-on-paper; painting portion retains subtle directional museum-style key light from upper right (soft highlights on faces, dampened shadows)",
      "mood": "playful yet reverent; mash-up of modern social-media irony (#Matthew 28) with sacred classical art",
      "textures": [
        "uniform 14 ppi halftone dot pattern over entire cream background",
        "very light recycled-paper grain (5 % opacity) across full canvas",
        "ragged acrylic brush texture defining edges of red paint stroke",
        "subtle film grain (10 % opacity) over painting to unify with print look"
      ],
      "background": {
        "base": "solid canvas_cream fill",
        "overlay": "halftone_dot pattern at 30 % opacity multiply blend"
      },
      "subjects": [
        {
          "type": "jesus_teaching",
          "description": "seated figure of Jesus, shoulder-length brown hair, beard, wearing deep red tunic with muted slate-blue cloak; right hand raised index finger, left hand resting on knee",
          "position": "right-center, occupying from 45 % to 70 % horizontally and middle vertical third",
          "blend": "clean cut-out with 1 px soft edge feather; minor color-noise added to match halftone environment"
        },
        {
          "type": "disciples_crowd",
          "description": "approximately 14 surrounding listeners in assorted first-century garments—greys, earth greens, ochres—some looking toward Jesus, others pondering",
          "position": "forms lower horizontal band stretching from far left margin into right illustrative block"
        }
      ],
      "graphic_elements": [
        {
          "type": "halo_circle",
          "description": "perfect circle 940 px diameter filled with halo_mustard color, overlaid with 15 % halftone dot transparency to match background texture",
          "position": "centered behind Jesus' upper torso and head; left edge overlaps headline's right margin by ~40 px",
          "blend_mode": "multiply"
        },
        {
          "type": "paint_stroke_label",
          "description": "torn-edge rectangular acrylic swatch (610×120 px) in paint_stroke_red with jagged organic top/bottom edges, subtle inner shadow for depth",
          "position": "left side, baseline aligned between 'Ever.' and subtitle",
          "text": {
            "content": "#Matthew 28",
            "font": "casual handwritten brush script (e.g., 'Marker Felt'-style), white fill, slight 2 ° CCW tilt",
            "size": "80 pt",
            "letter_spacing": "normal"
          }
        }
      ],
      "typography": {
        "headline": [
          {
            "word": "{sermon_title_word1}",
            "font": "ultra-bold slab serif (similar to 'IBM Plex Serif ExtraBold')",
            "size": "258 pt",
            "color": "headline_black",
            "tracking": "-15",
            "line_height": "0.9",
            "x_offset": 150
          },
          {
            "word": "{sermon_title_word2}",
            "font": "same",
            "size": "258 pt",
            "color": "headline_black",
            "tracking": "-15",
            "line_height": "0.9",
            "x_offset": 150
          },
          {
            "word": "{sermon_title_word3}",
            "font": "same",
            "size": "258 pt",
            "color": "headline_black",
            "tracking": "-15",
            "line_height": "0.9",
            "x_offset": 150
          }
        ],
        "subtitle": {
          "text": "{sermon_topic}",
          "font": "clean geometric sans-serif (e.g., 'Montserrat SemiBold')",
          "size": "64 pt",
          "color": "subtitle_black",
          "letter_spacing": "-5",
          "position": "baseline aligned 28 px below red paint stroke"
        }
      },
      "style": "pop-art meets devotional poster; combination of halftone print flatness, bold editorial typography, social-media visual cue, and Renaissance-style painting cutout",
      "post_processing": [
        "apply 'Comic Print' halftone filter to background only",
        "selective color tweak to brighten robe_red highlights (+10 saturation, +5 brightness)",
        "add mild drop shadow (blur radius 6 px, y-offset 4 px, 30 % opacity) beneath each headline word for crisp legibility on dot background",
        "new layer: unified noise (1.5 %), soft-light 40 %, to meld all elements",
        "final curve: gentle S-curve to lift whites (canvas_cream) slightly and deepen dark charcoal tones without crushing colored painting details"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827cd461e09cf5c034a537d.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827cd461e09cf5c034a537d.jpeg"
  },
  {
    id: "throwback-doodle",
    title: "Throwback-Doodle",
    description: "Retro-washed ministry poster with playful doodles",
    categories: ["retro", "playful", "street", "film", "worship"],
    promptModifiers: `{
      "scene": "retro-washed ministry poster featuring a warm-toned illustration of Jesus helping a kneeling figure in a sun-bleached courtyard; bold modern lettering and playful white doodles collide with heavy film-grain texture",
    "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": {
        "foreground_block": "monolithic headline centred horizontally, spanning from very top of middle third to just below halfway line; letterforms intentionally overlap main illustration to feel pasted on",
        "illustration_anchor": "Jesus (standing) just right of centre, head 70 px below top safe-zone; kneeling receiver at lower centre; adobe wall and foliage frame action",
        "doodle_balance": "white scribbles and ovals counter-weight corners (upper-left, upper-right, lower-left, lower-right) to keep viewer's eye circulating"
      },
      "color_palette": {
        "vintage_sepia": "#d4976d",
        "sun_bleach_highlight": "#f8dbc0",
        "deep_shadow_brown": "#3a2420",
        "headline_white": "#ffffff",
        "light_leak_gold": "#fecf4c",
        "grain_speck": "#000000"
      },
      "lighting": "high-noon desert light in original painting (hard top-down), then globally flattened by orange/peach photo filter (+30 warmth, +10 tint) and faded highlights to mimic 1970s film stock; subtle rainbow light-leak flare from bottom-centre upward (golden-yellow shifting to faint magenta)",
      "mood": "energetic, DIY-zine meets worship-poster; vintage reverence tempered by casual street-art confidence",
      "textures": [
        "dense 35 mm film grain (amount ≈ 45 %, size ≈ 3 px)",
        "random dust & hair specs (1-3 px) ~0.7 % coverage",
        "subtle halftone dot underlayer on wall (10 % opacity, 12 ppi)",
        "faint crease / scratch lines diagonal across right half (opacity 15 %)"
      ],
      "background": {
        "layers": [
          "base peach-sepia colour fill (#d4976d)",
          "cut-out classical painting of Jesus scene (colour-graded, set to 92 % opacity)",
          "dark burnt-edge vignette (25 % opacity, feather 320 px) on extreme left and right"
        ]
      },
      "subjects": [
        {
          "type": "jesus_standing",
          "description": "long brown hair, russet tunic, pale undershirt, bending slightly to extend hand",
          "position": "x: 55 %, y: 35 %",
          "embellishment": "small 3-point white crown doodle floating 22 px above head (hand-drawn, 2 px stroke)"
        },
        {
          "type": "kneeling_figure",
          "description": "robed individual, dusty blue garment, hands lifted toward Jesus",
          "position": "x: 43 %, y: 62 %"
        }
      ],
      "graphic_elements": [
        {
          "type": "headline_doodle_cluster",
          "elements": [
            {
              "shape": "scribble_swirl",
              "stroke": "4 px white",
              "position": "upper-left corner, curling inward 210 px×170 px"
            },
            {
              "shape": "scribble_swirl",
              "stroke": "4 px white",
              "position": "upper-right corner, diagonal 180 px sweep following frame edge"
            },
            {
              "shape": "scribble_swirl",
              "stroke": "4 px white",
              "position": "lower-right corner, 260 px curved flourish"
            }
          ]
        },
        {
          "type": "oval_cross_group",
          "description": "hand-drawn white ellipse (5 px stroke) tilted 22 ° CCW with bold white plus sign centred inside",
          "position": "lower-left quadrant, ellipse 620 × 260 px"
        },
        {
          "type": "circular_text_path",
          "description": "lower-case sentence '{sermon_subtitle}' repeated around 360 ° path, font - condensed sans, 28 pt, tracking 30",
          "color": "#ffffff",
          "position": [
            { "x": "29 %", "y": "58 %" },
            { "x": "76 %", "y": "18 %" }
          ],
          "diameter": "200 px"
        }
      ],
      "typography": {
        "headline": {
          "text": "{sermon_title}",
          "font": "ultra-bold geometric sans (akin to 'Anton' or 'Compacta Black')",
          "size": "first line cap-height 340 px, second line 290 px",
          "tracking": "-15",
          "leading": "-40",
          "case": "upper",
          "fill": "headline_white",
          "stroke": { "color": "none" },
          "inner_shadow": "soft orangey-brown #c17755, distance 0, size 14 px, opacity 35 %",
          "position": "centered; baseline of second line sits at 63 % canvas height"
        }
      },
      "style": "gritty Christian street-poster; mash-up of vintage mission photo, oversized type, white marker graffiti, and skateboard-mag aesthetic",
      "post_processing": [
        "apply LUT 'Kodak Porta Warm' at 60 %",
        "add gradient map (#fef0c4 → #d4976d → #3a2420) at 20 % Soft Light",
        "overlay 8-bit noise layer (blend Overlay 45 %)",
        "light-leak radial gradient centre-bottom (#fecf4c to transparent) Screen 55 %",
        "Gaussian blur copy of entire canvas (2 px) set to Hard Light 20 % for bloom around white headline",
        "final Unsharp Mask (amount 65 %, radius 1.0, threshold 3) to emphasise grain"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682934d4e5ca6c3465f343e9.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682934d4e5ca6c3465f343e9.jpeg"
  },
  {
    id: "vintage-red-sharpie",
    title: "Vintage Red Sharpie",
    description: "Vintage-print sermon graphic with handwritten elements",
    categories: ["vintage", "handwritten", "print", "bulletin", "classic"],
    promptModifiers: `{
      "scene": "vintage-print sermon-series graphic poster, laid out on warm recycled paper stock with visible pulp fibers, faint fold-creases, and scattered black ink specks",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "style": [
        "1960s offset-print / 1970s church bulletin aesthetic",
        "heavy halftone dots, slight CMYK mis-registration",
        "soft radial-blur vignette around edges",
        "overall matte finish with 4 % Gaussian noise grain"
      ],
      "color_palette": {
        "paper":        "#d5d0c2",
        "headline_blue":"#2b6f97",
        "scribble_ink": "#1d1d1d",
        "handwrite_red":"#c33b33",
        "accent_gold":  "#c0b04d",
        "painting_teal":"#6ba3a5",
        "painting_robe":"#ae4135"
      },
      "background": {
        "base_color": "paper",
        "textures": [
          "fine paper fiber pattern (10 % opacity multiply)",
          "random 2–4 px black flecks and pinholes",
          "hairline black registration crop marks touching top-left and top-right edges",
          "sub-visible 45° halftone dot field (#4a4a4a at 12 % opacity)",
          "slightly darker vertical fold shadow 80 px from right edge"
        ]
      },
      "elements": [
        {
          "type": "text",
          "content": "{sermon_title}",
          "font": "compressed, extra-bold grotesque sans-serif",
          "case": "uppercase",
          "size": "≈400 px",
          "letter_spacing": "tight",
          "color":  "headline_blue",
          "position": { "x_pct": 3,  "y_pct": 3 },
          "distress": [
            "30 % of glyph edges eroded with subtle paper show-through",
            "occasional missing dot speckle (dry-ink effect)"
          ]
        },
        {
          "type": "stroke",
          "description": "hand-drawn tapering underline",
          "brush_style": "dry china-ink",
          "thickness": "12 px taper → 3 px",
          "length": "83 % canvas width",
          "color": "scribble_ink",
          "position_anchor": "base of SERMON word"
        },
        {
          "type": "image",
          "source": "19th-century oil painting of the Sermon on the Mount",
          "description_detail": {
            "jesus": "center-right, seated, scarlet robe with deep-blue cloak, right hand raised",
            "disciples": "cluster of six listeners on left half, muted earth-toned garments",
            "landscape": "loose impressionistic brush strokes, olive and ochre hillside fading to turquoise sky"
          },
          "crop": "5:4",
          "size": "≈32 % canvas width",
          "position": { "x_pct": 62, "y_pct": 31 },
          "edge_treatment": [
            "soft halftone feather (25 px)",
            "swirling radial-blur spoke at lower margin, blending painting into paper"
          ],
          "color_grade": "slightly desaturated, +15 warmth"
        },
        {
          "type": "text_block",
          "style": "casual felt-tip handwriting",
          "ink_color": "handwrite_red",
          "line_height": "118 %",
          "size": "≈38 px",
          "blocks": [
            {
              "content": "{sermon_topic}",
              "position": { "x_pct": 4, "y_pct": 28 }
            }
          ],
          "extra_details": [
            "natural baseline wobble",
            "occasional double-stroke where marker paused"
          ]
        },
        {
          "type": "text",
          "content": "{sermon_reference}",
          "font": "same grotesque as headline",
          "case": "uppercase",
          "weight": "900",
          "size": "≈120 px",
          "letter_spacing": "3 px",
          "color": "accent_gold",
          "opacity": 0.88,
          "position": { "x_pct": 21, "y_pct": 56 }
        }
      ],
      "post_processing": [
        "Add 2 % chromatic aberration along left edge of headline",
        "Overlay 6 % opacity dusty film grain",
        "Apply subtle (3 px radius) sharpen on entire composition"
      ],
      "export_settings": {
        "format": "PNG",
        "compression": "none to preserve grain texture"
      }
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827cf2d89ba40f48fa404e8.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827cf2d89ba40f48fa404e8.jpeg"
  },
  {
    id: "architecture-collage",
    title: "Architecture Collage",
    description: "Architectural elements with geometric framing",
    categories: ["collage", "architectural", "geometric", "editorial", "vintage"],
    promptModifiers: `{
      "canvas": {
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
        "background": {
          "base_color": "#8f8677",
          "texture": "high-resolution parchment / aged map paper with fine marbling, faint latitude–longitude grid lines and hairline cracks",
          "film_grain": {
            "intensity": 0.35,
            "size": "fine"
          }
        }
      },
      "color_palette": {
        "parchment": "#8f8677",
        "text_cream": "#ececec",
        "rust_orange": "#b9833e",
        "deep_rust": "#8c3d18",
        "sage_olive": "#66694e",
        "column_marble": "#c7c7c7",
        "accent_arrow": "#b17930"
      },
      "layers": [
        {
          "type": "planet_disc",
          "shape": "perfect_circle",
          "diameter_pct_of_height": 75,
          "center": { "x_pct": 50, "y_pct": 38 },
          "gradient": {
            "style": "radial – multitone cloud",
            "inner_color": "#b9833e",
            "mid_tone": "#8c3d18",
            "outer_color": "#66694e",
            "noise": "subtle nebula speckles",
            "blend_mode": "overlay",
            "opacity": 0.90
          }
        },
        {
          "type": "orbit_arc",
          "geometry": "concentric_outline",
          "stroke_color": "#d1cec6",
          "stroke_width_px": 4,
          "radius_pct_of_height": 77,
          "center": { "x_pct": 50, "y_pct": 38 },
          "start_angle_deg": 190,
          "end_angle_deg": 40,
          "opacity": 0.65
        },
        {
          "type": "orbit_arc",
          "geometry": "concentric_outline",
          "stroke_color": "#d1cec6",
          "stroke_width_px": 2,
          "radius_pct_of_height": 95,
          "center": { "x_pct": 6, "y_pct": 96 },
          "start_angle_deg": 280,
          "end_angle_deg": 20,
          "opacity": 0.6
        },
        {
          "type": "column_fragment",
          "image_style": "high-contrast grayscale photograph",
          "position": { "anchor": "top_left", "x_px": 140, "y_px": 30 },
          "size": { "width_px": 540, "height_px": 210 },
          "orientation": "horizontal entablature slab + Ionic capital",
          "grunge_mask": 0.25
        },
        {
          "type": "column_fragment",
          "image_style": "high-contrast grayscale photograph",
          "position": { "anchor": "bottom_right", "x_px": -60, "y_px": 690 },
          "size": { "width_px": 560, "height_px": 220 },
          "orientation": "horizontal entablature slab + Ionic capital",
          "grunge_mask": 0.25
        },
        {
          "type": "chevron_triplet",
          "icon": "single-line triangle",
          "fill_color": "#b17930",
          "position": { "anchor": "top_left", "x_px": 60, "y_px": 70 },
          "direction": "right",
          "size_px": 44,
          "spacing_px": 10,
          "opacity": 0.93
        },
        {
          "type": "chevron_triplet",
          "icon": "single-line triangle",
          "fill_color": "#b17930",
          "position": { "anchor": "bottom_right", "x_px": -40, "y_px": 780 },
          "direction": "left",
          "size_px": 44,
          "spacing_px": 10,
          "opacity": 0.93
        },
        {
          "type": "dot",
          "color": "#b17930",
          "radius_px": 22,
          "position": { "x_pct": 7, "y_pct": 60 }
        },
        {
          "type": "dot",
          "color": "#b17930",
          "radius_px": 18,
          "position": { "x_pct": 97, "y_pct": 20 }
        },
        {
          "type": "photographic_element",
          "subject": "Victorian-era wooden church façade with central steeple and cross",
          "treatment": "monochrome, slight cyan tint (#9ca1a8), 35% halftone",
          "position": { "anchor": "bottom_center", "x_pct": 50, "y_pct": 94 },
          "size": { "height_pct_of_canvas": 45 },
          "blend_mode": "multiply",
          "layer_mask": "tapered feather 15px"
        },
        {
          "type": "text",
          "content": "{sermon_title}",
          "font_family": "Extra-Condensed Sans (e.g., League Spartan Bold Condensed)",
          "all_caps": true,
          "font_weight": 900,
          "letter_spacing_em": 0.01,
          "font_size_px": 430,
          "fill_color": "#ececec",
          "texture_overlay": {
            "pattern": "granular paper fibers",
            "intensity": 0.18
          },
          "position": { "x_pct": 50, "y_pct": 56 },
          "alignment": "center",
          "max_width_pct": 82,
          "z_index": 9000
        }
      ],
      "post_processing": {
        "global_grain": "15% noise on luminosity channel",
        "vignette": {
          "shape": "subtle radial",
          "darken_strength": 0.10
        },
        "color_grade": {
          "lift": "-3",
          "gamma": "0",
          "gain": "+2",
          "temperature_shift": "-3 (cooler in shadows)",
          "saturation": "-8 overall, +6 in rust/olive midtones"
        }
      }
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827d01280f93e0bc6af0382.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827d01280f93e0bc6af0382.jpeg"
  },
  {
    id: "modern-earth-collage",
    title: "Modern-Earth Collage",
    description: "Modern collage with dreamy pastel-desert sky",
    categories: ["collage", "modern", "dreamy", "nature", "abstract"],
    promptModifiers: `{
      "scene": "modern collage-style sermon graphic built around the single word '{sermon_title}', blending photography, geometric shapes, and flat UI icons against a dreamy pastel-desert sky",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "style": [
        "contemporary worship-media collage",
        "grainy matte film texture (8 % noise)",
        "subtle CMYK halftone on photographic areas",
        "high-contrast serif typography with soft white outer-glow"
      ],
      "color_palette": {
        "sky_peach":      "#f4cfa7",
        "terra_sienna":   "#9e4e44",
        "midnight_navy":  "#1e223f",
        "indigo_circle":  "#2e4576",
        "sunset_peach":   "#f0b18b",
        "desert_orange":  "#e68f58",
        "sand_beige":     "#e9caa4",
        "text_white":     "#ffffff"
      },
      "background": {
        "layers": [
          "base gradient sky → vertical blend (#f4cfa7 at top → #e9caa4 mid → #d8c0b2 bottom)",
          "wispy cumulus clouds, warm-lit from left, opacity 55 %",
          "global film-grain overlay (Add blend, 8 % strength)"
        ]
      },
      "elements": [
        {
          "type": "shape",
          "name": "left_top_semicircle",
          "shape": "semicircle",
          "fill": "terra_sienna",
          "diameter_pct": 46,
          "position": { "x_pct": 9, "y_pct": 14 }
        },
        {
          "type": "shape",
          "name": "central_circle",
          "shape": "circle",
          "fill": "radial gradient indigo_circle → midnight_navy",
          "diameter_pct": 57,
          "position": { "x_pct": 47, "y_pct": 46 },
          "texture": "fine halftone dots 10 % opacity",
          "mask": "low-opacity cloud photograph clipped inside"
        },
        {
          "type": "shape",
          "name": "right_semicircle",
          "shape": "semicircle",
          "fill": "sunset_peach",
          "diameter_pct": 60,
          "position": { "x_pct": 75, "y_pct": 62 }
        },
        {
          "type": "shape",
          "name": "bottom_bar",
          "shape": "rectangle",
          "fill": "desert_orange",
          "size_pct": { "w": 54, "h": 11 },
          "position": { "x_pct": 23, "y_pct": 87 }
        },
        {
          "type": "photo",
          "description": "sepia desert dunes with two tiny hikers on ridge",
          "crop_mode": "wide panorama",
          "position": { "x_pct": 75, "y_pct": 9 },
          "scale_pct": 55,
          "details": "hikers ≈0.9 % canvas height, casting long morning shadows"
        },
        {
          "type": "photo",
          "description": "charcoal-toned craggy mountain etching",
          "crop_mode": "isolate on transparent BG",
          "position": { "x_pct": 15, "y_pct": 70 },
          "scale_pct": 32
        },
        {
          "type": "photo",
          "description": "dramatic sun-kissed alpine ridge (orange highlights, deep shadows)",
          "crop_mode": "clipped inside right_semicircle",
          "position": "inherits right_semicircle bounds"
        },
        {
          "type": "text",
          "content": "{sermon_title}",
          "font": "ultra-high contrast old-style serif (e.g., Recoleta Black or Canela Deck Bold)",
          "size": "≈470 px",
          "tracking": "0 px",
          "case": "uppercase",
          "color": "text_white",
          "position": { "x_pct": 50, "y_pct": 50 },
          "alignment": "center",
          "effects": [
            "outer glow 14 px, #ffffff at 80 % opacity",
            "vertical fade mask on lower 15 % of glyphs"
          ],
          "special_glyph_edits": [
            "counter of O replaced with 4-point star cut-out (rotated 45°)"
          ]
        },
        {
          "type": "bird",
          "species": "seagull",
          "count": 4,
          "positions_pct": [
            { "x": 36, "y": 24 },
            { "x": 64, "y": 23 },
            { "x": 48, "y": 55 },
            { "x": 82, "y": 46 }
          ],
          "wing_spans_px": [320, 300, 390, 260],
          "lighting": "top-left key, soft rim on right wing edges",
          "motion_blur": "subtle 2 px on wing tips"
        },
        {
          "type": "icon_column",
          "location": "left edge",
          "icons": [
            { "shape": "4-point sparkle", "size_px": 46 },
            { "shape": "diagonal hatch square", "size_px": 52 },
            { "shape": "three nested rings", "size_px": 48 }
          ],
          "stroke": "text_white",
          "gap_px": 32,
          "position": { "x_pct": 4.4, "y_pct": 55 }
        },
        {
          "type": "icon_column",
          "location": "bottom-right",
          "icons": [
            { "shape": "inverted chevron-arch", "size_px": 46 },
            { "shape": "4-leaf clover", "size_px": 50 },
            { "shape": "wireframe globe", "size_px": 60 }
          ],
          "stroke": "text_white",
          "gap_px": 34,
          "position": { "x_pct": 90, "y_pct": 67 }
        },
        {
          "type": "text",
          "content": "{sermon_topic}",
          "font": "condensed grotesque caps",
          "size": "≈34 px",
          "leading": "90 %",
          "tracking": "6 %",
          "color": "text_white",
          "position": { "x_pct": 12.5, "y_pct": 20 },
          "alignment": "left"
        }
      ],
      "post_processing": [
        "global film grain (Add, 8 %)",
        "subtle chromatic aberration: +1 px red fringe on right edge, −1 px cyan on left",
        "1.5 px sharpen pass on foreground gulls only"
      ],
      "export_settings": {
        "format": "PNG",
        "compression": "lossless",
        "color_profile": "sRGB"
      }
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827d0a41e09cfb1fb4a55b2.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827d0a41e09cfb1fb4a55b2.jpeg"
  },
  {
    id: "photoreal",
    title: "Photographic",
    description: "Professional portrait style with cinematic lighting & subtle environmental storytelling",
    categories: ["photoreal", "cinematic", "portrait", "modern", "emotive"],
    promptModifiers: `{
  "scene": "photo-realistic, cinematic portrait in a thoughtfully composed environment relevant to the sermon",
  "image_dimensions": "1536×1024",
  "aspect_ratio": "3:2 landscape",
  "composition": "main subject (figure or scene) is centered or follows the rule of thirds; strong visual hierarchy",
  "subjects": [
    {
      "type": "typographic element",
      "description": "{sermon_title}",
      "position": "center-bottom"
    },
    {
      "type": "typographic element",
      "description": "{sermon_topic}",
      "position": "bottom-right"
    }
  ],
  "color_palette": {
    "main": "#e0e0e0",
    "text": "#232323",
    "accents": "#70a8ff"
  },
  "lighting": "cinematic, soft rim light with gentle background separation",
  "mood": "emotive, professional, cinematic",
  "style": "modern, cinematic, photo-realistic with subtle environmental storytelling"
}`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9d9cd8fb87c29ba7f0.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9d9cd8fb87c29ba7f0.png"
  },
  {
    id: "minimalist",
    title: "Modern Minimal",
    description: "Clean, editorial layout with purposeful negative space",
    categories: ["minimal", "modern", "editorial", "clean", "sophisticated"],
    promptModifiers: `{
  "scene": "minimalist editorial layout with strategic negative space and clean lines",
  "image_dimensions": "1536×1024",
  "aspect_ratio": "3:2 landscape",
  "composition": "centered or left-aligned text block for {sermon_title}, smaller subtitle for {sermon_topic} below",
  "subjects": [
    {
      "type": "typographic element",
      "description": "{sermon_title}",
      "position": "center or upper third"
    },
    {
      "type": "typographic element",
      "description": "{sermon_topic}",
      "position": "below title"
    }
  ],
  "color_palette": {
    "background": "#f7f7f5",
    "text": "#1a1a1a",
    "accent": "#efb347"
  },
  "lighting": "soft, ambient, no harsh shadows",
  "mood": "calm, focused, modern",
  "style": "modern editorial minimalism with restrained color palette and clear hierarchy"
}`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c183ce57ad6921011.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c183ce57ad6921011.png"
  },
  {
    id: "retro80s",
    title: "Retro 80s",
    description: "Synthwave-inspired design with bold energy",
    categories: ["retro", "80s", "bold", "synthwave", "colorful"],
    promptModifiers: `{
  "scene": "retro 1980s synthwave landscape or abstract composition with bold neon colors and gradients",
  "image_dimensions": "1536×1024",
  "aspect_ratio": "3:2 landscape",
  "composition": "title text {sermon_title} large and central; subtitle {sermon_topic} in smaller type below",
  "subjects": [
    {
      "type": "typographic element",
      "description": "{sermon_title}",
      "position": "center"
    },
    {
      "type": "typographic element",
      "description": "{sermon_topic}",
      "position": "below title"
    }
  ],
  "color_palette": {
    "background": "#2c2c54",
    "neon_pink": "#f74c84",
    "neon_blue": "#00eafc",
    "title_text": "#fff900",
    "subtitle_text": "#ffffff"
  },
  "lighting": "glowing neon, dramatic light streaks",
  "mood": "energetic, nostalgic, bold",
  "style": "retro-futurist, synthwave, geometric shapes, high contrast"
}`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9db098801ec44508d0.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9db098801ec44508d0.png"
  },
  {
    id: "biblical",
    title: "Cinematic",
    description: "Epic, dramatic artwork inspired by ancient narratives",
    categories: ["cinematic", "epic", "biblical", "ancient", "dramatic"],
    promptModifiers: `{
  "scene": "dramatic, cinematic depiction of a key biblical moment or symbol, with rich textures and lighting",
  "image_dimensions": "1536×1024",
  "aspect_ratio": "3:2 landscape",
  "composition": "main focal point for {sermon_title}; {sermon_topic} as subtitle beneath or in a side block",
  "subjects": [
    {
      "type": "typographic element",
      "description": "{sermon_title}",
      "position": "centered or top third"
    },
    {
      "type": "typographic element",
      "description": "{sermon_topic}",
      "position": "bottom or lower third"
    }
  ],
  "color_palette": {
    "background": "#31241e",
    "highlight": "#ffd27f",
    "accent": "#936639",
    "text": "#f5f2ed"
  },
  "lighting": "strong directional light, deep shadows, cinematic mood",
  "mood": "epic, timeless, profound",
  "style": "cinematic, biblical, ancient, dramatic with symbolic detail"
}`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251c81183ce502b0921294.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251c81183ce502b0921294.png"
  },
  {
    id: "youth",
    title: "Youthful Collage",
    description: "Modern grunge collage full of energy and layers",
     categories: ["youth", "collage", "grunge", "energetic", "modern"],
    promptModifiers: `{
  "scene": "energetic collage with torn paper textures, paint splatters, and overlapping graphic elements",
  "image_dimensions": "1536×1024",
  "aspect_ratio": "3:2 landscape",
  "composition": "dynamic layering with {sermon_title} large and bold, {sermon_topic} as secondary label; scattered decorative elements for energy",
  "subjects": [
    {
      "type": "typographic element",
      "description": "{sermon_title}",
      "position": "center, partly overlapped by collage elements"
    },
    {
      "type": "typographic element",
      "description": "{sermon_topic}",
      "position": "bottom or integrated into collage"
    }
  ],
  "color_palette": {
    "background": "#272a34",
    "highlight": "#ffdd2d",
    "accent": "#fa347a",
    "text": "#ffffff"
  },
  "lighting": "flat collage lighting",
  "mood": "energetic, youthful, layered",
  "style": "grunge collage, mixed media, youth poster aesthetic"
}`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9dc469326aedc5682b.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9dc469326aedc5682b.png"
  },
  {
    id: "vintage",
    title: "Vintage Print",
    description: "Classic aesthetic with authentic print textures",
    categories: ["vintage", "classic", "print", "timeless", "texture"],
    promptModifiers: `{
  "scene": "classic vintage print with paper grain, halftone textures, and traditional layout",
  "image_dimensions": "1536×1024",
  "aspect_ratio": "3:2 landscape",
  "composition": "central typographic headline for {sermon_title}, secondary {sermon_topic} below or above, fine print details",
  "subjects": [
    {
      "type": "typographic element",
      "description": "{sermon_title}",
      "position": "centered"
    },
    {
      "type": "typographic element",
      "description": "{sermon_topic}",
      "position": "below headline"
    }
  ],
  "color_palette": {
    "paper": "#eae1d1",
    "ink": "#232323",
    "accent": "#aa3232"
  },
  "lighting": "flat print-style lighting",
  "mood": "timeless, classic, crafted",
  "style": "vintage print, classic, textured, high attention to print detail"
}`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c9cd8fb4b3d9ba7ed.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c9cd8fb4b3d9ba7ed.png"
  }
];