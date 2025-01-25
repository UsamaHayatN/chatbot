(function () {
  const script = document.currentScript;
  const widgetContainer = document.createElement("div");
  widgetContainer.id = "chatbot-widget-container";
  widgetContainer.style.position = "fixed";
  widgetContainer.style.bottom = "20px";
  widgetContainer.style.right = "20px";
  widgetContainer.style.zIndex = "9999";

  document.body.appendChild(widgetContainer);

  const iframe = document.createElement("iframe");
  iframe.src = script.getAttribute("data-url"); // Get the widget URL dynamically
  iframe.style.width = "400px";
  iframe.style.height = "600px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "15px";
  iframe.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
  iframe.id = "chatbot-widget-iframe";

  widgetContainer.appendChild(iframe);

  // Add a close button
  const closeButton = document.createElement("button");
  closeButton.innerText = "×";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.background = "#FF4D4D";
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
  };

  widgetContainer.appendChild(closeButton);
})();
