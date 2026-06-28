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

export interface BulkAsesmenPayload {
    sertifikasi_id: number;
    tanggal_asesmen: string;
    asesmens: {
        user_id: number;
        status_kompetensi: StatusAsesmen | "";
        catatan?: string | null;
    }[];
}