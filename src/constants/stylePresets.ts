  {
    id: "folded-paper-minimal",
    title: "Folded Paper Minimal",
    description: "Neutral folded-paper minimal design",
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
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22954010514b79671c.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22954010514b79671c.jpeg"
  },
  {
    id: "neon-pastel",
    title: "Neon Pastel",
    description: "Pastel dawn gradient with prayer hands line art",
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
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22d083855a19168da7.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22d083855a19168da7.jpeg"
  },
  {
    id: "retro-revival",
    title: "Retro Revival",
    description: "Vintage revival flyer with praying hands",
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
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f228acc4aeb7bb7e7c0.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f228acc4aeb7bb7e7c0.jpeg"
  },
  {
    id: "ancient-maps",
    title: "Ancient Maps",
    description: "Antique parchment map with decision-point typography",
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
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22954010809c79671d.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22954010809c79671d.jpeg"
  },
  {
    id: "tropical-easter",
    title: "Tropical Easter",
    description: "Dense tropical foliage around modern type",
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
    promptModifiers: `{
      "scene": "centered minimalist layout with crossed boxing gloves illustration on a red textured background",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": "centered alignment with boxing gloves forming a visual X at center; title text layered above and below",
      "color_palette": {
        "background_red": "#d9453a",
        "engraving_blue": "#1c2441",
        "text_white": "#ffffff"
      },
      "lighting": "flat poster-style lighting with no realistic shadows",
      "mood": "resolute, commanding, spiritually militant and motivational",
      "texture": [
        "gritty red stucco texture",
        "fine crosshatch engraving style on boxing gloves"
      ],
      "background": {
        "elements": [
          "solid red wash with grunge overlay"
        ],
        "depth_of_field": "flat, screenprint effect"
      },
      "subjects": [
        {
          "type": "illustration",
          "description": "crossed boxing gloves",
          "position": "dead center"
        },
        {
          "type": "typographic element",
          "description": "{sermon_title}",
          "position": "centered over boxing gloves"
        },
        {
          "type": "typographic element",
          "description": "{sermon_topic}",
          "position": "beneath title"
        }
      ],
      "graphic_elements": [],
      "typography": {
        "hierarchy": [
          {
            "text": "{sermon_title}",
            "font": "bold geometric sans-serif",
            "weight": "heavy",
            "size": "extra large",
            "color": "#ffffff",
            "letter_spacing": "wide",
            "case": "uppercase",
            "position": "center"
          }
        ],
        "subtitle": {
          "text": "{sermon_topic}",
          "font": "modern sans-serif",
          "weight": "medium",
          "size": "medium",
          "color": "#ffffff",
          "letter_spacing": "normal",
          "position": "below main title"
        }
      },
      "style": "vintage gym poster meets spiritual illustration",
      "post_processing": [
        "vibrancy enhancement on red background",
        "grain and ink texture overlay on illustration lines"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22a6cf150d4f66dbe3.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22a6cf150d4f66dbe3.jpeg"
  },
  {
    id: "luminous-desert-cross",
    title: "Luminous Desert Cross",
    description: "Night desert with glowing cross and script",
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
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291fade5ca6c1eebf32ba4.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291fade5ca6c1eebf32ba4.jpeg"
  }