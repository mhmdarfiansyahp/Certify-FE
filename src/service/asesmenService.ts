import api from "../api/axios";
import type { BulkAsesmenPayload } from "../types/asesmen";

export const getMahasiswaAsesmen =
    async (sertifikasiId: number) => {

        const response = await api.get(
            `/asesmen/sertifikasi/${sertifikasiId}`
        );

        return response.data;
    };

export const saveBulkAsesmen = async (
    payload: BulkAsesmenPayload
) => {
    const response = await api.post(
        `/asesmen/bulk-input`,
        payload
    );

    return response.data;
};