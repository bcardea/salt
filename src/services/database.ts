import { supabase } from '../lib/supabase';

export interface TextGeneration {
  type: 'flavor' | 'depth' | 'aroma';
  title: string;
  inputs: Record<string, any>;
  content: string;
}

export async function saveTextGeneration(generation: TextGeneration) {
  try {
    // Get the current user's ID
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated. Please sign in to save generations.');
    }

    // First insert the generation
    const { error: insertError } = await supabase
      .from('text_generations')
      .insert([{ ...generation, user_id: user.id }]);

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      throw new Error(insertError.message || 'Failed to save generation');
    }

    // Then fetch the latest generation for this user
    const { data, error: selectError } = await supabase
      .from('text_generations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
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
