"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Entity, UseEntityFormProps } from "@/app/types/entity";
import { useEntityForm } from "@/hooks/useEntity";


export default function CategoryForm({entitiesData, editId }: UseEntityFormProps) {
  const { 
    name, slug,  pagetype, handleClick, loading,
    setName, setSlug, handleSubmit, handleUpdate
  } = useEntityForm(entitiesData as object as Entity, "categories");
  const isFormIncomplete = !name || !slug || !pagetype;
  return (
    <form
      className="space-y-4 p-6 bg-white rounded-lg shadow-md" 
      action= "submit">
      <h2 className="text-xl font-bold">{editId ? "Edit Category" : "Add Category"}</h2>
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" value={slug} onChange={(e) => { setSlug(e.target.value); }} required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="slug">Pagetype</Label>
        <Input id="slug" value={pagetype} onChange={(e) => { setSlug(e.target.value); }} required />
      </div>
      <Button type="submit" className="w-full" disabled={isFormIncomplete}  
        onClick={ () => {
        const formData = new FormData(document.querySelector("form") as HTMLFormElement);
        handleClick();
        if (editId) {
          handleUpdate(formData, );
        } else {
          handleSubmit(formData);
        }
      }} >{editId ? "Update" : "Save"}
      {loading && <svg className="animate-spin h-5 w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Loading">
          <title>Loading spinner</title>
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>}
      </Button>
    </form>
  );
}
