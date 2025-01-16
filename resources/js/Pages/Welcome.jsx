import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Welcome({ auth, datas }) {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(datas);
    const [selectedCostume, setSelectedCostume] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openDetailModal = (costume) => {
        setSelectedCostume(costume);
        setIsModalOpen(true);
    };

    const handleRent = (id) => {
        router.get(route("rental.form", id));
    };

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredData(datas);
            return;
        }

        fetch(route("search") + `?search=${encodeURIComponent(search)}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setFilteredData(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error.message);
            });
    }, [search]);

    return (
        <>
            <Head title="Rental Kostum Cosplay" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-3 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <ApplicationLogo className="w-40" />
                            </div>
                            <nav className="flex lg:col-start-3 lg:justify-center">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="flex lg:col-start-1 lg:justify-center max-w-80 mb-10">
                                <div className="relative w-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                        />
                                    </svg>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded-lg px-10 py-2 w-full text-black dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Search Costume..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {filteredData.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                                    {filteredData.map((costume) => (
                                        <div
                                            key={costume.id}
                                            onClick={() =>
                                                openDetailModal(costume)
                                            }
                                            className="max-w-full mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer"
                                        >
                                            <img
                                                src={
                                                    costume.images_of_costum[0]
                                                        ?.images_link ||
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
                                                        costume.status ===
                                                        "ready"
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
                                                    Rp{" "}
                                                    {costume.price.toLocaleString()}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRent(costume.id)
                                                    }
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
                            ) : (
                                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-16 h-16 mb-4 text-gray-400"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                        />
                                    </svg>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-600 dark:text-gray-300">
                                        Hasil pencarian "{search}" tidak
                                        ditemukan
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Silakan coba dengan kata kunci lain
                                    </p>
                                </div>
                            )}
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            {/* Laravel v{laravelVersion} (PHP v{phpVersion}) */}
                        </footer>

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
                                                        alt={
                                                            selectedCostume.name
                                                        }
                                                        className="w-full max-h-[550px] object-cover rounded-lg shadow-lg"
                                                    />
                                                </div>

                                                {selectedCostume
                                                    .images_of_costum.length >
                                                5 ? (
                                                    <Swiper
                                                        slidesPerView={5}
                                                        spaceBetween={8}
                                                        breakpoints={{
                                                            640: {
                                                                slidesPerView: 3,
                                                            },
                                                            768: {
                                                                slidesPerView: 4,
                                                            },
                                                            1024: {
                                                                slidesPerView: 5,
                                                            },
                                                        }}
                                                        className="mySwiper w-full max-w-lg"
                                                    >
                                                        {selectedCostume.images_of_costum.map(
                                                            (image, index) => (
                                                                <SwiperSlide
                                                                    key={index}
                                                                >
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
                                                                                index +
                                                                                1
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
                                                                            index +
                                                                            1
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
                                                            selectedCostume
                                                                .cosrent
                                                                .cosrent_name
                                                        }
                                                    </h1>
                                                    <div className="p-5">
                                                        <h2 className="text-3xl font-bold mb-4">
                                                            {
                                                                selectedCostume.name
                                                            }
                                                        </h2>
                                                        <p className="mb-6 leading-relaxed">
                                                            {
                                                                selectedCostume.description
                                                            }
                                                        </p>
                                                        <div className="text-lg font-bold mb-4">
                                                            Harga:{" "}
                                                            <span className="text-blue-500">
                                                                Rp{" "}
                                                                {selectedCostume.price.toLocaleString(
                                                                    "id-ID",
                                                                    {
                                                                        minimumFractionDigits: 0,
                                                                        maximumFractionDigits: 0,
                                                                        useGrouping: true,
                                                                    }
                                                                )}{" "}
                                                                <span className="dark:text-gray-200">
                                                                    / 3 Hari
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <ul className="space-y-2 p-5">
                                                        <li>
                                                            <strong>
                                                                Category:
                                                            </strong>{" "}
                                                            {
                                                                selectedCostume
                                                                    .category
                                                                    .name
                                                            }
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Size:
                                                            </strong>{" "}
                                                            {
                                                                selectedCostume.size
                                                            }
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Brand:
                                                            </strong>{" "}
                                                            {
                                                                selectedCostume.brand
                                                            }
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Status:
                                                            </strong>{" "}
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
                                                            <strong>
                                                                Stock:
                                                            </strong>{" "}
                                                            {
                                                                selectedCostume.stock
                                                            }{" "}
                                                            pcs
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="p-5">
                                                    <button
                                                        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-medium py-3 px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105 flex items-center gap-2 justify-center"
                                                        onClick={() =>
                                                            handleRent(
                                                                selectedCostume.id
                                                            )
                                                        }
                                                    >
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
                    </div>
                </div>
            </div>
        </>
    );
}
