import { create } from "zustand";

interface ConfigState {
  colors: { primary: string; secondary: string; accent: string };
  logo: File | null;
  miniLogo: File | null;
  logoUrl: string;
  miniLogoUrl: string;
  selectedSite:string;
  headerNavList: { name: string; link: string }[];
  searchTools: {
    tours: { name: string; link: string }[];
    services: { name: string; link: string }[];
    media: { name: string; link: string }[];
  };
  setSearchTools: (tools: Partial<ConfigState["searchTools"]>) => void;
  setHeaderNavList: (items: { name: string; link: string }[]) => void;
  setSelectedSite:(selectedSite:string)=>void;
  setColors: (colors: Partial<ConfigState["colors"]>) => void;
  setLogo: (logo: File | null) => void;
  setMiniLogo: (logo: File | null) => void;
  setLogoUrl: (url: string) => void;
  setMiniLogoUrl: (url: string) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  colors: { primary: "", secondary: "", accent: "" },
  logo: null,
  miniLogo: null,
  logoUrl: "/images/upload_area.webp",
  miniLogoUrl: "/images/upload_area.webp",  
  selectedSite:"",
  headerNavList: [],
  searchTools: { tours: [], services: [], media: [] },


  setHeaderNavList: (items) => set({ headerNavList: items }),
  setSelectedSite:(selectedSite) => set({selectedSite}),
  setColors: (colors) => set((state) => ({ colors: { ...state.colors, ...colors } })),

  setLogo: (logo) =>
    set({
      logo,
      logoUrl: logo ? URL.createObjectURL(logo) : "/images/upload_area.webp",
    }),

  setLogoUrl: (url) => set({ logoUrl: url }),

  setMiniLogo: (miniLogo) =>
    set({
      miniLogo,
      miniLogoUrl: miniLogo ? URL.createObjectURL(miniLogo) : "/images/upload_area.webp",
    }),

  setMiniLogoUrl: (url) => set({ miniLogoUrl: url }),
  setSearchTools: (tools) =>
    set((state) => ({
      searchTools: {
        ...state.searchTools,
        ...tools,
      },
    })),
}));
