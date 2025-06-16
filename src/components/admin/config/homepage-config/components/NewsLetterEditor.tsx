"use client"
import { useHomePageData } from '@/hooks/useHomePageData';
import Image from 'next/image';
import { useState } from 'react';
import Swal from 'sweetalert2';

function NewsLetterEditor() {
    const {
        newsLetter,
        setNewsLetter,
        saveAllData
    } = useHomePageData();


    const handleNewsH2Change = (newsLetterIndex: number, value: string) => {
        try {
            setNewsLetter((prevnewsLetter) =>
                prevnewsLetter.map((newsLetterItem, index) =>
                    index === newsLetterIndex
                        ? { ...newsLetterItem, newsH2: value }
                        : newsLetterItem
                )
            );
        } catch (error) {
            console.error("Error News H2 Change:", error);
        }
    };

    const handleNewsH3Change = (newsLetterIndex: number, value: string) => {
        try {
            setNewsLetter((prevnewsLetter) =>
                prevnewsLetter.map((newsLetterItem, index) =>
                    index === newsLetterIndex
                        ? { ...newsLetterItem, newsH3: value }
                        : newsLetterItem
                )
            );
        } catch (error) {
            console.error("Error News H3 Change:", error);
        }
    };

    const handleNewsBtnChange = (newsLetterIndex: number, value: string) => {
        try {
            setNewsLetter((prevnewsLetter) =>
                prevnewsLetter.map((newsLetterItem, index) =>
                    index === newsLetterIndex
                        ? { ...newsLetterItem, newsBtn: value }
                        : newsLetterItem
                )
            );
        } catch (error) {
            console.error("Error News Btn Change:", error);
        }
    };
    const handleNewsPChange = (newsLetterIndex: number, value: string) => {
        try {
            setNewsLetter((prevnewsLetter) =>
                prevnewsLetter.map((newsLetterItem, index) =>
                    index === newsLetterIndex
                        ? { ...newsLetterItem, newsP: value }
                        : newsLetterItem
                )
            );
        } catch (error) {
            console.error("Error News P change:", error);
        }
    };

    const handleMatchmakeEmailEdit = (newsLetterIndex: number, imageIndex: number, value: string) => {
        try {
            setNewsLetter((prevnewsLetter) =>
                prevnewsLetter.map((newsLetterItem, index) =>
                    index === newsLetterIndex
                        ? {
                            ...newsLetterItem,
                            matchMakeimages: newsLetterItem.matchMakeimages?.map((image, i) =>
                                i === imageIndex
                                    ? { ...image, email: value }
                                    : image
                            )
                        }
                        : newsLetterItem
                )
            );
        } catch (error) {
            console.error("Error Email change:", error);
        }
    };

    const handleMatchmakeNameEdit = (newsLetterIndex: number, imageIndex: number, value: string) => {
        try {
            setNewsLetter((prevnewsLetter) =>
                prevnewsLetter.map((newsLetterItem, index) =>
                    index === newsLetterIndex
                        ? {
                            ...newsLetterItem,
                            matchMakeimages: newsLetterItem.matchMakeimages?.map((image, i) =>
                                i === imageIndex
                                    ? { ...image, matchMakerName: value }
                                    : image
                            )
                        }
                        : newsLetterItem
                )
            );
        } catch (error) {
            console.error("Error Name change:", error);
        }
    };

    const handleMatchmakeLocationEdit = (newsLetterIndex: number, imageIndex: number, value: string) => {
        try {
            setNewsLetter((prevnewsLetter) =>
                prevnewsLetter.map((newsLetterItem, index) =>
                    index === newsLetterIndex
                        ? {
                            ...newsLetterItem,
                            matchMakeimages: newsLetterItem.matchMakeimages?.map((image, i) =>
                                i === imageIndex
                                    ? { ...image, matchMakerLocation: value }
                                    : image
                            )
                        }
                        : newsLetterItem
                )
            );
        } catch (error) {
            console.error("Error Location change:", error);
        }
    };

    const handleMatchmakeImageChange = (newsLetterIndex: number, imageIndex: number, value: string) => {
        try {
            setNewsLetter((prevnewsLetter) =>
                prevnewsLetter.map((newsLetterItem, index) =>
                    index === newsLetterIndex
                        ? {
                            ...newsLetterItem,
                            matchMakeimages: newsLetterItem.matchMakeimages?.map((image, i) =>
                                i === imageIndex
                                    ? { ...image, imgUrl: value }
                                    : image
                            )
                        }
                        : newsLetterItem
                )
            );
        } catch (error) {
            console.error("Error Img change:", error);
        }
    };

    const [newMatchmaker, setNewMatchmaker] = useState({
        imgUrl: "",
        email: "",
        imgUrlPreview: "/images/image-preview.png",
        matchMakerName: "",
        matchMakerLocation: ""
    });

    const handleAddMatchmaker = () => {
        try {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Matchmaker Added!",
                showConfirmButton: false,
                timer: 1500
            });
            const newMatchMakerItem = {
                id: `${Date.now()}`,
                imgUrl: newMatchmaker.imgUrl,
                email: newMatchmaker.email,
                imgUrlPreview: newMatchmaker.imgUrlPreview,
                matchMakerName: newMatchmaker.matchMakerName,
                matchMakerLocation: newMatchmaker.matchMakerLocation,
            };

            setNewsLetter((prevNewsLetter) => {
                const updatedNewsLetter = [...prevNewsLetter];

                if (updatedNewsLetter.length > 0) {
                    const exists = updatedNewsLetter[0].matchMakeimages?.some(
                        (item) => item.id === newMatchMakerItem.id
                    );

                    if (!exists) {
                        updatedNewsLetter[0].matchMakeimages = updatedNewsLetter[0].matchMakeimages
                            ? [...updatedNewsLetter[0].matchMakeimages, newMatchMakerItem]
                            : [newMatchMakerItem];
                    }
                }

                return updatedNewsLetter;
            });

            setNewMatchmaker({
                imgUrl: "",
                email: "",
                imgUrlPreview: "/images/image-preview.png",
                matchMakerName: "",
                matchMakerLocation: ""
            });
        } catch (error) {
            console.error("Error Adding Matchmaker:", error);
        }
    };


    const handleMatchmakeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setNewMatchmaker((prev) => ({
                ...prev,
                imgUrl: e.target.value,
            }));
        } catch (error) {
            console.error("Error Url change:", error);
        }
    };

    const handleMatchmakeEmailChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setNewMatchmaker((prev) => ({
                ...prev,
                email: e.target.value,
            }));
        } catch (error) {
            console.error("Error Email change:", error);
        }
    };

    const handleMatchmakeNameChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setNewMatchmaker((prev) => ({
                ...prev,
                matchMakerName: e.target.value,
            }));
        } catch (error) {
            console.error("Error Name change:", error);
        }
    };

    const handleMatchmakeLocationChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setNewMatchmaker((prev) => ({
                ...prev,
                matchMakerLocation: e.target.value,
            }));
        } catch (error) {
            console.error("Error Location change:", error);
        }
    };

    const handleDeleteMatchmaker = (newsLetterId: string, matchMakeId: string) => {
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
                    const updatedNewsLetter = newsLetter.map((item) => {
                        if (item.id === newsLetterId) {
                            return {
                                ...item,
                                matchMakeimages: item.matchMakeimages?.filter((matchmaker) => matchmaker.id !== matchMakeId),
                            };
                        }
                        return item;
                    });

                    setNewsLetter(updatedNewsLetter);
                }
            })
        } catch (error) {
            console.error("Error Deleting Matchmaker:", error);
        }
    };

    return (
        <>
            <div className="mt-3 p-2 border rounded-xl text-sm bg-yellow-50 max-h-[46rem] overflow-y-auto">
                <h2 className="font-bold text-xl md:text-3xl mb-2 inline-flex gap-5"><span className="underline">Edit ➡ News Letter Section</span></h2>
                <div className='flex flex-col md:flex-row gap-2'>
                    <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
                        {/* add */}
                        <div className="flex flex-col justify-center items-center p-2 border border-yellow-400 rounded-xl">
                            <h2 className="font-bold">Add New Matchmaker</h2>
                            <div className="flex flex-col gap-2 py-4">
                                <div className="flex flex-col gap-1">
                                    <p className="font-bold">Match Maker Email:</p>
                                    <input
                                        type="text"
                                        placeholder="Match Maker Email"
                                        value={newMatchmaker.email}
                                        onChange={handleMatchmakeEmailChanges}
                                        className="rounded border p-2"
                                    />
                                    <p className="font-bold">Match Maker Name:</p>
                                    <input
                                        type="text"
                                        placeholder="Match Maker Name"
                                        value={newMatchmaker.matchMakerName}
                                        onChange={handleMatchmakeNameChanges}
                                        className="rounded border p-2"
                                    />
                                    <p className="font-bold">Match Maker Location:</p>
                                    <input
                                        type="text"
                                        placeholder="Match Maker Location"
                                        value={newMatchmaker.matchMakerLocation}
                                        onChange={handleMatchmakeLocationChanges}
                                        className="rounded border p-2"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="font-bold">Match Maker Image URL:</p>
                                    <input
                                        type="text"
                                        value={newMatchmaker.imgUrl}
                                        placeholder="Match Maker Image Url"
                                        onChange={handleMatchmakeUrlChange}
                                        className="rounded border p-2"
                                    />

                                    <p className="font-bold">Image Preview:</p>
                                    <Image
                                        alt="match maker"
                                        src={newMatchmaker.imgUrl || newMatchmaker.imgUrlPreview}
                                        width={100}
                                        height={100}
                                        className="max-w-[5rem] mx-auto"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="border border-black py-2 px-3 bg-green-600 hover:bg-green-400 text-white rounded"
                                onClick={handleAddMatchmaker}
                            >
                                Add
                            </button>
                        </div>
                        {newsLetter.length > 0 ? (
                            newsLetter.map((newsLetterItem, index) => (
                                <div
                                    key={newsLetterItem.id || `${newsLetterItem.newsH2}-${index}`}
                                >
                                    <div className="flex flex-col gap-3 border border-yellow-400 p-2 rounded-xl">

                                        <p className="font-bold">H2 Value:</p>
                                        <input
                                            type="text"
                                            value={newsLetterItem.newsH2}
                                            onChange={(e) =>
                                                handleNewsH2Change(index, e.target.value)
                                            }
                                            className="p-2 rounded border italic"
                                        />
                                        <p className="font-bold">H3 Value:</p>
                                        <input
                                            type="text"
                                            value={newsLetterItem.newsH3}
                                            onChange={(e) =>
                                                handleNewsH3Change(index, e.target.value)
                                            }
                                            className="p-2 rounded border italic"
                                        />


                                        <p className="font-bold">Button text Value:</p>
                                        <input
                                            type="text"
                                            value={newsLetterItem.newsBtn}
                                            onChange={(e) =>
                                                handleNewsBtnChange(index, e.target.value)
                                            }
                                            className="p-2 rounded border italic"
                                        />
                                        <p className="font-bold">Description Value:</p>
                                        <textarea
                                            cols={28}
                                            rows={4}
                                            value={newsLetterItem.newsP}
                                            onChange={(e) =>
                                                handleNewsPChange(index, e.target.value)
                                            }
                                            className="p-2 rounded border italic"
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='flex flex-row justify-center mx-auto'>
                                <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">Edit NewsLetter Section (Details)</h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400 opacity-20">Don't forget to click Save Changes button after Altering content!</p>
                                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                        <span className="sr-only">Loading NewsLetter Details...</span>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>

                    {newsLetter.length > 0 ? (
                        newsLetter.map((newsLetterItem, index) => (
                            <div key={newsLetterItem.id || `newsLetter-${index}`} className="flex flex-col md:flex-row gap-3 overflow-x-auto">
                                {newsLetterItem.matchMakeimages?.map((image, imageIndex) => (
                                    <div key={image.id || `image-${imageIndex}`} className="flex flex-col items-center gap-3 p-2 border border-yellow-400 rounded-xl">

                                        <p className="font-bold">Matchmaker: {image.id}</p>
                                        <p className="font-bold">Email Value:</p>
                                        <input
                                            type="text"
                                            value={image.email}
                                            onChange={(e) =>
                                                handleMatchmakeEmailEdit(index, imageIndex, e.target.value)
                                            }
                                            className="p-2 border rounded italic"
                                        />
                                        <p className="font-bold">Name Value:</p>
                                        <input
                                            type="text"
                                            value={image.matchMakerName}
                                            onChange={(e) =>
                                                handleMatchmakeNameEdit(index, imageIndex, e.target.value)
                                            }
                                            className="p-2 border rounded italic"
                                        />
                                        <p className="font-bold">Location Value:</p>
                                        <input
                                            type="text"
                                            value={image.matchMakerLocation}
                                            onChange={(e) =>
                                                handleMatchmakeLocationEdit(index, imageIndex, e.target.value)
                                            }
                                            className="p-2 border rounded italic"
                                        />

                                        <p className="font-bold">Image URL Value:</p>
                                        <input
                                            type="text"
                                            value={image.imgUrl}
                                            onChange={(e) =>
                                                handleMatchmakeImageChange(index, imageIndex, e.target.value)
                                            }
                                            className="p-2 border rounded italic"
                                        />
                                        <p className="font-bold">Image Preview:</p>
                                        <Image
                                            alt="match maker"
                                            src={image.imgUrl || image.imgUrlPreview}
                                            width={100}
                                            height={100}
                                            className="max-w-[6rem]"
                                            loading="lazy"
                                        />
                                        {/* Delete */}
                                        <div>
                                            <button
                                                type="button"
                                                className="border border-black py-2 px-3 bg-red-700 hover:bg-red-500 text-white rounded"
                                                onClick={() => handleDeleteMatchmaker(newsLetterItem.id, image.id)}
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className='flex flex-row justify-center mx-auto'>
                            <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">Edit NewsLetter Section (Matchmaker)</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400 opacity-20">Don't forget to click Save Changes button after Altering content!</p>
                                <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                    <span className="sr-only">Loading NewsLetter Matchmaker Images & Emails...</span>
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
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-green-300 to-yellow-200 group-hover:from-red-200 group-hover:via-green-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-green-400"
                    >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black/75 text-white hover:text-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Save Changes
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default NewsLetterEditor;
