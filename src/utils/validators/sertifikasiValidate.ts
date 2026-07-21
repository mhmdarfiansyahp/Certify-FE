export const validateSertifikasi = (data: any) => {
  const errors: any = {};

  if (!data.prodi_id) {
    errors.prodi_id = "Study program is required";
  }

  if (!data.nama_sertifikasi) {
    errors.nama_sertifikasi = "Certification name is required";
  }

  if (!data.lembaga) {
    errors.lembaga = "Institution is required";
  }

  if (!data.level) {
    errors.level = "Level is required";
  }

  if (!data.tanggal_sertifikasi) {
    errors.tanggal_sertifikasi = "Date is required";
  }

  return errors;
};