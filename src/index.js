import React from 'react';
import ReactDOM from 'react-dom/client';
import { getSnapshot } from 'mobx-state-tree';
import './assets/index.css';
import App from './components/App';

import { Group } from './models/Group';

let initialState = { users: {} };

let group = (window.group = Group.create(initialState));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App group={group} />
    </React.StrictMode>
);
