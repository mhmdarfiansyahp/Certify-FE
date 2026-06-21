export const validateUser = (form: any) => {
  const errors: any = {};

  if (!form.name.trim()) {
    errors.name = "Nama wajib diisi";
  } else if (form.name.length > 100) {
    errors.name = "Nama maksimal 100 karakter";
  }

  if (!form.username.trim()) {
    errors.username = "Username wajib diisi";
  } else if (form.username.length > 50) {
    errors.username = "Username maksimal 50 karakter";
  }

  if (!form.email.trim()) {
    errors.email = "Email wajib diisi";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Format email tidak valid";
  }

  if (!form.role) {
    errors.role = "Role wajib dipilih";
  } else if (!["admin", "instruktur", "mahasiswa"].includes(form.role)) {
    errors.role = "Role tidak valid";
  }

  return errors;
};
