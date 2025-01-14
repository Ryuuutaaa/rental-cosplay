import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ username }) {
    console.log({ username });
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detail Costume
                </h2>
            }
        >
            <Head title="Detail Costume" />

            <div className="p-8 min-h-screen">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Bagian Gambar */}
                        <div className="p-6">
                            <div className="relative">
                                <img
                                    id="main-image"
                                    src="https://i.pinimg.com/474x/e7/23/5b/e7235b5f932a5e30be40ab955cd58909.jpg"
                                    alt="Product Image"
                                    className="w-full h-[530px] object-cover  rounded-lg"
                                />
                            </div>
                            <div className="flex justify-center mt-4 space-x-2">
                                <button
                                    className="w-16 h-16 border rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500"
                                    onClick={() =>
                                        document
                                            .getElementById("main-image")
                                            .setAttribute(
                                                "src",
                                                "https://i.pinimg.com/474x/e7/23/5b/e7235b5f932a5e30be40ab955cd58909.jpg"
                                            )
                                    }
                                >
                                    <img
                                        src="https://i.pinimg.com/474x/e7/23/5b/e7235b5f932a5e30be40ab955cd58909.jpg"
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                                <button
                                    className="w-16 h-16 border rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500"
                                    onClick={() =>
                                        document
                                            .getElementById("main-image")
                                            .setAttribute(
                                                "src",
                                                "https://i.pinimg.com/474x/b0/a0/f8/b0a0f87242b5c33a0873c586a1ba5823.jpg"
                                            )
                                    }
                                >
                                    <img
                                        src="https://i.pinimg.com/474x/b0/a0/f8/b0a0f87242b5c33a0873c586a1ba5823.jpg"
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                                <button
                                    className="w-16 h-16 border rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500"
                                    onClick={() =>
                                        document
                                            .getElementById("main-image")
                                            .setAttribute(
                                                "src",
                                                "https://i.pinimg.com/474x/68/2b/3a/682b3a7cb8d7f3e3cbaf3e564f5f1b30.jpg"
                                            )
                                    }
                                >
                                    <img
                                        src="https://i.pinimg.com/474x/68/2b/3a/682b3a7cb8d7f3e3cbaf3e564f5f1b30.jpg"
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Bagian Detail */}
                        <div className="p-6">
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                Nama Produk yang Sangat Panjang Sekali
                            </h1>
                            <p className="text-gray-600 mb-4">
                                Deskripsi produk yang sangat lengkap dan menarik
                                untuk menjelaskan segala detail tentang produk
                                ini.
                            </p>
                            <div className="text-lg font-semibold text-gray-800 mb-4">
                                Harga:{" "}
                                <span className="text-blue-500">
                                    Rp 150.000
                                </span>
                            </div>
                            <ul className="space-y-2 mb-6">
                                <li>
                                    <strong>Category:</strong> Fashion
                                </li>
                                <li>
                                    <strong>Nama Toko:</strong> Toko Stylish
                                </li>
                                <li>
                                    <strong>Size:</strong> L
                                </li>
                                <li>
                                    <strong>Brand:</strong> Brand Premium
                                </li>
                                <li>
                                    <strong>Status:</strong>{" "}
                                    <span className="text-green-500 font-bold">
                                        Ready
                                    </span>
                                </li>
                                <li>
                                    <strong>Stock:</strong> 20 pcs
                                </li>
                            </ul>
                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
