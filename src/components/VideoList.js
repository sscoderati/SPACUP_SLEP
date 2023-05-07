import { Component } from "../core/util";
import videoStore from '../store/video'

export default class VideoList extends Component {
    constructor() {
        super()
        videoStore.subscribe('videos', () => {
            this.render()
        })
    }
    render() {
        this.el.classList.add('video-list')
        this.el.innerHTML = /* html */ `
            <div class="videos"></div>
        `

        const videosEl = this.el.querySelector('.videos')
        videosEl.append(
            videoStore.state.videos.map(video => {
                return video.title
            })
        )
    }
}