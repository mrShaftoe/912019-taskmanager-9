import renderComponent from '../src/components/render.js';
import {renderControlElements} from '../src/components/control.js';
import {getSearchElement} from '../src/components/search.js';
import {renderFilterElements} from '../src/components/filters.js';
import {renderBoard} from '../src/components/board.js';


const main = document.querySelector(`.main`);

renderControlElements(main);
renderComponent(main, getSearchElement());
renderFilterElements(main);
renderBoard(main);
