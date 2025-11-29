"use client";
import { Code, Link, Type, HelpCircle } from 'lucide-react'

export default function SnippetHelper({ onInsert, onInsertQuiz }) {
  const exampleQuiz = JSON.stringify([
    {
      "question": "What is the capital of Korea?",
      "options": ["Busan", "Seoul", "Incheon", "Jeju"],
      "correct": 1
    }
  ], null, 2);

  return (
    <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
      <button type="button" onClick={() => onInsert('[[VOCAB::Term|Definition]]')} className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100 hover:bg-purple-100 flex items-center gap-1 whitespace-nowrap">
        <Type size={12}/> + Vocab
      </button>
      <button type="button" onClick={() => onInsert('[[ZOOM::https://zoom.us/j/123]]')} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 hover:bg-blue-100 flex items-center gap-1 whitespace-nowrap">
        <Link size={12}/> + Zoom Link
      </button>
      <button type="button" onClick={() => onInsert('[[DOWNLOAD_URL::https://link.com]]')} className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100 hover:bg-green-100 flex items-center gap-1 whitespace-nowrap">
        <Code size={12}/> + Download
      </button>
      {onInsertQuiz && (
        <button type="button" onClick={() => onInsertQuiz(exampleQuiz)} className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full border border-orange-100 hover:bg-orange-100 flex items-center gap-1 whitespace-nowrap">
          <HelpCircle size={12}/> + Quiz Template
        </button>
      )}
    </div>
  )
}
