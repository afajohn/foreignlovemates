import bigquery from '@/_lib/bigquery';

interface QueryParams {
  query: string;
  params: Record<string, string | number | boolean | string[] >; 
}


export async function executeQuery({ query, params }: QueryParams) {
  try {
    const [rows] = await bigquery.query({
      query: query,
      params: params,
    });
    return rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw new Error('Database query execution failed');
  }
}