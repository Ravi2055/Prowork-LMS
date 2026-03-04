import { Student } from '../types';

export const mockStudents: Student[] = [
  {
    id: 's-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
    progress: [
      {
        specializationId: 'fullstack',
        modulesCompleted: ['fs-1', 'fs-2'],
        projectsCompleted: ['p-fs-2'],
        lastActive: '2026-03-02T14:30:00Z'
      },
      {
        specializationId: 'datascience',
        modulesCompleted: ['ds-1'],
        projectsCompleted: [],
        lastActive: '2026-03-01T10:15:00Z'
      }
    ]
  },
  {
    id: 's-2',
    name: 'Ishani Gupta',
    email: 'ishani.gupta@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ishani',
    progress: [
      {
        specializationId: 'aiml',
        modulesCompleted: ['ml-1', 'ml-2', 'ml-3'],
        projectsCompleted: ['p-ml-2'],
        lastActive: '2026-03-03T09:45:00Z'
      }
    ]
  },
  {
    id: 's-3',
    name: 'Rohan Verma',
    email: 'rohan.verma@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
    progress: [
      {
        specializationId: 'fullstack',
        modulesCompleted: ['fs-1', 'fs-2', 'fs-3', 'fs-4'],
        projectsCompleted: ['p-fs-1', 'p-fs-2'],
        lastActive: '2026-03-03T18:20:00Z'
      }
    ]
  },
  {
    id: 's-4',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
    progress: [
      {
        specializationId: 'datascience',
        modulesCompleted: ['ds-1', 'ds-2', 'ds-3', 'ds-4'],
        projectsCompleted: ['p-ds-1'],
        lastActive: '2026-03-02T16:55:00Z'
      }
    ]
  }
];
