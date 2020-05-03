import React from 'react';
import { LoremIpsum } from "lorem-ipsum";
import './App.css';

const DEFAULT_LMIT = 100;
const DEFAULT_TYPE = 'w';
const ACCEPTED_TYPES = ['w', 'c'];
const MAX_LIMIT = 1000;

function App() {
  const lorem = new LoremIpsum();
  const params = window.location.pathname.split('/');
  let content = '';
  let wordsCount = 0;
  let charCount = 0;
  let limit = params.length >= 2 ? parseInt(params[1], 10) : DEFAULT_LMIT;
  let type = params.length >= 3 ? params[2] : DEFAULT_TYPE;
  let isOverLimit = false;
  limit = isNaN(limit) ? DEFAULT_LMIT : limit;
  type = ACCEPTED_TYPES.includes(type) ? type : DEFAULT_TYPE;

  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
    isOverLimit = true;
  }

  if (type === 'w') {
    content = lorem.generateWords(limit);
    wordsCount = limit;
    charCount = content.length;
  } else {
    content = lorem.generateWords(limit);
    content = content.substring(0, limit);
    charCount = limit;
    wordsCount = content.split(' ').length;
  }

  return (
    <div className="textpage">
      <div className="textpage__stat">
        <span className="textpage__stat-pill">{wordsCount} words</span>
        <span className="textpage__stat-pill">{charCount} characters</span>
        {isOverLimit && 
          <span className="textpage__stat-pill textpage__stat-pill--emp">Reduced to max limit: {MAX_LIMIT}</span>
        }
      </div>
      <div className="textpage__content">
        {content}
      </div>
    </div>
  );
}

export default App;
