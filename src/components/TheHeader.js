import { Component } from "../core/util";

export default class TheHeader extends Component {
    constructor() {
        super({
            tagName: 'header',
            state: {
                menus: [
                    {
                        name: 'Search',
                        href: '#/'
                    },
                    {
                        name: 'Learn',
                        href: '#/learn'
                    },
                    {
                        name: 'About',
                        href: '#/about'
                    }
                ]
            }
        })
        window.addEventListener('popstate', () => {
            this.render()
        })
    }

    render() {
        this.el.innerHTML = /* html */ `
            <a href="#/" class="logo">
                <span>슬랩</span>(SLEP)
            </a>
            <nav>
                <ul>
                ${this.state.menus.map(menu => {
                    const href = menu.href
                    const hash = location.hash
                    const isActive = href === hash
                    return /* html */ `
                    <li>
                        <a
                        class="${isActive ? 'active' : ''}"
                        href="${menu.href}">
                        ${menu.name}
                        </a>
                    </li>`
                }).join('')}
                </ul>
            </nav>
            <a href="#/about" class="user">
                <img src="https://drive.google.com/uc?export=view&id=1f2HiqgMj6xPkC-8epwC-1s0cOMT6ih45" alt="SLEP">
            </a>
        `
    }
}