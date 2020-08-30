import html from './fragmentScenario/index.html';
import './fragmentScenario/index.js';
import './fragmentScenario/index.css';

// TODO: just in run-time
export default function Page(container) {  
  container.innerHTML = html.trim();
  return container;
}
