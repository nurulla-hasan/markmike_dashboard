/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITemplate {
  id: string;
  title: string;
  image: string;
  size: string;
  tags: string[];
  createdAt: string;
}

export interface ITemplateDesign {
  id?: string;
  title: string;
  tags: string[];
  editorData?: any; // Placeholder for future canvas data
}
