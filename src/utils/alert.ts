import Swal from "sweetalert2";

export const toastSuccess = (msg: string) =>
  Swal.fire({ toast: true, position: "top-end", icon: "success", title: msg, timer: 1500, showConfirmButton: false });

export const toastError = (msg: string) =>
  Swal.fire({ toast: true, position: "top-end", icon: "error", title: msg, timer: 1500, showConfirmButton: false });

export const confirmDialog = () =>
  Swal.fire({
    title: "Apakah Anda yakin ingin menghapus data ini?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4647AE",
    cancelButtonColor: "#d33",
  });