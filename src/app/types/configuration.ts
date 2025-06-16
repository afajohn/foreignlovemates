export type Configuration = {
    font: {
      primary: string;
      secondary: string;
    };
    color: {
      primary: Record<string, string>;
      secondary: Record<string, string>;
      accent: Record<string, string>;
    };
    navlink: {
      title: string;
      icon: string;
      items: {
        name: string;
        link: string;
      }[];
    }[];
    headerNavList: {
        name: string;
        icon: string;
        link: string;
      }[];
    logo: string;
    miniLogo: string;
    website: string;
  };
  