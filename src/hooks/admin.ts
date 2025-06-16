import { useCallback, useEffect, useState } from "react";


//Users data Hooks
export const useUserDataStates = () => {
  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}
    const [userData, setUserData] = useState<User[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
      const [addUser, setAddUser]= useState<boolean>(false);
      const [newUser, setNewUser] = useState("");
      const [editingUser, setEditingUser] = useState<string | null>(null);
      const [editedEmail, setEditedEmail] = useState<string>("");
      const [open, setOpen]= useState<boolean>(false);
      const [deletingEmail, setDeletingEmail]=useState<string>("");
      const [searchQuery, setSearchQuery] = useState("");
      const [editedRole, setEditedRole] = useState<string>('select role');
         const [role, setRole] = useState<string>('select role');

      const handleEditClick = (userEmail: string, role:string) => {
        setEditedRole(role);
        setEditingUser(userEmail);
        setEditedEmail(userEmail);
    };
    const openDeleteConfirmation= (deletingUserEmail:string)=>{
      if(!deletingUserEmail) return;
      setDeletingEmail(deletingUserEmail);
      setOpen(true);
  }


      const fetchUserData = async () => {
        try {
            setLoading(true); 
            const response = await fetch('/api/users');
            const data = await response.json();
            setUserData(data);
        } catch (err) {
            console.error('Error fetching user data', err);
        } finally {
            setLoading(false);
        }
    };

      useEffect(() => {
            fetchUserData();
        }, []);

      return {
        userData,setUserData, loading,setLoading, addUser, setAddUser ,newUser,
        setNewUser, editingUser,setEditingUser, editedEmail,setEditedEmail, open, setOpen,
        deletingEmail, setDeletingEmail, searchQuery, setSearchQuery, fetchUserData,handleEditClick,editedRole, setEditedRole,role, setRole,
        openDeleteConfirmation
      } ;
  
}
//Config hooks

// import { useConfigStore } from "@/store/useConfigStore";

// export const useConfigHooks= () =>{
//       const [navList, setNavList] = useState<
//     { title: string; icon: string; items: { name: string; link: string }[] }[]>([]);
//       const [navInput, setNavInput] = useState<string>("");
//       const [navItemInput, setNavItemInput] = useState<string>("");
//       const [expandedNavIndex, setExpandedNavIndex] = useState<number | null>(null);
//       const [editingNavList, setEditingNavlist] = useState<number | null>(null);
//       const [navInputEdit, setNavInputEdit] = useState<string>("");
//       const [editingNavItem, setEditingNavItem] = useState<{ navIndex: number; itemIndex: number } | null>(null);
//       const [navItemInputEdit, setNavItemInputEdit] = useState<string>("");
//       const [open, setOpen] = useState<boolean>(false);
//       const [selectedList, setSelectedList]= useState<string | null>(null);
//       const [selectedNavItem, setSelectedNavItem]= useState<{ name: string; navIndex: number } | null>(null);
//       const [loadingNav, setLoadingNav] = useState<string | null>(null);  
//       const [rotator, setRotator] = useState<string[]>([]);
//       const [filteredRotator, setFilteredRotator] = useState<string[]>([]);
//       const [search, setSearch] = useState<string>("");
//       const [invalidColors, setInvalidColors] = useState<{ primary: boolean; secondary: boolean; accent: boolean }>({
//         primary: false,
//         secondary: false,
//         accent: false,
//       });
//       const {logo,setLogoUrl,colors,setColors,miniLogo,setMiniLogoUrl, selectedSite, setSelectedSite, headerNavList, setHeaderNavList, searchTools, setSearchTools}= useConfigStore();    
     

//       //GET current data
//       const getCurrentConfig = useCallback(async () => {
//         try {
//           const response = await fetch('/api/configuration');
//           const data = await response.json();
//           if (data[0]) {
//             setLogoUrl(data[0].logo);
//             setMiniLogoUrl(data[0].miniLogo);
//             setSelectedSite(data[0].website);
//             setHeaderNavList(data[0].headerNavs);
//             setSearchTools(data[0].searchTools);
      
//             // const safeHex = (colorObj: Record<number, string>) =>
//             //   /^#[0-9A-Fa-f]{6}$/.test(colorObj[500]) ? colorObj[500] : "#000000";
      
