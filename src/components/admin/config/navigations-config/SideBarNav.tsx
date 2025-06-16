import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  CircleHelp,
  Flame,
  Images,
  MenuIcon,
  Video,
  Wrench,
  Ellipsis,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const iconOptions = [
  { name: "settings_icon", component: <Flame /> },
  { name: "dashboard_icon", component: <CircleHelp /> },
  { name: "Images", component: <Images /> },
  { name: "Wrench", component: <Wrench /> },
  { name: "Video", component: <Video /> },
  { name: "MenuIcon", component: <MenuIcon /> },
];

const SideBarNav = () => {
  const [sideNav, setSideNav] = useState<
    Array<{
      title: string;
      icon: string;
      sidebar_id: string;
      items: { name: string; link: string; item_id: string }[];
    }>
  >([]);
  const [title, setTitle] = useState<string>("");
  const [dialogIconOpen, setDialogIconOpen] = useState(false);
  const [selectedSidebarId, setSelectedSidebarId] = useState<string | null>(
    null
  );
  const [openItems, setOpenItems] = useState<Record<string, Record<string, boolean>>>({});
  const [id, setId] = useState<string | null>(null);
  const toggleItem = (sidebarId: string, itemId: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [sidebarId]: {
        ...prev[sidebarId],
        [itemId]: !prev[sidebarId]?.[itemId], // Toggle specific item under sidebar
      },
    }));
  };

  useEffect(() => {
    const fetchSideBarData = async () => {
      const response = await fetch("/api/configuration/branding/sidebar");
      const data = await response.json();
      console.log(data);

      type SidebarItem = {
        title: string;
        icon: string;
        sidebar_id: string;
        item_id?: string;
        name?: string;
        link?: string;
      };

      type SidebarGroup = {
        title: string;
        icon: string;
        sidebar_id: string;
        items: { name: string; link: string; item_id: string }[];
      };

      const groupedSideNav: Record<string, SidebarGroup> = {};

      for (const item of Object.values(
        data.data as Record<string, SidebarItem>
      )) {
        const { sidebar_id, title, icon, item_id, name, link } = item;

        if (!groupedSideNav[sidebar_id]) {
          groupedSideNav[sidebar_id] = {
            title,
            icon,
            sidebar_id,
            items: [],
          };
        }

        if (item_id && name && link) {
          groupedSideNav[sidebar_id].items.push({
            item_id,
            name,
            link,
          });
        }
      }

      setSideNav(Object.values(groupedSideNav));
    };

    fetchSideBarData();
  }, []);

  useEffect(() => {
    console.log(sideNav);
  }, [sideNav]);

  const handleIconChange = (newIcon: string) => {
    if (selectedSidebarId) {
      setSideNav((prevSideNav) =>
        prevSideNav.map((item) =>
          item.sidebar_id === selectedSidebarId
            ? { ...item, icon: newIcon }
            : item
        )
      );
    }
  };

  const handleOpenDialog = (sidebar_id: string) => {
    setSelectedSidebarId(sidebar_id);
    setDialogIconOpen(true);
  };

  const handleAddTitle = async () => {
    if(!id || !title){
      toast.error('incomplete input')
      return;
    } 
    try {
      const payload = {
        title: title,
        id:id,
      };
      const response = await fetch(
        "http://loveme.local/api/configuration/branding/sidebar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      const {error} = data;
      if(error){toast.error(error)}
      if(!response.ok) return;
      setSideNav((prevSideNav) => [
        ...prevSideNav,
        { title, sidebar_id: data.sidebar_id, icon: "", items: [] }, 
      ]);
      toast.success(data.message);
      setTitle('');
      setId('');
    } catch (err) {
      console.error(err);
      
    }
  };

  

  const handleSaveIcon = async (e: React.MouseEvent, selectedIcon?: string) => {
    e.preventDefault();
  
    if (!selectedSidebarId || !selectedIcon) return;
  
    try {
      const response = await fetch(
        `/api/configuration/branding/sidebar/icon/${selectedSidebarId}`,
        {
          method: "PUT", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ icon: selectedIcon }),
        }
      );
      const data= await response.json();
      const {error} = data;
      if(error){toast.error(error)}
      if (!response.ok) return;
      setSideNav((prevSideNav) =>
        prevSideNav.map((nav) =>
          nav.sidebar_id === selectedSidebarId ? { ...nav, icon: selectedIcon } : nav
        )
      );
      toast.success(data.message);
      setSelectedSidebarId("");
      setDialogIconOpen(false);
    } catch (error) {
      console.error("Error saving icon:", error);
    }
  };
  
  

  const handleDialogClose= ()=>{
    setDialogIconOpen(false)
    setSelectedSidebarId('');
  }


  return (
    <div>
      <div className="flex items-center mb-2 gap-2">
        <input
          type="text"
          placeholder="add sidenav list"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-400 rounded-sm w-[450] p-2"
        />
        <input type="text" placeholder="id/order" value={id || ""} onChange={(e)=>setId(e.target.value)} className="w-[115px] border border-gray-400 rounded-sm p-2"/>
        <Button className="border border-green-400" onClick={handleAddTitle}>
          add
        </Button>
      </div>
      <Card className="w-[640px]">
        <ul className="p-5">
          {sideNav.length > 0 ? (
            sideNav.map((nav) => {
              const matchedIcon =
                iconOptions.find((icon) => icon.name === nav.icon)?.component ||
                "";
              return (
                <li key={nav.sidebar_id} className="flex flex-col">
                  <div className="border border-gray-400 py-1 px-3 flex items-center justify-between gap-2">
                    <span className="flex gap-2 items-center">
                     {nav.sidebar_id} {matchedIcon} {nav.title}
                    </span>
                    <span className="flex gap-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="cursor-pointer">
                           edit id
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                           edit name
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => handleOpenDialog(nav.sidebar_id)}
                          >
                            {nav.icon ? 'edit icon' : 'add icon'}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            delete
                          </DropdownMenuItem>
                          <hr />
                          <DropdownMenuItem className="cursor-pointer">
                            add item
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  </div>
                  {nav.items.length > 0 &&
  nav.items.map((item) => (
    <Collapsible
      key={item.item_id}
      open={!!openItems[nav.sidebar_id]?.[item.item_id]}
      onOpenChange={() => toggleItem(nav.sidebar_id, item.item_id)}
    >
      <div className="flex justify-between border border-gray-400">
        <p className="pl-5 py-1">{item.name}</p>
        <CollapsibleTrigger asChild>
          <button type="button" className="pr-3">
            <ChevronDown size={20} />
          </button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <p className="border border-gray-300 pl-5">Link: {item.link}</p>
      </CollapsibleContent>
    </Collapsible>
  ))}
                </li>
              );
            })
          ) : (
            <p>No added sidebar list yet</p>
          )}
        </ul>
      </Card>

     {/* ICON dialog */}
     <Dialog open={dialogIconOpen} onOpenChange={setDialogIconOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Select an Icon</DialogTitle>
    </DialogHeader>
    <select
      value={selectedSidebarId ? sideNav.find(nav => nav.sidebar_id === selectedSidebarId)?.icon || "" : ""}
      onChange={(e) => handleIconChange(e.target.value)}
      className="cursor-pointer border border-gray-400 w-full p-2"
    >
      <option value="" disabled>Select Icon</option>
      {iconOptions.map((option) => (
        <option key={option.name} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
    <div className="flex justify-end gap-2 mt-4">
      <Button variant="outline" onClick={handleDialogClose}>Cancel</Button>
      <Button 
  className="bg-green-400" 
  onClick={(e) => handleSaveIcon(e, sideNav.find(nav => nav.sidebar_id === selectedSidebarId)?.icon)}
>
 confirm
</Button>
    </div>
  </DialogContent>
</Dialog>



    </div>
  );
};

export default SideBarNav;
