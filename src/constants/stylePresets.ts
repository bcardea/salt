import { StylePreset } from '../services/imageGeneration';

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: "desert",
    title: "Desert Journey",
    description: "Cinematic desert scenes with rich storytelling",
    promptModifiers: JSON.stringify({
      scene: "vast, windswept desert under a hazy beige-grey sky, rendered in warm sepia tones with a subtle vintage paper grain overlay",
      image_dimensions: "1536×1024",
      aspect_ratio: "3:2 landscape",
      composition: "rule-of-thirds: horizon line and crest of main dune sit on lower third; text block occupies central third; ample negative space in upper right sky",
      color_palette: {
        sky: "#d9d2bd",
        dune_highlights: "#c89a64",
        dune_shadows: "#7d4e2d",
        distant_rocks: "#8c6f54",
        title_text: "#f5f1e6",
        accent_text: "#ff4b1d",
        subtitle_text: "#d7d4cb",
        starburst: "#7a5c42"
      },
      lighting: "soft late-afternoon sunlight diffused by airborne dust; gentle warm highlights, long muted shadows behind every foreground figure",
      mood: "solemn yet hopeful, adventurous faith in uncharted territory",
      texture: [
        "fine film grain across entire frame (40–50% opacity)",
        "subtle mottled paper-fiber texture especially visible in sky gradients"
      ],
      background: {
        elements: [
          "softly blurred mesas / sandstone cliffs on left horizon, partially obscured by atmospheric haze",
          "rolling dunes sweeping rightward with natural ripples and ridges",
          "distant faint rock outcrops on far right horizon, barely visible through dust"
        ],
        depth_of_field: "sharp mid-ground on main subjects, increasingly soft toward distant background"
      },
      subjects: [
        {
          type: "adult female",
          description: "wearing ankle-length black robe and muted blue head-scarf, left hand clasped with companion",
          pose: "walking away from viewer, slight forward lean",
          position: "left foreground, just right of first vertical third"
        },
        {
          type: "adult male",
          description: "tunic and dark trousers, dusty blue head-wrap, right arm extended to hold partner's hand",
          pose: "striding forward beside female",
          position: "just right of female, lower left quadrant"
        },
        {
          type: "camel with rider",
          description: "tall, tan-brown camel carrying a robed rider (dark garments, faint red accent at shoulder)",
          pose: "walking in step with the people",
          position: "dead center bottom-middle, camel legs casting elongated shadows"
        },
        {
          type: "child",
          description: "small figure in dark brown robe, white head-scarf, following camel",
          pose: "walking briskly, slight turn toward camel",
          position: "right of camel, center-bottom"
        }
      ],
      graphic_elements: [
        {
          type: "radial_lines",
          description: "hand-drawn starburst of ~40 irregular rays, imperfect line weight for vintage feel",
          color: "#7a5c42",
          position: "centered behind main title block, rays extending roughly one text-height above and around"
        },
        {
          type: "logo",
          description: "tiny white circle with stylised arrow-and-cross icon",
          position: "absolute bottom-center, sitting on dune shadow"
        }
      ],
      typography: {
        hierarchy: [
          {
            text: "The",
            font: "classic transitional serif (e.g., Baskerville)",
            weight: "regular",
            size: "medium",
            color: "#5c4027",
            letter_spacing: "normal",
            case: "title",
            position: "immediately below starburst apex, centered"
          },
          {
            text: "Family",
            font: "elegant high-contrast serif (e.g., Playfair Display or Didot)",
            weight: "bold",
            size: "extra-large (dominant word)",
            color: "#f5f1e6",
            letter_spacing: "tight",
            case: "title",
            position: "center-middle, baseline aligned with camel hump"
          },
          {
            text: "Trust",
            font: "vintage blackletter / gothic (e.g., Deutsch Gothic, no distressed texture)",
            weight: "bold",
            size: "large — initial T oversize swash overlaps previous line",
            color: "#ff4b1d",
            letter_spacing: "normal",
            case: "title",
            position: "center-middle, baseline rests on dune ridge"
          }
        ],
        subtitle: {
          text: "TRUSTING GOD IN UNCHARTED TERRITORY",
          font: "condensed geometric sans-serif (e.g., Futura Condensed Extra Bold), all caps",
          weight: "medium",
          size: "small",
          color: "#d7d4cb",
          letter_spacing: "150",
          position: "just below 'Trust', right-aligned to end of blackletter"
        }
      },
      style: "cinematic, vintage poster aesthetic with modern font pairing; warm filmic color grade, subtle split-toning in shadows and highlights",
      post_processing: [
        "light sepia color grade",
        "slight vignette (10% darkening at corners)",
        "film-burn dust specks randomly distributed",
        "very soft Gaussian bloom around bright text to integrate with background"
      ]
    }),
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9d9cd8fb87c29ba7f0.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9d9cd8fb87c29ba7f0.png"
  },
  // ... Would you like me to continue with updating the other presets with similarly detailed JSON structures?
];