import './App.css'
import {useState, useEffect} from 'react'

function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timerLabel, setTimerLabel] = useState("Session")
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(60)
  const [timerOn, setTimerOn] = useState(false)
  const [sessionOn, setSessionOn] = useState(true)
  const [timer, setTimer] = useState(1500)
  
  const handleReset = () => {
    setBreakLength(5)
    setSessionLength(25)
    setMinutes(25)
    setSeconds(60)
    setTimerLabel("Session")
    setTimerOn(false)
    setSessionOn(true)
    const audio = document.getElementById("beep")
    audio.pause()
    audio.currentTime = 0
    setTimer(1500)
  }
  
  const handleBreakIncrement = () => {
    if (breakLength >= 60) {return}
    setBreakLength(breakLength + 1)
  }
  
  const handleBreakDecrement = () => {
    if (breakLength < 2) {return}
    setBreakLength(breakLength - 1)    
  }
  
  const handleSessionIncrement = () => {
    if (sessionLength >= 60) {return}
    setSessionLength(sessionLength + 1)      
  }
  
  const handleSessionDecrement = () => {
    if (sessionLength < 2) {return}
    setSessionLength(sessionLength - 1)
  }

  useEffect(() => {
    if (timerOn === false) {return}
    const timerId = setInterval(() => setTimer(timer-1), 1000)
    setSeconds(timer % 60)
    setMinutes(Math.floor(timer / 60))
    if (timer === 0) {
      setSessionOn(!sessionOn)
      document.getElementById("beep").play()
      if (!sessionOn) {
        setTimerLabel("Break")
        setTimer(breakLength * 60)
        setSeconds(60)
        setMinutes(breakLength)
      }
      else {
        setTimerLabel("Session")
        setTimer(sessionLength * 60)
        setSeconds(60)
        setMinutes(sessionLength)
      }
    }
    return () => clearInterval(timerId)     
  }
  ,[timer, timerOn])

  return (
    <div id="app">
    <h1>{sessionLength} + {breakLength} Clock</h1>
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
    <h2 id="timer-label" style={{color: sessionOn ? '#333' : 'green'}}>{timerLabel}</h2>
    <div id="time-left" style={{color: sessionOn ? 'crimson' : 'green'}}>
      {(minutes.toString().length === 1) ? "0"+(minutes) : (minutes)}:{(seconds % 60) <= 9 ? ("0"+(seconds % 60)) : (seconds % 60)}
     </div> 
    <div class="buttons">     
      <button onClick={() => setTimerOn(!timerOn)} id="start_stop">{timerOn ? "Stop" : "Start"}</button> 
      <button onClick={handleReset} id="reset">Reset</button>
    </div>
     <audio id="beep" src="http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg"></audio>
 </div>
  )
}

export default App
