import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export default function Dashboard({ username, datas }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { flash = {}, errors: pageErrors = {} } = usePage().props;
    const [showFlash, setShowFlash] = useState(false);
    const [selectedCostume, setSelectedCostume] = useState(null);

    const openDetailModal = (costume) => {
        setSelectedCostume(costume);
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (flash.success || flash.error) {
            setShowFlash(true);
            const timeout = setTimeout(() => {
                setShowFlash(false);
            }, 7000);
            return () => clearTimeout(timeout); // Cleanup timeout
        }
    }, [flash]);

    const handleRent = (id) => {
        // router.post(route("user.rent", id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-6">
                {showFlash && (
                    <>
                        {flash.success && (
                            <div
                                className="flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                                role="alert"
                            >
                                <svg
                                    className="flex-shrink-0 inline w-4 h-4 me-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">
                                        Success!
                                    </span>{" "}
                                    {flash.success}
                                </div>
                            </div>
                        )}
                        {flash.error && (
                            <div
                                className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                role="alert"
                            >
                                <svg
                                    className="flex-shrink-0 inline w-4 h-4 me-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">Error!</span>{" "}
                                    {flash.error}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {datas.map((costume) => (
                        <div
                            key={costume.id}
                            // href={route("user.detailCostume", {
                            //     id: costume.id,
                            // })}
                            onClick={() => openDetailModal(costume)}
                            className="max-w-full mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer"
                        >
                            <img
                                src={
                                    costume.images_of_costum[0]?.images_link ||
                                    "https://via.placeholder.com/150"
                                }
                                alt={costume.name}
                                className="object-cover max-w-full max-h-72"
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
                                <button
                                    type="button"
                                    onClick={() => handleRent(costume.id)}
                                    className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                        />
                                    </svg>
                                    Rent Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* modal detail */}
            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                maxWidth="5xl"
            >
                {selectedCostume && (
                    <div className="">
                        <div className="mx-auto rounded-xl shadow-2xl overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="p-4 bg-slate-700 flex flex-col items-center">
                                    <div className="relative mb-4 w-full max-w-lg h-[550px]">
                                        <img
                                            id="main-image"
                                            src={
                                                selectedCostume
                                                    .images_of_costum[0]
                                                    ?.images_link ||
                                                "https://via.placeholder.com/150"
                                            }
                                            alt={selectedCostume.name}
                                            className="w-full max-h-[550px] object-cover rounded-lg shadow-lg"
                                        />
                                    </div>

                                    {selectedCostume.images_of_costum.length >
                                    5 ? (
                                        <Swiper
                                            slidesPerView={5}
                                            spaceBetween={8}
                                            breakpoints={{
                                                640: { slidesPerView: 3 },
                                                768: { slidesPerView: 4 },
                                                1024: { slidesPerView: 5 },
                                            }}
                                            className="mySwiper w-full max-w-lg"
                                        >
                                            {selectedCostume.images_of_costum.map(
                                                (image, index) => (
                                                    <SwiperSlide key={index}>
                                                        <button
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
                                                                src={
                                                                    image.images_link
                                                                }
                                                                alt={`Thumbnail ${
                                                                    index + 1
                                                                }`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </button>
                                                    </SwiperSlide>
                                                )
                                            )}
                                        </Swiper>
                                    ) : (
                                        <div className="flex justify-center mt-4 space-x-3">
                                            {selectedCostume.images_of_costum.map(
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
                                                            src={
                                                                image.images_link
                                                            }
                                                            alt={`Thumbnail ${
                                                                index + 1
                                                            }`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Bagian Detail */}
                                <div className="bg-gray-800 text-white flex flex-col justify-between">
                                    <div>
                                        <h1 className="text-lg font-bold mb-2 flex items-center gap-2 bg-blue-400 h-16 p-5">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                                            </svg>
                                            {
                                                selectedCostume.cosrent
                                                    .cosrent_name
                                            }
                                        </h1>
                                        <div className="p-5">
                                            <h2 className="text-3xl font-bold mb-4">
                                                {selectedCostume.name}
                                            </h2>
                                            <p className="mb-6 leading-relaxed">
                                                {selectedCostume.description}
                                            </p>
                                            <div className="text-lg font-bold mb-4">
                                                Harga:{" "}
                                                <span className="text-blue-500">
                                                    Rp{" "}
                                                    {selectedCostume.price.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>

                                        <ul className="space-y-2 p-5">
                                            <li>
                                                <strong>Category:</strong>{" "}
                                                {selectedCostume.category.name}
                                            </li>
                                            <li>
                                                <strong>Size:</strong>{" "}
                                                {selectedCostume.size}
                                            </li>
                                            <li>
                                                <strong>Brand:</strong>{" "}
                                                {selectedCostume.brand}
                                            </li>
                                            <li>
                                                <strong>Status:</strong>{" "}
                                                <span
                                                    className={`font-bold ${
                                                        selectedCostume.status ===
                                                        "ready"
                                                            ? "text-green-500"
                                                            : "text-red-500"
                                                    }`}
                                                >
                                                    {selectedCostume.status ===
                                                    "ready"
                                                        ? "Ready"
                                                        : "Unavailable"}
                                                </span>
                                            </li>
                                            <li>
                                                <strong>Stock:</strong>{" "}
                                                {selectedCostume.stock} pcs
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="p-5">
                                        <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-medium py-3 px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105 flex items-center gap-2 justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                                />
                                            </svg>
                                            Rent Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
