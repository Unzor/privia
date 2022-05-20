class Privia {
    constructor(method, url) {
    var thisp = this;
    return new Promise(async () => {
        var http = await fetch("https://priviaJS-server.seven7four4.repl.co/" + method + "?url=" + btoa(url));
        http = await http.json();
        thisp.data = http;
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
}
