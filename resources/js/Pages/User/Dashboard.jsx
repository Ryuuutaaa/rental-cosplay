import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ username }) {
    console.log({ username });
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    <div className="max-w-xs mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer">
                        <img
                            src="https://i.pinimg.com/474x/e7/23/5b/e7235b5f932a5e30be40ab955cd58909.jpg"
                            alt="Card Image"
                            className="object-cover"
                        />
                        <div className="p-4 flex-grow">
                            <h3 className="text-lg font-bold text-white truncate">
                                Nama Produk yang Sangat Panjang Sekali untuk
                                Melihat Efeknya
                            </h3>
                            <span className="inline-block mt-2 px-3 py-1 text-xs font-bold text-white bg-green-500 rounded-full">
                                Ready
                            </span>
                        </div>
                        <div className="p-4 border-t flex items-center justify-between">
                            <span className="text-lg font-bold text-white">
                                Rp 150.000
                            </span>
                            <a
                                href="#"
                                className=" flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                    />
                                </svg>
                                Rent Now
                            </a>
                        </div>
                    </div>

                    <div className="max-w-xs mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer">
                        <img
                            src="https://i.pinimg.com/474x/e7/23/5b/e7235b5f932a5e30be40ab955cd58909.jpg"
                            alt="Card Image"
                            className="object-cover"
                        />
                        <div className="p-4 flex-grow">
                            <h3 className="text-lg font-bold text-white truncate">
                                Nama Produk yang Sangat Panjang Sekali untuk
                                Melihat Efeknya
                            </h3>
                            <span className="inline-block mt-2 px-3 py-1 text-xs font-bold text-white bg-green-500 rounded-full">
                                Ready
                            </span>
                        </div>
                        <div className="p-4 border-t flex items-center justify-between">
                            <span className="text-lg font-bold text-white">
                                Rp 150.000
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
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                    />
                                </svg>
                                Rent Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
