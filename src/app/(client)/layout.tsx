import HeaderUI from "@/components/client/shared/headerui";
import "@/app/globals.css";
import Footer from "@/components/client/shared/footer";
import { ConfigProvider } from "@/contexts/ConfigProvider";
import { getData, getRotatorData } from "@/_lib/fetch-data";
import Breadcrumbs from "@/components/client/shared/BreadCrumbs";

interface Lady {
  ladies_id: number;
  popular_id: string;
}

interface Props {
  children: React.ReactNode;
  ladiesData: Lady[];
}

// export const revalidate = 7200;


export default async function ClientLayout({ children }: Props) {

  const config = (await getData().catch((error) => {
    console.error("Failed to fetch config data:", error);
    return []; // Fallback to an empty array
  })) || [];
  
  const rotatorData = config.length > 0 ? await getRotatorData(config[0].website) : [];
  const logo = config.length > 0 ? config[0].logo : null;
  return (
    <>
      {" "}
      <ConfigProvider config={config}>
        <HeaderUI ladiesData={rotatorData}  />
        <main className="flex-1">
          <Breadcrumbs />
          {children}
        </main>
        <Footer logo={logo} />
      </ConfigProvider>
    </>
  );
}
