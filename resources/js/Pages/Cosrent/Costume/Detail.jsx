import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Detail({ datas }) {
    const handleDelete = (e, id) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this costume?")) {
            Inertia.delete(route("cosrent.costum.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detail User
                </h2>
            }
        >
            <Head title="Detail User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Informasi Kostum */}
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Informasi Kostum
                            </h3>
                            <p className="text-lg text-gray-900 dark:text-gray-100 mt-2">
                                Nama: {datas.name}
                            </p>
                            <p className="text-lg text-gray-900 dark:text-gray-100">
                                Deskripsi: {datas.description}
                            </p>
                            <p className="text-lg text-gray-900 dark:text-gray-100">
                                Brand: {datas.brand}
                            </p>
                            <p className="text-lg text-gray-900 dark:text-gray-100">
                                Harga: {datas.price}
                            </p>
                            <p className="text-lg text-gray-900 dark:text-gray-100">
                                Size: {datas.size}
                            </p>
                            <p className="text-lg text-gray-900 dark:text-gray-100">
                                Status: {datas.status}
                            </p>
                            <p className="text-lg text-gray-900 dark:text-gray-100">
                                Stok: {datas.stock}
                            </p>
                            <p className="text-lg text-gray-900 dark:text-gray-100">
                                Kategori: {datas.category.name}
                            </p>
                        </div>

                        {/* Kumpulan Gambar Kostum */}
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Kumpulan Gambar Kostum
                            </h3>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {datas.images_of_costum.map((image) => (
                                    <div
                                        key={image.id}
                                        className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm"
                                    >
                                        <img
                                            src={image.images_link}
                                            alt={datas.name}
                                            className="object-cover w-full h-40"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-6">
                        {/* <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Aksi
                        </h3> */}
                        <div className="space-y-4">
                            <Link
                                href={route("cosrent.costum.edit", datas.id)}
                                className="block w-full px-4 py-3 text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                            >
                                Edit Kostum
                            </Link>
                            <button
                                onClick={(e) => handleDelete(e, datas.id)}
                                className="block w-full px-4 py-3 text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            >
                                Hapus Kostum
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
