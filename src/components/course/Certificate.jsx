import { forwardRef } from 'react'

const Certificate = forwardRef(({ studentName, courseTitle, date }, ref) => {
  return (
    <div className="absolute left-[-9999px] top-0">
      <div 
        ref={ref}
        className="w-[800px] h-[600px] bg-white border-[20px] border-double border-brand-purple p-10 relative text-center flex flex-col items-center justify-center font-serif text-brand-dark"
        style={{ fontFamily: 'Times New Roman, serif' }}
      >
        {/* Watermark / Background Decoration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
           <div className="w-96 h-96 rounded-full border-[20px] border-gray-900"></div>
        </div>

        <div className="relative z-10 w-full">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-brand-purple uppercase tracking-widest mb-2">Certificate</h1>
            <p className="text-xl text-gray-500 uppercase tracking-widest">of Completion</p>
          </div>

          <p className="text-lg text-gray-600 italic mb-4">This is to certify that</p>
          
          <h2 className="text-4xl font-bold text-brand-dark border-b-2 border-gray-300 inline-block pb-2 mb-6 min-w-[400px]">
            {studentName}
          </h2>

          <p className="text-lg text-gray-600 italic mb-4">has successfully completed the course</p>

          <h3 className="text-3xl font-bold text-brand-blue mb-12">
            {courseTitle}
          </h3>

          <div className="flex justify-between items-end w-full px-16 mt-8">
            <div className="text-center">
              <p className="text-lg font-bold border-t border-gray-400 pt-2 px-4">{date}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Date</p>
            </div>

            <div className="w-24 h-24 bg-brand-purple rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white ring-4 ring-purple-100">
              <span className="text-xs text-center leading-tight">Annyeong<br/>Academy<br/>Seal</span>
            </div>

            <div className="text-center">
              <div className="font-script text-2xl text-brand-purple mb-[-10px]" style={{fontFamily: 'cursive'}}>Kim S.</div>
              <p className="text-lg font-bold border-t border-gray-400 pt-2 px-4">Kim Seon-saeng-nim</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Head Teacher</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Certificate
