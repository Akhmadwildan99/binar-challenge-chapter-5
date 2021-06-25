const { json } = require('body-parser');
const fs = require('fs');

// membuat directory
const dirPath = './data';

if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// membuat file directory
const path = 'data/dataUser.json';
if(!fs.existsSync(path)){
    fs.writeFileSync(path, '[]', 'utf-8');
}

// membaca data user
const loadUser = () => {
    const file = fs.readFileSync('data/dataUser.json', 'utf-8');
    const users = JSON.parse(file);
    return users;
}

const findUserName = (nama) => {
    const users = loadUser();
    const user = users.find((user) => user.nama.toLowerCase() === nama.toLowerCase());
    return user;
}

const findUserPassword = (password) => {
    const users = loadUser();
    const user = users.find((user) => user.password === password);
    return user;
}

const saveDataUser = (users) => {
    fs.writeFileSync('data/dataUser.json', JSON.stringify(users));
}

const addDataUser = (user) => {
    const users = loadUser();
    users.push(user);
    saveDataUser(users);
}

module.exports = { findUserName, findUserPassword, addDataUser };