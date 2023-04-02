/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import Nav from './Nav';
import alertaBox from './alerta';
import isoText  from './mensajeIso';
import inputsDatos from './inputsDatos';

render(Nav, document.getElementById('nav'));
render(alertaBox, document.getElementById('alerta'));
render(isoText, document.getElementById('mensajeIso'));
render(inputsDatos, document.getElementById('inputsDatos'));