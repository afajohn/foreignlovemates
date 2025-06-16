"use client"
import Image from 'next/image';
import { useHomePageData } from '@/hooks/useHomePageData';

function BannerEditor() {
    const {
        banner,
        setBanner,
        saveAllData
    } = useHomePageData();

    const handleCardTextChange = (
        bannerIndex: number,
        cardId: number,
        value: string,
    ) => {
        try {
            setBanner((prevBanner) =>
                prevBanner.map((bannerItem, index) =>
                    index === bannerIndex
                        ? {
                            ...bannerItem,
                            cards: bannerItem.cards?.map((card) =>
                                card.id === cardId ? { ...card, cardText: value } : card,
                            ),
                        }
                        : bannerItem,
                ),
            );
        } catch (error) {
            console.error("Error updating Card Text:", error);
        }
    };

    const handleCardUrlChange = (
        bannerIndex: number,
        cardId: number,
        value: string,
    ) => {
        try {
            setBanner((prevBanner) =>
                prevBanner.map((bannerItem, index) =>
                    index === bannerIndex
                        ? {
                            ...bannerItem,
                            cards: bannerItem.cards?.map((card) =>
                                card.id === cardId ? { ...card, cardUrl: value } : card,
                            ),
                        }
                        : bannerItem,
                ),
            );
        } catch (error) {
            console.error("Error updating Card Url:", error);
        }
    };

    const handleCardImgChange = (
        bannerIndex: number,
        cardId: number,
        value: string,
    ) => {
        try {
            setBanner((prevBanner) =>
                prevBanner.map((bannerItem, index) =>
                    index === bannerIndex
                        ? {
                            ...bannerItem,
                            cards: bannerItem.cards?.map((card) =>
                                card.id === cardId ? { ...card, cardImg: value } : card,
                            ),
                        }
                        : bannerItem,
                ),
            );
        } catch (error) {
            console.error("Error updating Card Img:", error);
        }
    };

    const handleIntroVideoThumnailChange = (bannerIndex: number, value: string) => {
        try {
            setBanner((prevBanner) =>
                prevBanner.map((bannerItem, index) =>
                    index === bannerIndex
                        ? { ...bannerItem, introVideoThumbnail: value }
                        : bannerItem,
                ),
            );
        } catch (error) {
            console.error("Error updating Intro Video:", error);
        }
    };

    const handleIntroVideoChange = (bannerIndex: number, value: string) => {
        try {
            setBanner((prevBanner) =>
                prevBanner.map((bannerItem, index) =>
                    index === bannerIndex
                        ? { ...bannerItem, introVideo: value }
                        : bannerItem,
                ),
            );
        } catch (error) {
            console.error("Error updating Intro Video:", error);
        }
    };

    const handleBannerH1Change = (bannerIndex: number, value: string) => {
        try {
            setBanner((prevBanner) =>
                prevBanner.map((bannerItem, index) =>
                    index === bannerIndex ? { ...bannerItem, bannerH1: value } : bannerItem,
                ),
            );
        } catch (error) {
            console.error("Error updating Banner H1:", error);
        }
    };

    const handleBannerLogoChange = (
        bannerIndex: number,
        logoId: number,
        value: string,
    ) => {
        try {
            setBanner((prevBanner) =>
                prevBanner.map((bannerItem, index) =>
                    index === bannerIndex
                        ? {
                            ...bannerItem,
                            bannerDetails: bannerItem.bannerDetails?.map((item) =>
                                item.id === logoId ? { ...item, bannerLogo: value } : item,
                            ),
                        }
                        : bannerItem,
                ),
            );
        } catch (error) {
            console.error("Error updating Banner Logo:", error);
        }
    };
    const handleBannerDetailChange = (
        bannerIndex: number,
        detailId: number,
        value: string,
    ) => {
        try {
            setBanner((prevBanner) =>
                prevBanner.map((bannerItem, index) =>
                    index === bannerIndex
                        ? {
                            ...bannerItem,
                            bannerDetails:
                                bannerItem.bannerDetails?.map((item) =>
                                    item.id === detailId
                                        ? { ...item, bannerIntroTxt: value }
                                        : item,
                                ) || [],
                        }
                        : bannerItem,
                ),
            );
        } catch (error) {
            console.error("Error updating Banner Detail:", error);
        }
    };

    return (
        <>
            <div className="text-sm">
                <div className="py-3 px-2 border rounded-xl bg-green-50 max-h-[46rem] overflow-y-auto">
                    <h2 className="font-bold text-xl md:text-3xl pb-2 inline-flex gap-5"><span className="underline">Edit ➡ Banner Section</span></h2>
                    {banner.length > 0 ? (
                        <div className="flex justify-evenly">
                            {banner.map((bannerItem, bannerIndex) => (
                                <div
                                    key={bannerItem.id}
                                    className="flex flex-col md:flex-row items-center md:items-start lg:items-center gap-3 overflow-x-auto"
                                >
                                    {/* Banner Left  Intro Video*/}
                                    <div className="px-2 py-2 border border-green-600 rounded-xl flex flex-col md:flex-row gap-3 justify-center items-center mx-auto">
                                        <div className='flex flex-col gap-2 items-center'>
                                            <p className="font-bold">Banner H1:</p>
                                            <textarea
                                                cols={25}
                                                rows={3}
                                                value={bannerItem.bannerH1}
                                                onChange={(e) =>
                                                    handleBannerH1Change(bannerIndex, e.target.value)
                                                }
                                                className="border p-2 rounded italic"
                                            />

                                            {bannerItem.bannerDetails?.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex flex-col items-center"
                                                >
                                                    <p className="font-bold">Logo URL Value:</p>
                                                    <input
                                                        type="text"
                                                        value={item.bannerLogo}
                                                        onChange={(e) =>
                                                            handleBannerLogoChange(
                                                                bannerIndex,
                                                                item.id,
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="border p-2 my-1 rounded italic "
                                                    />
                                                    <p className="font-bold">Logo Preview:</p>
                                                    <Image
                                                        src={item.bannerLogo || item.bannerImgPreview}
                                                        alt="Banner Card Img"
                                                        width={180}
                                                        height={180}
                                                        loading="lazy"

                                                    />
                                                    <label
                                                        className="font-bold"
                                                        htmlFor="banner-details"
                                                    >
                                                        Banner Text Detail:
                                                    </label>
                                                    <textarea
                                                        cols={30}
                                                        rows={3}
                                                        value={item.bannerIntroTxt}
                                                        onChange={(e) =>
                                                            handleBannerDetailChange(
                                                                bannerIndex,
                                                                item.id,
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="border p-2 rounded italic"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className='flex flex-col gap-2 items-center'>
                                            <p className='font-bold'>Intro-Vid Thumbnail:</p>
                                            <input
                                                type="text"
                                                value={bannerItem.introVideoThumbnail}
                                                onChange={(e) =>
                                                    handleIntroVideoThumnailChange(bannerIndex, e.target.value)
                                                }
                                                className="border p-2 rounded italic"
                                            />
                                            <p className='font-bold'>Thumbnail Preview</p>
                                            <Image
                                                src={`${bannerItem.introVideoThumbnail || bannerItem.introVideoPreview}`}
                                                width={100}
                                                height={100}
                                                alt='Intro Video Thumbnail'
                                                loading="lazy"
                                                className="rounded-xl"
                                            />
                                            <label className="font-bold" htmlFor="introVideo">
                                                Intro-Vid (Embed) URL:
                                            </label>

                                            <input
                                                type="text"
                                                value={bannerItem.introVideo}
                                                onChange={(e) =>
                                                    handleIntroVideoChange(bannerIndex, e.target.value)
                                                }
                                                className="border p-2 rounded italic"
                                            />
                                            <div className="text-center">
                                                <p className="font-bold mb-2">Video Preview:</p>
                                                <iframe
                                                    width={200}
                                                    height={150}
                                                    title="intro-vid"
                                                    allowFullScreen
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    src={bannerItem.introVideo || bannerItem.introVideoPreview}
                                                    className="rounded-xl"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Banner Right Cards  */}
                                    <div className="flex flex-col md:flex-row gap-2 overflow-auto">
                                        {bannerItem.cards?.map((card) => (
                                            <div key={card.id} className="border border-green-600 rounded-xl p-2 my-3">
                                                <div className="flex flex-col items-center gap-3 py-2">
                                                    <p className="font-bold">
                                                        Ladies Profiles Card: {card.id}
                                                    </p>
                                                    <label className="font-bold" htmlFor="cardText">
                                                        Card Text:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={card.cardText}
                                                        onChange={(e) =>
                                                            handleCardTextChange(
                                                                bannerIndex,
                                                                card.id,
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="border p-2 rounded italic"
                                                    />

                                                    <p className="font-bold text-center">Card URL:</p>
                                                    <input
                                                        type="text"
                                                        value={card.cardUrl}
                                                        onChange={(e) =>
                                                            handleCardUrlChange(
                                                                bannerIndex,
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
                                                        value={card.cardImg}
                                                        onChange={(e) =>
                                                            handleCardImgChange(
                                                                bannerIndex,
                                                                card.id,
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="border p-2 rounded italic"
                                                    />
                                                    <label className="font-bold" htmlFor="img">
                                                        Image Preview:
                                                    </label>
                                                    <Image
                                                        src={card.cardImg || card.cardImgPreview}
                                                        alt="Banner Card Img"
                                                        width={100}
                                                        height={100}
                                                        loading="lazy"
                                                        className="rounded-xl"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                        </div>

                    ) : (
                        <div className='flex flex-row justify-center'>
                            <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">Edit Banner Section</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400 opacity-20">Don't forget to click Save Changes button after Altering content!</p>
                                <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                    <span className="sr-only">Loading Banner...</span>
                                </div>
                            </div>
                        </div>
                    )}
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
            </div>
        </>
    )
}

export default BannerEditor;