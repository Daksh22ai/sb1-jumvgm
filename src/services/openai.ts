import type { ResumeAnalysis } from '../types';

const SYSTEM_PROMPT = `You are an expert resume analyzer. Analyze the resume text and provide:
1. A score out of 100
2. List of skills with proficiency levels
3. Career path recommendations
4. Specific improvement suggestions
Format your response as a JSON object matching the ResumeAnalysis type.`;

export async function analyzeResume(resumeText: string): Promise<ResumeAnalysis> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Analyze this resume:\n\n${resumeText}` }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze resume');
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
}

export async function getChatResponse(message: string, context: ResumeAnalysis | null): Promise<string> {
  try {
    const contextPrompt = context 
      ? `Context - Resume Analysis:\n${JSON.stringify(context, null, 2)}\n\n`
      : '';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert resume assistant helping users improve their resumes. Provide specific, actionable advice.' 
          },
          { 
            role: 'user', 
            content: `${contextPrompt}User question: ${message}` 
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get chat response');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error getting chat response:', error);
    throw error;
  }
}