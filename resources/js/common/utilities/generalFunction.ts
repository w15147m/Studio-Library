export const funcGen = {
    getFlatText(detail, num = 0) {
        if (!detail) {
            return "";
        }
        let textOnly = detail.replace(/<\/?[^>]+(>|$)/g, "");
        textOnly = textOnly.replace(/&[^;\s]+;/g, "");
        textOnly = textOnly.trim();
        if (num > 0) {
            return textOnly.length <= num
                ? textOnly
                : textOnly.slice(0, num);
        }
        return textOnly;
    },

    is_company() {
        // Simple placeholder for consistency
        return true; 
    },

    getLocalStorageSize() {
        let totalSize = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            totalSize += key.length + value.length;
        }
        return (totalSize / 1024).toFixed(2) + " KB";
    },

    getReadableTextColor(bgColor) {
        if (!bgColor) return "#000";
        const hex = bgColor.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 125 ? "#000" : "#fff";
    },
};

export default funcGen;
