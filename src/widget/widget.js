(function () {
  const script = document.currentScript;
  const widgetUrl = script.getAttribute("data-url");

  if (!widgetUrl) {
    console.error(
      "Widget URL is missing. Please provide the 'data-url' attribute."
    );
    return;
  }

  if (!widgetUrl.startsWith("https://")) {
    console.error("Widget URL must use HTTPS.");
    return;
  }

  if (document.getElementById("chatbot-widget-container")) {
    return;
  }

  const widgetContainer = document.createElement("div");
  widgetContainer.id = "chatbot-widget-container";
  widgetContainer.style.position = "fixed";
  widgetContainer.style.bottom = "20px";
  widgetContainer.style.right = "20px";
  widgetContainer.style.zIndex = "9999";
  document.body.appendChild(widgetContainer);

  const iframe = document.createElement("iframe");
  iframe.src = widgetUrl;
  iframe.style.width = "400px";
  iframe.style.height = "600px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "15px";
  iframe.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
  iframe.id = "chatbot-widget-iframe";
  widgetContainer.appendChild(iframe);

  const closeButton = document.createElement("button");
  closeButton.innerText = "×";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.background = "#FF4D4D"; // Example red
  closeButton.style.color = "#FFFFFF";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "50%";
  closeButton.style.width = "30px";
  closeButton.style.height = "30px";
  closeButton.style.cursor = "pointer";
  closeButton.style.zIndex = "10000";
  closeButton.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.2)";
  closeButton.onclick = () => {
    widgetContainer.style.display = "none";
    localStorage.setItem("chatbotClosed", "true");
  };
  widgetContainer.appendChild(closeButton);

  if (localStorage.getItem("chatbotClosed") === "true") {
    widgetContainer.style.display = "none";
  }

  const openButton = document.createElement("button");
  openButton.innerText = "Open Chatbot";
  openButton.style.position = "fixed";
  openButton.style.bottom = "20px";
  openButton.style.right = "20px";
  openButton.style.padding = "10px 20px";
  openButton.style.backgroundColor = "#4CAF50"; // Example green
  openButton.style.color = "white";
  openButton.style.border = "none";
  openButton.style.borderRadius = "5px";
  openButton.style.cursor = "pointer";
  openButton.style.zIndex = "9999";
  openButton.style.display =
    localStorage.getItem("chatbotClosed") === "true" ? "block" : "none"; // Show only if closed

  openButton.onclick = () => {
    widgetContainer.style.display = "block";
    localStorage.removeItem("chatbotClosed");
    openButton.style.display = "none";
  };
  document.body.appendChild(openButton);
})();
