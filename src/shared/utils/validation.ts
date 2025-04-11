export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

export const isValidName = (name: string): boolean => {
  return name.length >= 2 && /^[a-zA-Z\s-]+$/.test(name);
};

export type ValidationError = {
  field: string;
  message: string;
};

export const validateLoginForm = (data: {email: string; password: string}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.email) {
    errors.push({field: 'email', message: 'Email is required'});
  } else if (!isValidEmail(data.email)) {
    errors.push({field: 'email', message: 'Invalid email format'});
  }

  if (!data.password) {
    errors.push({field: 'password', message: 'Password is required'});
  } else if (!isValidPassword(data.password)) {
    errors.push({
      field: 'password',
      message: 'Password must be at least 6 characters',
    });
  }

  return errors;
};
