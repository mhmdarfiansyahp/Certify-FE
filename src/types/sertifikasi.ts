export interface Sertifikasi {
  id: number;
  prodi_id: number;
  nama_sertifikasi: string;
  lembaga: string;
  level: "Nasional" | "Internasional";
  tanggal_sertifikasi: string;
  scheme_code: string;
  status: boolean;

  prodi?: {
    id: number;
    nama_prodi: string;
  };
}