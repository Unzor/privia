class Privia {
    constructor(method, url) {
        var thisp = this;
        return new Promise(async (resolve) => {
            var http = await fetch("https://priviaJS-server.seven7four4.repl.co/" + method + "?url=" + btoa(url));
            http = await http.json();
            thisp.data = http;
            resolve(thisp);
        });
    }
    getText() {
        return this.data.data
    }
    getJSON() {
        return JSON.parse(this.data.data)
    }
    getIPData() {
        return this.data.ip_data
    }
    newRequest(method, url) {
        var thisp = this;
        return new Promise(async (resolve) => {
            var http = await fetch("https://priviaJS-server.seven7four4.repl.co/ip/" + method + "?url=" + btoa(url) + "&ip=" + thisp.data.ip_data.ip);
            http = await http.json();
            thisp.data = http;
            resolve(thisp);
        });
    }
    async regenerate(method, url) {
        return await new this.constructor(method, url);
    }
}
