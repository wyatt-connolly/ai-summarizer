'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Type, Zap } from 'lucide-react'

export function Page() {
  const [input, setInput] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      })
      const data = await response.json()
      setSummary(data.summary)
    } catch (error) {
      console.error('Error:', error)
      setSummary('An error occurred while summarizing the text.')
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <Zap className="w-8 h-8" />
            AI Text Summarizer
          </CardTitle>
          <CardDescription className="text-white/80">
            Powered by Gemini AI - Summarize any text with ease!
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Input Text
          </CardTitle>
          <CardDescription>Enter the text you want to summarize</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your text here..."
              className="mb-2"
              rows={8}
            />
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                Character count: {input.length}
              </span>
              <Button type="submit" disabled={loading || input.length === 0}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  'Summarize'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {summary && (
        <Card className="mt-8 bg-green-50 dark:bg-green-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{summary}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Character count: {summary.length}
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}