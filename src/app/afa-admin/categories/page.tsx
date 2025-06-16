// import CatLayout from "./layout";
import { fetchData } from "@/_lib/fetch-data";
import { pageParams } from "@/app/types/fetch-param";
import CategoryTable from "@/components/admin/CategoryTable";

export default async function CategoryPage({ searchParams }: { searchParams: Promise <{ page?: string; edit?: string;}> }) {
  const sp = await searchParams;
 
  const page = sp?.page ? Number(sp?.page) : 1;
  pageParams.pageOrId = page;
  pageParams.dataSource = 'json';
  pageParams.entity = 'categories';
  const categoriesData = await fetchData(pageParams);
  return (
    // <CatLayout searchParams={parsedParams}>
      <CategoryTable entitiesData={categoriesData.dataRes} />
    // </CatLayout>
  );
}