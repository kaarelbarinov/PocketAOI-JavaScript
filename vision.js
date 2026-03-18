/**
 * VISION ENGINE MODULE
 */
window.VisionEngine = {
    filters: {
        threshold: (src, dst, value) => {
            if (typeof cv === 'undefined' || !src || !dst) return;
            cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
            cv.threshold(dst, dst, parseInt(value), 255, cv.THRESH_BINARY);
        }
    },
    tools: {
        presence: (roiMat, limit) => {
            if (typeof cv === 'undefined' || !roiMat || roiMat.empty()) {
                return { val: 0, isOk: false };
            }
            const pixelCount = cv.countNonZero(roiMat);
            return {
                val: pixelCount,
                isOk: pixelCount >= parseInt(limit)
            };
        }
    }
};