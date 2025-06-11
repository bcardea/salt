import { supabase } from '../lib/supabase';

export interface TextGeneration {
  type: 'flavor' | 'depth' | 'aroma';
  title: string;
  inputs: Record<string, any>;
  content: string;
}

export async function saveTextGeneration(generation: TextGeneration) {
  try {
    const { data, error } = await supabase
      .from('text_generations')
      .insert([generation])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error saving text generation:', error);
    throw error;
  }
}

export async function getUserTextGenerations() {
  try {
    const { data, error } = await supabase
      .from('text_generations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error fetching text generations:', error);
    throw error;
  }
}
