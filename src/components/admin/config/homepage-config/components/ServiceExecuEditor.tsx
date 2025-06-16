"use client"
import Image from 'next/image';
import { useHomePageData } from '@/hooks/useHomePageData';

function ServiceExecuEditor() {
    const {
        executive,
        setExecutive,
        saveAllData
    } = useHomePageData();

    const handleExecuImageChange = (
        execuIndex: number,
        imgId: number,
        value: string,
    ) => {
        try {
            setExecutive((prevExecu) =>
                prevExecu.map((execItem, index) =>
                    index === execuIndex
                        ? {
                            ...execItem,
                            executiveImg:
                                execItem.executiveImg?.map((img) =>
                                    img.id === imgId ? { ...img, execImg: value } : img,
                                ) || [],
                        }
                        : execItem,
                ),
            );
        } catch (error) {
            console.error("Error Execu Img Change:", error);
        }
    };

    const handleExecuTitleChange = (
        execuIndex: number,
        imgId: number,
        value: string,
    ) => {
        try {
            setExecutive((prevExecu) =>
                prevExecu.map((execItem, index) =>
                    index === execuIndex
                        ? {
                            ...execItem,
                            executiveImg:
                                execItem.executiveImg?.map((img) =>
                                    img.id === imgId ? { ...img, execTitle: value } : img,
                                ) || [],
                        }
                        : execItem,
                ),
            );
        } catch (error) {
            console.error("Error Execu Title Change:", error);
        }
    };

    const handleExecuUrlChange = (
        execuIndex: number,
        imgId: number,
        value: string,
    ) => {
        try {
            setExecutive((prevExecu) =>
                prevExecu.map((execItem, index) =>
                    index === execuIndex
                        ? {
                            ...execItem,
                            executiveImg:
                                execItem.executiveImg?.map((img) =>
                                    img.id === imgId ? { ...img, execUrl: value } : img,
                                ) || [],
                        }
                        : execItem,
                ),
            );
        } catch (error) {
            console.error("Error Execu Url Change:", error);
        }
    };

    const handleExecuTextChange = (
        execuIndex: number,
        imgId: number,
        value: string,
    ) => {
        try {
            setExecutive((prevExecu) =>
                prevExecu.map((execItem, index) =>
                    index === execuIndex
                        ? {
                            ...execItem,
                            executiveImg:
                                execItem.executiveImg?.map((img) =>
                                    img.id === imgId ? { ...img, execTxt: value } : img,
                                ) || [],
                        }
                        : execItem,
                ),
            );
        } catch (error) {
            console.error("Error Execu Text Change:", error);
        }
    };

    const handleExecuCardTextChange = (
        execuIndex: number,
        exeCardTxtId: number,
        value: string,
    ) => {
        try {
            setExecutive((prevExecu) =>
                prevExecu.map((execItem, index) =>
                    index === execuIndex
                        ? {
                            ...execItem,
                            cardsExec:
                                execItem.cardsExec?.map((card) =>
                                    card.id === exeCardTxtId
                                        ? { ...card, cardTextExec: value }
                                        : card,
                                ) || [],
                        }
                        : execItem,
                ),
            );
        } catch (error) {
            console.error("Error Execu Card Text Change:", error);
        }
    };

    const handleExecuCardUrlChange = (
        execuIndex: number,
        exeCardTxtId: number,
        value: string,
    ) => {
        try {
            setExecutive((prevExecu) =>
                prevExecu.map((execItem, index) =>
                    index === execuIndex
                        ? {
                            ...execItem,
                            cardsExec:
                                execItem.cardsExec?.map((card) =>
                                    card.id === exeCardTxtId
                                        ? { ...card, cardUrlExec: value }
                                        : card,
                                ) || [],
                        }
                        : execItem,
                ),
            );
        } catch (error) {
            console.error("Error Execu Card Url Change:", error);
        }
    };

    const handleExecuCardImgChange = (
        execuIndex: number,
        exeCardImgId: number,
        value: string,
    ) => {
        try {
            setExecutive((prevExecu) =>
                prevExecu.map((execItem, index) =>
                    index === execuIndex
                        ? {
                            ...execItem,
                            cardsExec:
                                execItem.cardsExec?.map((card) =>
                                    card.id === exeCardImgId
                                        ? { ...card, cardImgExec: value }
                                        : card,
                                ) || [],
                        }
                        : execItem,
                ),
            );
        } catch (error) {
            console.error("Error Card Img Change:", error);
        }
    };

    return (
        <>
            <div className="mt-3 p-3 border rounded-xl text-sm bg-green-50 max-h-[46rem] overflow-auto">
                <h2 className="text-xl md:text-3xl font-bold mb-2 inline-flex gap-5">
                    <span className="underline">Edit ➡ Executive Plan and Services Section</span>
                </h2>
                <div className="flex flex-col md:flex-row gap-5 justify-center">
                    {/* Execu left */}
                    <div>
                        {executive.length > 0 && executive[0].executiveImg ? (
                            executive.map((execItem, execuIndex) =>
                                execItem.executiveImg?.map((img) => (
                                    <div
                                        key={img.id}
                                        className="flex flex-col items-center gap-2 p-2 rounded-xl border border-green-600"
                                    >
                                        <label className="font-bold" htmlFor="Exec img Title">
                                            Card Title:
                                        </label>
                                        <input
                                            type="text"
                                            value={img.execTitle}
                                            onChange={(e) =>
                                                handleExecuTitleChange(
                                                    execuIndex,
                                                    img.id,
                                                    e.target.value,
                                                )
                                            }
                                            className="border p-2 rounded italic"
                                        />
                                        <p className="text-center font-bold">Card URL:</p>
                                        <input
                                            type="text"
                                            value={img.execUrl}
                                            onChange={(e) =>
                                                handleExecuUrlChange(
                                                    execuIndex,
                                                    img.id,
                                                    e.target.value,
                                                )
                                            }
                                            className="border p-2 rounded italic"
                                        />
                                        <label className="font-bold" htmlFor="Exec img Title">
                                            Details Text:
                                        </label>
                                        <textarea
                                            cols={35}
                                            rows={3}
                                            value={img.execTxt}
                                            onChange={(e) =>
                                                handleExecuTextChange(
                                                    execuIndex,
                                                    img.id,
                                                    e.target.value,
                                                )
                                            }
                                            className="border p-2 rounded italic"
                                        />
                                        <label className="font-bold" htmlFor="Execimage">
                                            Image URL Value:
                                        </label>
                                        <input
                                            type="text"
                                            value={img.execImg}
                                            onChange={(e) =>
                                                handleExecuImageChange(
                                                    execuIndex,
                                                    img.id,
                                                    e.target.value,
                                                )
                                            }
                                            className="border p-2 rounded italic"
                                        />

                                        <p className="font-bold">Image Preview:</p>
                                        <Image
                                            src={img.execImg || img.execImgPreview}
                                            width={100}
                                            height={100}
                                            alt="Execu Image"
                                            loading="lazy"
                                            className="rounded-xl"
                                        />
                                    </div>
                                )),
                            )
                        ) : (
                            <div className='flex flex-row justify-center'>
                                <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">Edit Services Section (Executive Plan)</h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400 opacity-20">Don't forget to click Save Changes button after Altering content!</p>
                                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                        <span className="sr-only">Loading Executive Plan Details...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Execu Right */}
                    <div className="flex flex-col md:flex-row gap-4 items-center overflow-x-auto">
                        {executive.length > 0 && executive[0].cardsExec ? (
                            executive.map((execItem, execuIndex) =>
                                execItem.cardsExec?.map((card) => (
                                    <div key={card.id} className="">
                                        <div className="flex flex-col items-center gap-1 p-2 border border-green-600 rounded-xl">
                                            <p className="font-bold">
                                                Execu Plan Card - {card.id}{" "}
                                            </p>
                                            <label className="font-bold" htmlFor="execu card text">
                                                Card Text:
                                            </label>
                                            <input
                                                type="text"
                                                value={card.cardTextExec}
                                                onChange={(e) =>
                                                    handleExecuCardTextChange(
                                                        execuIndex,
                                                        card.id,
                                                        e.target.value,
                                                    )
                                                }
                                                className="p-2 border rounded-xl italic"
                                            />
                                            <p className="text-center font-bold">Card URL:</p>
                                            <input
                                                type="text"
                                                value={card.cardUrlExec}
                                                onChange={(e) =>
                                                    handleExecuCardUrlChange(
                                                        execuIndex,
                                                        card.id,
                                                        e.target.value,
                                                    )
                                                }
                                                className="p-2 border rounded-xl italic"
                                            />
                                            <label className="font-bold" htmlFor="execu card img">
                                                Image URL Value:
                                            </label>
                                            <input
                                                type="text"
                                                value={card.cardImgExec}
                                                onChange={(e) =>
                                                    handleExecuCardImgChange(
                                                        execuIndex,
                                                        card.id,
                                                        e.target.value,
                                                    )
                                                }
                                                className="p-2 border rounded-xl italic"
                                            />
                                            <p className="font-bold">Image preview:</p>
                                            <Image
                                                src={card.cardImgExec || card.cardImgExecPreview}
                                                width={100}
                                                height={100}
                                                alt="Execu Card Image"
                                                loading="lazy"
                                                className="rounded-xl"
                                            />
                                        </div>
                                    </div>
                                )),
                            )
                        ) : (
                            <div className='flex flex-row justify-center'>
                            <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">Edit Services Section (Our Services)</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400 opacity-20">Don't forget to click Save Changes button after Altering content!</p>
                                <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                    <span className="sr-only">Loading Services Details...</span>
                                </div>
                            </div>
                        </div>
                        )}
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

export default ServiceExecuEditor;
