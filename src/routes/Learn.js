import { Component } from "../core/util";
import HandDetector from "../components/HandDetector";

export default class Learn extends Component {
    render() {
        const handDetector = new HandDetector().el
        this.el.classList.add('container', 'learn')
        this.el.innerHTML = /* html */ `
            <div>
                Learning Page
            </div>
        `
        this.el.append(
            handDetector
        )
    }
}