import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";

export default function Edit({ datas, categories, sizes, cosrent }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImages, setPreviewImages] = useState([]);

    console.log(datas);
    console.log(categories);
    console.log(sizes);
    console.log(cosrent);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: datas.name,
        description: datas.description,
        price: datas.price,
        category_id: datas.category_id,
        size: datas.size,
        brand: datas.brand,
        new_images: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cosrent.costum.update", datas.id), {
            preserveScroll: true,
        });
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const handleDeleteImage = async (imageId) => {
        try {
            const response = await fetch(
                `/api/costume/delete-image/${imageId}`,
                {
                    method: "DELETE",
                    headers: {
                        "X-CSRF-TOKEN": document.querySelector(
                            'meta[name="csrf-token"]'
                        ).content,
                    },
                }
            );

            if (response.ok) {
                setIsModalOpen(false);
                // Refresh page or update state
                window.location.reload();
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        handleNewImages(files);
    };

    const handleNewImages = (files) => {
        setData("new_images", [...data.new_images, ...files]);

        // Create preview URLs
        const newPreviews = files.map((file) => ({
            preview: URL.createObjectURL(file),
        }));
        setPreviewImages([...previewImages, ...newPreviews]);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Costume" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Costume Details Card */}
                    <div className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg p-10 mb-8">
                        <h2 className="text-3xl font-semibold mb-8 text-gray-200">
                            Edit Costume Details
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Form fields similar to your create form */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-200">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200"
                                    />
                                </div>

                                {/* Add other fields similar to create form */}
                                {/* ... */}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600"
                            >
                                Update Details
                            </button>
                        </form>
                    </div>

                    {/* Images Card */}
                    <div className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg p-10">
                        <h2 className="text-3xl font-semibold mb-8 text-gray-200">
                            Manage Images
                        </h2>

                        {/* Existing Images */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                            {datas.images_of_costum.map((image) => (
                                <div
                                    key={image.id}
                                    className="relative group cursor-pointer"
                                    onClick={() => handleImageClick(image)}
                                >
                                    <img
                                        src={image.images_link}
                                        alt={datas.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                        <span className="text-white">
                                            Click to manage
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Upload New Images */}
                        <div
                            className="mt-4 border-2 border-dashed border-gray-600 rounded-lg p-6"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                multiple
                                onChange={(e) =>
                                    handleNewImages(Array.from(e.target.files))
                                }
                                className="hidden"
                                id="new-images"
                            />
                            <label
                                htmlFor="new-images"
                                className="cursor-pointer block text-center text-gray-400"
                            >
                                <span className="text-blue-500">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </label>
                        </div>

                        {/* Preview New Images */}
                        {previewImages.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                                {previewImages.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image.preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Management Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6">
                    {selectedImage && (
                        <>
                            <img
                                src={selectedImage.images_link}
                                alt="Selected costume"
                                className="w-full h-auto max-h-96 object-contain mb-4"
                            />
                            <button
                                onClick={() =>
                                    handleDeleteImage(selectedImage.id)
                                }
                                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                            >
                                Delete Image
                            </button>
                        </>
                    )}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
