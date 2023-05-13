import { Component } from "../core/util";
import aboutStore from "../store/about";

export default class TheFooter extends Component {
    constructor() {
        super({
            tagName: 'footer'
        })
    }

    render() {
        this.el.innerHTML = /* html */ `
            <div>
                <a href="${aboutStore.state.github}">This Project's Repository</a>
            </div>
            <div>
                ${new Date().getFullYear()}
                &copy; SPECUP
            </div>
        `
    }
}