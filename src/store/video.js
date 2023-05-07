import { Store } from "../core/util";
import axios from "axios";

const store = new Store({
    searchText: '',
    page: 1,
    videos: []
})

export default store
export const searchVideos = async (page, searchText) => {
    if (page === 1) {
        store.state.page = 1
        store.state.videos = []
    }
    // const res = await fetch(`http://api.kcisa.kr/openapi/service/rest/meta13/getCTE01701?serviceKey=891a9d78-cd84-406e-a182-7472e7b6919f&pageNo=${page}`)
    const res = await axios.get(`http://api.kcisa.kr/openapi/service/rest/meta13/getCTE01701?serviceKey=891a9d78-cd84-406e-a182-7472e7b6919f&numOfRows=100&pageNo=${page}`)
    const Data = res.data.response.body.items.item

    let searched = []
    Data.forEach(item => {
        if (item.title.includes(store.state.searchText)) {
            searched.push(item)
        }
    })
    store.state.videos = [
        ...store.state.videos,
        ...searched
    ]
}