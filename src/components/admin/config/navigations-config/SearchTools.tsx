import React, { useState } from 'react'
import {
  Card,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, Minus } from "lucide-react";
import { useConfigStore } from '@/store/useConfigStore'; 

const SearchTools = () => {
  const {setSearchTools, searchTools}=useConfigStore();

  const [tourInput, setTourInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const [mediaInput, setMediaInput] = useState("");
  const [editing, setEditing] = useState<{ category: string, index: number } | null>(null);
  const [editValue, setEditValue] = useState("");


  const addSearchTool = (category: 'tours' | 'services' | 'media', name:string) => {
    if (!name.trim()) return;
    setSearchTools({
      [category]: [...searchTools[category], {name}]
    });

    if (category === "tours") setTourInput("");
    if (category === "services") setServiceInput("");
    if (category === "media") setMediaInput("");
  }

  const updateSearchTool = (category: 'tours' | 'services' | 'media', index: number, newName: string) => {
    if (!newName.trim()) return;
    const updatedTools = searchTools[category].map((item, i) => i === index ? { name: newName } : item);
    setSearchTools({ [category]: updatedTools });
    setEditing(null);
  }

  

  return (
    <div>
      <Card className='py-5 px-10 mb-10 rounded-lg'>
      <h1 className="text-xl pb-3">Search Tools Navigation</h1>
      <div className=''>
      <div>
      <label htmlFor="tours" className='text-primary-500'>Book a Tour, Travel and Meet Her</label>
      <br />
      <input
      id='tours'
          type="text"
          placeholder="Add nav list"
          value={tourInput}
          onChange={(e)=>setTourInput(e.target.value)}
          className="p-2 border border-gray-400 w-[400px] h-[30px] rounded-md"
        />
        <Button className='ml-3 border border-green-500 h-[30px] w-[40px]' onClick={()=>addSearchTool('tours',tourInput)}>add</Button><br />

        {searchTools?.tours?.map((nav,index)=>(
              <Collapsible className='mt-2 w-[452px]' key={nav.name} >
              <div className='border border-gray-400 flex justify-between px-2'>
              {editing?.category === 'tours' && editing?.index === index ? (
                  <input 
                    type="text" 
                    value={editValue} 
                    onChange={(e) => setEditValue(e.target.value)} 
                    onBlur={() => updateSearchTool('tours', index, editValue)}
                    onKeyDown={(e) => e.key === 'Enter' && updateSearchTool('tours', index, editValue)}
                    className="border border-gray-300 px-2 w-full"
                  />
                ) : (
                  <span onClick={() => { setEditing({category:'tours', index}); setEditValue(nav.name); }} className='cursor-pointer'> {nav.name}</span>
                )}
          <div className='flex gap-3'>
               <Minus size={20} className='text-red-400 cursor-pointer' />
          <CollapsibleTrigger asChild>
        <button type="button">
          <ChevronDown size={20} />
        </button>
        </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent>
        <div className="flex border border-gray-400 ">
                          <label htmlFor="link" className="px-2 text-base">
                            Link
                          </label>
                          <input
                            type="text"
                            placeholder="Link"
                            className="px-2 border border-gray-400 text-base w-[421px]"
                          />
                        </div>
        </CollapsibleContent>
      </Collapsible>
        ))}
      </div>
      
          
<div className='mt-10'>
<label htmlFor="service" className='text-primary-500'>Service Options We Offer</label>
      <br />
      <input
      id='service'
          type="text"
          placeholder="Add nav list"
          className="p-2 border border-gray-400 w-[400px] h-[30px] rounded-md"
          value={serviceInput}
          onChange={(e)=> setServiceInput(e.target.value)}
        />
        <Button className='ml-3 border border-green-500 h-[30px] w-[40px] '  onClick={()=>addSearchTool('services',serviceInput)}>add</Button>
        {searchTools?.services?.map((nav,index)=>(
              <Collapsible className='mt-2 w-[452px]' key={nav.name} >
              <div className='border border-gray-400 flex justify-between px-2'>
              {editing?.category === 'services' && editing?.index === index ? (
                  <input 
                    type="text" 
                    value={editValue} 
                    onChange={(e) => setEditValue(e.target.value)} 
                    onBlur={() => updateSearchTool('services', index, editValue)}
                    onKeyDown={(e) => e.key === 'Enter' && updateSearchTool('services', index, editValue)}
                    className="border border-gray-300 px-2 w-full"
                  />
                ) : (
                  <span onClick={() => { setEditing({category:'services', index}); setEditValue(nav.name); }} className='cursor-pointer'> {nav.name}</span>
                )}
          <div className='flex gap-3'>
               <Minus size={20} className='text-red-400 cursor-pointer' />
          <CollapsibleTrigger asChild>
        <button type="button">
          <ChevronDown size={20} />
        </button>
        </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent>
        <div className="flex border border-gray-400 ">
                          <label htmlFor="link" className="px-2 text-base">
                            Link
                          </label>
                          <input
                            type="text"
                            placeholder="Link"
                            className="px-2 border border-gray-400 text-base w-[421px]"
                          />
                        </div>
        </CollapsibleContent>
      </Collapsible>
        ))}

</div>

<div className='mt-10'>
<label htmlFor="media" className='text-primary-500'>Media & Client Testimonials</label>
      <br />
      <input
      id='media'
          type="text"
          placeholder="Add nav list"
          className="p-2 border border-gray-400 w-[400px] h-[30px] rounded-md"
          value={mediaInput}
          onChange={(e)=> setMediaInput(e.target.value)}
        />
        <Button className='ml-3 border border-green-500 h-[30px] w-[40px] ' onClick={()=>addSearchTool('media',mediaInput)}>add</Button>
        {searchTools?.media?.map((nav,index)=>(
              <Collapsible className='mt-2 w-[452px]' key={nav.name} >
              <div className='border border-gray-400 flex justify-between px-2'>
              {editing?.category === 'media' && editing?.index === index ? (
                  <input 
                    type="text" 
                    value={editValue} 
                    onChange={(e) => setEditValue(e.target.value)} 
                    onBlur={() => updateSearchTool('media', index, editValue)}
                    onKeyDown={(e) => e.key === 'Enter' && updateSearchTool('media', index, editValue)}
                    className="border border-gray-300 px-2 w-full"
                  />
                ) : (
                  <span onClick={() => { setEditing({category:'media', index}); setEditValue(nav.name); }} className='cursor-pointer'> {nav.name}</span>
                )}
          <div className='flex gap-3'>
               <Minus size={20} className='text-red-400 cursor-pointer' />
          <CollapsibleTrigger asChild>
        <button type="button">
          <ChevronDown size={20} />
        </button>
        </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent>
        <div className="flex border border-gray-400 ">
                          <label htmlFor="link" className="px-2 text-base">
                            Link
                          </label>
                          <input
                            type="text"
                            placeholder="Link"
                            className="px-2 border border-gray-400 text-base w-[421px]"
                          />
                        </div>
        </CollapsibleContent>
      </Collapsible>
        ))}

</div>
      </div>
      </Card>
    </div>
  )
}

export default SearchTools
