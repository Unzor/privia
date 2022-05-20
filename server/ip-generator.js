const start = parseInt(1 + Math.floor(Math.random() * 9) + Math.random().toFixed(7).split('.')[1]);
const end = parseInt(1 + Math.floor(Math.random() * 9) + Math.random().toFixed(7).split('.')[1]);

function _generateRandomIp(start, end) {
  let r = parseInt(1 + Math.floor(Math.random() * 9) + Math.random().toFixed(9).split('.')[1]);; // here is that specific number

  const ip = [];
  for (let i = 0; i < 4; i++) {
    ip.push(r % 256);
    r = Math.floor(r / 256);
  }

  return ip.reverse(); // put the results mod/div into correct order
}

function generateRandomIp() {
  let ip = _generateRandomIp(start, end);
  let valid = true;

  // ip can't be of format 10.xxx.xxx.xxx
  if (ip[0] === 10) { valid = false; }

  // ip can't be of format 172.16.xxx.xxx
  if (ip[0] === 172 && ip[1] === 16) { valid = false; }

  // ip can't be of format 192.168.xxx.xxx
  if (ip[0] === 192 && ip[1] === 168) { valid = false; }

  if (valid === true) {
    return ip.join('.'); // convert ip to string format
  } else {
    return generateRandomIp(start, end); // try again
  }
}

module.exports = {
  generate: generateRandomIp
};
