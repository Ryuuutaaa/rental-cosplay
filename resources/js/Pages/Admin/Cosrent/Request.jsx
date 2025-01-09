import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, useForm } from "@inertiajs/react";

export default function Cosrent({ datas = [] }) {
    const { flash = {} } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        reason_to_be_cosrent: "",
        status: "",
        user_id: "",
    });

    const handleSubmit = (e, id, status) => {
        e.preventDefault();
        setData("user_id", id);
        setData("status", status);
        put(route("admin.user.handlerequest", id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    See Request Cosrent
                </h2>
            }
        >
            <Head title="See Request Cosrent" />

            <div className="m-10">
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

                {/* Table */}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Reason
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((data) => (
                                <tr
                                    key={data.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    {console.log(data)}
                                    {console.log(usePage().props)}
                                    <td className="px-6 py-4">
                                        {data.user.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.reason_to_be_cosrent}
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        {/* Reject Button */}
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={(e) => {
                                                if (
                                                    window.confirm(
                                                        "Are you sure you want to Reject this request?"
                                                    )
                                                ) {
                                                    handleSubmit(
                                                        e,
                                                        data.id,
                                                        "rejected"
                                                    );
                                                }
                                            }}
                                        >
                                            Reject
                                        </button>

                                        {/* Approve Button */}
                                        <button
                                            className="text-green-600 hover:text-green-800"
                                            onClick={(e) => {
                                                if (
                                                    window.confirm(
                                                        "Are you sure you want to Approve this request?"
                                                    )
                                                ) {
                                                    handleSubmit(
                                                        e,
                                                        data.id,
                                                        "approved"
                                                    );
                                                }
                                            }}
                                        >
                                            Approve
                                        </button>
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
