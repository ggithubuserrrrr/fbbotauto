function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    if (!userInput) return;

    const userMessage = `
        <div class="user-message">
            <div class="message-bubble">${userInput}</div>
        </div>`;
    chatBox.innerHTML += userMessage;

    const botTypingMessage = `
        <div class="bot-message">
            <div class="message-bubble typing-indicator">Bot is typing...</div>
        </div>`;
    chatBox.innerHTML += botTypingMessage;

    fetch(`https://deku-rest-api.replit.app/gpt4?prompt=${encodeURIComponent(userInput)}&uid=100`)
        .then(response => response.json())
        .then(data => {
            // Remove typing indicator
            document.querySelector('.typing-indicator').remove();

            // Display bot response
            const botMessage = `
                <div class="bot-message">
                    <div class="message-bubble">${data.gpt4}</div>
                </div>`;
            chatBox.innerHTML += botMessage;

            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => console.error('Error:', error));

    document.getElementById('user-input').value = '';
}

function clearChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
}

function adjustInputHeight() {
    const textarea = document.getElementById('user-input');
    textarea.style.height = 'auto'; // Reset height to auto to calculate the new height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set the textarea height to the scroll height
}