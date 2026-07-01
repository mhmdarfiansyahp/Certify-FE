export interface Kompetensi {
  id: number;
  nama_sertifikasi: string;
  lembaga: string;
  level: string;
  tanggal: string;
  status: string;
  certificate_code?: string;
  has_file: boolean;
}