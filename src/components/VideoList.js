import { Component } from "../core/util";
import videoStore from '../store/video'
import VideoItem from "./VideoItem";

export default class VideoList extends Component {
    constructor() {
        super()
        videoStore.subscribe('videos', () => {
            this.render()
        })
        videoStore.subscribe('loading', () => {
            this.render()
        })
        videoStore.subscribe('message', () => {
            this.render()
        })
    }
    render() {
        this.el.classList.add('video-list')
        this.el.innerHTML = /* html */ `
            ${videoStore.state.message 
            ? `<div class="message">${videoStore.state.message}</div>`
            : '<div class="videos"></div>'}
            <div class="the-loader hide"></div>
        `

        const videosEl = this.el.querySelector('.videos')
        videosEl?.append( // 옵셔널 바인딩
            ...videoStore.state.videos.map(video => new VideoItem({
                video
            }).el)
        )

        const loaderEl = this.el.querySelector('.the-loader')
        videoStore.state.loading
        ? loaderEl.classList.remove('hide')
        : loaderEl.classList.add('hide')
    }
}