import { Component } from "../core/util";

export default class NotFound extends Component {
    render() {
        this.el.classList.add('container', 'not-found')
        this.el.innerHTML = /* html */ `
            <h1>
                Oops!!<br>
                Page Not Found!!
            </h1>
        `
    }
}