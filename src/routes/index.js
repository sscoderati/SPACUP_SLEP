import { createRouter } from "../core/util";
import Home from "./Home";
import Video from "./Video";
import About from "./About";
import NotFound from "./NotFound"

export default createRouter([
    { path: '#/', component: Home},
    { path: '#/video', component: Video },
    { path: '#/about', component: About },
    { path: '.*', component: NotFound }
])