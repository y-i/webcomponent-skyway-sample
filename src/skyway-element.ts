import Peer, { SfuRoom } from 'skyway-js';

class SkyWayElement extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const apiKey = this.getAttribute("api-key");
      const roomName = this.getAttribute("room-name");

      const shadow = this.attachShadow({ mode: "closed" });
      
      const style = document.createElement("style");
      shadow.appendChild(style);
      
      const div = document.createElement('div');
      const remoteVideoElem = document.createElement('video');
      remoteVideoElem.id = 'remoteStream';
      remoteVideoElem.autoplay = true;
      remoteVideoElem.playsInline = true;
      div.appendChild(remoteVideoElem);
      
      shadow.appendChild(div);
      
      (async () => {
        const peer: Peer = await new Promise((resolve) => {
          const peer = new Peer({
            key: apiKey!,
            // debug: 3,
          });
          peer.once("open", () => {
            resolve(peer);
          });
        });

        console.log('peer opened');

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        console.log(stream);

        const room: SfuRoom = await new Promise((resolve) => {
          const room = peer.joinRoom(roomName!, {
            mode: "sfu",
            stream,
          });
          room.once("open", () => {
            resolve(room);
          });
        });

        console.log('room joined');

        room.on("stream", (stream) => {
          console.log('onstream');
          
          remoteVideoElem.srcObject = stream;
          console.log(remoteVideoElem, remoteVideoElem.srcObject, stream.getVideoTracks());
        });


      })();
    }
  }

export const registerSkyWayElement = (tagName: string = 'skyway-element') => {
    customElements.define(tagName, SkyWayElement);
};