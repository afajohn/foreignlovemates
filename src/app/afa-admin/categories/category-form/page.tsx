import { fetchData } from "@/_lib/fetch-data";
import { SessionProvider } from "next-auth/react";
import CategoryForm from "@/components/admin/CategoryForm";
import { auth } from "@/_lib/auth";
import { pageParams } from "@/app/types/fetch-param";

export default async function CategoryFormPage({ searchParams }: { searchParams: Promise <{ id?: string;}> }) {
  const sp = await searchParams;
  const id = sp?.id === 'new-article' ? 0 : sp?.id ? Number(sp?.id) : 1;
  const ifedit = sp?.id === 'new-categories'  ? 'new-categories':'edit';
  pageParams.pageOrId = id;
  pageParams.dataSource = ifedit;
  pageParams.entity = 'categories';
  const categoriesData = await fetchData(pageParams);
  const session= await auth();
  return (
    <SessionProvider >
      <CategoryForm
        editId={id} 
        entitiesData={{...categoriesData.dataRes, ...session}}
      />
    </SessionProvider>
  );
}

