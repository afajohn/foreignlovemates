import PALayout from "./layout";
import { fetchData } from "@/_lib/fetch-data";
import { pageParams } from "@/app/types/fetch-param";
import ArticlesTable from "@/components/admin/ArticlesTable";

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ page?: string; edit?: string; newArticle?: string}> }) {
  const sp = await searchParams;
  const parsedParams = {
    page: sp.page ? Number(sp.page) : undefined,
    edit: sp.edit ? Number(sp.edit) : undefined
  };
  const page = sp?.page ? Number(sp?.page) : 1;
  pageParams.pageOrId = page;
  pageParams.dataSource = 'bigquery';
  pageParams.entity = 'articles';
  const articlesData = await fetchData(pageParams);
  return (
    <PALayout searchParams={parsedParams}>
      <ArticlesTable articlesData={articlesData.dataRes} />
    </PALayout>
  );
}