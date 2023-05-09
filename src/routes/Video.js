import { Component } from "../core/util";
import videoStore, { getVideoDetails } from '../store/video'

export default class Video extends Component {
    render() {
        getVideoDetails(decodeURI(history.state.title))
        console.log(videoStore.state.video)
    }
}