import { fetchData } from "@/_lib/fetch-data";
import { pageParams } from "@/app/types/fetch-param";
import CategoryTable from "@/components/admin/CategoryTable";

export default async function CategoryTablePage({ searchParams }: { searchParams: Promise <{ page?: number; ds?: string }> }) {
  const sp = await searchParams;
  const page = sp?.page ? Number(sp?.page) : 1;
  const ds = sp?.ds ? sp?.ds : 'json';
  pageParams.pageOrId = page;
  pageParams.entity = 'categories';
  pageParams.dataSource = ds;
  const categoriesData = await fetchData(pageParams); 
  return (  
    <CategoryTable entitiesData={categoriesData.dataRes} />
  );
}

