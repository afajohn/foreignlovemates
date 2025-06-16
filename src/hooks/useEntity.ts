import { toast } from "sonner";
import { handleRequest } from "@/_lib/api";
import { generateSlug } from "./useCommon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Entity, EntityProps } from "@/app/types/entity";


export function useEntityForm(entitiesData?: Entity, endpoint?: string) : EntityProps {
  const router = useRouter();
  const [name, setName] = useState(entitiesData?.category_name || entitiesData?.type_name  || "");
  const [slug, setSlug] = useState(entitiesData?.type_slug || entitiesData?.category_slug  ||  "");
  const [pagetype, setPagetype] = useState(entitiesData?.page_type_id || 1);
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isSlugEdited] = useState(!!entitiesData?.slug);
  useEffect(() => {
    if (!isSlugEdited) setSlug(generateSlug(name));
  }, [name, isSlugEdited]);
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(entitiesData?.date || today);
  }, [entitiesData]);
  
  const handleClick = () => {
    setLoading(true);
  };

  const data = { name, slug, pagetype }
  const id = entitiesData?.category_id || entitiesData?.type_id ;
  const handleUpdate = async () => {
		if (!entitiesData) return;
		try {
			await handleRequest(`/api/${endpoint}/${id}`, "PUT", data );
			toast.success(`${endpoint} updated successfully!`);
			router.push(`/afa-admin/${endpoint}`);
			setLoading(false) 
		} catch { 
			toast.error(`Failed to update ${endpoint}`);
			setLoading(false) 
		}
  };
	const handleSubmit = async () => {
		if (!entitiesData) return;
		setLoading(true)
		try {
			await handleRequest(`/api/${endpoint}`, "POST", data );
			toast.success(`added successfully! ${endpoint}`);
			setLoading(false) 
			router.push(`/afa-admin/${endpoint}`);
		} catch {
			toast.error(`Failed to add ${endpoint}`);
			setLoading(false) 
			}
	};

  return {
		handleUpdate, loading, handleClick,
    name, setName, pagetype, setPagetype,
    slug, setSlug, date, handleSubmit, setLoading
  };
}

export function useEntityTable(endpoint: string) {
	const router = useRouter();
	const [deleteEntityId, setDeleteEntityId] = useState<number | null>(null);
	const [dataSource, setDataSource] = useState("json");
	const [message, setMessage] = useState("");
	const [loadingDlt, setloadingDlt] = useState(false);
	const handleDeleteClick = (id: number) => {
		setDeleteEntityId(id);
	};
	const closeDeleteModal = () => {
		setDeleteEntityId(null);
	};
	const confirmDelete = async () => {
		if (!deleteEntityId) return;
		setloadingDlt(true)
		try {
			await handleRequest(`/api/${endpoint}/${deleteEntityId}`, "DELETE");
			toast.success(`${endpoint} deleted successfully!`);
			setloadingDlt(false)
			router.refresh();
		} catch {
			setMessage("Failed to delete article");
			setloadingDlt(false)
			toast.error(`Failed to delete ${endpoint}`);
		} finally {
			closeDeleteModal();
		}
	};

	return {
		loadingDlt,
		message,
		deleteEntityId,
		dataSource,
		setDataSource,
		confirmDelete,
		closeDeleteModal,
		handleDeleteClick,
	};
}
