export const validateUser = (form: any) => {
  const errors: any = {};

  if (!form.name?.trim()) {
    errors.name = "Name is required";
  } else if (form.name.length > 100) {
    errors.name = "Name must not exceed 100 characters";
  }

  if (!form.username?.trim()) {
    errors.username = "Username is required";
  } else if (form.username.length > 50) {
    errors.username = "Username must not exceed 50 characters";
  }

  if (!form.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email format";
  }

  if (!form.role) {
    errors.role = "Role is required";
  } else if (!["admin", "instruktur", "mahasiswa"].includes(form.role)) {
    errors.role = "Invalid role selected";
  }

  return errors;
};