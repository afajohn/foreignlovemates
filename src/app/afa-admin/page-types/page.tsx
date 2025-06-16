// import PTLayout from "./layout";
import { fetchData } from "@/_lib/fetch-data";
import { pageParams } from "@/app/types/fetch-param";
import PageTypeTable from "@/components/admin/PageTypeTable";
export default async function PageTypePage({ searchParams }: { searchParams: Promise <{ page?: string; edit?: string; newPageType?: string}> }) {
  const sp = await searchParams;
  // const parsedParams = {
  //   page: sp.page ? Number(sp.page) : undefined,
  //   edit: sp.edit ? Number(sp.edit) : undefined
  // };
  const page = sp?.page ? Number(sp?.page) : 1;
  pageParams.pageOrId = page;
  pageParams.dataSource = 'json';
  pageParams.entity = 'page-types';
  const pageTypeData = await fetchData(pageParams);

  return (
    // <PTLayout searchParams={parsedParams}>
      <PageTypeTable entitiesData={pageTypeData.dataRes} />
    // </PTLayout>
  );
}