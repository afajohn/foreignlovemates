import type { FetchParam } from "@/app/types/fetch-param";

const naurl = process.env.NEXTAUTH_URL;

export async function fetchData(param: FetchParam) {
	let url = "";
	try {
		switch (param.dataSource) {
			case "bigquery": // when get table data
					url = `${naurl}/api/blog?page=${param.pageOrId}`;
					break;
			case "edit": // when edit data
					url =
						param.ds === "bigquery"
							? `${naurl}/api/blog/${param.pageOrId}`
							: `${naurl}/api/${param.entity}/${param.pageOrId}`;
					break;
				case "json":
					url = `${naurl}/api/${param.entity}?page=${param.pageOrId}`;
					break;
				case "new-article":
					url = `${naurl}/api/blog/0`;
					break;
			case 'trash':
			url = `${naurl}/api/trash-local/`
			break;     
			case 'trash-json':
			url = `${naurl}/api/trash-local?page=${param.pageOrId}`
			break;  
			//need to connect to bigquery maybe use the blog route.ts
			case 'trash-bigquery':
			url = `${naurl}/api/trash?page=${param.pageOrId}`
			break;     		
		}
			const dataRes = await fetch(url, {cache: "no-store"});
			if ( !dataRes.ok ) {
				throw new Error("Failed to fetch data");
			}
			const data = await dataRes.json();
			if(param.entity === "articles" ) {
				// const artData = dataSource === "bigquery" ? data : data; 
				return { dataRes: data || [], };
			}
 

	if (param.entity === "categories"||  param.entity === "page-types") {
			const entityData = param.dataSource === "bigquery" ? { entities: data  } : data; 
			return { dataRes: entityData || []};
			}
			
			return { dataRes: [] };
		} catch {
			return { 
			dataRes: [], 
			};
		}
}

//get Config data
export async function getData() {
	try {
		if (!naurl) {
			console.error("API base URL (naurl) is not defined. Returning fallback data.");
			return []; // Return safe fallback instead of throwing an error
		}

		const res = await fetch(`${naurl}/api/configuration`, {
			next: { revalidate: 7200 },
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch configuration. Status: ${res.status}`);
		}

		return await res.json();
	} catch (error) {
		console.error("Error fetching configuration:", error);
		return null; // Return `null` or a safe fallback
	}
}




//get homepage crud data
export async function getHomePageCrudData() {
	try {
		if (!naurl) {
			console.error("API base URL (naurl) is not defined. Returning fallback data.");
			return []; // Safe fallback to prevent crashes
		}

		const res = await fetch(`${naurl}/api/configuration/homepagecrud`, {
			next: { revalidate: 7200 },
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch homepage CRUD data. Status: ${res.status}`);
		}

		return await res.json();
	} catch (error) {
		console.error("Error fetching homepage CRUD data:", error);
		return null; // Safe fallback
	}
}


// rotator data
export async function getRotatorData(website: string) {
	try {
		if (!naurl) {
			console.error("API base URL (naurl) is not defined. Returning fallback data.");
			return []; // Return safe fallback instead of throwing an error
		}

		const response = await fetch(
			`${naurl}/api/ladies/rotator?website=${website}`,
			{
				next: { revalidate: 7200 },
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch ladies data. Status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching rotator data:", error);
		return []; // Return a safe fallback
	}
}

