import { GoogleGenAI } from "@google/genai";
import { Course, Message } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getStudyTips = async (competitionTitle: string, category: string): Promise<string> => {
  try {
    const prompt = `You are an expert AI academic coach for "Brainer", a Nigerian competitive learning platform. A high school student has signed up for the "${competitionTitle}" in the category of "${category}". 
    
    Your task is to generate a comprehensive, personalized coaching plan to help them excel. Your response must be encouraging, strategic, and actionable.

    Your response must include the following sections, formatted in clear markdown:
    
    ### 🚀 Your Personalized Coaching Plan
    Start with a brief, powerful, and encouraging introduction that builds their confidence.

    ### 🗓️ Recommended Study Schedule
    Provide a simple 1-week study schedule outline. Be specific about what to focus on each day. For example: "Day 1: Foundational Concepts", "Day 2-3: Deep Dive & Practice", etc.
    
    ### 🎯 Key Strategies for Success
    List three critical, actionable strategies tailored to the competition's category. For a 'Debate' competition, this might be about structuring arguments; for 'Technology', it could be about brainstorming techniques.
    
    ### 🧠 Sample Practice Problem
    Create one relevant practice problem that reflects the nature of the competition.
    
    ### ✅ Step-by-Step Solution
    Provide a detailed, step-by-step solution to the practice problem, explaining the logic behind each step.

    ### 💪 Motivational Nudge
    End with a short, powerful motivational message to inspire the student.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching study tips from Gemini API:", error);
    return "I'm sorry, I couldn't generate study tips at this moment. Please check your API key and try again later.";
  }
};

export const getCourseHelp = async (course: Course, conversation: Message[]): Promise<string> => {
    try {
        const courseModules = course.modules.map((m, i) => `Module ${i+1}: ${m.title} - ${m.content}`).join('\n');

        const systemInstruction = `You are an expert and friendly AI Tutor for a course on the "Brainer" learning platform.
        A student is asking for help with the following course:

        Course Title: "${course.title}"
        Course Description: "${course.description}"
        Course Modules:
        ${courseModules}

        Please provide a clear, helpful, and encouraging response based on the conversation history and the latest question.
        - If the student asks for an explanation, break down the concept in simple terms.
        - If the student asks for a practice problem, create a relevant one with a solution.
        - If the student asks for resources, suggest relevant articles, videos, or books.
        - Keep your response focused on the course content.
        - Format the response in easy-to-read markdown.`;

        const contents = conversation.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }));

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error fetching course help from Gemini API:", error);
        return "I'm sorry, I couldn't generate a response at this moment. Please check your API key and try again later.";
    }
}