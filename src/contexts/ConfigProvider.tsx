"use client";
import { createContext, useContext, ReactNode } from "react";


interface NavItem {
  name: string;
  link: string;
}

interface NavLink {
  title: string;
  icon: string;
  items: NavItem[];
}


interface Config {
  navlink: NavLink[];
  logo: string;
  miniLogo:string;
}


const ConfigContext = createContext<Config | null>(null);

export function ConfigProvider({ config, children }: { config: Config[]; children: ReactNode }) {
  return <ConfigContext.Provider value={config[0]}>{children}</ConfigContext.Provider>;
}

// Hooks to use the context

export function useConfigNavlink(): NavLink[] | undefined {
  return useContext(ConfigContext)?.navlink;
}

export function useConfigMiniLogo(): string | undefined {
  return useContext(ConfigContext)?.miniLogo;
}
