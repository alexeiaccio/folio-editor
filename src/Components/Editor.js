import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      text: '',
      modules: {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }],
          ['bold', 'italic', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['link', 'image'],
          ['clean']
        ],
      },
      formats: [
        'header',
        'bold', 'italic', 'blockquote',
        'list', 'bullet',
        'link', 'image'
      ]
    }
    this.quillRef = null
    this.reactQuillRef = null
  }

  

  
  componentDidMount() {
    this.attachQuillRefs()
  }
  
  componentDidUpdate() {
    this.attachQuillRefs()
  }
  
  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return
    this.quillRef = this.reactQuillRef.getEditor()
  }
  
  render() {
    return (
      <ReactQuill
        value={ this.state.text || this.props.content }
        ref={(el) => {this.reactQuillRef = el}}
        theme={'bubble'}
        modules={this.state.modules}
        formats={this.state.formats} />
    )
  }
}

export default Editor