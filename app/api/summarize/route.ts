import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes text concisely.",
        },
        {
          role: "user",
          content: `Summarize the following text in a concise manner: ${text}`,
        },
      ],
      max_tokens: 150,
    });

    const summary = response.choices[0].message.content;

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while summarizing the text." },
      { status: 500 }
    );
  }
}
