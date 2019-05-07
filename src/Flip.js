import React, {useState} from 'react'
import './Flip.css'
import uuid from 'uuid'

class Flipper extends React.Component {
  constructor(props){
    super(props)
    this.alphabet = [' ','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0','.','-',':','@'] 
    this.findWordArrays = this.findWordArrays.bind(this)
    this.sliceAlphabet = this.sliceAlphabet.bind(this)
    this.getCards = this.getCards.bind(this)
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

  getCards() {
    let {start, end} = this.findWordArrays()
    let cards = [];
    for(let i = 0; i < this.props.length; i++){
      let c = start[i]
      let t = end[i]
      let charList = this.sliceAlphabet(c,t)
      cards.push(
        <Card key={uuid()} charList={charList} flipping={charList.length > 0}/>
      )
    }
    return cards
  }

  render() {
    let cards = this.getCards()
    return( 
      <div className="flip-cards">
        {cards}
      </div>
    )
  }
}

// function Card(props) {
//   let shouldFlip = props.charList.length > 0
//   const [flipping, setFlipping] = useState(shouldFlip)
//   return (
//     <div className="card">
//       {s.flipping && !s.done && <FlipCard current={s.current} next={s.next} cb={this.callback}/>}
//       <div className="static">
//         <div className="half top-half">
//           <span className="letter top">{s.flipping ? s.next : s.current}</span>
//         </div>
//         <div className="half bottom-half">
//           <span className="letter bottom">{s.current}</span>
//         </div>
//       </div> 
//     </div>
//   )
// }

class Card extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      done: false,
      flipping: this.props.flipping || false,
      index: 0,
      current: this.props.charList[0] || '',
      next: this.props.charList[1] || '',
    }
    this.handleClick = this.handleClick.bind(this)
    this.callback = this.callback.bind(this)
  }

  handleClick(){
    this.setState({
      ...this.state,
      done: false, 
      flipping: true
    })
  }

  callback(){
    let i = this.state.index + 1
    let done = false
    if(i >= this.props.charList.length -1) done = true
    this.setState({
      ...this.state,
      flipping: false,
      index: i,
      current: this.props.charList[i],
      next: this.props.charList[i+1]
    })
    this.setState({
      ...this.state,
      flipping: !done,
      done
    })
  }

  render() {
    let s = this.state
    return (
      <div className="card" onClick={this.handleClick}>
        {s.flipping && !s.done && <FlipCard current={s.current} next={s.next} cb={this.callback}/>}
        <div className="static">
          <div className="half top-half">
            <span className="letter top">{s.flipping ? s.next : s.current}</span>
          </div>
          <div className="half bottom-half">
            <span className="letter bottom">{s.current}</span>
          </div>
        </div> 
      </div>
    )
  }
}

class FlipCard extends React.Component {
  componentDidMount(){
    this.node.addEventListener('animationend', this.props.cb)
  }

  componentWillUnmount() {
    this.node.removeEventListener('animationend', this.props.cb)
  }

  render(){
    return (
      <div className='roller' ref={n => this.node = n}>
        <div className="half front">
          <div className="letter top">{this.props.current}</div>
        </div>
        <div className="half back">
          <div className="letter bottom">{this.props.next}</div>
        </div>
      </div>
    )
  }
}

export default Flipper