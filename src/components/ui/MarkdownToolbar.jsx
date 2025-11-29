"use client";
import { Bold, Italic, Link, List, Heading, Quote } from 'lucide-react'

export default function MarkdownToolbar({ textareaRef, value, setValue }) {
  const insertText = (before, after = '') => {
    const el = textareaRef.current
    const start = el.selectionStart
    const end = el.selectionEnd
    const text = value
    const newText = text.substring(0, start) + before + text.substring(start, end) + after + text.substring(end)
    setValue(newText)
    el.focus()
    setTimeout(() => { el.setSelectionRange(start + before.length, end + before.length) }, 0)
  }

  return (
    <div className="flex gap-1 p-2 bg-gray-100 border-b border-gray-200 rounded-t-xl">
      <button type="button" onClick={() => insertText('**', '**')} className="p-2 hover:bg-gray-200 rounded text-gray-600" title="Bold"><Bold size={16}/></button>
      <button type="button" onClick={() => insertText('*', '*')} className="p-2 hover:bg-gray-200 rounded text-gray-600" title="Italic"><Italic size={16}/></button>
      <button type="button" onClick={() => insertText('# ')} className="p-2 hover:bg-gray-200 rounded text-gray-600" title="Heading"><Heading size={16}/></button>
      <button type="button" onClick={() => insertText('[', '](url)')} className="p-2 hover:bg-gray-200 rounded text-gray-600" title="Link"><Link size={16}/></button>
      <button type="button" onClick={() => insertText('- ')} className="p-2 hover:bg-gray-200 rounded text-gray-600" title="List"><List size={16}/></button>
      <button type="button" onClick={() => insertText('> ')} className="p-2 hover:bg-gray-200 rounded text-gray-600" title="Quote"><Quote size={16}/></button>
    </div>
  )
}
