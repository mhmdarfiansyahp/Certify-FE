export const validateProdi = (form: any) => {
  const errors: any = {};

  if (!form.nama_prodi || !form.nama_prodi.trim()) {
    errors.nama_prodi = "Nama prodi wajib diisi";
  }
  else if (form.nama_prodi.length > 100) {
    errors.nama_prodi = "Maksimal 100 karakter";
  }

  return errors;
};