import renderComponent from '../src/components/render';
import {renderControlElements} from '../src/components/control';
import {getSearchElement} from '../src/components/search';
import {renderFilterElements} from '../src/components/filters';
import {renderBoard} from '../src/components/board';


const main = document.querySelector(`.main`);

renderControlElements(main);
renderComponent(main, getSearchElement());
renderFilterElements(main);
renderBoard(main);
