import api from "../api/axios";
import type { DashboardKompetensi } from "../types/dashboard";

export interface DashboardFilter {
    tahun?: string;
    sertifikasi_id?: string;
    prodi_id?: string;
}

export const getDashboardKompetensi = async (
    params?: DashboardFilter
): Promise<DashboardKompetensi[]> => {

    const response = await api.get(
        "/dashboard/kompetensi-prodi",
        {
            params,
        }
    );
    return response.data.data;
};