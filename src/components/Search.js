import { Component } from "../core/util";
import videoStore, { searchVideos } from '../store/video'

export default class Search extends Component {
    render() {
        this.el.classList.add('search')
        this.el.innerHTML = /* html */ `
            <input placeholder="검색어를 입력해주세요!"/>
            <button class="btn btn-primary">
                검색!
            </button>
        `

        const inputEL = this.el.querySelector('input')
        inputEL.addEventListener('input', () => {
            // 사용자가 값을 입력하면
            videoStore.state.searchText = inputEL.value
        })
        inputEL.addEventListener('keydown', event => {
            // 사용자가 값을 입력했을때만 동작
            if (event.key === 'Enter' && videoStore.state.searchText.trim()) {
                searchVideos(1)
            }
        })

        const btnEl = this.el.querySelector('.btn')
        btnEl.addEventListener('click', () => {
            if (videoStore.state.searchText.trim()) {
                searchVideos(1)
            }
        })
    }
}