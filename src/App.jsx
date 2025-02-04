
import './App.css'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import Footer from './components/Footer'
import Marquee from './components/Marquee'

function App() {

  return (
    <div>
      <NavBar/>
      <HeroSection/>
      <div className="container bg-gray-950 mx-auto w-full h-screen text-white flex justify-center items-center overflow-x-hidden">
      <Marquee />
      </div>
      <Footer/>
    </div>
  )
}

export default App
