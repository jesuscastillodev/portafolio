export interface Work {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  role: string;
  img: string;
  img_light?: string;
  display_direction: string;
  sort_order: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  img: string;
  url: string;
  sort_order: number;
}

export interface TechItem {
  id: number;
  name: string;
  icon_slug: string;
  category: string;
  is_learning: number;
  sort_order: number;
}

export interface TechStackGrouped {
  frontend: TechItem[];
  backend: TechItem[];
  tools: TechItem[];
}

export interface About {
  greeting: string;
  name: string;
  subtitle: string;
  photo: string;
  years_experience: number;
  paragraphs: string[];
}

export interface Social {
  id: number;
  platform: string;
  url: string;
  icon_slug: string;
  label: string;
  sort_order: number;
}

export interface Settings {
  [key: string]: string;
}
