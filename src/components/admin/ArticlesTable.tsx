"use client";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import TimePosted from "./shared/timePosted";
import { Pagination } from "./AfaPagination";
import { Button } from "@/components/ui/button";
import { useArticleTable } from "@/hooks/useArticle";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Pencil, RefreshCcw, Trash2 } from "lucide-react";
import type { Article, ArticlesTableProps } from "@/app/types/article";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";

export default function ArticlesTable({ articlesData }: ArticlesTableProps) {
	const router = useRouter();
	const { 
		confirmDelete,
		closeDeleteModal,
		loadingDltArt,
		searchQuery, setSearchQuery,
		deleteArticleId, handleDeleteClick,
		dataSource, handleDataSourceChange, 
		hoveredArticleId, setHoveredArticleId,
		loadingArticleId, loadingPage, setLoadingPage,
		setLoadingArticleId, sqArticles
	} = useArticleTable();
	const displayedArticles = sqArticles && sqArticles.length > 0 ? sqArticles  : articlesData;
	return (
		<div className="p-6 bg-white rounded-lg shadow-md">
			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center gap-4">
					<h2 className="text-2xl font-bold">Articles</h2>
					<Select onValueChange={handleDataSourceChange} defaultValue={dataSource}>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="Select source" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="json">JSON File</SelectItem>
							<SelectItem value="bigquery">BigQuery</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="flex items-center gap-4">
					<input
						type="text"
						placeholder="Search articles..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="border rounded-lg px-4 py-2"
					/>
					<Button className="bg-green-500" onClick={() =>router.push(`/afa-admin/articles/article-form?id=new-article&ds=${dataSource}`)}> + Add Article </Button>
				</div>
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<TooltipProvider>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Page Title</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Page Type</TableHead>
								<TableHead>Published By</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Published Date</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ displayedArticles?.articles.length === 0 ? (
								<TableRow>
									<TableCell colSpan={7} className="text-center py-10">
										<h2 className="text-lg font-semibold">You have no articles</h2>
										<p className="text-gray-500">
											Articles will show here once you&apos;ve published them.
										</p>
										<Button className="mt-4">Create New Article</Button>
									</TableCell>
								</TableRow>
							) : (
								displayedArticles?.articles.map((article: Article) => {
									const articleId = String(article.id ?? article.page_id);
									const ds = dataSource === "json"? '': '&ds=bigquery'
									const slg = article.slug ?? article.slug_name;
									const cat = article.category ?? article.category_slug;
									// const tp = article.type ?? article.type_name;
									return (
										<TableRow
											key={article.id ?? `${article.page_id}`}
											className="cursor-pointer hover:bg-gray-100"
											onMouseEnter={() => setHoveredArticleId(articleId)}
											onMouseLeave={() => setHoveredArticleId('')}
											>
											<TableCell>
													{hoveredArticleId === articleId ? (
															<a href={`/${cat}/${slg}`} className="text-blue-500 underline" > 
																	<span>{article.title ?? `${article.title_name}`}</span>
															</a>
													): <span>{article.title ?? `${article.title_name}`}</span>}
											</TableCell>
											<TableCell>{article.category ?? `${article.category_name}`}</TableCell>
											<TableCell>{article.type ?? `${article.type_name}` }</TableCell>
											<TableCell>{article.author ?? `${article.author_name}`}</TableCell>
											<TableCell>{article.pagestatus ?? `${article.status_name}`}</TableCell>
											<TableCell> <TimePosted dateString={article.date ?? `${article.created_at.value}`}/></TableCell>
											<TableCell className="flex gap-3">
												<Tooltip>
													<TooltipTrigger asChild>
														<Button 
															type="button" 
															className="text-gray-500 hover:text-gray-700"  
															onClick={() => { 
																setLoadingArticleId(articleId); 
																router.push(`/afa-admin/articles/article-form?id=${articleId}${ds}`);
															}}>
															{loadingArticleId === articleId ? (
																<svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Loading">
																	<title>Loading spinner</title>
																	<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
																	<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
																</svg>
															) : (
																<Pencil />
															)}
														</Button>
													</TooltipTrigger>
													<TooltipContent>Edit Article</TooltipContent>
												</Tooltip>
												{ dataSource === "bigquery" ?  '':  
													<Tooltip>
														<TooltipTrigger asChild>
														<Button type="button" className="text-purple-500 hover:text-purple-700" onClick={() => {}}> <RefreshCcw /> </Button>
														</TooltipTrigger>
														<TooltipContent>Sync to BigQuery</TooltipContent>
													</Tooltip> 
												}
												<Tooltip>
													<TooltipTrigger asChild>
														<Button type="button" className="text-red-500 hover:text-red-700" 
														onClick={(e) => { e.stopPropagation(); handleDeleteClick(article.id ?? `${article.page_id}`); }}> <Trash2 /> </Button>
													</TooltipTrigger>
													<TooltipContent>Delete Article</TooltipContent>
												</Tooltip>
											</TableCell>
										</TableRow>
									)
								})
							)}
						</TableBody>
					</Table>
				</TooltipProvider>
			</Suspense>
			<Pagination 
				totalPages={displayedArticles?.totalPages ?? 0} 
				loadingPage={loadingPage}
				setLoadingPage={setLoadingPage}
			/> 
				{deleteArticleId && (
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
										{loadingDltArt && <svg className="animate-spin h-5 w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Loading">
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
