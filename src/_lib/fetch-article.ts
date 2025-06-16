import bigquery from "@/_lib/bigquery";

const projectId = process.env.PROJECT_ID;
const dataSet = process.env.BLOG_DATASET;

export  function getArticleParams(urlString: string) {
	const url = new URL(urlString);
	const slugCheck = Boolean(url.searchParams.get("check_slug") || false);
	const slug = url.searchParams.get("slug") || "";
	const ctgy = url.searchParams.get("ctgy") || "default";
	const pt = url.searchParams.get("pt") || "default";
	const sq = url.searchParams.get("sq") || "";
	const pageId = url.searchParams.get("pageId") || "";

	return {slugCheck, ctgy, pt, sq, slug, pageId};
}
export  function getPaginationParams(urlString: string) {
	const url = new URL(urlString);
	const page = Number(url.searchParams.get("page") || "1");
	const pageSize = Number(url.searchParams.get("pageSize") || "10");
	const offset = (page - 1) * pageSize;
	return {page, pageSize, offset};
}


export async function checkSlugExists(slug: string, ctgy: string, pt: string, pageId?: string) {
	const checkSlugQuery = `
		SELECT COUNT(*) AS count 
		FROM \`${projectId}.${dataSet}.blog_slug\` s
		JOIN \`${projectId}.${dataSet}.blog_page\` p ON s.page_id = p.page_id
		JOIN \`${projectId}.${dataSet}.blog_page_status\` ps ON p.status_id = ps.status_id
		JOIN \`${projectId}.${dataSet}.blog_category\` c ON p.category_id = c.category_id
		JOIN \`${projectId}.${dataSet}.page_type\` t ON p.type_id = t.type_id
		WHERE s.slug_name = @slug
		AND ps.status_name != 'archived'
		AND c.category_slug = @ctgy
		AND t.type_slug = @pt
		${pageId ? 'AND p.page_id != @pageId' : ''} 
	`;

	try {
		const [slugExistsResult] = await bigquery.query( {
			query: checkSlugQuery,
			params: { slug, ctgy, pt, pageId: pageId ?? null },
		});

		const exists = slugExistsResult[0]?.count > 0;
		return exists;
	} catch (error) {
		console.error("Error checking slug existence:", error);
		return false;
	}
}


export async function getTotalRecords(sq: string, ctgy: string, pt: string) {
	const totalCountQuery = `
		SELECT COUNT(*) AS total 
		FROM \`${projectId}.${dataSet}.blog_page\` AS bp
		LEFT JOIN \`${projectId}.${dataSet}.blog_page_status\` AS s ON bp.status_id = s.status_id
		LEFT JOIN \`${projectId}.${dataSet}.blog_category\` AS c ON bp.category_id = c.category_id
		LEFT JOIN \`${projectId}.${dataSet}.page_type\` AS t ON bp.type_id = t.type_id
		LEFT JOIN \`${projectId}.${dataSet}.blog_title\` AS ti ON bp.title_id = ti.title_id
		LEFT JOIN \`${projectId}.${dataSet}.blog_slug\` AS sl ON bp.slug_id = sl.slug_id
		WHERE 
			s.status_name != 'archived'
			${ctgy !== 'default' ? `AND c.category_slug = '${ctgy}'` : ''}
			${pt !== 'default' ? `AND t.type_slug = '${pt}'` : ''}
			${sq ? `AND (
				CAST(bp.page_id AS STRING) LIKE '%${sq}%' OR
				LOWER(c.category_name) LIKE '%${sq.toLowerCase()}%' OR
				LOWER(s.status_name) LIKE '%${sq.toLowerCase()}%' OR
				LOWER(t.type_name) LIKE '%${sq.toLowerCase()}%' OR
				LOWER(ti.title_name) LIKE '%${sq.toLowerCase()}%' OR
				LOWER(sl.slug_name) LIKE '%${sq.toLowerCase()}%'
			)` : ''}
	`;

	try {
		const [totalCountResult] = await bigquery.query(totalCountQuery);
	
		if (!Array.isArray(totalCountResult) || totalCountResult.length === 0) {
			console.warn("No data returned from totalCountQuery.");
			return { totalRecords: 0, totalPages: 0 };
		}
	
		const totalRecords = totalCountResult[0]?.total ?? 0;
		const totalPages = Math.ceil(totalRecords / 10);
	
		return { totalRecords, totalPages };
	} catch (error) {
		console.error("Error executing totalCountQuery:", error);
		return { totalRecords: 0, totalPages: 0 }; 
	}
	
}



export function getArticlesQuery(pageSize: number, offset: number, ctgy: string, pt: string, sq: string) {
	return `
		SELECT 
			bp.page_id,
			c.category_name,
			c.category_slug,
			s.status_name,
			t.type_name,
			t.type_slug,
			ti.title_name,
			sl.slug_name,
			con.content_body,
			d.description_body,
			k.keyword_body,
			a.author_name,
			bp.created_at,
			ARRAY(
				SELECT AS STRUCT 
					i.image_path, 
					i.image_caption, 
					i.image_alt 
				FROM 
					\`${projectId}.${dataSet}.blog_image\` AS i
				WHERE 
					i.page_id = bp.page_id
			) AS images,
			 ARRAY(
				SELECT 
					i.time_edit, 
				FROM 
					\`${projectId}.${dataSet}.blog_edited\` AS i
				WHERE 
					i.blog_id = bp.page_id
			) AS blog_edited
		FROM 
			\`${projectId}.${dataSet}.blog_page\` AS bp
		LEFT JOIN \`${projectId}.${dataSet}.blog_category\` AS c ON bp.category_id = c.category_id
		LEFT JOIN \`${projectId}.${dataSet}.blog_page_status\` AS s ON bp.status_id = s.status_id
		LEFT JOIN \`${projectId}.${dataSet}.page_type\` AS t ON bp.type_id = t.type_id
		LEFT JOIN \`${projectId}.${dataSet}.blog_title\` AS ti ON bp.title_id = ti.title_id
		LEFT JOIN \`${projectId}.${dataSet}.blog_slug\` AS sl ON bp.slug_id = sl.slug_id
		LEFT JOIN \`${projectId}.${dataSet}.blog_content\` AS con ON bp.content_id = con.content_id
		LEFT JOIN \`${projectId}.${dataSet}.blog_description\` AS d ON bp.description_id = d.description_id
		LEFT JOIN \`${projectId}.${dataSet}.blog_keywords\` AS k ON bp.keyword_id = k.keyword_id
		LEFT JOIN \`${projectId}.${dataSet}.blog_author\` AS a ON bp.author_id = a.author_id 
		WHERE 
			s.status_name != 'archived'
			${ctgy !== 'default' ? `AND c.category_slug = '${ctgy}'` : ''}
			${pt !== 'default' ? `AND t.type_slug = '${pt}'` : ''}
			${sq ? `AND (
				CAST(bp.page_id AS STRING) LIKE '%${sq}%' OR
				LOWER(c.category_name) LIKE '%${sq.toLowerCase()}%' OR
				LOWER(s.status_name) LIKE '%${sq.toLowerCase()}%' OR
				LOWER(t.type_name) LIKE '%${sq.toLowerCase()}%' OR
				LOWER(ti.title_name) LIKE '%${sq.toLowerCase()}%' OR
				LOWER(sl.slug_name) LIKE '%${sq.toLowerCase()}%'
			)` : ''}
		ORDER BY bp.created_at DESC
		LIMIT ${pageSize} OFFSET ${offset}
	`;
}

