import { StylePreset } from '../services/imageGeneration';

export function buildFinalPromptFromPreset(
  stylePreset: StylePreset,
  sermon_title: string,
  sermon_topic: string
): string {
  // 1. Parse promptModifiers as JSON
  let jsonObj = JSON.parse(stylePreset.promptModifiers);

  // 2. Replace all placeholders recursively
  function replacePlaceholders(obj: any): any {
    if (typeof obj === 'string') {
      return obj
        .replace(/{sermon_title}/g, sermon_title)
        .replace(/{sermon_topic}/g, sermon_topic);
    } else if (Array.isArray(obj)) {
      return obj.map(replacePlaceholders);
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj = { ...obj };
      for (let key in newObj) {
        newObj[key] = replacePlaceholders(newObj[key]);
      }
      return newObj;
    }
    return obj;
  }

  jsonObj = replacePlaceholders(jsonObj);

  // 3. Stringify and return
  return JSON.stringify(jsonObj, null, 2);
}