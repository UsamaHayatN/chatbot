(function () {
  const script = document.currentScript;

  // Check if the widget already exists to prevent adding multiple widgets
  if (document.getElementById("chatbot-widget-container")) {
    return; // If the widget is already added, exit the script
  }

  // Create the widget container
  const widgetContainer = document.createElement("div");
  widgetContainer.id = "chatbot-widget-container";
  widgetContainer.style.position = "fixed";
  widgetContainer.style.bottom = "20px";
  widgetContainer.style.right = "20px";
  widgetContainer.style.zIndex = "9999";

  document.body.appendChild(widgetContainer);

  // Create the iframe for the chatbot
  const iframe = document.createElement("iframe");
  iframe.src = script.getAttribute("data-url"); // Get the widget URL dynamically
  iframe.style.width = "400px";
  iframe.style.height = "600px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "15px";
  iframe.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
  iframe.id = "chatbot-widget-iframe";

  widgetContainer.appendChild(iframe);

  // Create and add a close button
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

  // Add the logic to close and show the widget again
  closeButton.onclick = () => {
    widgetContainer.style.display = "none";
    // Optionally, save a flag in localStorage to prevent showing it again for a certain period
    localStorage.setItem("chatbotClosed", "true");
  };

  widgetContainer.appendChild(closeButton);

  // If the chatbot was closed earlier, don't show it
  if (localStorage.getItem("chatbotClosed") === "true") {
    widgetContainer.style.display = "none";
  }

  // Create a button to show the chatbot again (optional)
  const openButton = document.createElement("button");
  openButton.innerText = "Open Chatbot";
  openButton.style.position = "fixed";
  openButton.style.bottom = "20px";
  openButton.style.right = "20px";
  openButton.style.padding = "10px 20px";
  openButton.style.backgroundColor = "#4CAF50";
  openButton.style.color = "white";
  openButton.style.border = "none";
  openButton.style.borderRadius = "5px";
  openButton.style.cursor = "pointer";
  openButton.style.zIndex = "9999";

  openButton.onclick = () => {
    widgetContainer.style.display = "block";
    localStorage.removeItem("chatbotClosed"); // Remove the flag when the widget is reopened
    openButton.style.display = "none"; // Hide the open button once the widget is visible
  };

  document.body.appendChild(openButton);
})();
