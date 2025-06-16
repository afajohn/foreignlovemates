"use client"
import { useHomePageData } from '@/hooks/useHomePageData';
import Image from 'next/image';
import { useState } from 'react';
import Swal from 'sweetalert2';

function TravelAndMeetEditor() {
    const {
        travel,
        setTravel,
        saveAllData
    } = useHomePageData();

    const handleLiveImageChange = (
        travelIndex: number,
        imgId: string,
        value: string,
    ) => {
        try {
            setTravel((prevTravel) =>
                prevTravel.map((travelItem, index) =>
                    index === travelIndex
                        ? {
                            ...travelItem,
                            liveImg:
                                travelItem.liveImg?.map((img) =>
                                    img.id === imgId ? { ...img, travImg: value } : img,
                                ) || [],
                        }
                        : travelItem,
                ),
            );
        } catch (error) {
            console.error("Error updating Live Img:", error);
        }
    };

    const handleLiveTextChange = (
        travelIndex: number,
        textLiveId: string,
        value: string,
    ) => {
        try {
            setTravel((prevTravel) =>
                prevTravel.map((travelItem, index) =>
                    index === travelIndex
                        ? {
                            ...travelItem,
                            liveImg:
                                travelItem.liveImg?.map((text) =>
                                    text.id === textLiveId ? { ...text, schedTxt: value } : text,
                                ) || [],
                        }
                        : travelItem,
                ),
            );
        } catch (error) {
            console.error("Error updating Live Text:", error);
        }
    };

    const handleLiveTitleChange = (
        travelIndex: number,
        textLiveId: string,
        value: string,
    ) => {
        try {
            setTravel((prevTravel) =>
                prevTravel.map((travelItem, index) =>
                    index === travelIndex
                        ? {
                            ...travelItem,
                            liveImg:
                                travelItem.liveImg?.map((text) =>
                                    text.id === textLiveId ? { ...text, travImgTitle: value } : text,
                                ) || [],
                        }
                        : travelItem,
                ),
            );
        } catch (error) {
            console.error("Error updating Title:", error);
        }
    };

    const handleLiveUrlChange = (
        travelIndex: number,
        urlLiveId: string,
        value: string,
    ) => {
        try {
            setTravel((prevTravel) =>
                prevTravel.map((travelItem, index) =>
                    index === travelIndex
                        ? {
                            ...travelItem,
                            liveImg:
                                travelItem.liveImg?.map((url) =>
                                    url.id === urlLiveId ? { ...url, linkUrl: value } : url,
                                ) || [],
                        }
                        : travelItem,
                ),
            );
        } catch (error) {
            console.error("Error updating Live Url:", error);
        }
    };

    // add / delete Live IMG
    const [newLiveImg, setNewLiveImg] = useState({
        travImg: "",
        travImgPreview: "/images/image-preview.png",
        travImgTitle: "",
        schedTxt: "",
        linkUrl: "",
    });

    const handleAddLiveImg = () => {
        try {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Live Details Added!",
                showConfirmButton: false,
                timer: 1500
            });
            const newLiveImgItem = {
                id: `${Date.now()}`,
                travImg: newLiveImg.travImg,
                travImgPreview: newLiveImg.travImgPreview,
                travImgTitle: newLiveImg.travImgTitle,
                schedTxt: newLiveImg.schedTxt,
                linkUrl: newLiveImg.linkUrl
            };

            setTravel((prevTravel) => {
                const updatedTravel = [...prevTravel];

                if (updatedTravel.length > 0) {
                    const exist = updatedTravel[0].liveImg?.some(
                        (item) => item.id === newLiveImgItem.id
                    );

                    if (!exist) {
                        updatedTravel[0].liveImg = updatedTravel[0].liveImg
                            ? [...updatedTravel[0].liveImg, newLiveImgItem]
                            : [newLiveImgItem];
                    }
                }

                return updatedTravel;
            });

            setNewLiveImg({
                travImg: "",
                travImgPreview: "/images/image-preview.png",
                travImgTitle: "",
                schedTxt: "",
                linkUrl: "",
            });
        } catch (error) {
            console.error("Error Adding Live Img:", error);
        }
    };

    const handleLiveImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setNewLiveImg((prev) => ({
                ...prev,
                travImg: e.target.value,
            }));
        } catch (error) {
            console.error("Error Live Img Change:", error);
        }
    };

    const handleLiveImgTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setNewLiveImg((prev) => ({
                ...prev,
                travImgTitle: e.target.value,
            }));
        } catch (error) {
            console.error("Error Live Title Change:", error);
        }
    };

    const handleLiveSchedTxtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setNewLiveImg((prev) => ({
                ...prev,
                schedTxt: e.target.value,
            }));
        } catch (error) {
            console.error("Error Live Shed Change:", error);
        }
    };

    const handleLiveLinkUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setNewLiveImg((prev) => ({
                ...prev,
                linkUrl: e.target.value,
            }));
        } catch (error) {
            console.error("Error Live Link Change:", error);
        }
    };

    const handleDeleteLiveImg = (travelId: string, liveImgId: string) => {
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
                    setTravel((prevTravel) => {
                        const updatedTravel = prevTravel.map((item) => {
                            if (item.id === travelId) {
                                return {
                                    ...item,
                                    liveImg: item.liveImg?.filter((liveimg) => liveimg.id !== liveImgId),
                                };
                            }
                            return item;
                        });
                        return updatedTravel;
                    });
                }
            });
        } catch (error) {
            console.error("Error Deleting Live Img:", error);
        }
    };

    const handleCardTextTmChange = (
        travelIndex: number,
        textTmId: number,
        value: string,
    ) => {
        try {
            setTravel((prevTravel) =>
                prevTravel.map((travelItem, index) =>
                    index === travelIndex
                        ? {
                            ...travelItem,
                            cardsTm:
                                travelItem.cardsTm?.map((text) =>
                                    text.id === textTmId ? { ...text, cardTextTm: value } : text,
                                ) || [],
                        }
                        : travelItem,
                ),
            );
        } catch (error) {
            console.error("Error Card Text Change:", error);
        }
    };

    const handleCardUrlTmChange = (
        travelIndex: number,
        textTmId: number,
        value: string,
    ) => {
        try {
            setTravel((prevTravel) =>
                prevTravel.map((travelItem, index) =>
                    index === travelIndex
                        ? {
                            ...travelItem,
                            cardsTm:
                                travelItem.cardsTm?.map((text) =>
                                    text.id === textTmId ? { ...text, cardUrlTm: value } : text,
                                ) || [],
                        }
                        : travelItem,
                ),
            );
        } catch (error) {
            console.error("Error Card Url Change:", error);
        }
    };

    const handleCardImgTmChange = (
        travelIndex: number,
        imgTmId: number,
        value: string,
    ) => {
        try {
            setTravel((prevTravel) =>
                prevTravel.map((travelItem, index) =>
                    index === travelIndex
                        ? {
                            ...travelItem,
                            cardsTm:
                                travelItem.cardsTm?.map((img) =>
                                    img.id === imgTmId ? { ...img, cardImgTm: value } : img,
                                ) || [],
                        }
                        : travelItem,
                ),
            );
        } catch (error) {
            console.error("Error Card Img Change:", error);
        }
    };

    return (
        <>
            <div className="my-3 p-2 border rounded-xl text-sm bg-yellow-50 max-h-[46rem] overflow-y-auto">
                <h2 className="font-bold text-xl md:text-3xl mb-2 inline-flex gap-5"><span className="underline">Edit ➡ Travel & Meet Section</span></h2>
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <div className="flex flex-col md:flex-row gap-3 overflow-x-auto 2xl:max-w-[45rem]">
                        {/* Add */}
                        <div className="flex flex-col gap-1 items-center justify-center p-2 border border-yellow-400 rounded-xl">
                            <h2 className="font-bold">Add New Live Image</h2>

                            <div className="flex flex-col gap-1 items-center">
                                <p className="font-bold">Image Preview:</p>
                                <Image
                                    src={newLiveImg.travImg || newLiveImg.travImgPreview}
                                    width={100}
                                    height={100}
                                    alt="Live Webcast Image"
                                    loading="lazy"
                                    className="max-w-[5rem]"
                                />
                                <p className="font-bold">T&M Live Img :</p>
                                <input
                                    type="text"
                                    placeholder="Live Image"
                                    value={newLiveImg.travImg}
                                    onChange={handleLiveImgChange}
                                    className="rounded border p-2"
                                />
                                <p className="font-bold">T&M Live Title :</p>
                                <input
                                    type="text"
                                    placeholder="Live Title"
                                    value={newLiveImg.travImgTitle}
                                    onChange={handleLiveImgTitleChange}
                                    className="rounded border p-2"
                                />
                                <p className="font-bold">T&M Live Schedule :</p>
                                <input
                                    type="text"
                                    placeholder="Live Schedule"
                                    value={newLiveImg.schedTxt}
                                    onChange={handleLiveSchedTxtChange}
                                    className="rounded border p-2"
                                />
                                <p className="font-bold">T&M Live URL :</p>
                                <input
                                    type="text"
                                    placeholder="Live Link URL"
                                    value={newLiveImg.linkUrl}
                                    onChange={handleLiveLinkUrlChange}
                                    className="rounded border p-2"
                                />
                            </div>
                            <button
                                type="button"
                                className="border border-black py-2 px-3 bg-green-600 hover:bg-green-400 text-white rounded mt-1"
                                onClick={handleAddLiveImg}
                            >
                                Add
                            </button>
                        </div>
                        {/* Left Live Img */}
                        {travel.length > 0 && travel[0].liveImg ? (
                            travel.map((travelItem, travelIndex) =>
                                travelItem.liveImg?.map((img) => (
                                    <div key={img.id}>
                                        <div className="flex m-1 ">
                                            <div className="flex flex-col gap-2 items-center border border-yellow-400 rounded-xl p-2">
                                                <div className="flex flex-col">
                                                    <p className="text-sm text-center font-bold">
                                                        Travel & Meet Live Schedule : {img.id}
                                                    </p>
                                                    <p className="text-sm text-center font-bold">
                                                        Image Preview:
                                                    </p>
                                                    <Image
                                                        src={img.travImg || img.travImgPreview}
                                                        width={100}
                                                        height={100}
                                                        alt="Live Webcast Image"
                                                        loading="lazy"
                                                        className="max-w-[10rem] mx-auto rounded-xl"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label
                                                        className="text-sm text-center font-bold"
                                                        htmlFor={`TM-image-edit-${img.id}`}
                                                    >
                                                        Image URL Value:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={img.travImg}
                                                        onChange={(e) =>
                                                            handleLiveImageChange(
                                                                travelIndex,
                                                                img.id,
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="border p-2 rounded italic"
                                                    />
                                                    <p className="font-bold text-center">
                                                        Sched Title Value:
                                                    </p>
                                                    <input
                                                        type="text"
                                                        value={img.travImgTitle}
                                                        onChange={(e) =>
                                                            handleLiveTitleChange(
                                                                travelIndex,
                                                                img.id,
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="p-2 border rounded text-sm italic"
                                                    />
                                                    <label
                                                        className="text-sm text-center font-bold"
                                                        htmlFor={`TM-Sched-text-edit-${img.id}`}
                                                    >
                                                        Sched Text Value:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={img.schedTxt}
                                                        onChange={(e) =>
                                                            handleLiveTextChange(
                                                                travelIndex,
                                                                img.id,
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="p-2 border rounded text-sm italic"
                                                    />
                                                    <label
                                                        className="text-sm text-center font-bold"
                                                        htmlFor={`TM-URL-edit-${img.id}`}
                                                    >
                                                        URL Value:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={img.linkUrl}
                                                        onChange={(e) =>
                                                            handleLiveUrlChange(
                                                                travelIndex,
                                                                img.id,
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="p-2 border rounded text-sm italic"
                                                    />
                                                </div>
                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                    className="border border-black py-2 px-3 bg-red-700 hover:bg-red-500 text-white rounded"
                                                    onClick={() => handleDeleteLiveImg(travelItem.id, img.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )),
                            )
                        ) : (
                            <div className='flex flex-row justify-center'>
                                <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">Edit Travel & Meet Section (Live Schedule)</h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400 opacity-20">Don't forget to click Save Changes button after Altering content!</p>
                                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                        <span className="sr-only">Loading Travel & Meet Live Images...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Right Cards Tm */}
                    <div className="flex flex-col items-start max-w-[50rem] overflow-x-auto 2xl:p-8 2xl:max-w-[45rem]">
                        <div className="flex flex-col md:flex-row gap-3">
                            {travel.length > 0 && travel[0].cardsTm ? (
                                travel.map((travelItem, travelIndex) =>
                                    travelItem.cardsTm?.map((card) => (
                                        <div
                                            key={card.id}
                                            className="flex flex-col items-center p-2 gap-2 border border-yellow-400 rounded-xl"
                                        >
                                            <p className="font-bold">
                                                Travel & Meet Card: {card.id}
                                            </p>
                                            <label className="font-bold" htmlFor="cardtext">
                                                Card Text:
                                            </label>
                                            <input
                                                type="text"
                                                name="cardtext"
                                                value={card.cardTextTm}
                                                onChange={(e) =>
                                                    handleCardTextTmChange(
                                                        travelIndex,
                                                        card.id,
                                                        e.target.value,
                                                    )
                                                }
                                                className="border p-2 rounded italic"
                                            />
                                            <p className="font-bold text-center">Card URL:</p>
                                            <input
                                                type="text"
                                                name="cardtext"
                                                value={card.cardUrlTm}
                                                onChange={(e) =>
                                                    handleCardUrlTmChange(
                                                        travelIndex,
                                                        card.id,
                                                        e.target.value,
                                                    )
                                                }
                                                className="border p-2 rounded italic"
                                            />
                                            <label className="font-bold" htmlFor="img-value">
                                                Image URL Value:
                                            </label>
                                            <input
                                                type="text"
                                                value={card.cardImgTm}
                                                onChange={(e) =>
                                                    handleCardImgTmChange(
                                                        travelIndex,
                                                        card.id,
                                                        e.target.value,
                                                    )
                                                }
                                                className="border p-2 rounded italic"
                                            />
                                            <p className="font-bold">Image Preview:</p>
                                            <Image
                                                src={card.cardImgTm || card.cardImgTmPreview}
                                                width={100}
                                                height={100}
                                                alt="Travel and Meet Card Image"
                                                loading="lazy"
                                                className="rounded-xl"
                                            />
                                        </div>
                                    )),
                                )
                            ) : (
                                <div className='flex flex-row justify-center'>
                                    <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">Edit Travel & Meet Section (Cards)</h5>
                                        <p className="font-normal text-gray-700 dark:text-gray-400 opacity-20">Don't forget to click Save Changes button after Altering content!</p>
                                        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                            <span className="sr-only">Loading Travel & Meet Cards...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
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

export default TravelAndMeetEditor;
