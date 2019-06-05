import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<main />, document.body)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
