import { Store } from "../core/util";
import axios from "axios";

const store = new Store({
    searchText: '',
    page: 1,
    video: {},
    videos: [],
    loading: false,
    message: '찾고 싶은 수어 표현을 검색해보세요!'
})

export default store
export const searchVideos = async page => {
    store.state.loading = true
    store.state.page = page
    if (page === 1) {
        store.state.videos = []
        store.state.message = ''
    }
    const host = window.location.hostname === "localhost"
    ? `http://api.kcisa.kr/openapi/service/rest/meta13/getCTE01701?serviceKey=891a9d78-cd84-406e-a182-7472e7b6919f&numOfRows=12530&pageNo=${page}`
    : "api"
    // const res = await fetch(`http://api.kcisa.kr/openapi/service/rest/meta13/getCTE01701?serviceKey=891a9d78-cd84-406e-a182-7472e7b6919f&pageNo=${page}`)
    try {
        const res = await axios.get(host)
        // const res = await axios.get(`http://www.specup.kro.kr/api/lang?title=${store.state.searchText}`)
        const Data = res.data.response.body.items.item
        const Response = res.statusText

        if (Response == 'OK') {
            let searched = []
            Data.forEach(item => {
                if (item.title.includes(store.state.searchText)) {
                    searched.push(item)
                }
            })
            if (!searched.length) {
                store.state.message = "해당 검색어와 관련된 수어 표현이 없습니다!"
            }
            store.state.videos = [
                ...searched
            ]
        } else {
            store.state.message = Error
        }
    } catch(error) {
        console.log("searchVideo Error :", error)
    } finally {
        store.state.loading = false
    }
    
}

export const getVideoDetails = async title => {
    // title 값을 받아서 store.state.videos 내 해당 video를 검색하고 발견하면 상태에 할당
    try {
        store.state.videos.forEach(v => {
            if (v['title'] === title) {
                store.state.video = v
            }
        })
    } catch(error) {
        console.log('getVideoDetails error: ', error)
    }
}