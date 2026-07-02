import api from "../api/axios";

import type {
    DashboardResponse
} from "../types/dashboard";

export interface DashboardFilter {
    tahun?: string;
    sertifikasi_id?: string;
    prodi_id?: string;
}

export const getDashboardKompetensi = async (
    params?: DashboardFilter
): Promise<DashboardResponse> => {

    const response = await api.get(
        "/dashboard/kompetensi-prodi",
        {
            params,
        }
    );

    return response.data;
};

export const exportDashboardExcel = async (
    params?: {
        tahun?: string;
        sertifikasi_id?: string;
        prodi_id?: string;
    }
) => {

    const response = await api.get(
        "/dashboard/export-excel",
        {
            params,
            responseType: "blob",
        }
    );

    return response.data;
};

export const exportDashboardPdf = async (
    params?: {
        tahun?: string;
        sertifikasi_id?: string;
        prodi_id?: string;
    }
) => {

    const response = await api.get(
        "/dashboard/export-pdf",
        {
            params,
            responseType: "blob",
        }
    );

    return response.data;
};