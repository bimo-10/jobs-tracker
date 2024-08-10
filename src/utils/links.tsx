import { Layers, AppWindow, AreaChart } from "lucide-react";

type NavLinkType = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export const links: NavLinkType[] = [
  {
    href: "/add-job",
    label: "Add Job",
    icon: <Layers />,
  },
  {
    href: "/jobs",
    label: "Jobs",
    icon: <AppWindow />,
  },
  {
    href: "/stats",
    label: "Stats",
    icon: <AreaChart />,
  },
];
