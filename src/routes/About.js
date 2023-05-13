import { Component } from "../core/util";
import aboutStore from "../store/about";

export default class About extends Component {
    render() {
        const { photo, name, madeby, email, github } = aboutStore.state

        this.el.classList.add('container', 'about')
        this.el.innerHTML = /* html */ `
            <div
                style="background-image: url(${photo});"
                class="photo"></div>
            <p class="name">${name}</p>
            <p class="madeby">${madeby}</p>
            <p>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${email}" 
                    target="_blank">${email}</a>
            </p>
            <p><a href="${github}" target="_blank">${github}</a></p>
        `
    }
}