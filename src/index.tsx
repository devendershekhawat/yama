import React from 'react';
import dotenv from 'dotenv';
import { createRoot } from 'react-dom/client';
import App from './App';

import './index.scss';
import 'antd/dist/antd.dark.css';

dotenv.config();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
