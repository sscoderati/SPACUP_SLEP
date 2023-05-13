import { createRouter } from "../core/util";
import Home from "./Home";
import Video from "./Video";
import About from "./About";

export default createRouter([
    { path: '#/', component: Home},
    { path: '#/video', component: Video },
    { path: '#/about', component: About }
])