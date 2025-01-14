import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function DetailCostume({ costume }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detail Costume
                </h2>
            }
        >
            <Head title={`Detail Costume - ${costume.name}`} />

            <div className="p-8 min-h-screen">
                <div className="max-w-5xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden ">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Bagian Gambar */}
                        <div className="p-6 bg-slate-700">
                            <div className="relative mb-4">
                                <img
                                    id="main-image"
                                    src={
                                        costume.images_of_costum[0]
                                            ?.images_link ||
                                        "https://via.placeholder.com/150"
                                    }
                                    alt={costume.name}
                                    className="w-full h-[550px] object-cover rounded-xl shadow-md"
                                />
                            </div>
                            <div className="flex justify-center mt-4 space-x-3">
                                {costume.images_of_costum.map(
                                    (image, index) => (
                                        <button
                                            key={index}
                                            className="w-16 h-16 border rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transform hover:scale-105 transition"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "main-image"
                                                    )
                                                    .setAttribute(
                                                        "src",
                                                        image.images_link
                                                    )
                                            }
                                        >
                                            <img
                                                src={image.images_link}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Bagian Detail */}
                        <div className="p-6 flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-4">
                                    {costume.name}
                                </h1>
                                <p className="text-white mb-6 text-justify leading-relaxed font-bold">
                                    {costume.description}
                                </p>
                                <div className="text-lg font-bold text-white mb-6">
                                    Harga:{" "}
                                    <span className="text-blue-500 font-bold">
                                        Rp {costume.price.toLocaleString()}
                                    </span>
                                </div>
                                <ul className="space-y-2 text-white font-bold ">
                                    <li>
                                        <strong>Category:</strong>{" "}
                                        {costume.category.name}
                                    </li>
                                    <li>
                                        <strong>Size:</strong> {costume.size}
                                    </li>
                                    <li>
                                        <strong>Brand:</strong> {costume.brand}
                                    </li>
                                    <li>
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`font-bold ${
                                                costume.status === "ready"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {costume.status === "ready"
                                                ? "Ready"
                                                : "Unavailable"}
                                        </span>
                                    </li>
                                    <li>
                                        <strong>Stock:</strong> {costume.stock}{" "}
                                        pcs
                                    </li>
                                </ul>
                            </div>
                            <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-medium py-3 px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105 flex items-center gap-2 justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                </svg>
                                Rent Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
