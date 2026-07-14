import api from "../api/axios";

export const getMahasiswaAsesmen = async (sertifikasiId: number) => {
    const response = await api.get(`/asesmen/sertifikasi/${sertifikasiId}`);
    return response.data;
};

export const saveBulkAsesmen = async (formData: FormData) => {
    const response = await api.post(`/asesmen/bulk-input`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};