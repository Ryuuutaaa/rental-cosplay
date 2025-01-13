import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function App({ datas }) {
    console.log(datas);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Costumes
                </h2>
            }
        >
            <Head title="Costum" />

            <div className="py-12 flex flex-col gap-6 w-full">
                {datas.length === 0 && (
                    <div className="px-4 sm:px-6 lg:px-8 w-full">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                No Data
                            </div>
                        </div>
                    </div>
                )}

                {datas.map((data) => (
                    <div key={data.id} className="sm:px-6 lg:px-8 w-full px-4">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 flex items-center">
                            {/* gambar */}
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <img
                                    src={
                                        data.image ??
                                        "https://i.pinimg.com/736x/f2/11/ca/f211ca4c597d85a58673cf5e2fe88daf.jpg"
                                    }
                                    alt="images"
                                    width={60}
                                />
                            </div>

                            {/* nama dan deskripsi */}
                            <div className="p-6 text-gray-900 dark:text-gray-100 pt-0">
                                <h1 className="text-2xl font-bold mt-0">
                                    {data.name}
                                </h1>
                                <p className="text-sm">{data.description}</p>
                            </div>

                            {/* aksi */}
                            <div className="p-6 text-gray-900 dark:text-gray-100 ml-auto flex gap-3">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Detail
                                </button>
                                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                    Edit
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="sm:px-6 lg:px-8 w-full px-4">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 flex items-center">
                        {/* gambar */}
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <img
                                src="https://i.pinimg.com/736x/f2/11/ca/f211ca4c597d85a58673cf5e2fe88daf.jpg"
                                alt="test"
                                width={60}
                            />
                        </div>

                        {/* nama dan deskripsi */}
                        <div className="p-6 text-gray-900 dark:text-gray-100 pt-0">
                            <h1 className="text-2xl font-bold mt-0">
                                {"test"}
                            </h1>
                            <p className="text-sm">{"test"}</p>
                        </div>

                        {/* aksi */}
                        <div className="p-6 text-gray-900 dark:text-gray-100 ml-auto flex gap-3">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Detail
                            </button>
                            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                Edit
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
