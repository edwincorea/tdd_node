require('mocha');
var should = require('should');
var fs = require('fs');

var data = require('../user-data');
var api = require('../user-web');

var request = require('supertest').agent(api.listen());

before(async function() {
    await fs.writeFile('./users.json', '[]');    
});

// Unit Test
describe('user data', function() {
    
    it('should have +1 user count after saving',async function() {
        var users = await data.users.get();

        await data.users.save({ name: 'Jon' });

        var newUsers = await data.users.get();

        newUsers.length.should.equal(users.length + 1);
    });
});

// Integration Test
describe('user web', function() {
    
    it('should have +1 user count after saving', async function() {
        var users = (await request.get('/user').expect(200)).body;
        
        await data.users.save({ name: 'Edwin' });

        var newUsers = (await request.get('/user').expect(200)).body;

        newUsers.length.should.equal(users.length + 1);
    });
});