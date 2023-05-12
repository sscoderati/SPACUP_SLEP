import { Component } from "../core/util";
import videoStore, { getVideoDetails } from '../store/video'

export default class Video extends Component {
    render() {
        getVideoDetails(decodeURI(history.state.title))
        const Video = videoStore.state.video
        const linkSet = Video['subDescription']
        const linkArr = linkSet.split('||')
        const vidSrc = linkArr[0].slice(linkArr[0].indexOf(':') + 1)
        let imgArr = linkArr[1].split(',')
        imgArr[0] = imgArr[0].slice(imgArr[0].indexOf(':') + 1)
        console.log(imgArr)

        this.el.classList.add('container', 'the-video')
        this.el.innerHTML = /* html */ `
            <div class="video">
                <h3>수어 영상</h3>
                <video src="${vidSrc}" controls></video>
            </div>
            <div class="labels">
                <h3>수어 정보</h3>
                <p><span>${Video['alternativeTitle']}</span></p>
                <h3>수어 설명</h3>
                <p><span>${Video['description']}</span></p>
            </div>
            <div class="images">
                <h3>그림 설명</h3>
                <div class="img-layout">
                    ${imgArr.map(imgEl => {
                        // return imgEl !== ',' ? `<img src=${imgEl} />` : ''
                        return `<img src="${imgEl}" />`
                    })}
                </div>
            </div>
            `
    }
}