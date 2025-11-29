"use client";
import Link from 'next/link'

export default function CalendarView({ events }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  // Simple calendar logic
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  
  const emptyDays = Array(firstDay).fill(null)
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const getEventsForDay = (day) => {
    return events.filter(e => {
      const d = new Date(e.event_date)
      return d.getDate() === day && d.getMonth() === currentMonth && d.getFullYear() === currentYear
    })
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-bold text-xl text-brand-dark">{today.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
      </div>
      
      <div className="grid grid-cols-7 border-b border-gray-100">
        {days.map(d => (
          <div key={d} className="p-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 bg-gray-50/30">
        {emptyDays.map((_, i) => <div key={`empty-${i}`} className="min-h-[120px] border-b border-r border-gray-100 bg-gray-50/50"></div>)}
        
        {monthDays.map(day => {
          const dayEvents = getEventsForDay(day)
          const isToday = day === today.getDate()
          
          return (
            <div key={day} className={`min-h-[120px] p-2 border-b border-r border-gray-100 relative group transition hover:bg-white ${isToday ? 'bg-purple-50/30' : ''}`}>
              <span className={`text-sm font-bold mb-2 block w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-brand-purple text-white' : 'text-gray-500'}`}>{day}</span>
              
              <div className="space-y-1">
                {dayEvents.map(ev => {
                  const seatsLeft = (ev.total_seats || 99) - (ev.booked_seats || 0)
                  const isFull = seatsLeft <= 0
                  
                  return (
                    <Link href={`/events/${ev.id}`} key={ev.id} className={`block text-[10px] p-1.5 rounded border font-bold truncate transition ${isFull ? 'bg-gray-200 text-gray-500 border-gray-300' : 'bg-brand-blue/10 text-brand-blue border-brand-blue/20 hover:bg-brand-blue hover:text-white'}`}>
                      {new Date(ev.event_date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} {ev.title}
                      {!isFull && <span className="block font-normal text-[9px] opacity-80">{seatsLeft} spots left</span>}
                      {isFull && <span className="block font-normal text-[9px] text-red-500">FULL</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
