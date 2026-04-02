import './index.css';
import { createRoot } from 'react-dom/client';
import Game from './logic/game';

const root = createRoot(document.getElementById("root"));
root.render(
    <Game />
);