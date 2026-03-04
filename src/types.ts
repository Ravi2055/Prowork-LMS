export type Resource = {
  title: string;
  url: string;
  type: 'pdf' | 'link' | 'video';
};

export type Module = {
  id: string;
  title: string;
  content: string;
  duration: string;
  resources?: Resource[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  steps: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
};

export type Progress = {
  specializationId: string;
  modulesCompleted: string[]; // array of module IDs
  projectsCompleted: string[]; // array of project IDs
  lastActive: string;
};

export type Student = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  progress: Progress[];
};

export type Specialization = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  modules: Module[];
  projects: Project[];
};
