import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function Create() {
    const { flash = {}, errors: pageErrors = {} } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.category.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create Category
                </h2>
            }
        >
            <Head title="Create Category" />

            <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800">
                {/* Flash Message */}
                {flash.success && (
                    <div className="mb-4 text-green-600 dark:text-green-400">
                        {flash.success}
                    </div>
                )}
                {flash.error && (
                    <div className="mb-4 text-red-600 dark:text-red-400">
                        {flash.error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                                errors.name ? "border-red-500" : ""
                            }`}
                            required
                        />
                        {errors.name && (
                            <span className="text-sm text-red-600 dark:text-red-400">
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
