import { Component } from "../core/util";
import Headline from "../components/Headline";
import Search from "../components/Search";
import VideoList from "../components/VideoList";

export default class Home extends Component {
    render() {
        const headline = new Headline().el
        const search = new Search().el
        const videoList = new VideoList().el
        
        this.el.classList.add('container')
        this.el.append(
            headline,
            search,
            videoList
        )
    }
}