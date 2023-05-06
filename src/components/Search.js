import { Component } from "../core/util";

export default class Search extends Component {
    render() {
        this.el.classList.add('search')
        this.el.innerHTML = /* html */ `
            <input placeholder="찾고 싶은 수어 표현을 검색해보세요!"/>
            <button class="btn btn-primary">
                검색!
            </button>
        `

        const inputEL = this.el.querySelector('input')
        inputEL.addEventListener('input', () => {

        })
        inputEL.addEventListener('keydown', event => {
            if (event.key === 'Enter') {

            }
        })

        const btnEl = this.el.querySelector('.btn')
        btnEl.addEventListener('click', () => {
            
        })
    }
}