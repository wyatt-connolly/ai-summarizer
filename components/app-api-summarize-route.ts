'use client'

import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize the Gemini AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    // Generate content using Gemini AI
    const result = await model.generateContent(`Summarize the following text in a concise manner: ${text}`)
    const summary = result.response.text()

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred while summarizing the text.' }, { status: 500 })
  }
}