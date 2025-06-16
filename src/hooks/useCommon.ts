// Article Slug Hook
export const generateSlug = (text: string) => text.toLowerCase().trim().replace(/[^a-z0-9\s-_]/g, "").replace(/\s+/g, "-");