class Footer extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' }); // Encapsulate styles and markup
        const template = document.createElement('template');

        template.innerHTML = `
            <style>
                /* Component-specific styles */
                .footer-container{ /*border-top: 1px solid #c2c2c2ff; */width: 100%; display: flex; flex-direction: column; align-items: center; margin-top:150px; padding: 40px 0px 10px 0px; /*background-color: #f7f7f7ff; border-bottom: 1px solid #c2c2c2ff;*/}
                
                .logo{font-family: "Libertinus Serif Display", system-ui; font-weight: 400; font-style: normal; font-size: 30px; margin-bottom: 60px;}
                @media(max-width: 500px){.logo{font-size:35px;}}

                .nav-links-container{display: flex; flex-direction: row; justify-content: center; border-top: 1px solid; border-bottom: 1px solid; width: 295px;}
                .nav-links-container div{display: flex; flex-direction: column; align-items: start; margin: 0px 20px 0px 20px;}
                .nav-links-container a{color: #2e2e2eff; text-decoration: none; height: 50px; margin: 20px 0px 20px 0px;}
                .nav-links-container a:hover{text-decoration: underline; text-decoration-color: #6b6b6bff;}

                .privacy-policy{color: #2e2e2eff; text-decoration: none; font-size: 12px; margin: 60px 0px 40px 0px;}

            </style>
            <div class="footer-container">
                <div class="logo"> Blissful Eats </div>
                <div class="nav-links-container">
                    <div>
                        <a href="./index.html" target="_blank">Blog Posts</a>
                        <a href="./About.html" target="_blank">About</a>
                    </div>
                    <div>
                        <a href="./all-breakfast.html" target="_blank">Breakfast</a>
                        <a href="./all-lunch&dinnerentrees.html" target="_blank">Lunch & Dinner Entrees</a>
                        <a href="./all-appetizerssides&salads.html" target="_blank">Appetizers, Sides, & Salads</a>
                        <a href="./all-desserts.html" target="_blank">Desserts</a>
                        <a href="./all-doughs&breads.html" target="_blank">Doughs & Breads</a>
                        <a href="./all-drinksshakes&more.html" target="_blank">Drinks, Shakes, & More</a>
                        <a href="./all-condiments.html" target="_blank">Condiments</a>
                    </div>
                    
                </div>

                <a class="privacy-policy" href="./PrivacyPolicy.html" target="_blank">Privacy Policy</a>
            </div>
        `;
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // You can add lifecycle callbacks (connectedCallback, disconnectedCallback, etc.)
    // and custom methods here.
    
}
customElements.define('com-footer', Footer);