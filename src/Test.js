import React, {useState, useEffect} from 'react'

function Wrapper() {
  const {x,y} = useMouse()
  return (
    <div className="wrapper" style={{color: 'white'}}>
    <p>This is the wrapper</p>
    <h2>These use HOC</h2>
    <Mouse render={(props)=> {
      return (<Test {...props}/>)
    }}/>
    {withMouse(Test)}
    <h2>These use State Hooks</h2>
    <Test x={x} y={y}/>
    <Jamie/>
    </div>
  )
}

function Test(props) {
  return (
    <div className="wrapper" style={{color: 'white'}}>
      <h1>This is a test</h1>
      <h2>My props: x:{props.x} y:{props.y}</h2>
    </div>
  )
}

class Mouse extends React.Component {
  constructor(props){
    super(props)
    this.state = {x: 0, y: 0}
    this.handleMouse = this.handleMouse.bind(this)
  }

  handleMouse(e){
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  render() {
    return (
      <div onMouseMove={this.handleMouse}>
        {this.props.render(this.state)}
      </div>
    )
    
  }
}

class Jamie extends React.Component {
  render(){
    let {x,y} = useMouse()
    return (
      <h1>Jamie component {x} {y}</h1>
    )
  }
}

function withMouse(Component) {
  return <Mouse render={(props)=> <Component {...props}/>}/>
}


function useMouse() {
  const [pos, setMouse] = useState({x: 0, y: 0})

  useEffect(()=> {
    // this is getting called during componentDidMount and componentDidUpdate
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      //this gets called on componentWillUnmount
      window.removeEventListener('mousemove', handleMouseMove)
    }
  })

  function handleMouseMove(e){
    setMouse({
      x: e.clientX,
      y: e.clientY
    })
  }

  return pos
  
}

export default Wrapper