const bcrypt = require('bcrypt');

const password = 'admin123'; // Desired admin password
bcrypt.hash(password, 10, (err, hash) => {
  if (err) console.error('Error hashing password:', err);
  console.log('Hashed password:', hash);
});
