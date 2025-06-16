import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import { useConfigStore } from "@/store/useConfigStore";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Minus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


interface NavItem {
  name: string;
  link: string;
}

const HeaderNav = () => {
  const { headerNavList, setHeaderNavList } = useConfigStore();
  const [navItem, setNavItem] = useState<NavItem>({ name: "", link: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [open, setOpen]= useState<boolean>(false);
  const [itemToDelete, setItemToDelete]= useState<string | undefined>();

  const handleAddList = () => {
    if (!navItem.name) return;
    setHeaderNavList([...headerNavList, navItem]);
    setNavItem({ name: "", link: "" });
  };

  const handleSaveEdit = (index: number) => {
    if (editValue.trim() === "") return;
    const updatedList = [...headerNavList];
    updatedList[index] = { ...updatedList[index], name: editValue };
    setHeaderNavList(updatedList);
    setEditingIndex(null);
  };

  const openDeleteDialog= (item:string)=>{
    setItemToDelete(item)
    setOpen(true)
  }

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    const updatedList = headerNavList.filter((item) => item.name !== itemToDelete);
    const isSaved = headerNavList.some((item) => item.name === itemToDelete);

    if (isSaved) {
      try {
        const response = await fetch('/api/configuration', {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ headerNav: itemToDelete }),
        });

        const data = await response.json();
        if (data.message === "Configuration updated") {
          console.log("Delete successful");
        }
      } catch (err) {
        console.error("Error deleting item from API:", err);
      }
    }

    setHeaderNavList(updatedList);
    setOpen(false);
  };
  


  return (
    <div>
      <Card className="py-5 px-10 mb-5 rounded-lg">
        <h1 className="text-xl pb-3">Header Navigation</h1>
        <input
          type="text"
          value={navItem.name}
          placeholder="Add nav list"
          className="p-2 border border-gray-400 w-[400px] rounded-md"
          onChange={(e) => setNavItem({ ...navItem, name: e.target.value })}
        />
        <Button className="ml-3 border border-green-400" onClick={handleAddList}>
          add
        </Button>
        <ul className="mt-2">
          {headerNavList.length > 0 ? (
            headerNavList.map((item, index) => (
              <Collapsible className="w-[470px]" key={`${item.name}-${index}`}>
                <div className="border border-gray-400 flex justify-between p-2">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editValue}
                      className="p-1 border border-gray-400 w-full "
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSaveEdit(index)}
                      onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(index)}
                    />
                  ) : (
                    <li
                      className="cursor-pointer"
                      onClick={() => {
                        setEditingIndex(index);
                        setEditValue(item.name);
                      }}
                    >
                      {item.name}
                    </li>
                  )}
                    <div className="flex gap-3">
                    <Minus size={20} className='text-red-400 cursor-pointer' onClick={()=>openDeleteDialog(item.name)} />
                    <CollapsibleTrigger asChild>
                    <button type="button">
                      <ChevronDown size={20} />
                    </button>
                  </CollapsibleTrigger>
                    </div>
                </div>
                <CollapsibleContent className="flex">
                  <div className="flex border border-gray-400 ">
                    <label htmlFor="link" className="px-2 text-base">
                      Link
                    </label>
                    <input
                      type="text"
                      value={item.link || ""}
                      onChange={(e) => {
                        const updatedList = [...headerNavList];
                        updatedList[index] = { ...updatedList[index], link: e.target.value };
                        setHeaderNavList(updatedList);
                      }}
                      placeholder="Link"
                      className="px-2 border border-gray-400 text-base w-[421px]"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))
          ) : (
            <li>No items added yet</li>
          )}
        </ul>
      </Card>


      <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete this item?</AlertDialogTitle>
      <AlertDialogDescription>
        {itemToDelete}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>setOpen(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-red-400 hover:bg-red-500" onClick={handleDeleteItem}>Confirm Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  );
};

export default HeaderNav;
