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
    }
    render() {
        this.el.classList.add('video-list')
        this.el.innerHTML = /* html */ `
            <div class="videos"></div>
            <div class="the-loader hide"></div>
        `

        const videosEl = this.el.querySelector('.videos')
        videosEl.append(
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