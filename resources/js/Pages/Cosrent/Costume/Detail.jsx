import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Detail({ datas }) {
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <p className="text-xl font-semibold">
                                Nama Kostum : {datas.name}
                            </p>
                            <p className="text-lg">
                                Deskripsi Kostum : {datas.description}
                            </p>
                            <p className="text-lg"> Brand : {datas.brand}</p>
                            <p className="text-lg"> Harga : {datas.price}</p>
                            <p className="text-lg">
                                Size Kostum : {datas.size}
                            </p>
                            <p className="text-lg">
                                Status Kostum : {datas.status}
                            </p>
                            <p className="text-lg">
                                Stok Kostum : {datas.stock}
                            </p>
                            <p className="text-lg">
                                Kategori Kostum : {datas.category.name}
                            </p>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <p className="text-xl font-semibold">
                                Kumpulan Image Kostum
                            </p>
                            <div className="p-3 text-gray-900 dark:text-gray-100 flex justify-around">
                                {datas.images_of_costum.map((image) => (
                                    <img
                                        key={image.id}
                                        src={image.images_link}
                                        alt={datas.name}
                                        className="object-cover"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
