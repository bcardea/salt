export interface PromptElement {
  type: 'title_style' | 'subtitle_style' | 'subject' | 'setting' | 'style' | 'mood';
  value: string;
  suggestions: string[];
}

export interface PromptData {
  elements: PromptElement[];
  summary: string;
  rawPrompt: string;
}