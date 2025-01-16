import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import React, { useState } from "react";

export default function PaymentForm({ order }) {
    const { data, setData, post, processing } = useForm({
        bukti_pembayaran: null,
    });
    const [previewImage, setPreviewImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("bukti_pembayaran", data.bukti_pembayaran);
        formData.append("other_data", JSON.stringify(data)); // Include other form data

        router.post(route("rent.payment.submit", order.id), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPreviewImage(URL.createObjectURL(file)); // Update preview
        setData("bukti_pembayaran", file); // Update form data
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Form Rent
                </h2>
            }
        >
            <Head title="Form Rent" />
            <div className="mt-10 bg-gray-900 text-gray-200 flex justify-center items-center">
                <div className="w-full max-w-xl bg-gray-800 rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-semibold text-center mb-6">
                        Pembayaran Rental
                    </h1>
                    <div className="mb-4">
                        <p className="text-lg font-semibold">Detail Order:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                            <li>Nama Kostum: {order.costum.name}</li>
                            <li>Tanggal Mulai: {order.tanggal_mulai_rental}</li>
                            <li>
                                Tanggal Kembali: {order.tanggal_kembali_kostum}
                            </li>
                        </ul>
                    </div>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label
                                htmlFor="bukti_pembayaran"
                                className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm font-medium text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Upload Bukti Pembayaran
                            </label>
                            <input
                                type="file"
                                id="bukti_pembayaran"
                                onChange={handleFileChange}
                                className="hidden"
                                required
                            />
                            {previewImage && (
                                <div className="mt-2">
                                    <img
                                        src={previewImage}
                                        alt="Bukti Pembayaran Preview"
                                        className="w-full max-h-40 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                            disabled={processing}
                        >
                            {processing
                                ? "Mengirim..."
                                : "Selesaikan Pembayaran"}
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
