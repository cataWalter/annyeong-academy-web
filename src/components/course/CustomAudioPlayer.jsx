"use client";
import { useState, useRef, useEffect } from 'react'
import { Play, Pause, RotateCcw, MoreHorizontal } from 'lucide-react'

export default function CustomAudioPlayer({ src, title }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    const audio = audioRef.current
    if(!audio) return

    const updateProgress = () => setProgress((audio.currentTime / audio.duration) * 100)
    const setAudioDuration = () => setDuration(audio.duration)
    const onEnd = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', setAudioDuration)
    audio.addEventListener('ended', onEnd)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', setAudioDuration)
      audio.removeEventListener('ended', onEnd)
    }
  }, [src])

  const togglePlay = () => {
    if (isPlaying) audioRef.current.pause()
    else audioRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const changeSpeed = () => {
    const speeds = [0.8, 1, 1.25, 1.5]
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length
    const nextSpeed = speeds[nextIdx]
    audioRef.current.playbackRate = nextSpeed
    setSpeed(nextSpeed)
  }

  const handleSeek = (e) => {
    const width = e.target.clientWidth
    const clickX = e.nativeEvent.offsetX
    const duration = audioRef.current.duration
    audioRef.current.currentTime = (clickX / width) * duration
  }

  const formatTime = (time) => {
    if(isNaN(time)) return "0:00"
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)
    return `${min}:${sec < 10 ? '0'+sec : sec}`
  }

  return (
    <div className="bg-brand-dark text-white rounded-2xl p-6 shadow-lg">
      <audio ref={audioRef} src={src} />
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-brand-purple rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-slow">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        <div>
          <h3 className="font-bold text-lg leading-tight">{title}</h3>
          <p className="text-xs text-gray-400">Audio Lesson</p>
        </div>
      </div>

      <div className="mb-4 cursor-pointer group py-2" onClick={handleSeek}>
        <div className="w-full bg-gray-700 rounded-full h-2 relative">
          <div 
            className="bg-gradient-to-r from-brand-blue to-brand-purple h-2 rounded-full relative" 
            style={{ width: `${progress}%` }}
          >
            <div className="w-4 h-4 bg-white rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition shadow-md"></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1 font-mono">
          <span>{formatTime(audioRef.current?.currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button 
          onClick={changeSpeed}
          className="text-xs font-bold bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg transition w-16"
        >
          {speed}x
        </button>

        <div className="flex items-center gap-6">
          <button onClick={() => { audioRef.current.currentTime -= 10 }} className="text-gray-400 hover:text-white transition">
            <RotateCcw size={20} />
          </button>
          <button 
            onClick={togglePlay}
            className="w-14 h-14 bg-white text-brand-dark rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg shadow-white/10"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>
          <button onClick={() => { audioRef.current.currentTime += 10 }} className="text-gray-400 hover:text-white transition transform scale-x-[-1]">
            <RotateCcw size={20} />
          </button>
        </div>

        <div className="w-16"></div> {/* Spacer for centering */}
      </div>
    </div>
  )
}
