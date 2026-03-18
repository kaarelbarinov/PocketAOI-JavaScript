/**
 * UI & INTERACTION MODULE
 */
class UIManager {
    constructor(canvas, roi) {
        this.canvas = canvas;
        this.roi = roi;
        this.isDragging = false;
        this.offset = { x: 0, y: 0 };
        this.initListeners();
    }

    getPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        // Arvutame positsiooni vastavalt video resolutsioonile
        return {
            x: (clientX - rect.left) * (this.canvas.width / rect.width),
            y: (clientY - rect.top) * (this.canvas.height / rect.height)
        };
    }

    initListeners() {
        const start = (e) => {
            const p = this.getPos(e);
            if (p.x > this.roi.x && p.x < this.roi.x + this.roi.w && 
                p.y > this.roi.y && p.y < this.roi.y + this.roi.h) {
                this.isDragging = true;
                this.offset = { x: p.x - this.roi.x, y: p.y - this.roi.y };
            }
        };

        const move = (e) => {
            if (!this.isDragging) return;
            const p = this.getPos(e);
            this.roi.x = p.x - this.offset.x;
            this.roi.y = p.y - this.offset.y;
        };

        const stop = () => { this.isDragging = false; };

        this.canvas.addEventListener('mousedown', start);
        this.canvas.addEventListener('touchstart', start, {passive: false});
        window.addEventListener('mousemove', move);
        window.addEventListener('touchmove', move, {passive: false});
        window.addEventListener('mouseup', stop);
        window.addEventListener('touchend', stop);
    }
}
window.UIManager = UIManager;