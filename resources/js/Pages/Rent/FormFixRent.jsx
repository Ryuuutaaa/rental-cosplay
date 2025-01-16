import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, usePage } from "@inertiajs/react";

export default function FormRent({ datas }) {
    const user_id = usePage().props.auth.user.id;
    const { data, setData, post, processing } = useForm({
        user_id: user_id,
        costum_id: datas.id,
        cosrent_id: datas.cosrent.id,
        tanggal_mulai_rental: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/rent/${datas.id}`);
    };
    console.log(datas);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Form Rent
                </h2>
            }
        >
            <Head title="Form Rent" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="min-h-screen bg-gray-900 text-gray-200 flex justify-center items-center">
                    <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-8">
                        <h1 className="text-2xl font-semibold text-center mb-6">
                            Sewa Kostum - {datas.name}
                        </h1>
                        <div className="mb-6">
                            <img
                                src={datas.images_of_costum[0]?.images_link}
                                alt={datas.name}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <p className="text-lg font-semibold">
                                Detail Kostum:
                            </p>
                            <ul className="list-disc ml-5 mt-2 space-y-1">
                                <li>Nama: {datas.name}</li>
                                <li>Kategori: {datas.category?.name}</li>
                                <li>Cosrent: {datas.cosrent?.name}</li>
                            </ul>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="tanggal_mulai_rental"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Tanggal Mulai Rental
                                </label>
                                <input
                                    type="date"
                                    id="tanggal_mulai_rental"
                                    value={data.tanggal_mulai_rental}
                                    onChange={(e) =>
                                        setData(
                                            "tanggal_mulai_rental",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg px-3 py-2 focus:ring focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing
                                    ? "Mengirim..."
                                    : "Lanjutkan ke Pembayaran"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
