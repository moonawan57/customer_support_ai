async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const messageText = inputField.value.trim();

    if (messageText === "") return;

    const userMsgDiv = document.createElement("div");
    userMsgDiv.className = "message user-message";
    userMsgDiv.textContent = messageText;
    chatBox.appendChild(userMsgDiv);

    inputField.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: messageText })
        });
        const data = await response.json();

        const botMsgDiv = document.createElement("div");
        botMsgDiv.className = "message bot-message";
        botMsgDiv.textContent = data.response;
        chatBox.appendChild(botMsgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error("Error:", error);
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}