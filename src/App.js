import React, { Component } from 'react'
//import 'whatwg-fetch'
import fetch from 'isomorphic-fetch'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: []
    }
  }
  componentDidMount() {
    fetch(`https://api.telegra.ph/getPage?path=api&return_content=true`)
      .then(res => res.json())
      .then(data => {
        const title = data.result.title
        const content = data.result.content
        this.setState({title})
        this.setState({content})
      })
  }
  render() {
    const getContent = node => {
      let getChildren = childrens => childrens.map(children => getContent(children)).join('')
      return node.tag 
        ? `<${node.tag}${
            node.attrs 
              ? Object.keys(node.attrs).map(key => ' ' + key + '=' + node.attrs[key]).join('')
              : ''
            }>${node.children 
              ? getChildren(node.children)
              : ''
            }</${node.tag}>`
        : node.children 
          ? getChildren(node.children)
          : node
    }
    return (
      <div className="App">
        <h1 className="App-header">{this.state.title}</h1>
        <div className="App-content" dangerouslySetInnerHTML={{__html: getContent({children: this.state.content})}}></div>
      </div>
    )
  }
}

export default App
