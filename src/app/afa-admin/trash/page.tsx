import PALayout from "./layout";
import { fetchData } from "@/_lib/fetch-data";
import { pageParams } from "@/app/types/fetch-param";
import TrashTable from "@/components/admin/TrashTable";

export default async function TrashPage({ searchParams }: { searchParams: Promise<{ page?: string; edit?: string; newArticle?: string}> }) {
  const sp = await searchParams;
  const parsedParams = {
    page: sp.page ? Number(sp.page) : undefined,
    edit: sp.edit ? Number(sp.edit) : undefined
  };
  const page = sp?.page ? Number(sp?.page) : 1;
  pageParams.pageOrId = page;
  pageParams.dataSource = 'trash-bigquery';
  pageParams.entity = 'articles';
  const trashData = await fetchData(pageParams);
  return (
    <PALayout searchParams={parsedParams}>
      <TrashTable articlesData={trashData.dataRes} />
    </PALayout>
  );
}