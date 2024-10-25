// Function to fetch advice from the Advice Slip API
const fetchAdvice = async () => {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    return data.slip.advice;
};

// Update the advice text with fade-in effect
document.getElementById('advice-btn').addEventListener('click', async () => {
    const adviceText = document.getElementById('advice-text');
    adviceText.textContent = "Loading advice...";
    
    try {
        const advice = await fetchAdvice();
        
        // Remove and re-add the fade-in class to trigger animation
        adviceText.classList.remove('fade-in');
        void adviceText.offsetWidth; // Trigger reflow to restart animation
        adviceText.textContent = advice;
        adviceText.classList.add('fade-in');
        
    } catch (error) {
        adviceText.textContent = "Failed to load advice. Try again!";
        console.error('Error:', error);
    }
});

// Dark mode toggle
const themeToggleButton = document.getElementById('theme-toggle');
const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
};

const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
};

// Toggle theme on button click
themeToggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

// Load theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    enableDarkMode();
}