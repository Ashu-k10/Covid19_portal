// validators.js - regular expressions used for form validation and testing
const Validators = {
  full_name: /^[A-Za-z][A-Za-z ]{2,29}$/,
  email:     /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  phone:     /^[6-9]\d{9}$/,
  username:  /^[A-Za-z][A-Za-z0-9_]{3,15}$/,
  password:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/,
  age:       /^(?:1[89]|[2-9]\d|1[01]\d)$/,
  city:      /^[A-Za-z][A-Za-z .-]{1,49}$/,
  comment:   /^(?!.*<\s*\/?\s*script)[\s\S]{3,300}$/i
};
if (typeof module !== 'undefined') module.exports = Validators;
