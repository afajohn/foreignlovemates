'use client'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { SquareChevronDown } from 'lucide-react';
import { useConfigStore } from "@/store/useConfigStore";
import PreviewRotator from './PreviewRotator';

const RotatorConfig = () => {


  return (
    <div>
      <Card className="p-5 mt-5 w-[650px]">
        {/* <h1 className="text-xl">Woman Rotator</h1>

        <Collapsible open={open} onOpenChange={setOpen}>
          <input
            type="text"
            placeholder="You may also search here"
            className="border border-gray-400 p-1 rounded-md mt-5 w-[400px] mr-1"
            value={selectedSite ? selectedSite : search}
            onChange={handleSearch}
          />
          <CollapsibleTrigger asChild>
            <button type="button"  onClick={() => setOpen(!open)}>
              <SquareChevronDown size={25} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 border p-2 rounded-md max-h-[200px] overflow-y-auto">
            {filteredRotator.length > 0 ? (
              <ul>
                {filteredRotator.map((site) => (
                  <li key={site} className="cursor-pointer hover:bg-gray-100 p-2">
                    <button type="button" className="w-full text-left" onClick={() => handleSelectSite(site)}>
                      {site}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found.</p>
            )}
          </CollapsibleContent>
        </Collapsible>
       <PreviewRotator/> */}
      </Card>
    </div>
  );
};

export default RotatorConfig;
