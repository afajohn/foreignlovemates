import { fetchData } from "@/_lib/fetch-data";
import { pageParams } from "@/app/types/fetch-param";
import TrashTable from "@/components/admin/TrashTable";

export default async function AticleTablePage({ searchParams }:  { searchParams: Promise<{ page?: number; ds?: string }>}) {
  const sp = await searchParams;
  const page = sp?.page ? Number(sp?.page) : 1;
  const ds = sp?.ds ? sp?.ds : 'trash-bigquery';
  pageParams.pageOrId = page;
  pageParams.dataSource = ds;
  pageParams.entity = 'articles';
  pageParams.ds = ds;
  const articlesData = await fetchData(pageParams);
  return (  
    <TrashTable articlesData={articlesData.dataRes} />
  );
}