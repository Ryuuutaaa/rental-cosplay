import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function App({ datas }) {
    console.log(datas);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Costumes Create
                </h2>
            }
        >
            <Head title="Costum Create" />
        </AuthenticatedLayout>
    );
}
