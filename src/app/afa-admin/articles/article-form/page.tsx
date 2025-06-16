import { fetchData } from "@/_lib/fetch-data";
import ArticleForm from "@/components/admin/ArticleForm";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/_lib/auth";
import { pageParams } from "@/app/types/fetch-param";
export default async function AticleFormPage({ searchParams }: { searchParams:Promise <{ id?: string ; ds?: string}>}) {
  const sp = await searchParams;
  const ds = sp?.ds === 'bigquery' ? 'bigquery' : 'json';
  const sId = ds === 'bigquery' ? String(sp?.id) : Number(sp?.id);
  const id = sp?.id === 'new-article' ? 0 : String(sp?.id) ? sId : 1;
  const ifedit = sp?.id === 'new-article'  ? 'new-article':'edit';
  pageParams.pageOrId = id;
  pageParams.dataSource = ifedit;
  pageParams.entity = 'articles';
  pageParams.ds = ds;
  const articlesData = await fetchData(pageParams);
  const session= await auth();
  return (
    <SessionProvider >
      <ArticleForm 
        editId={id} 
        articlesData={{...articlesData.dataRes, ...{'ds': ds}, ...session} }
      />
    </SessionProvider>
  );
}