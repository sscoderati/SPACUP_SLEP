import { Component } from "../core/util";

export default class VideoItem extends Component {
    constructor(props) {
        super({
            props,
            tagName: 'a'
        })
    }

    render() {
        const { video } = this.props

        this.el.setAttribute('href', `#/video?pk=${video.pk}`)
        this.el.classList.add('video')
        this.el.style.backgroundImage = `url(${video.fields["referenceIdentifier"]})`
        this.el.innerHTML = /* html */ `
        <div class="info">
            <div class="title">
                ${video.fields["title"]}
            </div>
        </div>
        `
    }
}