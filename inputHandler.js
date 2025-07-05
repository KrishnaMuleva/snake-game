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
                callbacks.onDirectionChange(10, 0, 'right');
                break;
            case "ArrowLeft":
                callbacks.onDirectionChange(-10, 0, 'left');
                break;
            case "ArrowUp":
                callbacks.onDirectionChange(0, -10, 'up');
                break;
            case "ArrowDown":
                callbacks.onDirectionChange(0, 10, 'down');
                break;
        }
    });
}
