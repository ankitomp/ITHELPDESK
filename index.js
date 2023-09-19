document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.querySelector('.chat-box-body');
    const inputField = document.querySelector('.chat-box-footer input');
    const chatButton = document.querySelector('.chat-button');
    const chatHeader = document.querySelector('.chat-box-header p');
    const addExtraButton = document.getElementById('addExtra');
    const modal = document.querySelector('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close-button');

    let conversationContext = null; // To track the conversation context


// Initialize a variable to track the chat box's visibility state
let isChatBoxVisible = false;

// Add a click event listener to the chatButton to toggle the chat box and button
chatButton.addEventListener('click', function () {
    const chatBox = document.querySelector('.chat-box');
    
    // Toggle the visibility of the chat box
    isChatBoxVisible = !isChatBoxVisible;
    
    if (isChatBoxVisible) {
        chatBox.style.visibility = 'visible';
        chatButton.style.display = 'none';
    } else {
        chatBox.style.visibility = 'hidden';
        chatButton.style.display = 'block'; // or 'inline-block' as needed
    }
});

// Add a click event listener to the chatHeader to hide the chat box
chatHeader.addEventListener('click', function () {
    const chatBox = document.querySelector('.chat-box');
    
    // Hide the chat box
    chatBox.style.visibility = 'hidden';
    
    // Show the chatButton
    chatButton.style.display = 'block'; // or 'inline-block' as needed
    
    // Update the visibility state variable
    isChatBoxVisible = false;
});


addExtraButton.addEventListener('click', function () {
    // Reset the conversation context and clear the chat box
    conversationContext = null;
    chatBox.innerHTML = ''; // Clear the chat box content

    // Display a welcome message as a receive chat message
    const welcomeMessage = "Welcome! How can I assist you today?";
    sendMessage(welcomeMessage, 'bot');

    // Display an initial message for the user to start the conversation
    const initialPrompt = "Type 'Hi' or 'Hello' to begin.";
    sendMessage(initialPrompt, 'bot');
});

    modalCloseButtons.forEach(function (closeButton) {
        closeButton.addEventListener('click', function () {
            modal.classList.toggle('show-modal');
        });
    });

    // Function to scroll to the bottom of the chat box
    function scrollToBottom() {
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage(message, sender) {
        const timestamp = new Date().toLocaleTimeString();
        const messageClass = sender === 'user' ? 'chat-box-body-send' : 'chat-box-body-receive';

        const messageDiv = document.createElement('div');
        messageDiv.className = messageClass;
        messageDiv.innerHTML = `<p>${message}</p><span>${timestamp}</span>`;

        chatBox.appendChild(messageDiv);

        // Call the scrollToBottom function to scroll to the bottom
        scrollToBottom();
    }

    function generateAutoReply(userMessage) {
        const lowercaseMessage = userMessage.toLowerCase();
        if (conversationContext === null) {
            if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
                conversationContext = "Welcome to IT Helpdesk"; 
                return {
                    response: "Hello! How can I assist you?",
                    options: ["Teams", "Outlook", "Laptop"]
                };
            } else if (lowercaseMessage.includes("bye") || lowercaseMessage.includes("thanks")) {
                return "Thank you for contacting IT Helpdesk";
            }}
        
        // If none of the conditions match, provide a default response
        return "I'm sorry, I didn't understand that.";
    }
    
    inputField.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            const userMessage = inputField.value;
            sendMessage(userMessage, 'user');
            inputField.value = '';

            const autoReply = generateAutoReply(userMessage);

            if (autoReply) {
                sendMessage(autoReply.response, 'bot');
            }

            // If options are available, display them
            if (autoReply.options) {
                displayOptions(autoReply.options);
            }
        }
    });

    // Event delegation for option buttons
    chatBox.addEventListener('click', function (e) {
        if (e.target.classList.contains('option-button')) {
            const selectedOption = e.target.textContent;
            handleOptionSelection(selectedOption);
        }
    });

    function handleOptionSelection(option) {
        // Handle option selection based on the context
        if (conversationContext === "Welcome to IT Helpdesk") {
            if (option === "Teams") {
                conversationContext = "Teams";
                const teamOptions = ["Messages not synchronizing", "Not able to open Teams", "Teams running slow"];
                displayOptions(teamOptions);
            } else if (option === "Outlook") {
                conversationContext = "Outlook";
                const outlookOptions = ["Emails not synchronizing", "Not able to open Outlook", "Outlook stuck"];
                displayOptions(outlookOptions);
            } else if (option === "Laptop") {
                conversationContext = "Laptop";
                const laptopOptions = ["Running slow", "Files not opening", "Screen freeze"];
                displayOptions(laptopOptions);
            }
        } else if (conversationContext === "Teams" || conversationContext === "Outlook" || conversationContext === "Laptop") {
            // Handle further option selection here
            // You can customize this part based on your logic
            sendMessage(`You selected: ${option}`, 'user');
        }
    }

    function displayOptions(options, context) {
        // Display options here based on your logic
        const optionsDiv = document.createElement('div');
    
        // Determine the appropriate context-specific class based on the context
        let optionsClass = '';
        if (context === 'Teams') {
            optionsClass = 'team-options';
        } else if (context === 'Outlook') {
            optionsClass = 'outlook-options';
        } else if (context === 'Laptop') {
            optionsClass = 'laptop-options';
        }
    
        optionsDiv.className = `chat-box-body-receive-options ${optionsClass}`;
    
        options.forEach(function (option, index) {
            const optionButton = document.createElement('button');
            optionButton.className = 'option-button';
            optionButton.textContent = option;
            optionsDiv.appendChild(optionButton);
        });
    
        chatBox.appendChild(optionsDiv);
    
        // Call the scrollToBottom function to scroll to the bottom
        scrollToBottom();    
    }
});
