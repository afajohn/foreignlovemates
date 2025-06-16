export interface Entity {
  id: number;
  name: string;
  pagetype: number;
  date: string;
  slug: string;
  user: {
    email: string
    name: string
  };
  type_id: number;
  type_name: string;
  type_slug: string;
  category_id: number;
  category_name: string;
  category_slug: string;
  page_type_id: number;
}
export interface UseEntityFormProps {
  editId: number, 
  entitiesData: {
    entities: Entity[];
    totalPages: number;
  }
}
export interface UseEntityTableProps {
  entitiesData: {
    entities: Entity[];
    totalPages: number;
  }
}  
export interface EntityProps {
  name: string;
  pagetype: number;
  date: string;
  slug: string;
  loading: boolean;
  // message:string;
  // session: Session | null;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPagetype: React.Dispatch<React.SetStateAction<number>>;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // handleSlugChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
  handleClick : () => void;
  handleUpdate: (formData: FormData) => void;
  handleSubmit: (formData: FormData) => Promise<void>;
}
