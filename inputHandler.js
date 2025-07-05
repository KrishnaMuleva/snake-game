export function setupInputListeners(callbacks) {
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            callbacks.onEscape();
        }

        if (!callbacks) return;

        if (!callbacks.started && ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(event.key)) {
            callbacks.onStart();
        }

        switch (event.key) {
            case "ArrowRight":
                if (callbacks.direction !== 'left') callbacks.onDirectionChange(10, 0, 'right');
                break;
            case "ArrowLeft":
                if (callbacks.direction !== 'right') callbacks.onDirectionChange(-10, 0, 'left');
                break;
            case "ArrowUp":
                if (callbacks.direction !== 'down') callbacks.onDirectionChange(0, -10, 'up');
                break;
            case "ArrowDown":
                if (callbacks.direction !== 'up') callbacks.onDirectionChange(0, 10, 'down');
                break;
        }
    });
}
