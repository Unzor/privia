# privia
Make HTTP requests with a randomized, spoofed IP address.

# Usage
```js
// Make HTTP request
var IP = await new Privia("GET", "https://api.ipify.org");
// Get text of request
console.log(IP.getText());
// Get JSON of request
console.log(IP.getJSON());
// Get data of IP address
console.log(IP.getIPData());
// Make another HTTP request using same randomly-generated IP address
var newIP = await IP.newRequest("GET", "https://api.ipify.org");
// Regenerate IP address
var newIP = await IP.regenerate("GET", "https://api.ipify.org");
```
