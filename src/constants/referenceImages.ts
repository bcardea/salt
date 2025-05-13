/**
 * Reference image type definition
 */
export type ReferenceImage = {
  id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
};

/**
 * Reference images for the image generation API
 * These images help guide the style and content of generated sermon artwork
 */
export const ReferenceImages: ReferenceImage[] = [
  {
    id: 'ref1',
    url: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682391af265ab55b4f38e913.png",
    title: "Modern Minimalist",
    description: "Clean layout with strong typography and minimal imagery",
    tags: ["minimalist", "typography", "clean"]
  },
  {
    id: 'ref2',
    url: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682391af16cf7275fa9a083b.png",
    title: "Abstract Shapes",
    description: "Geometric patterns with bold colors",
    tags: ["abstract", "geometric", "colorful"]
  },
  {
    id: 'ref3',
    url: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682391af265ab584e938e916.png",
    title: "Photographic Style",
    description: "Real imagery with text overlay",
    tags: ["photo", "realistic", "overlay"]
  },
  {
    id: 'ref4',
    url: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682391af77a9d43961dd547c.png",
    title: "Artistic Blend",
    description: "Mixed media with artistic elements",
    tags: ["artistic", "mixed-media", "creative"]
  },
  {
    id: 'ref5',
    url: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682391af265ab5542638e915.png",
    title: "Bold Typography",
    description: "Strong text-focused design",
    tags: ["typography", "bold", "text-focused"]
  },
  {
    id: 'ref6',
    url: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682391af4ad1fb159ae92eb7.png",
    title: "Symbolic Style",
    description: "Symbolic imagery with modern aesthetics",
    tags: ["symbolic", "modern", "iconic"]
  }
];