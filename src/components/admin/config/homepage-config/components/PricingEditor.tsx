"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { type PricingDetail, useHomePageData } from '@/hooks/useHomePageData';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import Swal from 'sweetalert2';

function PricingEditor() {
    const {
        pricing,
        setPricing,
        savePricingData
    } = useHomePageData();

    const handlePriceChange = (id: string, value: string) => {
        try {
            setPricing((prevPricing) =>
                prevPricing.map((item) =>
                    item.price_id === id
                        ? { ...item, price: value, price_details: item.price_details } // Preserve price_details
                        : item
                )
            );
        } catch (error) {
            console.error("Error updating price:", error);
        }
    };

    const handleTitleChange = (id: string, value: string) => {
        try {
            setPricing((prevPricing) =>
                prevPricing.map((item) =>
                    item.price_id === id ? { ...item, tittle: value, price_details: item.price_details } : item,
                ),
            );
        } catch (error) {
            console.error("Error updating Title:", error);
        };
    };

    const handleButtonTextChange = (id: string, value: string) => {
        try {
            setPricing((prevPricing) =>
                prevPricing.map((item) =>
                    item.price_id === id ? { ...item, button_text: value, price_details: item.price_details } : item,
                ),
            );
        } catch (error) {
            console.error("Error updating Text:", error);
        };
    };

    const handleButtonUrlChange = (id: string, value: string) => {
        try {
            setPricing((prevPricing) =>
                prevPricing.map((item) =>
                    item.price_id === id ? { ...item, btn_url: value, price_details: item.price_details } : item,
                ),
            );
        } catch (error) {
            console.error("Error updating Button Text:", error);
        }
    };

    const handleViewMoreUrlChange = (id: string, value: string) => {
        try {
            setPricing((prevPricing) =>
                prevPricing.map((item) =>
                    item.price_id === id ? { ...item, view_more_url: value, price_details: item.price_details } : item,
                ),
            );
        } catch (error) {
            console.error("Error updating URL:", error);
        }
    };

    const handleDetailsParagraphChange = (itemId: string, detailId: string, value: string) => {
        try {
            setPricing((prevPricing) =>
                prevPricing.map((item) =>
                    item.price_id === itemId
                        ? {
                            ...item,
                            price_details: item.price_details?.map((detail) =>
                                detail.details_id === detailId
                                    ? { ...detail, paragraph: value }
                                    : detail
                            ),
                        }
                        : item
                )
            );
        } catch (error) {
            console.error("Error updating Details Paragraph:", error);
        }
    };
    

    const [newDetailInput, setNewDetailInput] = useState("");

    const handleAddDetail = (pricingId: string) => {
        try {
            if (newDetailInput.trim() !== "") {
                const newDetail: PricingDetail = {
                    details_id: `${Date.now()}`,
                    paragraph: newDetailInput.trim(),
                };
    
                setPricing((prevPricing) => {
                    return prevPricing.map((item) =>
                        item.price_id === pricingId
                            ? { 
                                ...item,
                                price_details: [...(item.price_details || []), newDetail]
                            }
                            : item
                    );
                });
    
                setNewDetailInput("");
    
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Pricing Detail Added!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Error Adding Detail:", error);
        }
    };
    
    

    const handleDeleteDetail = (pricingId: string, detailId: string) => {
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
                    setPricing((prevPricing) =>
                        prevPricing.map((item) =>
                            item.price_id === pricingId
                                ? {
                                    ...item,
                                    price_details: item.price_details?.filter(
                                        (detail) => detail.details_id !== detailId
                                    ),
                                }
                                : item
                        )
                    );

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Pricing Detail Deleted!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
        } catch (error) {
            console.error("Error Deleting Detail:", error);
        }
    };

    return (
        <>
            < div className="mt-3 p-2 border rounded-xl text-sm bg-red-50 max-h-[46rem] overflow-auto">
                <h2 className="font-bold text-xl md:text-3xl mb-2 inline-flex gap-5"><span className="underline">Edit ➡ Pricing Section</span></h2>
                {
                    pricing.length > 0 ? (
                        <div className="flex flex-col md:flex-row gap-2 overflow-x-auto justify-center">
                            {pricing.map((item) => (
                                <div key={item.price_id} className="py-2">
                                    <Accordion type="single" collapsible>
                                        <div className="p-2 border border-red-500 rounded-xl md:w-[20rem]">
                                            <div className="text-center">
                                                <p className="text-sm font-bold ">
                                                    Pricing Card - {item.price_id}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="font-bold" htmlFor="title">
                                                    Title:
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.tittle}
                                                    onChange={(e) => handleTitleChange(item.price_id, e.target.value)}
                                                    className="border p-2 rounded italic"
                                                />


                                                <label className="font-bold" htmlFor="price">
                                                    Price:
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.price}
                                                    onChange={(e) => handlePriceChange(item.price_id, e.target.value)}
                                                    className="border p-2 rounded italic"
                                                />


                                                <label className="font-bold" htmlFor="btn-text">
                                                    Btn-Text:
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.button_text}
                                                    onChange={(e) => handleButtonTextChange(item.price_id, e.target.value)}
                                                    className="border p-2 rounded italic"
                                                />


                                                <label className="font-bold" htmlFor="btn-text">
                                                    Btn-Url:
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.btn_url}
                                                    onChange={(e) => handleButtonUrlChange(item.price_id, e.target.value)}
                                                    className="border p-2 rounded italic"
                                                />


                                                <label className="font-bold" htmlFor="btn-text">
                                                    View more URL:
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.view_more_url}
                                                    onChange={(e) => handleViewMoreUrlChange(item.price_id, e.target.value)}
                                                    className="border p-2 rounded italic"
                                                />
                                            </div>
                                            <AccordionItem value="details">
                                                <AccordionTrigger className="justify-center">
                                                    Edit details here
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div>
                                                        <ul className="flex flex-col gap-3 items-center text-start justify-start bg-white border border-gray-300 p-3 rounded-xl">
                                                            {item.price_details?.map((detail) => (
                                                                <li key={detail.details_id} className="flex flex-col gap-1">
                                                                    <textarea
                                                                        cols={30}
                                                                        rows={3}
                                                                        value={detail.paragraph}
                                                                        onChange={(e) =>
                                                                            handleDetailsParagraphChange(item.price_id, detail.details_id, e.target.value)
                                                                        }
                                                                        className="bg-transparent border p-2 italic"
                                                                    />
                                                                    {/* Delete */}
                                                                    <button
                                                                        type="button"
                                                                        className="border border-black py-2 px-3 bg-red-700 hover:bg-red-500 text-white rounded"
                                                                        onClick={() => handleDeleteDetail(item.price_id, detail.details_id)}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>

                                                        {/* Add New Detail Section */}
                                                        <div className="flex flex-col gap-1 justify-start py-2">
                                                            <input
                                                                type="text"
                                                                value={newDetailInput}
                                                                onChange={(e) => setNewDetailInput(e.target.value)}
                                                                placeholder="Add new detail"
                                                                className="border p-2 rounded"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleAddDetail(item.price_id)}
                                                                className="ml-2 border border-black bg-green-600 hover:bg-green-400 text-white p-2 rounded"
                                                            >
                                                                Add Detail
                                                            </button>

                                                        </div>

                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                            {/* Save Button */}
                                            < div className="pt-2 text-center" >
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        savePricingData(item.price_id);
                                                    }}

                                                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-green-300 to-yellow-200 group-hover:from-red-200 group-hover:via-green-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-green-400"
                                                >
                                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black/75 text-white hover:text-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                                        Save Changes
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-row justify-center mx-auto'>
                            <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">Edit Pricing Section</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400 opacity-20">Don't forget to click Save Changes button after Altering content!</p>
                                <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                    <span className="sr-only">Loading Pricing Details...</span>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default PricingEditor;
