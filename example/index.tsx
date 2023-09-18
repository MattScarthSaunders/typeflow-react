import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TypeFlow } from '../.';

const App = () => {
  const [text, setText] = React.useState(
    'This is the original Text, with punctuation, and it ends.'
  );
  const [textKey, setTextKey] = React.useState(0);
  const handleUpdate = () => {
    setText('This is a new bunch of text! It has a question?');
    setTextKey(prevKey => prevKey + 1);
  };

  console.log(text);
  return (
    <div>
      <TypeFlow>
        <p>{text}</p>
      </TypeFlow>
      <button onClick={handleUpdate}>Update Text</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
