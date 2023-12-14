import './style.css'

import { registerSkyWayElement } from './skyway-element';

const apiKey = '<SkyWay v2 API-KEY>';
const roomName = '<room-name>';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
  <skyway-element api-key="${apiKey}" room-name="${roomName}">
  </skyway-element>
</div>
`

registerSkyWayElement();
