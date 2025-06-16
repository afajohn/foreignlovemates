"use client"
import { useHomePageData } from '@/hooks/useHomePageData';
import { useState } from 'react';
import Swal from 'sweetalert2';

function TestimonialEditor() {
    const {
        testimonial,
        setTestimonial,
        saveAllData
    } = useHomePageData();


    const handleTestimonialNameChange = (
        testimonialIndex: number,
        value: string,
    ) => {
        try {
            setTestimonial((prevTestimonial) =>
                prevTestimonial.map((testimonialItem, index) =>
                    index === testimonialIndex
                        ? { ...testimonialItem, clientName: value }
                        : testimonialItem,
                ),
            );
        } catch (error) {
            console.error("Error Client Name Change:", error);
        }
    };


    const handleTestimonialCommentChange = (
        testimonialIndex: number,
        value: string,
    ) => {
        try {
            setTestimonial((prevTestimonial) =>
                prevTestimonial.map((testimonialItem, index) =>
                    index === testimonialIndex
                        ? { ...testimonialItem, clientComment: value }
                        : testimonialItem,
                ),
            );
        } catch (error) {
            console.error("Error Testimonial Change:", error);
        }
    };

    const [newTestimonial, setNewTestimonial] = useState({
        clientName: "",
        clientComment: "",
    });
    const handleAddTestimonial = () => {
        try {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Client Testimonial Added!",
                showConfirmButton: false,
                timer: 1500
            });
            const newTestimonialItem = {
                id: `${Date.now()}`,
                clientName: newTestimonial.clientName,
                clientComment: newTestimonial.clientComment,
            };

            setTestimonial((prevTestimonial) => [...prevTestimonial, newTestimonialItem]);

            setNewTestimonial({
                clientName: "",
                clientComment: "",
            });
        } catch (error) {
            console.error("Error Adding Testimonial:", error);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setNewTestimonial((prev) => ({
                ...prev,
                clientName: e.target.value,
            }));
        } catch (error) {
            console.error("Error Name Change:", error);
        }
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            setNewTestimonial((prev) => ({
                ...prev,
                clientComment: e.target.value,
            }));
        } catch (error) {
            console.error("Error Comment Change:", error);
        }
    };

    const handleDeleteTestimonial = (testimonialId: string) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    setTestimonial((prevTestimonial) =>
                        prevTestimonial.filter((testimonialItem) => testimonialItem.id !== testimonialId)
                    );
                }
            })
        } catch (error) {
            console.error("Error Deleting Testimonial:", error);
        }
    };

    return (
        <>
            <div className="mt-2 px-2 border rounded-xl text-sm bg-red-50 max-h-[46rem] overflow-auto">
                <h2 className="font-bold text-xl md:text-3xl my-2 inline-flex gap-5"><span className="underline">Edit ➡ Testimonial Section</span></h2>
                <div className="py-3 flex flex-col md:flex-row items-center justify-center gap-5 overflow-auto">
                    {/* Add */}
                    <div className="flex flex-col items-center p-2 border border-red-500 rounded-xl">
                        <h2 className="font-bold">Add New Testimonial</h2>
                        <div className="grid gap-4 py-4">
                            <p className="font-bold">Name:</p>
                            <input
                                type="text"
                                value={newTestimonial.clientName}
                                placeholder="Client Name"
                                onChange={handleNameChange}
                                className="rounded border p-2"
                            />
                            <p className="font-bold">Client Comment:</p>
                            <textarea
                                cols={25}
                                rows={3}
                                placeholder="Client's Testimonial here..."
                                value={newTestimonial.clientComment}
                                onChange={handleCommentChange}
                                className="rounded border p-2"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddTestimonial}
                            className="px-3 py-2 rounded border border-black bg-green-600 hover:bg-green-400 text-white"
                        >
                            Add
                        </button>
                    </div>
                    {testimonial.length > 0 ? (
                        <div className="flex flex-col md:flex-row gap-5 items-start justify-start overflow-auto">
                            {testimonial.map((testimonialItem, testimonialIndex) => (
                                <div key={testimonialItem.id}>
                                    <div className="flex flex-col items-center gap-2 border border-red-500 p-2 rounded-xl">
                                        <p className="font-bold">TESTIMONIAL {testimonialItem.id}</p>

                                        <p className="font-bold">Client Name:</p>
                                        <input
                                            type="text"
                                            value={testimonialItem.clientName}
                                            onChange={(e) =>
                                                handleTestimonialNameChange(
                                                    testimonialIndex,
                                                    e.target.value,
                                                )
                                            }
                                            className="border p-2 rounded italic"
                                        />
                                        <p className="font-bold">Client Testimonial:</p>
                                        <textarea
                                            cols={20}
                                            rows={5}
                                            value={testimonialItem.clientComment}
                                            onChange={(e) =>
                                                handleTestimonialCommentChange(
                                                    testimonialIndex,
                                                    e.target.value,
                                                )
                                            }
                                            className="border p-2 rounded italic"
                                        />
                                        {/* Delete */}
                                        <button
                                            type="button"
                                            className="border border-black py-2 px-3 bg-red-700 hover:bg-red-500 text-white rounded"
                                            onClick={() => handleDeleteTestimonial(testimonialItem.id)} // Pass the testimonial ID
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-row justify-center'>
                            <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">Edit Testimonials Section</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400 opacity-20">Don't forget to click Save Changes button after Altering content!</p>
                                <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                    <span className="sr-only">Loading Testimonials...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* Save Button */}
                <div className="pt-2 text-center">
                    <button
                        type="button"
                        onClick={saveAllData}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-green-300 to-yellow-200 group-hover:from-red-200 group-hover:via-green-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-green-400">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black/75 text-white hover:text-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Save Changes
                        </span>
                    </button>
                </div>

            </div>
        </>
    )
}

export default TestimonialEditor;
