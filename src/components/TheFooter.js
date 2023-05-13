import { Component } from "../core/util";

export default class TheFooter extends Component {
    constructor() {
        super({
            tagName: 'footer'
        })
    }

    render() {
        this.el.innerHTML = /* html */ `
            <div>
                <a href="https://github.com/sscoderati/SPACUP_SLEP">This Project's Repository</a>
            </div>
            <div>
                ${new Date().getFullYear()}
                &copy; SPECUP
            </div>
        `
    }
}