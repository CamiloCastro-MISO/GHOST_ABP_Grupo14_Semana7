
let mainUrl = process.argv[2]; // Toma el argumento de la línea de comandos
if (!mainUrl) {
  console.error('No se proporcionó MAIN_URL');
  process.exit(1);
}
const fs = require('fs');
const path = './cypress/assets/config.json'; // Reemplaza con la ruta real a tu archivo JSON

let data = fs.readFileSync(path, 'utf8');
let result = data.replace(/\{process.env.main_url\}/g, mainUrl);
fs.writeFileSync(path, result, 'utf8');
console.log('Archivo JSON actualizado');
