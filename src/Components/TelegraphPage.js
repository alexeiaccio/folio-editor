import React, { Component } from 'react'
import 'whatwg-fetch'
//import fetch from 'isomorphic-fetch'
import Editor from './Editor'

class TelegraphPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: []
    }
  }
  componentDidMount() {
    fetch(`https://api.telegra.ph/getPage?path=${this.props.path}&return_content=true`)
      .then(res => res.json())
      .then(data => {
        let title = ''
        let content = []
        if (data.ok) {
          title = data.result.title
          content = data.result.content
        } else {
          title = 'Something wrong...'
          content = [{"tag": "em", "children": ["Error: ", data.error]}]
        }
        this.setState({title})
        this.setState({content})
      })
      .catch(err => console.log(err))
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
      <React.Fragment>
        <h1 className="TelegraphPage-header">{this.state.title}</h1>
        <Editor 
          className="TelegraphPage-content" 
          content={ getContent({children: this.state.content}) } />
      </React.Fragment>
    )
  }
}

export default TelegraphPage
