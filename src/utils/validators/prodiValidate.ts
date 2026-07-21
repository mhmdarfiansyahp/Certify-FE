export const validateProdi = (form: any) => {
  const errors: any = {};

  if (!form.nama_prodi || !form.nama_prodi.trim()) {
    errors.nama_prodi = "Study program name is required";
  } else if (form.nama_prodi.length > 100) {
    errors.nama_prodi = "Maximum 100 characters allowed";
  }

  return errors;
};