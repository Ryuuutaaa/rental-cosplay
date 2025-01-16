import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Detail({ datas }) {
    console.log(datas);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detail
                </h2>
            }
        >
            <Head title="Detail" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 text-left">
                            <h2 className="text-xl font-semibold">
                                {datas.cosrent_name}
                            </h2>
                            <p className="mt-2">{datas.costume_name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
