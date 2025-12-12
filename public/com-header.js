class Header extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' }); // Encapsulate styles and markup
        const template = document.createElement('template');

        template.innerHTML = `
            
            <style>
                /* Component-specific styles */
                .header-container{ margin-bottom: 150px; width: 100%; display: flex; flex-direction: column; align-items: center; padding: 100px 0px 80px 0px; /*background-color: #f7f7f7ff; border-bottom: 1px solid #c2c2c2ff;*/}
                
                .logo{font-family: "Libertinus Serif Display", system-ui; font-weight: 400; font-style: normal; font-size: 50px; margin-bottom: 20px;}
                @media(max-width: 500px){.logo{font-size:35px;}}

                .nav-links-container a{color: #2e2e2eff; text-decoration: none; margin:20px;}
                .nav-links-container a:hover{text-decoration: underline; text-decoration-color: #6b6b6bff;}
            </style>

            <div class="header-container">
                <div class="logo"> Blissful Eats </div>
                <div class="nav-links-container">
                    <a href="./index.html" target="_blank">Recipes</a>
                    <a href="./About.html" target="_blank">About</a>
                </div>
            </div>
        `;
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // You can add lifecycle callbacks (connectedCallback, disconnectedCallback, etc.)
    // and custom methods here.
    
}
customElements.define('com-header', Header);