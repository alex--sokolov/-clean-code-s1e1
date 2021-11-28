const Utils = {
    parseRequestURL: () => {
        const sb = (url) => {
            let urlArr = [];
            let k = url.indexOf('?');
            if (k === -1) {
                urlArr = [url, '']
            } else {
                urlArr.push(url.slice(0, k));
                const searchParams = new URLSearchParams(url.slice(k));
                urlArr.push(searchParams);
            }
            return urlArr
        };
        const url = location.hash.slice(1).toLowerCase() || '/';
        return sb(url);
    },

    setLocalStorage(key, data) {
        localStorage.setItem(key, data.value);
    },

    getLocalStorage(key, data) {
        if (localStorage.getItem(key)) {
            data.value = localStorage.getItem(key);
        }
    },

    sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
};

export default Utils;
