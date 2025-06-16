import bigquery from "@/_lib/bigquery";
import type { Category } from "@/app/types/category";
import type { PageType } from "@/app/types/page-type";
const projectId = process.env.PROJECT_ID;
const dataSet = process.env.BLOG_DATASET;

export async function fetchCategoriesAndPageTypes() {
  const cnq = `SELECT category_name, category_slug, page_type_id, category_id FROM \`${projectId}.${dataSet}.blog_category\``;
  const ptq = `SELECT DISTINCT type_name, type_id, type_slug  FROM \`${projectId}.${dataSet}.page_type\``;

  try{
    const [categoriesResult, pageTypesResult] = await Promise.all([
      bigquery.query(cnq),
      bigquery.query(ptq),
    ]);
  
    const categories = categoriesResult[0] as Category[];
    const page_types = pageTypesResult[0] as PageType[];
    const categoryNames: Record<number, Record<string, string>[]> = {};
  
    for (const row of categories) {
      if (!categoryNames[row.page_type_id]) {
        categoryNames[row.page_type_id] = [];
      }
      categoryNames[row.page_type_id].push({
        slug: row.category_slug,
        name: row.category_name,
        id: String(row.category_id),
      });
    }
    const pageTypeNames = page_types.map((row) => ({
      name: row.type_name,
      id: row.type_id,
      slug : row.type_slug,
    }));
  
    
      return { categoryNames, pageTypeNames };
  }
  catch(err){
    console.error(err);
    return { categoryNames: {}, pageTypeNames: [] }; 
  }
  }
  