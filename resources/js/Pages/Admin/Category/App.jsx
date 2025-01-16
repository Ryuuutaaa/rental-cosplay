import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";

export default function Category({ datas = [] }) {
    const { flash = {}, errors: pageErrors = {} } = usePage().props;

    const handleSubmit = (e, id) => {
        e.preventDefault();
        router.delete(route("admin.category.destroy", id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Category
                </h2>
            }
        >
            <Head title="Category" />

            <div className="m-10">
                {/* Tombol Create */}
                <NavLink href={route("admin.category.create")}>
                    <button
                        type="button"
                        className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                        Create Category
                    </button>
                </NavLink>

                {/* Flash Message */}
                {flash?.success && (
                    <div className="mb-4 text-green-600 dark:text-green-400">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 text-red-600 dark:text-red-400">
                        {flash.error}
                    </div>
                )}

                {/* Tabel */}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Category Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4">
                                        No data found.
                                    </td>
                                </tr>
                            )}
                            {datas.map((data) => (
                                <tr
                                    key={data.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <td className="px-6 py-4">{data.name}</td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        {/* Tombol Edit */}
                                        <Link
                                            type="button"
                                            className="text-blue-600 hover:text-blue-800 flex gap-2"
                                            title="Edit"
                                            href={route(
                                                "admin.category.edit",
                                                data.id
                                            )}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 3.487c.39-.39.902-.586 1.414-.586h.086c.51 0 1.025.195 1.414.586.78.779.78 2.047 0 2.828L7.75 18.414 3 19.75l1.336-4.75L16.862 3.487z"
                                                />
                                            </svg>
                                            edit
                                        </Link>

                                        {/* Tombol Delete */}
                                        <form
                                            onSubmit={(e) =>
                                                handleSubmit(e, data.id)
                                            }
                                            className="text-red-600 hover:text-red-800 flex gap-2"
                                            title="Delete"
                                        >
                                            <button
                                                type="submit"
                                                onClick={(e) => {
                                                    const confirmDelete =
                                                        window.confirm(
                                                            "Are you sure you want to delete this data?"
                                                        );
                                                    if (confirmDelete) {
                                                        e.currentTarget.form.dispatchEvent(
                                                            new Event(
                                                                "submit",
                                                                {
                                                                    bubbles: true,
                                                                    cancelable: true,
                                                                }
                                                            )
                                                        );
                                                    } else {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
