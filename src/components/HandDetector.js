import { Component } from "../core/util";

export default class HandDetector extends Component {
    render() {
        this.el.innerHTML = /* html */ `
            <div class="HandDetectorView">
                <div style="position: relative;">
                    <video id="webcam" style="position: abso" autoplay playsinline></video>
                    <canvas class="output_canvas" id="output_canvas" style="position: absolute; left: 0px; top: 0px;"></canvas>
                </div>
                <button id="webcamButton" class="mdc-button mdc-button--raised">
                    <span class="mdc-button__ripple"></span>
                    <span class="mdc-button__label">ENABLE WEBCAM</span>
                </button>
            </div>
        `
    }
}