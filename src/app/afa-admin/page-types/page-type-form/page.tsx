import { fetchData } from "@/_lib/fetch-data";
import PageTypeForm from "@/components/admin/PageTypeForm";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/_lib/auth";
import { pageParams } from "@/app/types/fetch-param";

export default async function PageTypeFormPage({ searchParams }: { searchParams: Promise <{ id?: string;}> }) {
  const sp = await searchParams;
  const id = sp?.id === 'new-article' ? 0 : sp?.id ? Number(sp?.id) : 1;
  const ifedit = sp?.id === 'new-page-types'  ? 'new-page-types':'edit';
  pageParams.pageOrId = id;
  pageParams.dataSource = ifedit;
  pageParams.entity = 'page-types';
  const pageTypeData = await fetchData(pageParams);
  const session= await auth();
  return (
    <SessionProvider >
      <PageTypeForm
        editId={id} 
        entitiesData={{...pageTypeData.dataRes, ...session}}
        />
    </SessionProvider>
  );
}