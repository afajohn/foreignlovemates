import { fetchData } from "@/_lib/fetch-data";
import { pageParams } from "@/app/types/fetch-param";
import ArticlesTable from "@/components/admin/ArticlesTable";

export default async function AticleTablePage({ searchParams }:  { searchParams: Promise<{ page?: number; ds?: string }>}) {
  const sp = await searchParams;
  const page = sp?.page ? Number(sp?.page) : 1;
  const ds = sp?.ds ? sp?.ds : 'bigquery';
  pageParams.pageOrId = page;
  pageParams.dataSource = ds;
  pageParams.entity = 'articles';
  const articlesData = await fetchData(pageParams);
  return (  
    <ArticlesTable articlesData={articlesData.dataRes} />
  );
}