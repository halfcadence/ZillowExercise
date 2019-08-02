import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import Test from './test.jpg';
import Microphone from './microphone.svg'
const App = () => (
  <div>
    Hello Zillow
    <img src={Microphone}></img>
    </div>
)

render(<App />, document.getElementById('root'))
