import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="relative z-10 overflow-x-clip bg-black">
        <div
          className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-purple-600/30
        [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"
        ></div>
        <div className="container">
          <div className="border-t border-white/15 py-6 text-sm flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div className="text-white/40">abhishek shah</div>
          </div>
        </div>
      </footer>
      
    </div>
  )
}

export default Footer

