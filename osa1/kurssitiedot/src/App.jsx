
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header kurssi={course}/>
      <Content osa1={part1} harj1={exercises1} osa2={part2} harj2={exercises2} osa3={part3} harj3={exercises3}/>
      <Total harj1={exercises1} harj2={exercises2} harj3={exercises3}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
  <div>
    <Part osa={props.osa1} harj={props.harj1}/>
    <Part osa={props.osa2} harj={props.harj2}/>
    <Part osa={props.osa3} harj={props.harj3}/>
  </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.harj1 + props.harj2 + props.harj3}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.osa} {props.harj}</p>
    </div>
  )
}

export default App
