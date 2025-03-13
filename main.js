function generatePassword() {
    let length = parseInt(document.getElementById("passwordLength").value); // Adicionado .value
    let finalPassword = document.getElementById("passwordResult");

    if (isNaN(length) || length <= 0) { // Verifica se o input é válido
        finalPassword.textContent = "Please enter a valid number!";
        return;
    }

    if (length < 8) {
        finalPassword.textContent = "For your safety, create a bigger password!";
        return;
    }

    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*().,?0123456789';
    let generatedPassword = "";

    for (let i = 0; i < length; i++) {
        generatedPassword += chars[Math.floor(Math.random() * chars.length)];
    }

    finalPassword.textContent = generatedPassword;

    // Add animation class
    finalPassword.classList.add('password-generated');
    setTimeout(() => {
        finalPassword.classList.remove('password-generated');
    }, 300);

    // Light up all grid squares briefly when password is generated
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => {
        square.style.transition = 'all 0.4s ease';
        square.style.backgroundColor = `rgba(255, 119, 0, ${0.1 + Math.random() * 0.2})`;
        square.style.boxShadow = '0 0 10px rgba(255, 119, 0, 0.3)';

        setTimeout(() => {
            square.style.backgroundColor = '';
            square.style.boxShadow = '';
        }, 700 + Math.random() * 300);
    });
}

function clearPassword() {
    let finalPassword = document.getElementById("passwordResult");

    document.getElementById("passwordLength").value = "";
    finalPassword.textContent = "";

    // Add animation class to the clear button
    clrButton.classList.add('button-cleared');

    // Create and show clear notification
    const notification = document.createElement('div');
    notification.className = 'clear-notification';
    notification.textContent = 'Password cleared!';
    document.querySelector('.container').appendChild(notification);

    // Show the notification with a small delay
    setTimeout(() => {
        notification.classList.add('show');
    }, 50);

    // Actually clear the password after a brief delay (for effect)
    setTimeout(() => {
        document.getElementById("passwordLength").value = "";
        finalPassword.textContent = "";
    }, 200);

    // Add animation class to the password result
    finalPassword.classList.add('cleared');

    // Reset grid effect - make all grid squares flicker briefly
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => {
        square.style.transition = 'all 0.2s ease';
        // Random flickering effect
        if (Math.random() > 0.5) {
            square.style.opacity = '0.3';
        } else {
            square.style.opacity = '0.8';
        }

        // Reset after animation
        setTimeout(() => {
            square.style.opacity = '';
            square.style.transition = 'all 0.4s ease';
        }, 300 + Math.random() * 200);
    });

    // Remove animation classes and notification after animation completes
    setTimeout(() => {
        finalPassword.classList.remove('cleared');
        clrButton.classList.remove('button-cleared');
        notification.classList.remove('show');

        // Remove the notification element after fade out
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 1500);
}

