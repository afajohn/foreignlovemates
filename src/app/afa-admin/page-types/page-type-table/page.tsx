import { fetchData } from "@/_lib/fetch-data";
import { pageParams } from "@/app/types/fetch-param";
import PageTypeTable from "@/components/admin/PageTypeTable";

export default async function PageTypeTablePage({ searchParams }: { searchParams: Promise <{ page?: number; ds?: string }> }) {
  const sp = await searchParams;
  const page = sp?.page ? Number(sp?.page) : 1;
  const ds = sp?.ds ? sp?.ds : 'json';
  pageParams.pageOrId = page;
  pageParams.dataSource = ds;
  pageParams.entity = 'page-types';
  const pageTypeData = await fetchData(pageParams);

  return (  
    <PageTypeTable entitiesData={pageTypeData.dataRes} />
  );
}

