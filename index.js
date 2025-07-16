 class ChatApp {
            constructor() {
                this.messages = [];
                this.messageInput = document.getElementById('messageInput');
                this.sendButton = document.getElementById('sendButton');
                this.chatMessages = document.getElementById('chatMessages');
                this.isTyping = false;
                
                this.initEventListeners();
                this.addWelcomeMessage();
            }

            initEventListeners() {
                this.sendButton.addEventListener('click', () => this.sendMessage());
                this.messageInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });
            }

            addWelcomeMessage() {
                setTimeout(() => {
                    this.addMessage('Welcome to the chat! I\'m here to respond to your messages.', 'received');
                }, 1000);
            }

            sendMessage() {
                const message = this.messageInput.value.trim();
                if (message === '') return;

                this.addMessage(message, 'sent');
                this.messageInput.value = '';
                this.messageInput.focus();

                // Simulate typing indicator and response
                this.simulateTyping();
            }

            addMessage(text, type) {
                const messageElement = document.createElement('div');
                messageElement.className = `message ${type}`;
                
                const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                messageElement.innerHTML = `
                    <div class="message-bubble">${this.escapeHtml(text)}</div>
                    <div class="message-time">${currentTime}</div>
                `;

                // Remove empty state if it exists
                const emptyState = this.chatMessages.querySelector('.empty-state');
                if (emptyState) {
                    emptyState.remove();
                }

                this.chatMessages.appendChild(messageElement);
                this.scrollToBottom();
            }

            simulateTyping() {
                if (this.isTyping) return;
                this.isTyping = true;

                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'typing-indicator';
                typingIndicator.style.display = 'block';
                typingIndicator.innerHTML = `
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                `;

                this.chatMessages.appendChild(typingIndicator);
                this.scrollToBottom();

                setTimeout(() => {
                    typingIndicator.remove();
                    this.generateAutoResponse();
                    this.isTyping = false;
                }, 1500);
            }

            generateAutoResponse() {
                const responses = [
                    "That's interesting! Tell me more.",
                    "I understand what you mean.",
                    "Thanks for sharing that with me!",
                    "How are you feeling about that?",
                    "That sounds like a great idea!",
                    "I'm here to listen. What else is on your mind?",
                    "That's a good point. I hadn't thought of it that way.",
                    "It's nice to chat with you!",
                    "What would you like to talk about next?",
                    "I appreciate you sharing that with me."
                ];

                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                this.addMessage(randomResponse, 'received');
            }

            scrollToBottom() {
                setTimeout(() => {
                    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
                }, 100);
            }

            escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
        }

        // Initialize the chat app when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new ChatApp();
        });