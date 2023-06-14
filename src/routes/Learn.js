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
            <p></p>
            <div id="labelReliDiv">
                <p>수형 평가 및 정확도</p>
                <div id="label"></div>
                <div id="reli"></div>
            </div>
        `
        this.el.append(
            handDetector
        )
    }
}