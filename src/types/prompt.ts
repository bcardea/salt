export interface PromptElement {
  type: 'subject' | 'location' | 'text' | 'extras';
  value: string;
  suggestions: string[];
}

export interface PromptData {
  elements: PromptElement[];
  summary: string;
  rawPrompt: string;
}