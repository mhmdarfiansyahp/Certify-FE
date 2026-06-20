export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: "admin" | "instruktur" | "mahasiswa";
  status: boolean;
  prodi_id?: number | null;
}