export type StatusAsesmen =
    | "Kompeten"
    | "Tidak Kompeten"
    | "Tidak Hadir";

export interface MahasiswaAsesmen {
    id: number;
    nim: string;
    nama: string;
    status: StatusAsesmen | "";
    bukti_pendukung?: string | null;
}
