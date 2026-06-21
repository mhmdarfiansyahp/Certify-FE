export const validateSertifikasi = (data: any) => {
  const errors: any = {};

  if (!data.prodi_id) {
    errors.prodi_id = "Program studi wajib dipilih";
  }

  if (!data.nama_sertifikasi) {
    errors.nama_sertifikasi = "Nama sertifikasi wajib diisi";
  }

  if (!data.lembaga) {
    errors.lembaga = "Lembaga wajib diisi";
  }

  if (!data.level) {
    errors.level = "Level wajib dipilih";
  }

  if (!data.tanggal_sertifikasi) {
    errors.tanggal_sertifikasi = "Tanggal wajib diisi";
  }

  return errors;
};