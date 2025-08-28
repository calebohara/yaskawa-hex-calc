// Get references to all necessary DOM elements
const decimalInput = document.getElementById('decimal-input');
const fullHexOutput = document.getElementById('full-hex-output');
const highBitsOutput = document.getElementById('high-bits-output');
const lowBitsOutput = document.getElementById('low-bits-output');
const resetButton = document.getElementById('reset-button');
const copyFullHexBtn = document.getElementById('copy-full-hex-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Function to perform the conversion and update the display
const convertDecimalToHex = () => {
    const decimalValue = parseInt(decimalInput.value, 10);

    if (isNaN(decimalValue) || decimalValue < 0 || decimalValue > 16777215) {
        fullHexOutput.value = '';
        highBitsOutput.value = '';
        lowBitsOutput.value = '';
        return;
    }

    let hexString = decimalValue.toString(16);
    hexString = hexString.padStart(6, '0');
    const fullHex = hexString.toUpperCase();

    const highBits = fullHex.substring(0, 2);
    const lowBits = fullHex.substring(2, 6);

    fullHexOutput.value = fullHex;
    highBitsOutput.value = highBits;
    lowBitsOutput.value = lowBits;
};

// Function to copy a single output value to the clipboard
const copyOutput = (elementId, button) => {
    const inputElement = document.getElementById(elementId);
    if (inputElement && inputElement.value) {
        inputElement.select();
        inputElement.setSelectionRange(0, 99999);
        document.execCommand('copy');
        
        const originalText = button.innerText;
        button.innerText = 'Copied!';
        setTimeout(() => {
            button.innerText = originalText;
        }, 2000);
    }
};

// Function to set the theme based on the user's preference
const setTheme = (theme) => {
    if (theme === 'dark') {
        document.body.classList.add('dark');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        localStorage.setItem('theme', 'light');
    }
};

// Check for saved theme preference on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    // Default to light mode
    setTheme('light');
}

// Add event listeners
decimalInput.addEventListener('input', convertDecimalToHex);
copyFullHexBtn.addEventListener('click', () => copyOutput('full-hex-output', copyFullHexBtn));
resetButton.addEventListener('click', () => {
    decimalInput.value = '';
    fullHexOutput.value = '';
    highBitsOutput.value = '';
    lowBitsOutput.value = '';
});
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});
