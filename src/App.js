import './App.css'
import {useState, useEffect} from 'react'

function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [start, setStart] = useState(false)
  const [session, setSession] = useState(true)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [timeLeft, setTimeLeft] = useState(1500)
  
  const handleStart = () => {
    setStart((start) => (!start))
  }

  const handleReset = () => {
    setBreakLength(5)
    setSessionLength(25)
    setMinutes(25)
    setSeconds(0)
    setStart(false)
    setSession(true)
    setTimeLeft(1500)
    const audio = document.getElementById("beep")
    audio.pause()
    audio.currentTime = 0
  }
  
  const handleBreakIncrement = () => {
    if (breakLength >= 60) return
    setBreakLength(breakLength + 1)
  }
  
  const handleBreakDecrement = () => {
    if (breakLength < 2) return
    setBreakLength(breakLength - 1)    
  }
  
  const handleSessionIncrement = () => {
    if (sessionLength >= 60) return
    setSessionLength(sessionLength + 1)     
  }
  
  const handleSessionDecrement = () => {
    if (sessionLength < 2) return
    setSessionLength(sessionLength - 1)
  }

  useEffect(()=> {
    session ? setTimeLeft(sessionLength * 60) : setTimeLeft(breakLength * 60) 
  }, [sessionLength, breakLength, session])

  useEffect(() => {
    setMinutes(Math.floor(timeLeft / 60))
    setSeconds(timeLeft % 60)
    if (start === false) return
    const timerId = setInterval(() => setTimeLeft(timeLeft-1), 1000)
    if (timeLeft === 0) {
      document.getElementById("beep").play()
    }
    else if (timeLeft < 0) {
      setSession(session => !session)
    }
    return () => clearInterval(timerId)   
    }
  ,[timeLeft, start])

  return (
    <div id="app">
    <h1>25 + 5 Clock</h1>
    <div id="container">
      <div id="break-container">  
        <div id="break-label" className="label">Break Length
          <div id="break-buttons" className="buttons">
            <button onClick={handleBreakIncrement} id="break-increment">+</button>
            <div id="break-length" className="length">{breakLength}</div>
            <button onClick={handleBreakDecrement} id="break-decrement">-</button>
          </div>  
        </div>
      </div>
      <div id="session-container">
        <div id="session-label" className="label">Session Length
          <div id="session-buttons" className="buttons">
            <button onClick={handleSessionIncrement} id="session-increment">+</button>
            <div id="session-length" className="length">{sessionLength}</div>
            <button onClick={handleSessionDecrement} id="session-decrement">-</button>
          </div>
        </div>
      </div>
    </div>
    <h2 id="timer-label" style={{color: session ? '#333' : 'green'}}>{session ? "Session" : "Break"}</h2>
    <div id="time-left" style={{color: session ? 'crimson' : 'green'}}>
      {(minutes < 10) ? ("0"+minutes) : (minutes)}:{(seconds % 60) < 10 ? ("0"+(seconds % 60)) : (seconds % 60)}
     </div> 
    <div className="buttons">
      <button onClick={handleStart} id="start_stop">{start ? "Stop" : "Start"}</button> 
      <button onClick={handleReset} id="reset">Reset</button>
    </div>
     <audio id="beep" src="http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg"></audio>
 </div>
  )
}

export default App