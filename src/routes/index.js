import { createRouter } from "../core/util";
import Home from "./Home";
import Video from "./Video";

export default createRouter([
    { path: '#/', component: Home},
    { path: '#/video', component: Video }
])