import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class MyHeader extends React.Component {
  render() {
    return (
      <div>
      <h1>Hello from Mon</h1>
      <p>xxx</p>
      </div>
    );
  }
}

ReactDOM.render(<MyHeader />, document.getElementById('root'));
