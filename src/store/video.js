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
    try {
        const res = await axios.get(`https://www.specup.kro.kr/api/signlanguage?title=${store.state.searchText}`)
        const Data = res.data
        const Response = res.status
        console.log(res)

        if (Response == 200) {
            let searched = []
            Data.forEach(item => {
                if (item.fields.title.includes(store.state.searchText)) {
                    searched.push(item.fields)
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