(function () {
  class ChatbotWidget extends HTMLElement {
    connectedCallback() {
      // This is where we inject the widget (iframe)
      this.innerHTML = `
        <div style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;">
          <iframe
            src="https://chatbot-steel-pi.vercel.app/"
            width="400"
            height="600"
            style="border: none; border-radius: 15px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);"
            id="chatbot-widget-iframe"
          ></iframe>
          <button onclick="this.closest('div').style.display='none';"
            style="position: absolute; top: 10px; right: 10px; background: #FF4D4D; color: #fff; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; z-index: 10000; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);">×</button>
        </div>
        <button id="open-chatbot-button" onclick="this.closest('div').style.display='block'; this.style.display='none';"
          style="position: fixed; bottom: 20px; right: 20px; padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; z-index: 9999;">
          Open Chatbot
        </button>
      `;
    }
  }

  customElements.define('chatbot-widget', ChatbotWidget);

  // Optional: This can be used to dynamically create the chatbot widget
  const script = document.createElement('script');
  script.src = 'https://chatbot-steel-pi.vercel.app/widget.js';
  document.body.appendChild(script);
})();
