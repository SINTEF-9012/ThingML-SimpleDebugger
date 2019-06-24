import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SiderDemo from './layout';

import {
    BrowserRouter,
  } from 'react-router-dom';

//Ideas of statistics: time per state, nb of logs, nb of messages emitted


ReactDOM.render(<BrowserRouter><SiderDemo /></BrowserRouter>, document.getElementById('root'));

