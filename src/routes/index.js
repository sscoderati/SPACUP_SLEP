import { createRouter } from "../core/util";
import Home from "./Home";
import Video from "./Video";
import About from "./About";
import NotFound from "./NotFound"
import Learn from "./Learn"

export default createRouter([
    { path: '#/', component: Home},
    { path: '#/video', component: Video },
    { path: '#/learn', component: Learn },
    { path: '#/about', component: About },
    { path: '.*', component: NotFound }
])