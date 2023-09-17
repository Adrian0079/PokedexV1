import { useState, useEffect } from 'react'

import Home from './Home';
import Log from './Log';

import './App.css'
import { app } from './fb'

function App() {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    app.auth().onAuthStateChanged((userFB)=>{
      console.log("ya tienes una sesión iniciada con: ", userFB);
      setUser(userFB);
    })
  }, [])

  return (
    <>
    
    {user ? <Home /> : <Log setUser={setUser}/>}
    </>
  )
}

export default App
