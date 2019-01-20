import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import registerServiceWorker from './registerServiceWorker';
import EditorView from './view/EditorView';

ReactDOM.render(<EditorView idNum={0}
idEditor="1233231_editor" enable={true}/>, document.getElementById('root'));

registerServiceWorker();