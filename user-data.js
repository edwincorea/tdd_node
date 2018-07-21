var fs = require('fs');

var userFile = './users.json';

const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

module.exports = {
    users: {
        get: async function() {
            var users = await readFile(userFile, 'utf-8');
            return JSON.parse(users);
        },
        save: async function(user) {
            var users = await this.get();            

            users.push(user);

            await writeFile(userFile, JSON.stringify(users));
        }
    }
};