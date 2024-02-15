const fs = require('node:fs');

exports.readFileAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/${filePath}`, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    });
  })
}

exports.parseWeightToNumber = (weight) => {
  return Number(weight.trim().slice(1, -1));
}

exports.sortByWeightDecreasing = (a, b) => {
  return a[1] > b[1] ? -1 : 1;
}