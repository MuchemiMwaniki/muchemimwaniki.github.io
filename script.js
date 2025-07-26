<script>
// ===== DOM Ready =====
document.addEventListener("DOMContentLoaded", () => {
    // ===== Scroll-to-top button =====
    const scrollBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
        scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ===== Card Animation on Scroll =====
    const cards = document.querySelectorAll(".card");
    window.addEventListener("scroll", () => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                card.classList.add("visible");
            }
        });
    });

    // ===== Typing Effect =====
    const typingElement = document.querySelector(".typing-text");
    const textArray = JSON.parse(typingElement?.getAttribute("data-text") || "[]");
    let textIndex = 0, charIndex = 0;

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

    if (textArray.length) type();

    // ===== Chatbot Toggle =====
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    chatBubble?.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
        chatBubble.style.display = 'none';
    });

    chatClose?.addEventListener('click', () => {
        chatWindow.style.display = 'none';
        chatBubble.style.display = 'flex';
    });

    const responses = {
        "hello": "Hello there! How can I help you today?",
        "services": "I offer AI prompt engineering, chatbot creation, workflow automation, and AI-powered websites.",
        "contact": "You can reach Muchemi at +254 773 053 465 or muchemimwaniki@gmail.com.",
        "pricing": "My pricing depends on project complexity. I offer custom quotes to suit your needs.",
        "ai": "AI stands for Artificial Intelligence, and I specialize in making it work for your business!"
    };

    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            const userText = chatInput.value.trim();
            appendMessage('You', userText);

            const lower = userText.toLowerCase();
            let reply = "I'm not sure how to respond to that, but Muchemi will assist you soon!";
            for (let key in responses) {
                if (lower.includes(key)) {
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

    // ===== Theme Toggle =====
    const toggleBtn = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(savedTheme === "dark" ? "dark-theme" : "light-theme");

    toggleBtn?.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        document.body.classList.toggle("light-theme");

        const newTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
    });
});
</script>
