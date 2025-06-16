import type React from 'react';
import { useEffect, useState } from 'react';
import { toast } from "sonner"; 
import { useConfigStore } from '@/store/useConfigStore'; 
import {
  Card,
} from "@/components/ui/card"
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
import { X } from 'lucide-react';



const Colors = () => {
    const [addColor, setAddColor]= useState<string>('');
    const [editColor, setEditColor]= useState<string>('');
    const [add, setAdd]= useState<string>('');
    const [edit, setEdit]= useState<string>('');
    const [_level, _setLevel] = useState<'primary' | 'secondary' | 'accent' | ''>('');
    const [openDialog, setOpenDialog]= useState<boolean>(false);
    const [deleteColor, setDeleteColor] = useState<string>('');
    const [invalidColors, setInvalidColors] = useState<{ primary: boolean; secondary: boolean; accent: boolean }>({
      primary: false,
      secondary: false,
      accent: false,
    });
    const {colors, setColors}= useConfigStore();
  
    
            //colors
const hexToRGB = (hex: string): [number, number, number] => {
  hex = hex.replace(/^#/, '');
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
};

const adjustBrightness = (r: number, g: number, b: number, percent: number): string => {
  const newR = Math.min(255, Math.max(0, Math.round(r + (255 - r) * (percent / 100))));
  const newG = Math.min(255, Math.max(0, Math.round(g + (255 - g) * (percent / 100))));
  const newB = Math.min(255, Math.max(0, Math.round(b + (255 - b) * (percent / 100))));

  return `#${((1 << 24) | (newR << 16) | (newG << 8) | newB).toString(16).slice(1).toUpperCase()}`;
};


const generateShades = (hex: string) => {


  const [r, g, b] = hexToRGB(hex);  


  return {
    50: adjustBrightness(r, g, b, 45),
    100: adjustBrightness(r, g, b, 35),
    200: adjustBrightness(r, g, b, 25),
    300: adjustBrightness(r, g, b, 15),
    400: adjustBrightness(r, g, b, 5),
    500: `#${hex.replace(/^#/, '').toUpperCase()}`, 
    600: adjustBrightness(r, g, b, -10),
    700: adjustBrightness(r, g, b, -20),
    800: adjustBrightness(r, g, b, -30),
    900: adjustBrightness(r, g, b, -40),
  };
};
  


// const validateAndFormatHex = (color: string) => {
//   if (!color.startsWith("#")) {
//     color = `#${color}`;
//   }
//   return /^#[0-9A-Fa-f]{6}$/.test(color) ? color : null;
// };

const primaryShades = generateShades(colors.primary);
const secondaryShades = generateShades(colors.secondary);
const accentShades = generateShades(colors.accent);



    const fetchColors= async() =>{
          const response= await fetch('/api/configuration/branding/colors');
          const data=await response.json();
          const _colors: { color_level: string; [key: string]: string | number }[] = data.data;

          const getColor = (level: string) => {
            const colorObj = _colors.find((c) => c.color_level === level);
            return colorObj?.[500] ?? '';
          };
      
          setColors({
            primary: String(getColor("primary")),
            secondary: String(getColor("secondary")),
            accent: String(getColor("accent")),
          });
    }

    useEffect(()=>{
      fetchColors();
    },[])

   const handleAddorEditColors= (level: 'primary' | 'secondary' | 'accent')=>{
      if(colors[level]) {
        setAdd('')
        _setLevel(level);
        setEdit(level);
        setEditColor(colors[level]);
        setOpenDialog(true);
      }
      else{
        setEdit('');
        _setLevel(level);
        setAdd(level);
        setOpenDialog(true);
      }
   }

   const handleAddColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newColor = e.target.value.trim();
  
    // Ensure the color starts with #
    if (!newColor.startsWith("#")) {
      newColor = `#${newColor}`;
    }
  
    // Validate the color format
    const isValid = /^#[0-9A-Fa-f]{6}$/.test(newColor);
  
    // Update input state
    setAddColor(newColor);
  
    setInvalidColors((prev) => ({
      ...prev,
      [_level]: !isValid, 
    }));
  
    if (isValid) {
      setColors({
        ...colors,
        [_level]: newColor,
      });
    }
  };

  const handleEditColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newColor = e.target.value.trim();
  
    // Ensure the color starts with #
    if (!newColor.startsWith("#")) {
      newColor = `#${newColor}`;
    }
  
    // Validate the color format
    const isValid = /^#[0-9A-Fa-f]{6}$/.test(newColor);
  
    // Update input state
    setEditColor(newColor);
  
    setInvalidColors((prev) => ({
      ...prev,
      [_level]: !isValid, 
    }));
  
    if (isValid) {
      setColors({
        ...colors,
        [_level]: newColor,
      });
    }
  };
  
  useEffect(()=>{
    console.log(addColor)
  },[addColor])

  const handleSaveColor= async ()=>{
    if (!_level) return;

    if(add) {

      const colorValue = addColor?.trim();
    const isValid = /^#[0-9A-Fa-f]{6}$/.test(colorValue);
    if (!isValid) {
      toast.error("Invalid value");
      return;
    }


      const payload = {
        color_level: _level,
        color_shade: generateShades(colors[_level]), 
      };
    
      try {
        const response = await fetch("/api/configuration/branding/colors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        const {error}= data;
        if(error) {toast.error(error)}
        if (!response.ok) return;
        toast.success(data.message);
        setAdd('');
        setAddColor('');
        _setLevel('');

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        toast.error(`Error: ${errorMessage}`);
      }
    }
    else{
       
      try{
        const colorValue = editColor?.trim();
    const isValid = /^#[0-9A-Fa-f]{6}$/.test(colorValue);
    if (!isValid) {
      toast.error("Invalid value");
      return;
    }
        const payload={
          color_shade: generateShades(colors[_level]),
        }

      const response = await fetch(`/api/configuration/branding/colors/${_level}`, {
          method:"PUT",
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(payload),
      });
      const data = await response.json();
      const {error}= data;
      if(error) {toast.error(error)}
      if (!response.ok) return;
      toast.success(data.message);
      setEdit('');
      setEditColor('');
      _setLevel('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(`Error: ${errorMessage}`);
    }
    }
  }

  const handleDeleteColor = (e: React.MouseEvent<SVGElement, MouseEvent>,color:string ,level: 'primary' | 'secondary' | 'accent') => {
    setDeleteColor(color);
      _setLevel(level);
      setOpenDialog(true);
  }

  const handleConfirmDelete = async()=>{
     try{
      const response= await fetch(`/api/configuration/branding/colors/${_level}`, {
        method:"DELETE",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(_level),
    });
    const data = await response.json();
    const {error}= data;
    if(error) {toast.error(error)}
    if (!response.ok) return;
    toast.success(data.message);
    fetchColors();
    setDeleteColor('');
     }
   catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    toast.error(`Error: ${errorMessage}`);
  }
  }



  const handleCloseColorModal =()=>{
    setAdd('');
    setEdit('');
    setAddColor('');
    setEditColor('');
    setDeleteColor('');
    _setLevel('');
  }
  
  
  return (
    <div>
      <Card className='mt-5 py-5 px-10 rounded-lg '>
      <h1 className='text-2xl mb-5'>Theme</h1>
     <div className='flex flex-col gap-5'>
     <div className='flex items-center'>
    
    <ul className='flex gap-10'>

      <li>
    <p className='flex items-center'> Primary: <span className='border border-gray-400 py-1 px-3  cursor-pointer' onClick={()=>handleAddorEditColors('primary')}>{colors.primary || 'no color'}</span> {colors.primary && <X size={15} className='text-red-500 ml-1 cursor-pointer' onClick={(e)=>handleDeleteColor(e,colors.primary,'primary')} /> } </p>
      </li>
      <li>
      <p className='flex items-center'> Secondary: <span className='border border-gray-400 py-1 px-3 cursor-pointer' onClick={()=>handleAddorEditColors('secondary')} >{colors.secondary || 'no color'}</span> {colors.secondary && <X size={15} className='text-red-500 ml-1 cursor-pointer' onClick={(e)=>handleDeleteColor(e,colors.secondary,'secondary')} /> } </p>
      </li>

      <li>
      <p className='flex items-center'> Accent: <span className='border border-gray-400 py-1 px-3 cursor-pointer' onClick={()=>handleAddorEditColors('accent')} >{colors.accent || 'no color'}</span>  {colors.accent && <X size={15} className='text-red-500 ml-1 cursor-pointer' onClick={(e)=>handleDeleteColor(e,colors.accent,'accent')} />} </p>
      </li>
    </ul>
   </div>


<div className='flex flex-col gap-10'>
 
<ul className='flex gap-2 items-center'>
  <span style={{color:primaryShades[500]}}>P</span>
  {(!invalidColors.primary && colors.primary  && primaryShades && Object.keys(primaryShades).length > 0
    ? Object.entries(primaryShades).map(([shade, color]) => (
        <li key={shade} style={{ backgroundColor: color }} className="pb-1 text-white h-[60px] w-[70px] rounded-md text-sm flex items-end text-center">
          {shade}: {color}
        </li>
      ))
    : <li style={{ backgroundColor: "#FFFFFF" }} className="p-1 border border-gray-300 text-black h-[60px] w-[70px] rounded-md text-xs flex items-end text-center">No shades available</li>
  )}
</ul>

<ul className='flex gap-2 items-center'>
<span style={{color:secondaryShades[500]}}>S</span>
  {(!invalidColors.secondary && colors.secondary && secondaryShades && Object.keys(secondaryShades).length > 0
    ? Object.entries(secondaryShades).map(([shade, color]) => (
        <li key={shade} style={{ backgroundColor: color }} className="pb-1 text-white h-[60px] w-[70px] rounded-md text-sm flex items-end text-center">
          {shade}: {color}
        </li>
      ))
    : <li style={{ backgroundColor: "#FFFFFF" }} className="p-1 border border-gray-300 text-black h-[60px] w-[70px] rounded-md text-xs flex items-end text-center">No shades available</li>
  )}
</ul>

<ul className='flex gap-2 items-center'>
<span style={{color:accentShades[500]}}>A</span>
  {(!invalidColors.accent && colors.accent && accentShades && Object.keys(accentShades).length > 0
    ? Object.entries(accentShades).map(([shade, color]) => (
        <li key={shade} style={{ backgroundColor: color }} className="pb-1 text-white h-[60px] w-[70px] rounded-md text-sm flex items-end text-center">
          {shade}: {color}
        </li>
      ))
    : <li style={{ backgroundColor: "#FFFFFF" }} className="p-1 border border-gray-300 text-black h-[60px] w-[70px] rounded-md text-xs flex items-end text-center">No shades available</li>
  )}
</ul>
</div>
     </div>
      </Card>


      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
  <AlertDialogContent className='w-[270px]'>
    <AlertDialogHeader>
      <AlertDialogTitle>{add ? `Add ${_level} color` : edit? `Edit ${_level} color` : `Delete ${_level} color` }</AlertDialogTitle>
      <AlertDialogDescription>
   {deleteColor ? deleteColor :
       <input
       type="text"
       placeholder="Hex Color"
       className="border border-gray-400 py-2 px-3"
       value={edit ? editColor : addColor}
       onChange={(e) => {
         if (edit) {
           handleEditColor(e);
         } else {
           handleAddColor(e);
         }
       }}
     />
   }
{_level && colors[_level] && invalidColors[_level] && 'Invalid value'}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={handleCloseColorModal}>Cancel</AlertDialogCancel>
      {deleteColor ?  <AlertDialogAction className= 'bg-red-400' onClick={handleConfirmDelete}>confirm delete</AlertDialogAction> :   <AlertDialogAction className='bg-green-400' onClick={handleSaveColor} >{add? 'add' :'update'}</AlertDialogAction>}
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  )
}

export default Colors
