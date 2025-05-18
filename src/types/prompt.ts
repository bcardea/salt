export interface PromptElement {
  type: 'subject' | 'setting' | 'style' | 'mood';
  value: string;
  suggestions: string[];
}

export interface PromptData {
  elements: PromptElement[];
  summary: string;
  rawPrompt: string;
}