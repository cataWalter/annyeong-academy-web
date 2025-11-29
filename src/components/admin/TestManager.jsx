"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, Plus, Brain, Save } from 'lucide-react'

export default function TestManager() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Form State
  const [qText, setQText] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctIdx, setCorrectIdx] = useState(0)
  const [level, setLevel] = useState('beginner')

  useEffect(() => { fetchQuestions() }, [])

  const fetchQuestions = async () => {
    const { data } = await supabase.from('placement_questions').select('*').order('created_at', { ascending: true })
    setQuestions(data || [])
    setLoading(false)
  }

  const handleOptionChange = (idx, val) => {
    const newOpts = [...options]
    newOpts[idx] = val
    setOptions(newOpts)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = {
      question: qText,
      options: options,
      correct_index: parseInt(correctIdx),
      level
    }
    
    await supabase.from('placement_questions').insert([payload])
    
    // Reset Form
    setQText('')
    setOptions(['', '', '', ''])
    setCorrectIdx(0)
    fetchQuestions()
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if(!confirm("Delete question?")) return
    await supabase.from('placement_questions').delete().eq('id', id)
    fetchQuestions()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Brain size={20}/> Add Question</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Question Text</label>
            <input required className="input-field mt-1" value={qText} onChange={e => setQText(e.target.value)} placeholder="e.g. How to say Hello?" />
          </div>
          
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Options</label>
            <div className="space-y-2 mt-1">
              {options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="correct" 
                    checked={correctIdx === i} 
                    onChange={() => setCorrectIdx(i)}
                    className="accent-brand-purple"
                  />
                  <input 
                    required 
                    className="input-field py-1 text-sm" 
                    placeholder={`Option ${i+1}`}
                    value={opt}
                    onChange={e => handleOptionChange(i, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-1">* Select the radio button for the correct answer</p>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Difficulty</label>
            <select className="input-field mt-1" value={level} onChange={e => setLevel(e.target.value)}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <button disabled={loading} className="btn btn-plum-gradient w-full py-2 flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" size={16}/> : <><Plus size={16}/> Add Question</>}
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {questions.length === 0 && <div className="text-center p-8 text-gray-400 border border-dashed rounded-xl">No questions yet.</div>}
        {questions.map((q, i) => (
          <div key={q.id} className="bg-white p-5 rounded-xl border border-gray-100 relative group">
            <button onClick={() => handleDelete(q.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500"><Trash2 size={16}/></button>
            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded mb-2 inline-block ${q.level === 'beginner' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{q.level}</span>
            <h4 className="font-bold text-gray-800 mb-3"><span className="text-gray-400 mr-2">#{i+1}</span>{q.question}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {q.options.map((opt, idx) => (
                <div key={idx} className={`p-2 rounded border ${idx === q.correct_index ? 'bg-green-50 border-green-200 text-green-800 font-bold' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
                  {opt}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .input-field { width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; outline: none; font-size: 0.9rem; transition: all 0.2s; }
        .input-field:focus { border-color: #6a11cb; ring: 2px solid #6a11cb33; }
      `}</style>
    </div>
  )
}
