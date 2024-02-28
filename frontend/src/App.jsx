import { BrowserRouter } from "react-router-dom";

import {Navbar,Footer,Timing, Team, About, Form} from './components'

const App=() =>{
  return (
    <BrowserRouter>
    <div className="relative display-flex flex-direction-column"> 
      <div className="bg-hero-patter bg-cover bg-no-repeat bg-center">
        <Navbar/>
      </div>
      <Form/>
      <About/>
      <Timing/>
      <Team/>
      <Footer/>
    </div>
    </BrowserRouter>
  )
}

export default App
