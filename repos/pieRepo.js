const fs = require('fs');

const FILE_NAME = './assets/pies2.json';

let pieRepo = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data)); // converts data to JSON
      }
    });
  },
  getById: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pie = JSON.parse(data).find((p) => p.id == id);
        resolve(pie);
      }
    });
  },
  search: function (searchObject, resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        // perform search
        if (searchObject) {
          // Example search object
          //let searchObject = {
          //  id: 1
          //  name: 'A'
          //};
          pies = pies.filter(
            (pie) =>
              (searchObject.id ? pie.id == searchObject.id : true) &&
              (searchObject.name
                ? pie.name
                    .toLowerCase()
                    .indexOf(searchObject.name.toLowerCase()) >= 0
                : true),
          );
        }
        resolve(pies);
      }
    });
  },
  insert: function (newData, resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        pies.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(newData);
          }
        });
      }
    });
  },
  update: function (newData, id, resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        let pie = pies.find((pie) => pie.id == id);
        if (pie) {
          Object.assign(pie, newData);
          fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(newData);
            }
          });
        }
      }
    });
  },

  delete: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        let index = pies.findIndex((pie) => pie.id == id);
        if (index != -1) {
          pies.splice(index, 1);
          fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
            if (err) {
              reject;
            } else {
              resolve(index);
            }
          });
        }
      }
    });
  },
};

module.exports = pieRepo;