//             // setColors({
//             //   primary: safeHex(data[0].color.primary),
//             //   secondary: safeHex(data[0].color.secondary),
//             //   accent: safeHex(data[0].color.accent),
//             // });
//           }
//         } catch (err) {
//           console.error("Error fetching config:", err);
//         }
//       }, [setLogoUrl, setMiniLogoUrl, setSelectedSite, setColors,setHeaderNavList]);
      
        

//           //diaglog
//           const openDeleteDialog = (type: "navList" | "navItem", title: string, navIndex?: number) => {
//             setOpen(true);
//             if (type === "navList") {
//               setSelectedList(title);
//               setSelectedNavItem(null);
              
//             } else {
//               setSelectedNavItem({ name: title, navIndex: navIndex! });
//               setSelectedList(null);
//             }
//           };
      


//           //sidebar
//     const handleAddNavListItem = () => {
//       if (navItemInput.trim() !== "" && expandedNavIndex !== null) {
//           setNavList((prevNavList) =>
//               prevNavList.map((navItem, index) =>
//                   index === expandedNavIndex
//                       ? { ...navItem, items: [...navItem.items, { name: navItemInput, link: "" }] }
//                       : navItem
//               )
//           );
//           setNavItemInput("");
//           setLoadingNav(navItemInput);
//           setTimeout(() => {
//             setLoadingNav(null);
//         }, 2000);
//       }
//   };

//           const handleIconChange = (index: number, iconName: string) => {
//             setNavList((prevNavList) =>
//                 prevNavList.map((navItem, i) =>
//                     i === index ? { ...navItem, icon: iconName } : navItem
//                 )
//             );
//         };

//           const editNavItem = (navIndex: number, itemIndex: number) => {
//             setEditingNavItem({ navIndex, itemIndex });
//             setNavItemInputEdit(navList[navIndex].items[itemIndex].name);
//         };
        
//     const toggleNavItem = (index: number) => {
//       setExpandedNavIndex((prev) => (prev === index ? null : index)); 
//   };

//   const editNavList = (index: number) => {
//     setEditingNavlist(index);
//     setNavInputEdit(navList[index].title);
// };

// const handleAddNavlist = () => {
//   if (navInput.trim() !== "") { 
//       setNavList((prevNavList) => [
//           ...prevNavList, 
//           { title: navInput, icon: "", items: [] } 
//       ]);
//       setLoadingNav(navInput);
//       setNavInput(""); 
//       setTimeout(() => {
//         setLoadingNav(null);
//     }, 2000);
//   }
// };
      
//         //colors
// // const hexToRGB = (hex: string): [number, number, number] => {
// //   hex = hex.replace(/^#/, '');
  
// //   const r = parseInt(hex.substring(0, 2), 16);
// //   const g = parseInt(hex.substring(2, 4), 16);
// //   const b = parseInt(hex.substring(4, 6), 16);

// //   return [r, g, b];
// // };

// // const adjustBrightness = (r: number, g: number, b: number, percent: number): string => {
// //   const newR = Math.min(255, Math.max(0, Math.round(r + (255 - r) * (percent / 100))));
// //   const newG = Math.min(255, Math.max(0, Math.round(g + (255 - g) * (percent / 100))));
// //   const newB = Math.min(255, Math.max(0, Math.round(b + (255 - b) * (percent / 100))));

// //   return `#${((1 << 24) | (newR << 16) | (newG << 8) | newB).toString(16).slice(1).toUpperCase()}`;
// // };


// // const generateShades = (hex: string) => {


// //   const [r, g, b] = hexToRGB(hex);  


// //   return {
// //     50: adjustBrightness(r, g, b, 45),
// //     100: adjustBrightness(r, g, b, 35),
// //     200: adjustBrightness(r, g, b, 25),
// //     300: adjustBrightness(r, g, b, 15),
// //     400: adjustBrightness(r, g, b, 5),
// //     500: `#${hex.replace(/^#/, '').toUpperCase()}`, 
// //     600: adjustBrightness(r, g, b, -10),
// //     700: adjustBrightness(r, g, b, -20),
// //     800: adjustBrightness(r, g, b, -30),
// //     900: adjustBrightness(r, g, b, -40),
// //   };
// // };
  


