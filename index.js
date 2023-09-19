document.addEventListener("DOMContentLoaded", function() {
    
    // Add a click event listener to the option buttons
var optionButtons = document.querySelectorAll('.option-button');
optionButtons.forEach(function(optionButton) {
    optionButton.addEventListener('click', function() {
        var selectedIndex = optionButton.getAttribute('data-index');
        var selectedOption = autoReply.options[selectedIndex];
        sendMessage(selectedOption, 'user');
        
        // Check if Option 2 was selected
        if (selectedOption === "Option 2") {
            var option2Response = "You selected Option 2. Here's the response for Option 2.";
            sendMessage(option2Response, 'bot');
        }
        
        // You can handle other options similarly
    });
}); 
    
    
    // Function to send a message
    function sendMessage(message, sender) {
        var timestamp = new Date().toLocaleTimeString();
        var chatBox = document.querySelector('.chat-box-body');
        var messageClass = sender === 'user' ? 'chat-box-body-send' : 'chat-box-body-receive';

        var messageDiv = document.createElement('div');
        messageDiv.className = messageClass;
        messageDiv.innerHTML = '<p>' + message + '</p><span>' + timestamp + '</span>';

        // Append the message to the chat box
        chatBox.appendChild(messageDiv);
    }

    // Function to generate a response with options
    function generateAutoReply(userMessage) {
        var lowercaseMessage = userMessage.toLowerCase();
        
        if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
            var response = "Hello! How can I assist you?";
            var options = ["Option 1", "Option 2", "Option 3"];
            return { response: response, options: options };
        } else if (lowercaseMessage.includes("option 2")) { // Check for "Option 2"
            var option2Response = "You selected Option 2. Here's the response for Option 2.";
            return option2Response;
        } else {
            return "I'm sorry, I didn't understand that.";
        }
    }
    

    // Event listener for user input
    var inputField = document.querySelector('.chat-box-footer input');
    inputField.addEventListener('keydown', function(e) {
        if (e.keyCode === 13) { // Enter key pressed
            var userMessage = inputField.value;
            sendMessage(userMessage, 'user');
            inputField.value = ''; // Clear the input field

            var autoReply = generateAutoReply(userMessage);

            if (typeof autoReply === 'object' && autoReply.response && autoReply.options) {
                // If the response is an object with both response text and options
                sendMessage(autoReply.response, 'bot');
                // Display the options to the user
                var optionsDiv = document.createElement('div');
                optionsDiv.className = 'chat-box-body-receive-options';
                autoReply.options.forEach(function(option, index) {
                    var optionButton = document.createElement('button');
                    optionButton.className = 'option-button';
                    optionButton.setAttribute('data-index', index);
                    optionButton.textContent = option;
                    optionsDiv.appendChild(optionButton);
                });
                document.querySelector('.chat-box-body').appendChild(optionsDiv);

                // Add a click event listener to the option buttons
                var optionButtons = document.querySelectorAll('.option-button');
                optionButtons.forEach(function(optionButton) {
                    optionButton.addEventListener('click', function() {
                        var selectedIndex = optionButton.getAttribute('data-index');
                        var selectedOption = autoReply.options[selectedIndex];
                        sendMessage(selectedOption, 'user');
                        // You can handle the user's choice here
                    });
                });
            } else {
                // If it's a regular text response
                sendMessage(autoReply, 'bot');
            }
        }
    });

    // Close chatbox event
    var chatHeader = document.querySelector('.chat-box-header p');
    chatHeader.addEventListener('click', function() {
        document.querySelector('.chat-box').style.visibility = 'hidden';
    });

    // Show chatbox event
    var chatButton = document.querySelector('.chat-button');
    chatButton.addEventListener('click', function() {
        chatButton.style.display = 'none';
        document.querySelector('.chat-box').style.visibility = 'visible';
    });

    // Toggle modal
    var addExtraButton = document.getElementById('addExtra');
    addExtraButton.addEventListener('click', function() {
        var modal = document.querySelector('.modal');
        modal.classList.toggle('show-modal');
    });

    // Close modal
    var modalCloseButton = document.querySelectorAll('.modal-close-button');
    modalCloseButton.forEach(function(closeButton) {
        closeButton.addEventListener('click', function() {
            var modal = document.querySelector('.modal');
            modal.classList.toggle('show-modal');
        });
    });
});
