// const ele = document.createElement('div');
// ele.innerHTML = 'index.js';
// console.log('hello index.js');
// document.body.appendChild(ele);

import React from 'react';
import ReactDom from 'react-dom';

console.log('React', React)
console.log('ReactDom', ReactDom)

function App() {
  return React.createElement('div', {
    className: 'aaa',
    children: 'App'
  });
};

ReactDom.render(App(), document.body)



