import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function History({ datas }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    History
                </h2>
            }
        >
            <Head title="History" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {datas.map((data) => (
                        <Link
                            key={data.id}
                            href={route("user.history.detail", data.id)}
                            className="group"
                        >
                            <div
                                className={`overflow-hidden shadow-sm sm:rounded-lg mb-5 ${
                                    data.status === "pending"
                                        ? "bg-yellow-400 dark:bg-yellow-600"
                                        : data.status === "confirmed"
                                        ? "bg-sky-400 dark:bg-sky-600"
                                        : data.status === "rejected"
                                        ? "bg-red-400 dark:bg-red-700"
                                        : "bg-green-400 dark:bg-green-800"
                                } transition duration-300`}
                            >
                                <div className="p-6 text-gray-900 dark:text-gray-100 text-left flex justify-between items-center relative">
                                    <div>
                                        <h2 className="text-xl font-semibold">
                                            {data.cosrent_name}
                                        </h2>
                                        <p className="mt-2">
                                            {data.costume_name}
                                        </p>
                                    </div>
                                    <p className="text-right font-extrabold">
                                        {data.status.toUpperCase()}
                                    </p>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 text-white text-center">
                                        <span className="text-lg hidden group-hover:block">
                                            Click for details
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {datas.length === 0 && (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                No Data!
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
