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