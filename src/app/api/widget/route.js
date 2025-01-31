export default function handler(req, res) {
  const chatbotUrl = req.query.url || "https://chatbot-steel-pi.vercel.app/";

  const scriptCode = `
      (function() {
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'chatbot-embed';
        document.body.appendChild(chatbotContainer);
  
        const iframe = document.createElement('iframe');
        iframe.src = '${chatbotUrl}';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.position = 'fixed';
        iframe.style.bottom = '0';
        iframe.style.right = '0';
        iframe.style.width = '350px';
        iframe.style.height = '500px';
        iframe.style.zIndex = '9999';
        iframe.style.borderRadius = '10px';
        iframe.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
        chatbotContainer.appendChild(iframe);
  
        const toggleButton = document.createElement('button');
        toggleButton.innerText = 'Chat';
        toggleButton.style.position = 'fixed';
        toggleButton.style.bottom = '10px';
        toggleButton.style.right = '10px';
        toggleButton.style.backgroundColor = '#007BFF';
        toggleButton.style.color = '#fff';
        toggleButton.style.border = 'none';
        toggleButton.style.padding = '10px 15px';
        toggleButton.style.borderRadius = '50px';
        toggleButton.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.zIndex = '10000';
  
        let isChatOpen = true;
        toggleButton.onclick = () => {
          isChatOpen = !isChatOpen;
          chatbotContainer.style.display = isChatOpen ? 'block' : 'none';
        };
  
        document.body.appendChild(toggleButton);
      })();
    `;

  res.setHeader("Content-Type", "application/javascript");
  res.status(200).send(scriptCode);
}
