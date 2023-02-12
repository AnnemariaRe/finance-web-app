class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <footer>
            <div class="footer-bar">
                <p>автор: <a href="https://t.me/annmarry05">@annmarry05</a></p>
            </div>
        </footer>
      `;
  }
}

customElements.define('footer-component', Footer);