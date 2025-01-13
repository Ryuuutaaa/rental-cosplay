import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function App({ categories, sizes }) {
    const [images, setImages] = useState([]);

    const category = categories.map((category) => category.name);
    const size = sizes.map((size) => size);
    const { flash = {}, errors: pageErrors = {} } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        price: "",
        category_id: "",
        size: "",
        brand: "",
        status: "",
        description: "",
        image: "",
    });

    const handleImageChange = (event) => {
        const files = Array.from(
            event.target.files || event.dataTransfer.files
        );
        const imagePreviews = files.map((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            return new Promise((resolve) => {
                reader.onload = (e) => resolve(e.target.result);
            });
        });

        Promise.all(imagePreviews).then((previews) =>
            setImages((prev) => [...prev, ...previews])
        );
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleImageChange(event);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cosrent.costum.store"){
            onSuccess: () => {
            reset(); // Reset form state
            setImages([]); // Clear uploaded images
        },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Costumes Create
                </h2>
            }
        >
            <Head title="Costume Create" />

            <div className="max-w-5xl mx-auto bg-gray-800 shadow-xl border border-gray-700 rounded-lg p-10 mt-8">
                <h2 className="text-3xl font-semibold mb-8 text-gray-200 text-center">
                    Create Costume
                </h2>

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

                <form
                    id="productForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                    className="space-y-8"
                >
                    {/* Grid Layout for Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-200"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-200"
                            >
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={data.category}
                                onChange={(e) =>
                                    setData("category", e.target.value)
                                }
                                required
                                className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
                            >
                                <option value="">
                                    Select Category Costume
                                </option>
                                {category.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Size */}
                        <div>
                            <label
                                htmlFor="size"
                                className="block text-sm font-medium text-gray-200"
                            >
                                Size
                            </label>
                            <select
                                id="size"
                                name="size"
                                value={data.size}
                                onChange={(e) =>
                                    setData("size", e.target.value)
                                }
                                required
                                className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
                            >
                                <option value="">Select Size Costume</option>
                                {size.map((size) => (
                                    <option key={size} value={size}>
                                        {size.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Price */}
                        <div>
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-200"
                            >
                                Price
                            </label>
                            <input
                                required
                                type="text"
                                id="price"
                                value={data.price}
                                onChange={(e) =>
                                    setData("price", e.target.value)
                                }
                                name="price"
                                className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    );
                                }}
                            />
                        </div>
                    </div>

                    {/* brand */}

                    <div>
                        <label
                            htmlFor="brand"
                            className="block text-sm font-medium text-gray-200"
                        >
                            Brand
                        </label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={data.brand}
                            onChange={(e) => setData("brand", e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-200"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            rows="4"
                            required
                            className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
                        ></textarea>
                    </div>

                    {/* Image Upload with Drag-and-Drop */}
                    <div>
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-200"
                        >
                            Upload Images
                        </label>
                        <div
                            id="dropzone"
                            className="mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg bg-gray-700 hover:bg-gray-600"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <p className="text-gray-400">
                                Drag and drop images here
                            </p>
                            <p className="text-gray-400">or</p>
                            <label
                                htmlFor="image"
                                className="cursor-pointer text-blue-400 underline hover:text-blue-300"
                            >
                                Browse files
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                multiple
                                accept="image/*"
                                className="hidden"
                                value={data.image}
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                            {images.map((src, index) => (
                                <div
                                    key={index}
                                    className="w-full h-full  rounded-lg shadow-md flex items-center justify-center overflow-hidden"
                                >
                                    <img
                                        src={src}
                                        alt={`preview-${index}`}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
