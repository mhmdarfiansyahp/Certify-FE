export interface DashboardKompetensi {
    nama_prodi: string;
    kompeten: number;
    tidak_kompeten: number;
    tidak_hadir: number;
}

export interface DashboardSummary {
    total_mahasiswa: number;
    kompeten: number;
    tidak_kompeten: number;
    tidak_hadir: number;
    belum_dinilai: number;
}

export interface DashboardResponse {
    success: boolean;
    summary: DashboardSummary;
    data: DashboardKompetensi[];
}