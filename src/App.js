import React from 'react';
import Flipper from './Flip'
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      current: '        ',
      next: 'something',
      value: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  shouldComponentUpdate(np, ns){
    return ns.next !== this.state.next || ns.current !== this.state.current 
  }

  handleSubmit(e){
    e.preventDefault()
    this.setState({
      ...this.state,
      current: this.state.next,
      next: this.state.value,
      value: ''
    })
  }

  handleChange(e){
    this.setState({
      ...this.state,
      value: e.target.value
    })
  }

  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleChange}/>
        </form>
        <Flipper length={16} current={this.state.current} target={this.state.next}/>
      </div>
    ) 
  }
}



export default App;
