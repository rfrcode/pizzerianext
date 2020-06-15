// El archivo debe ser c:\keys\pizzeria.json

/* 
{
    secret: 'xxxx',
    profit: x.xx,
    cloudinarySecret: 'xxxxx'
}
*/

const fs = require('fs')
const config = fs.readFileSync(process.env.PIZZERIA_URL)

module.exports = JSON.parse(config)