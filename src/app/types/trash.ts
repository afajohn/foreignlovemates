export type trashArticle = {
  id: number;
  title: string;
  content: string;
  author: string;
  pagestatus: string; 
  metaTag: string;
  keywords: string;
  description: string;
  imagePath: string;
  cluster: string; 
  category: string;
  altText:  string;
  caption: string;
  slug: string; 
  type: string; 
  date: string;
  ds:string;
  category_slug: string;
  type_slug: string;
  user: {
    email: string
    name: string
  };
  // BigQuery
  author_name: string;
  category_name : string;
  content_body : string;
  description_body : string;
  image_path : string;
  keyword_body : string;
  page_id : string;
  slug_name : string;
  status_name : string;
  title_name : string;
  type_name : string;
  created_at: {
    value: string
  };

};
export interface trashArticleFormProps {
  editId: string | number ,
  articlesData: {
    articles: trashArticle[] | null;
    totalPages: number | null;
    categoryNames: Record<number, { [category_name: string]: string }[]>; 
    pageTypeNames: { id: number; slug: string; name: string }[];
    
  };
}

export interface trashArticlesTableProps {
  articlesData: {
    articles: trashArticle[] ;
    totalPages: number;
  };
}

export interface trashArticleProps {
  title: string;
  content: string;
  author: string;
  pagestatus: string;
  metaTag: string;
  keywords: string;
  description: string;
  imagePath: string;
  category: string;
  cluster: string;
  type: string;
  slug: string;
  // message: string;
  loading: boolean;
  pageLink: string;
  altText: string;
  caption: string;
  error: object;
  btnC: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick : (cb:string) => void;
  handleUpdate: (formData: FormData, status: string) => void;
  handleSubmit: (formData: FormData, status: string) => Promise<void>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setCluster: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setMetaTag: React.Dispatch<React.SetStateAction<string>>;
  setKeywords: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setAltText:  React.Dispatch<React.SetStateAction<string>>;
  setCaption:  React.Dispatch<React.SetStateAction<string>>;
  setImagePath: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  // setHoveredArticleId: (id: string) => Promise<void>;
  // handleDelete: (id: number) => Promise<void>;
}
  
export interface Blog {
  page_id: string;
  title_name: string;
  category_name: string;
  category_slug: string;
  slug_name: string;
  altText: string;
  created_at: {
    value:string
  };
  description_body: string;
  content_body: string;
  totalRecords: number;
  author_name: string;
  keyword_body:string;
  url:string;
  images: []
}
