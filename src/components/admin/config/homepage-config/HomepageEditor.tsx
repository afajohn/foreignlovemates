import BannerEditor from './components/BannerEditor';
import TravelAndMeetEditor from './components/TravelAndMeetEditor';
import TestimonialEditor from './components/TestimonialEditor';
import SuccessStoriesEditor from './components/SuccessStoriesEditor';
import NewsLetterEditor from './components/NewsLetterEditor';
import PricingEditor from './components/PricingEditor';
import ServiceExecuEditor from './components/ServiceExecuEditor';

function HomepageEditor() {
    return (
        <>
            <h1 className="text-center font-bold text-xl md:text-5xl py-2 flex gap-3 justify-center">
                Homepage Sections Editor <span className="animate-pulse">💻</span>
            </h1>
            <div className='p-3 bg-black rounded-xl'>
                <BannerEditor />
                <TravelAndMeetEditor />
                <TestimonialEditor />
                <SuccessStoriesEditor/>
                <NewsLetterEditor/>
                <PricingEditor/>
                <ServiceExecuEditor/>
            </div>
            <div className="bg-black my-2 py-10 text-center text-5xl font-bold border rounded-2xl shrink inline-flex justify-center w-full">
                <span className="text-green-500 animate-bounce md:block hidden">*🟢*</span> {""}
                <span className="text-yellow-500 animate-spin md:block hidden">*🟡*</span> {""}
                <span className="text-red-500 animate-bounce">*🔴*</span> {""}
                <span className="text-green-500 animate-spin">*🟢*</span> {""}
                <span className="text-yellow-500 animate-bounce">*🟡*</span> {""}
                <span className="text-red-500 animate-spin md:block hidden">*🔴*</span> {""}
                <span className="text-green-500 animate-bounce md:block hidden">*🟢*</span> {""}
                <span className="text-yellow-500 animate-spin md:block hidden">*🟡*</span> {""}
                <span className="text-red-500 animate-bounce md:block hidden">*🔴*</span> {""}
            </div>
        </>
    )
}

export default HomepageEditor;