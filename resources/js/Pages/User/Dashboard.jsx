import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ username, datas }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {datas.map((costume) => (
                        <a
                            key={costume.id}
                            href={route("user.detailCostume", {
                                id: costume.id,
                            })}
                            className="max-w-full mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer"
                        >
                            <img
                                src={
                                    costume.images_of_costum[0]?.images_link ||
                                    "https://via.placeholder.com/150"
                                }
                                alt={costume.name}
                                className="object-cover w-full h-[480px]"
                            />
                            <div className="p-4 flex-grow">
                                <h3 className="text-lg font-bold text-white truncate">
                                    {costume.name}
                                </h3>
                                <span
                                    className={`inline-block mt-2 px-3 py-1 text-xs font-bold text-white ${
                                        costume.status === "ready"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                    } rounded-full`}
                                >
                                    {costume.status === "ready"
                                        ? "Ready"
                                        : "Unavailable"}
                                </span>
                            </div>
                            <div className="p-4 border-t flex items-center justify-between gap-5">
                                <span className="text-lg font-bold text-white">
                                    Rp {costume.price.toLocaleString()}
                                </span>
                                <a
                                    href="#"
                                    className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
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
                                </a>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
