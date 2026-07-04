export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: "admin" | "instruktur" | "mahasiswa";
  status: boolean;
  prodi_id?: number | null;
  nim?: string | null;
  nip?: string | null;
  prodi?: {
    id: number;
    nama_prodi: string;
  } | null;
  created_at?: string;
  updated_at?: string;
}