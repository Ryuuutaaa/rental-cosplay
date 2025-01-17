import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Dashboard({ username, cosrent }) {
    const handleExportPDF = (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to export this data?")) {
            router.get(route("cosrent.export-pdf", cosrent.id));
        }
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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <button
                        onClick={(e) => {
                            handleExportPDF(e);
                        }}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
                    >
                        Export PDF
                    </button>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in! {username}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
