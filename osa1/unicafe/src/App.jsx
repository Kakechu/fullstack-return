import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = ({text, value}) => {
  return (
    <p>
      {text} {value}
    </p>
  )
}

const Statistics = ({good, neutral, bad, total}) => {
  if (total === 0 ) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  const average = (good + bad * -1) / (total)
  const positive = good / total * 100
  return (
    <div>
      <StatisticsLine text = "good" value = {good}/>
      <StatisticsLine text = "neutral" value = {neutral}/>
      <StatisticsLine text = "bad" value = {bad}/>
      <StatisticsLine text = "all" value = {total}/>
      <StatisticsLine text = "average" value = {average}/>
      <StatisticsLine text = "positive" value = {`${positive} %`}/>
    </div>
  )

}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)


  const handleGood = () => {
    console.log("good before", good)
    const updatedGood = good + 1
    setGood(updatedGood)
    console.log("good after", updatedGood)
    setTotal(updatedGood + bad + neutral)
  }

  const handleNeutral = () => {
    console.log("neutral before", neutral)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    console.log("neutral after", updatedNeutral)
    setTotal(updatedNeutral + bad + good)
  }

  const handleBad = () => {
    console.log("bad before", bad)
    const updatedBad = bad + 1
    setBad(updatedBad)
    console.log("bad after", updatedBad)
    setTotal(good + neutral + updatedBad)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={handleGood}/>
      <Button text='neutral' handleClick={handleNeutral}/>
      <Button text='bad' handleClick={handleBad}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>

    </div>
  )
}

export default App
