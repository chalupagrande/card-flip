import React from 'react'
import uuid from 'uuid'
// import './Ticker.css'

class Ticker extends React.Component {
  constructor(props){
    super(props)
    this.alphabet = [' ','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0','.','-',':'] 
    this.findWordArrays = this.findWordArrays.bind(this)
    this.sliceAlphabet = this.sliceAlphabet.bind(this)
    this.getCards = this.getCards.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      in: false,
      current: this.props.current || '',
      target: this.props.target || '',
       ...this.findWordArrays()
      }
  }

  findWordArrays(){
    let wordArray = this.props.current.split('')
    let nextArray = this.props.target.split('')
    let wordBlanks = [...Array(this.props.length - wordArray.length).keys()].map(()=> ' ')
    let nextBlanks = [...Array(this.props.length - nextArray.length).keys()].map(()=> ' ')
    return {start: [...wordBlanks, ...wordArray], end: [...nextBlanks, ...nextArray]}
  }

  sliceAlphabet(c, t) {
    if(c === t) return []
    let ci = this.alphabet.indexOf(c)
    let ti = this.alphabet.indexOf(t)
    if(ci < ti) return this.alphabet.slice(ci, ti + 1)
    else {
      let first = this.alphabet.slice(ci) 
      let last = this.alphabet.slice(0, ti+ 1)
      return [...first, ...last]
    }
  }

  handleClick() {
    this.setState({
      ...this.state,
      in: !this.state.in
    })
  }

  getCards() {
    let cards = [];
    for(let i = 0; i < this.props.length; i++){
      let c = this.state.start[i]
      let t = this.state.end[i]
      let charList = this.sliceAlphabet(c,t)
      cards.push(
        <Card key={uuid()} charList={charList} in={this.state.in}/>
      )
    }
    return cards
  }

  render() {
    let rollers = [...Array(this.props.length).keys()].map(() => {
      return (
        <Roller alphabet={this.alphabet}/>
      )
    })
    return( 
      <div className="ticker">
        {rollers}
        <button onClick={this.handleClick}>FLIP</button>
      </div>
    )
  }
}

class Roller extends React.Component {
  render() {
    let cards = this.props.alphabet.map((letter, i,a) => {
      let next = a[i+1] || a[0]
      return (<Card key={uuid()} front={letter} back={next} active={false}/>)
  })
    return (
      <div className="roller">
        {cards}
      </div>
    )
  }
}

class Card extends React.Component {
  render() {
    return (
      <div className={`card ${this.props.active ? 'card--active':''}`}>
        <div className="half front">
          <div className="letter top">{this.props.front}</div>
        </div>
        <div className="half back">
          <div className="letter bottom">{this.props.back}</div>
        </div>
      </div>
    )
  }
}


export default Ticker