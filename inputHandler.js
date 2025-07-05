export function setupInputListeners(callbacks) {
    document.addEventListener("keydown", function (event) {
        if (!callbacks) return;

        if (event.key === "Escape") {
            callbacks.onEscape();
        }

        if (!callbacks.started && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            callbacks.onStart();
        }

        const currentDirection = callbacks.getDirection(); // ✅ get current direction

        switch (event.key) {
            case "ArrowRight":
                if (currentDirection !== 'left') callbacks.onDirectionChange(10, 0, 'right');
                break;
            case "ArrowLeft":
                if (currentDirection !== 'right') callbacks.onDirectionChange(-10, 0, 'left');
                break;
            case "ArrowUp":
                if (currentDirection !== 'down') callbacks.onDirectionChange(0, -10, 'up');
                break;
            case "ArrowDown":
                if (currentDirection !== 'up') callbacks.onDirectionChange(0, 10, 'down');
                break;
        }
    });
}
