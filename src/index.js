import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'

const div = document.querySelector('div');
console.log(document.querySelectorAll('div:not([id]'));
ReactDOM.render(<App />, document.getElementById("root"));