  document.addEventListener("DOMContentLoaded", () => {
            const instructionContainer = document.querySelector(".instruction-container");
            const startButton = document.querySelector(".start-button");
            const gameContainer = document.querySelector(".game-container");
            const car = document.querySelector(".car");
            const lanes = [1, 2, 3];
            let currentLane = 2;
            let score = 0;
            let gameInterval;
            let carIntervals = [];

       
            function handleKeyPress(event) {
                if (event.key === "ArrowLeft" && currentLane > 1) {
                    currentLane--;
                    car.style.left = `${(currentLane - 1) * 130 + 30}px`;
                } else if (event.key === "ArrowRight" && currentLane < 3) {
                    currentLane++;
                    car.style.left = `${(currentLane - 1) * 130 + 30}px`;
                }
            }

            // Remove the existing keydown event listener
            document.removeEventListener("keydown", (event) => {
                if (event.key === "ArrowLeft" && currentLane > 1) {
                    currentLane--;
                    car.classList.remove(`lane-${currentLane + 1}`);
                    car.classList.add(`lane-${currentLane}`);
                } else if (event.key === "ArrowRight" && currentLane < 3) {
                    currentLane++;
                    car.classList.remove(`lane-${currentLane - 1}`);
                    car.classList.add(`lane-${currentLane}`);
                }
            });

            // Add the modified keydown event listener
            document.addEventListener("keydown", handleKeyPress);


   function moveCars() {
    const cars = document.querySelectorAll(".opposite-car");
    cars.forEach((car) => {
        let top = car.offsetTop;
        top += 5; // Increase the car speed by adjusting the value
        car.style.top = top + "px";

        if (top > gameContainer.offsetHeight) {
            car.remove();
        } else if (top === gameContainer.offsetHeight - car.offsetHeight) {
            updateScore();
        }

        if (top >= gameContainer.offsetHeight) {
            car.remove();
        }

        if (checkCollision(car, currentLane)) {
            endGame();
        }
    });

}


function createCar() {
    if (document.querySelectorAll(".opposite-car").length < 3) {
        const randomLane1 = lanes[Math.floor(Math.random() * lanes.length)];
        const randomLane2 = lanes[Math.floor(Math.random() * lanes.length)];
        const newCar1 = document.createElement("img");
        const newCar2 = document.createElement("img");
        newCar1.src = "./images/red.png"; 
        newCar2.src = "./images/red.png"; 
        newCar1.className = "opposite-car";
        newCar2.className = "opposite-car";
        newCar1.style.left = `${(randomLane1 - 1) * 130 + 30}px`; // Adjust the left position calculation
        newCar2.style.left = `${(randomLane2 - 1) * 130 + 30}px`; // Adjust the left position calculation
        gameContainer.appendChild(newCar1);
        gameContainer.appendChild(newCar2);
        if (randomLane1 !== randomLane2) {
            const newCar3 = document.createElement("img");
            newCar3.src = "./images/yellow.png"; 
            newCar3.className = "opposite-car";
            newCar3.style.left = `${(randomLane1 - 1) * 130 + 30}px`; // Adjust the left position calculation
            gameContainer.appendChild(newCar3);
        }
    }
}
        

            function checkCollision(car, currentLane) {
                const carRect = car.getBoundingClientRect();
                const myCarRect = document.querySelector(`.lane-${currentLane}`).getBoundingClientRect();

                return (
                    carRect.left <= myCarRect.right &&
                    carRect.right >= myCarRect.left &&
                    carRect.top <= myCarRect.bottom &&
                    carRect.bottom >= myCarRect.top
                );
            }

            function endGame() {
                clearInterval(gameInterval);
                carIntervals.forEach((interval) => clearInterval(interval));
                document.removeEventListener("keydown", handleKeyPress);
                const restartButton = document.querySelector(".restart-button");
                restartButton.addEventListener("click", restartGame);
                restartButton.disabled = false;
                alert("Game Over! Your score: " + score);
            }

            function updateScore() {
                score++;
                const scoreElement = document.querySelector(".score");
                scoreElement.textContent = "Score: " + score  ;
            }

            function restartGame() {
                score = 0;
                const scoreElement = document.querySelector(".score");
                scoreElement.textContent = "Score: " + score;
                const restartButton = document.querySelector(".restart-button");
                restartButton.removeEventListener("click", restartGame);
                restartButton.disabled = true;
                carIntervals.forEach((interval) => clearInterval(interval));
                const cars = document.querySelectorAll(".opposite-car");
                cars.forEach((car) => car.remove());
                startGame();
            }

            function startGame() {
                instructionContainer.style.display = "none";
                gameContainer.style.display = "block";
                createCar();
                gameInterval = setInterval(createCar, 3000); // Create a new car every 3 seconds
                carIntervals.push(setInterval(moveCars, 20));
                document.addEventListener("keydown", handleKeyPress);
            }

            function handleKeyPress(event) {
                if (event.key === "ArrowLeft" && currentLane > 1) {
                    currentLane--;
                    car.classList.remove(`lane-${currentLane + 1}`);
                    car.classList.add(`lane-${currentLane}`);
                } else if (event.key === "ArrowRight" && currentLane < 3) {
                    currentLane++;
                    car.classList.remove(`lane-${currentLane - 1}`);
                    car.classList.add(`lane-${currentLane}`);
                }
            }

            startButton.addEventListener("click", startGame);
            const restartButton = document.querySelector(".restart-button");
            restartButton.addEventListener("click", restartGame);
        });