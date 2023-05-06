import { Component } from "../core/util";

export default class Headline extends Component {
    render() {
        this.el.classList.add('headline')
        this.el.innerHTML = /* html */ `
            <h1>
                <span>슬랩 (SLEP)</span><br>
                The Next<br>
                Sign Language Education Platform
            </h1>
            <p>
                슬랩은 수어를 배우고 싶은 일반인과 청각장애인을 대상으로 컴퓨터 비전 기술을 활용해 수어 학습에 도움을 주는 웹 서비스 입니다.<br>
                일상 생활에서 사용할 수 있는 여러 수어 표현들을 같이 배워봐요!
            </p>
        `
    }
}