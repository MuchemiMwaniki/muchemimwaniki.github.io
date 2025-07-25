// ===== Scroll-to-top button =====
const scrollBtn = document.getElementById("scrollTopBtn");
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};
scrollBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ===== Scroll-trigger animations for cards =====
document.addEventListener("scroll", function () {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            card.classList.add("visible");
        }
    });
});

// ===== Typing Effect for Hero Text =====
const typingElement = document.querySelector(".typing-text");
const textArray = JSON.parse(typingElement.getAttribute("data-text"));
let textIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textIndex].length) {
        typingElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (textArray.length) type();
});

// ===== Simplified Chatbot Logic =====
const chatBubble = document.getElementById('chat-bubble');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.querySelector('.chat-close');
const chatInput = document.getElementById('chat-input');
const chatBody = document.getElementById('chat-body');

// Show Chat Window
chatBubble.addEventListener('click', () => {
    chatWindow.style.display = 'flex';
    chatBubble.style.display = 'none';
});

// Close Chat Window
chatClose.addEventListener('click', () => {
    chatWindow.style.display = 'none';
    chatBubble.style.display = 'flex';
});

// Automated Responses
const responses = {
    "hello": "Hello there! How can I help you today?",
    "services": "I offer AI prompt engineering, chatbot creation, workflow automation, and AI-powered websites.",
    "contact": "You can reach Muchemi at +254 773 053 465 or muchemimwaniki@gmail.com.",
    "pricing": "My pricing depends on project complexity. I offer custom quotes to suit your needs.",
    "ai": "AI stands for Artificial Intelligence, and I specialize in making it work for your business!"
};

chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
        const userText = chatInput.value.trim();
        appendMessage('You', userText);

        // Check response
        const lowerCaseMsg = userText.toLowerCase();
        let reply = "I'm not sure how to respond to that, but Muchemi will assist you soon!";
        for (let key in responses) {
            if (lowerCaseMsg.includes(key)) {
                reply = responses[key];
                break;
            }
        }
        appendMessage('AI', reply);
        chatInput.value = '';
    }
});

function appendMessage(sender, text) {
    const msg = document.createElement('p');
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}
