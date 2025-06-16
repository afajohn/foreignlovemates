"use client";
import { useRouter } from "next/navigation";
import { Pagination } from "./AfaPagination";
import { Button } from "@/components/ui/button";
import { useEntityTable } from "@/hooks/useEntity";
import { Pencil, Trash2 } from "lucide-react";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import type { Entity, UseEntityTableProps } from "@/app/types/entity";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Suspense } from "react";
// import TimePosted from "./shared/timePosted";


export default function PageTypeTable({entitiesData }: UseEntityTableProps) {
  const router = useRouter();
  const {
    loadingDlt,
    handleDeleteClick, deleteEntityId,
    closeDeleteModal, confirmDelete
    } = useEntityTable("page-types");
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Page Type</h2>
        </div>
        <Button onClick={() =>router.push("/afa-admin/page-types/page-type-form?id=new-page-type")} className="bg-green-500">+ Add Page Type</Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <TooltipProvider>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entitiesData.entities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    <h2 className="text-lg font-semibold">No Categories Available</h2>
                    <p className="text-gray-500">Add a new category to see it here.</p>
                    <Button onClick={()=>'openAddPage'} className="mt-4">Create New Category</Button>
                  </TableCell>
                </TableRow>
              ) : (
                entitiesData.entities.map((pageType: Entity) => (
                  <TableRow key={pageType.type_id}>
                    <TableCell>{pageType.type_name}</TableCell>
                    <TableCell>{pageType.type_slug}</TableCell>
                      <TableCell className="flex gap-3">
                        <Tooltip>
                          <TooltipTrigger asChild>
                              <Button 
                                  type="button" 
                                  className="text-gray-500 hover:text-gray-700"  
                                  onClick={() => router.push(`/afa-admin/page-types/page-type-form?id=${pageType.type_id}`)}><Pencil /></Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit Article</TooltipContent>
                          </Tooltip>
                          {/* <Tooltip>
                              <TooltipTrigger asChild>
                              <Button type="button" className="text-purple-500 hover:text-purple-700" onClick={() => {}}> <RefreshCcw /> </Button>
                              </TooltipTrigger>
                              <TooltipContent>Sync to BigQuery</TooltipContent>
                          </Tooltip> */}
                          <Tooltip>
                              <TooltipTrigger asChild>
                                  <Button type="button" className="text-red-500 hover:text-red-700" 
                                  onClick={(e) => { e.stopPropagation(); handleDeleteClick(pageType.type_id ?? `${pageType.type_id}`); }}><Trash2 /> </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete Article</TooltipContent>
                          </Tooltip>
                      </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TooltipProvider>
      </Suspense>
      <Pagination totalPages={entitiesData?.totalPages ?? 0} />
      {deleteEntityId && (
          <Dialog open={true} onOpenChange={closeDeleteModal}>
            <DialogContent className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onInteractOutside={closeDeleteModal} >
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                  <DialogHeader>
                      <DialogTitle className="text-xl font-bold">Confirm Deletion</DialogTitle>
                  </DialogHeader>
                  <p className="text-center text-gray-700">Are you sure you want to delete this article?</p>
                  <DialogFooter className="flex justify-center gap-4 mt-4">
                    <Button variant="outline" onClick={closeDeleteModal}>
                      Cancel
                    </Button>
                    <Button className="bg-red-500 text-white" onClick={confirmDelete}>
                      Confirm Delete
                      {loadingDlt && <svg className="animate-spin h-5 w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Loading">
                        <title>Loading spinner</title>
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>}
                    </Button>
                  </DialogFooter>
                </div>
            </DialogContent>
          </Dialog>
        )}
    </div>
  );
}
