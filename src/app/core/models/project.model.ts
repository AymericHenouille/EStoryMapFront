export interface Project {
  id: string;
  label: string;
  cover: string;
  color: string;
  emoticon: string | undefined;
  bpmnName: string;
  mfcName: string;
  mcdName: string;
}

export interface Workspace {
  id?: number;
  label: string;
  color: string;
  emoticon: string | undefined;
  owner_id?: string;
  projects: Project[];
}

export interface AnalyseResponse {
  percent: number;
  messages: string[];
}
