import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TypeFlow } from '../.';

const App = () => {
  return (
    <div>
      <TypeFlow>
        <p>
          This is a test of many characters in a string, I have different
          punctuation for different length pauses. Great! Great? Tis amazing...
        </p>
      </TypeFlow>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
