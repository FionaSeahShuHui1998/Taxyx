const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const firstLastNameRegex = /^\S+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

function isValidEmail(email) {
  return emailRegex.test(email);
}

function isValidFirstLastName(name) {
  return firstLastNameRegex.test(name);
}

function isValidPassword(password) {
  return passwordRegex.test(password);
}

module.exports = {
  isValidEmail,
  isValidFirstLastName,
  isValidPassword,
};
