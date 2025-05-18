export interface PromptElement {
  type: 'style' | 'subject' | 'setting' | 'mood';
  value: string;
  suggestions: string[];
}

export interface PromptData {
  elements: PromptElement[];
  summary: string;
  rawPrompt: string;
}