import { Component } from "../core/util";
import HandDetector from "../components/HandDetector";

export default class Learn extends Component {
    render() {
        const handDetector = new HandDetector().el
        this.el.classList.add('container', 'learn')
        this.el.innerHTML = /* html */ `
            <div>
                <p>Learning Page</p>
                <p>(웹캠 화면이 나오지 않으면 새로고침 해주세요~)</p>
            </div>
        `
        this.el.append(
            handDetector
        )
    }
}