function copyPassword() {
    let finalPassword = document.getElementById("passwordResult");
    let copyButton = document.getElementById("copyButton");
    let passtocopy = finalPassword.textContent;

    // Don't copy if there's no password
    if (!passtocopy || passtocopy === "") return;

    // Copy to clipboard
    navigator.clipboard.writeText(passtocopy);

    // Add animation class to the result display
    finalPassword.classList.add('copied');

    // Add animation class to the copy button
    copyButton.classList.add('button-copied');

    // Create and show copy notification
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = 'Password copied!';
    document.querySelector('.container').appendChild(notification);

    // Show the notification with a small delay
    setTimeout(() => {
        notification.classList.add('show');
    }, 50);

    // Remove animation classes and notification after animation completes
    setTimeout(() => {
        finalPassword.classList.remove('copied');
        copyButton.classList.remove('button-copied');
        notification.classList.remove('show');

        // Remove the notification element after fade out
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 1500);
}

// Create grid background
document.addEventListener('DOMContentLoaded', function () {
    // Create grid background container
    const gridBackground = document.createElement('div');
    gridBackground.className = 'grid-background';
    document.body.insertBefore(gridBackground, document.body.firstChild);

    // Create grid squares (12x12 grid)
    const gridSize = 12;
    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.className = 'grid-square';
        gridBackground.appendChild(gridSquare);
    }

    // Add page load animation to grid squares
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach((square, index) => {
        square.style.opacity = "0";
        
        // Animate squares with delay based on position
        setTimeout(() => {
            square.style.transition = 'opacity 0.6s ease, background-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease';
            square.style.opacity = "1";
            
            // Randomly light up some squares after they appear
            if (Math.random() > 0.7) {
                square.style.backgroundColor = `rgba(255, 119, 0, ${0.08 + Math.random() * 0.1})`;
                square.style.boxShadow = '0 0 8px rgba(255, 119, 0, 0.2)';
            }
        }, 50 + index * 10); // Staggered delay for each square
    });

    // Initial random lighting of some squares
    squares.forEach(square => {
        if (Math.random() > 0.7) {
            square.style.backgroundColor = `rgba(255, 119, 0, ${0.08 + Math.random() * 0.1})`;
            square.style.boxShadow = '0 0 8px rgba(255, 119, 0, 0.2)';
        }
    });

    // Add mousemove effect to highlight squares near cursor with increased range
    document.addEventListener('mousemove', function (e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        document.querySelectorAll('.grid-square').forEach(square => {
            const rect = square.getBoundingClientRect();
            const squareX = rect.left + rect.width / 2;
            const squareY = rect.top + rect.height / 2;

            const distance = Math.sqrt(
                Math.pow(mouseX - squareX, 2) +
                Math.pow(mouseY - squareY, 2)
            );

            // Create a glow effect on nearby squares with increased range (250px instead of 150px)
            if (distance < 250) {
                const intensity = 1 - distance / 250;
                square.style.backgroundColor = `rgba(255, 119, 0, ${0.08 + intensity * 0.22})`;
                square.style.boxShadow = `0 0 ${intensity * 20}px rgba(255, 119, 0, ${intensity * 0.5})`;
                square.style.transform = `scale(${1 + intensity * 0.08})`;
            } else {
                // Keep some squares slightly lit even at a distance
                if (Math.random() > 0.95) {
                    square.style.backgroundColor = `rgba(255, 119, 0, 0.08)`;
                    square.style.boxShadow = '0 0 5px rgba(255, 119, 0, 0.15)';
                    square.style.transform = 'scale(1)';
                } else {
                    square.style.backgroundColor = '';
                    square.style.boxShadow = '';
                    square.style.transform = '';
                }
            }
        });
    });

    // Container hover effects with enhanced radius
    const container = document.querySelector('.container');

    container.addEventListener('mouseover', function () {
        // Enhance grid squares near the container with larger radius
        document.querySelectorAll('.grid-square').forEach(square => {
            const containerRect = container.getBoundingClientRect();
            const squareRect = square.getBoundingClientRect();

            const containerCenterX = containerRect.left + containerRect.width / 2;
            const containerCenterY = containerRect.top + containerRect.height / 2;

            const squareCenterX = squareRect.left + squareRect.width / 2;
            const squareCenterY = squareRect.top + squareRect.height / 2;

            const distance = Math.sqrt(
                Math.pow(containerCenterX - squareCenterX, 2) +
                Math.pow(containerCenterY - squareCenterY, 2)
            );

            // Increased radius from 300 to 400
            if (distance < 400) {
                square.style.transition = 'all 0.8s ease';
                const intensity = 1 - distance / 400;
                square.style.backgroundColor = `rgba(255, 119, 0, ${0.08 + intensity * 0.15})`;

                // Random glow effect on some squares
                if (Math.random() > 0.7) {
                    square.style.boxShadow = `0 0 ${intensity * 15}px rgba(255, 119, 0, ${intensity * 0.4})`;
                }
            }
        });
    });

    container.addEventListener('mouseout', function () {
        // Don't fully reset all squares, keep some lit
        document.querySelectorAll('.grid-square').forEach(square => {
            square.style.transition = 'all 0.4s ease';

            // Keep some squares slightly lit
            if (Math.random() > 0.7) {
                square.style.backgroundColor = 'rgba(255, 119, 0, 0.06)';
            } else {
                square.style.backgroundColor = '';
                square.style.boxShadow = '';
            }
        });
    });
});

// Add these functions at the end of your file

function incrementValue() {
    let input = document.getElementById('passwordLength');
    let currentValue = parseInt(input.value) || 0;
    input.value = currentValue + 1;

    // Add a small ripple effect to the up button
    const button = document.querySelector('.spinner-up');
    button.classList.add('spinner-active');
    setTimeout(() => {
        button.classList.remove('spinner-active');
    }, 200);
}

function decrementValue() {
    let input = document.getElementById('passwordLength');
    let currentValue = parseInt(input.value) || 0;
    if (currentValue > 0) {
        input.value = currentValue - 1;
    }

    // Add a small ripple effect to the down button
    const button = document.querySelector('.spinner-down');
    button.classList.add('spinner-active');
    setTimeout(() => {
        button.classList.remove('spinner-active');
    }, 200);
}

// Add this CSS class for the button press effect
document.head.insertAdjacentHTML('beforeend', `
<style>
.spinner-active {
    background-color: rgba(255, 119, 0, 0.2) !important;
    transform: scale(0.9) !important;
}
</style>
`);