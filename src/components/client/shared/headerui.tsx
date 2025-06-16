import CtaNav from "./header-components/ctaNav";
import DesktopNav from "./header-components/desktopNav";
import MobileNav from "./header-components/mobileNav";
import { getData } from "@/_lib/fetch-data";


interface RotatorProps {
	ladiesData: { random_value: number }[]; 
}
interface HeaderNavigation {
  name: string;
  link: string;
}

async function HeaderUI({ ladiesData }: RotatorProps) {
  const config = (await getData().catch((error) => {
    console.error("Failed to fetch config data:", error);
    return []; // Fallback to an empty array
  })) || [];
  
  const logo:string = config.length > 0 ? config[0].logo || "/images/loveme-v2.png" : "/images/loveme-v2.png";
  const mobileLogo:string = config.length > 0 ? config[0].miniLogo || "/images/loveme-v1.png" : "/images/loveme-v1.png";
  const headerNavs: HeaderNavigation[] = config.length > 0 ? config[0].headerNavs || [] : [];

  return (
    <>
      <nav className="w-full text-black bg-white mt-[6rem] lg:mt-0 shadow-sm">
        <DesktopNav />

        <CtaNav ladiesData={ladiesData} logo={logo} headerNavs={headerNavs} />

        <MobileNav mobileLogo={mobileLogo} logo={logo} />
      </nav>
    </>
  );
}

export default HeaderUI;