// // const validateAndFormatHex = (color: string) => {
// //   if (!color.startsWith("#")) {
// //     color = `#${color}`;
// //   }
// //   return /^#[0-9A-Fa-f]{6}$/.test(color) ? color : null;
// // };

// // useEffect(() => {
// //   setInvalidColors({
// //     primary: !validateAndFormatHex(colors.primary),
// //     secondary: !validateAndFormatHex(colors.secondary),
// //     accent: !validateAndFormatHex(colors.accent),
// //   });
// // }, [colors.primary, colors.secondary, colors.accent]);




//           //set PUT ConfigData
//               const handleSetConfig = async () => {
//                 //   const shades = {
//                 //     primary: generateShades(colors.primary),
//                 //     secondary: generateShades(colors.secondary),
//                 //     accent: generateShades(colors.accent),
//                 // }
//                 if ( !searchTools &&!headerNavList && !selectedSite && !miniLogo  && !logo && navList.length === 0) return;
//                   const formData = new FormData();
//                   if (logo) formData.append("logo", logo);
//                   if (miniLogo) formData.append("miniLogo", miniLogo);
//                   if(selectedSite) formData.append("website", selectedSite);
//                   formData.append("searchTools", JSON.stringify(searchTools));
//                   formData.append("headerNavs", JSON.stringify(headerNavList));
//                   // formData.append("color", JSON.stringify(shades));
//                   formData.append("navlink", JSON.stringify(navList));
//                   try {
//                       const response = await fetch('/api/configuration', {
//                           method: "PUT",
//                           body: formData,
//                       });
//                   } catch (err) {
//                       console.error("Error updating configuration:", err);
//                   }
//               };
          
//            //Delete
//            const handleDeleteList = async (e: React.MouseEvent<HTMLButtonElement>) => {
//             e.preventDefault();
//             let updatedNavList = [...navList]; 
//             if (selectedList) {
//                 updatedNavList = updatedNavList.filter(navItem => navItem.title !== selectedList);
//                 const isSaved = navList.some(navItem => navItem.title === selectedList);
//                 if (isSaved) {
//                     try {
//                         const response = await fetch('/api/configuration', {
//                             method: "DELETE",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify({ title: selectedList }),
//                         });
        
//                         const data = await response.json();
                    
//                     } catch (err) {
//                         console.error("Error deleting item from API:", err);
//                     }
//                 }
//             } else if (selectedNavItem) {
//                 updatedNavList = updatedNavList.map(navItem => ({
//                     ...navItem,
//                     items: navItem.items.filter(item => item.name !== selectedNavItem.name),
//                 }));
//                 const isSaved = navList.some(navItem => 
//                     navItem.items.some(item => item.name === selectedNavItem.name)
//                 );
//                 if (isSaved) {
//                     try {
//                         const response = await fetch('/api/configuration', {
//                             method: "DELETE",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify({ name: selectedNavItem.name }),
//                         });
        
//                         const data = await response.json();
//                     } catch (err) {
//                         console.error("Error deleting item from API:", err);
//                     }
//                 }
//             }
        
//             setNavList(updatedNavList); 
//             setOpen(false);
//         };

        
//     const fetchRotator = useCallback(async () => {
//       const res = await fetch(`/api/ladies/rotator?website=${selectedSite}`);
//       const data = await res.json();
//       return data;
//     }, [selectedSite]); 




//       return { navList,setNavList, navInput, setNavInput, navItemInput, setNavItemInput, expandedNavIndex, setExpandedNavIndex,
//         editingNavList, setEditingNavlist, navInputEdit, setNavInputEdit, editingNavItem, setEditingNavItem, navItemInputEdit, setNavItemInputEdit, open, setOpen,
//         selectedList, setSelectedList,selectedNavItem,setSelectedNavItem,loadingNav,setLoadingNav,colors,setColors, invalidColors, setInvalidColors,handleSetConfig,editNavItem,toggleNavItem,handleDeleteList,editNavList,handleAddNavlist,handleIconChange,handleAddNavListItem,openDeleteDialog,rotator, setRotator,search, setSearch,filteredRotator, setFilteredRotator,getCurrentConfig,fetchRotator
//       }


// }