import type { Work, Project, TechStackGrouped, About, Social, Settings } from '../types/portfolio';

const API_BASE = import.meta.env.API_URL || '';

async function fetchApi<T>(endpoint: string): Promise<T | null> {
  if (!API_BASE) return null;

  try {
    const res = await fetch(`${API_BASE}/api${endpoint}`);
    if (!res.ok) return null;
    return await res.json() as T;
  } catch {
    return null;
  }
}

export async function getWorks(): Promise<Work[] | null> {
  return fetchApi<Work[]>('/works');
}

export async function getProjects(): Promise<Project[] | null> {
  return fetchApi<Project[]>('/projects');
}

export async function getTechStack(): Promise<TechStackGrouped | null> {
  return fetchApi<TechStackGrouped>('/tech-stack');
}

export async function getAbout(): Promise<About | null> {
  return fetchApi<About>('/about');
}

export async function getSocials(): Promise<Social[] | null> {
  return fetchApi<Social[]>('/socials');
}

export async function getSettings(): Promise<Settings | null> {
  return fetchApi<Settings>('/settings');
}
