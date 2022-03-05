export interface Project {
  id: string;
  label: string;
  cover: string;
  color: string;
  emoticon: string;
}

export interface Workspace {
  id: number;
  label: string;
  color: string;
  emoticon: string | symbol;
  owner_id: string;
  projects: Project[];
}
