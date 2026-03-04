import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layout as LayoutIcon, 
  BarChart, 
  Brain, 
  ChevronRight, 
  BookOpen, 
  Code, 
  CheckCircle2, 
  ArrowLeft,
  GraduationCap,
  Rocket,
  Lightbulb,
  FileText,
  ExternalLink,
  Users,
  Shield,
  LogOut,
  Search,
  TrendingUp,
  Clock,
  User as UserIcon
} from 'lucide-react';
import { specializations } from './data/courses';
import { mockStudents } from './data/students';
import { Specialization, Module, Project, Student } from './types';

const IconMap: Record<string, any> = {
  Layout: LayoutIcon,
  BarChart: BarChart,
  Brain: Brain,
};

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password123'
};

export default function App() {
  const [selectedSpec, setSelectedSpec] = useState<Specialization | null>(null);
  const [activeTab, setActiveTab] = useState<'modules' | 'projects'>('modules');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Admin State
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername === ADMIN_CREDENTIALS.username && adminPassword === ADMIN_CREDENTIALS.password) {
      setIsAdminLoggedIn(true);
      setShowAdminLogin(false);
      setLoginError('');
      setSelectedSpec(null); // Clear other views
    } else {
      setLoginError('Invalid credentials. Try admin/password123');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setSelectedSpec(null);
  };

  const handleBack = () => {
    if (selectedModule || selectedProject) {
      setSelectedModule(null);
      setSelectedProject(null);
    } else {
      setSelectedSpec(null);
    }
  };

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProgressStats = (student: Student) => {
    const totalModules = specializations.reduce((acc, s) => acc + s.modules.length, 0);
    const totalProjects = specializations.reduce((acc, s) => acc + s.projects.length, 0);
    
    const completedModules = student.progress.reduce((acc, p) => acc + p.modulesCompleted.length, 0);
    const completedProjects = student.progress.reduce((acc, p) => acc + p.projectsCompleted.length, 0);
    
    return {
      modulePercent: Math.round((completedModules / totalModules) * 100),
      projectPercent: Math.round((completedProjects / totalProjects) * 100),
      totalCompleted: completedModules + completedProjects
    };
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
            setSelectedSpec(null);
            setSelectedModule(null);
            setSelectedProject(null);
            if (isAdminLoggedIn) setIsAdminLoggedIn(false);
          }}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">Prowork <span className="text-indigo-600">LMS</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Dashboard</button>
            <button className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">My Courses</button>
            {isAdminLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-sm font-medium hover:bg-rose-100 transition-all"
              >
                <LogOut size={16} /> Logout Admin
              </button>
            ) : (
              <button 
                onClick={() => setShowAdminLogin(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-all"
              >
                <Shield size={16} /> Admin Login
              </button>
            )}
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm">Profile</button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {isAdminLoggedIn ? (
            <motion.div
              key="admin-dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Student Progress Monitor</h1>
                  <p className="text-slate-500">Overview of all active interns and their specialization progress.</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search students..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full md:w-64 transition-all"
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 text-indigo-600 mb-2">
                    <Users size={20} />
                    <span className="text-sm font-bold uppercase tracking-wider">Total Interns</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{mockStudents.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 text-emerald-600 mb-2">
                    <TrendingUp size={20} />
                    <span className="text-sm font-bold uppercase tracking-wider">Avg. Progress</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">64%</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 text-amber-600 mb-2">
                    <Rocket size={20} />
                    <span className="text-sm font-bold uppercase tracking-wider">Projects Done</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">
                    {mockStudents.reduce((acc, s) => acc + s.progress.reduce((pAcc, p) => pAcc + p.projectsCompleted.length, 0), 0)}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 text-violet-600 mb-2">
                    <Clock size={20} />
                    <span className="text-sm font-bold uppercase tracking-wider">Active Today</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">3</p>
                </div>
              </div>

              {/* Student Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Intern</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Specialization</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Modules</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Projects</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Active</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStudents.map((student) => {
                        const stats = getProgressStats(student);
                        return (
                          <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full bg-slate-100" />
                                <div>
                                  <p className="font-bold text-slate-900">{student.name}</p>
                                  <p className="text-xs text-slate-500">{student.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {student.progress.map(p => (
                                  <span key={p.specializationId} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-md uppercase">
                                    {p.specializationId}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-indigo-500 h-full" style={{ width: `${stats.modulePercent}%` }} />
                              </div>
                              <p className="text-[10px] text-slate-500 mt-1 font-medium">{stats.modulePercent}% Complete</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Rocket size={14} className="text-amber-500" />
                                <span className="text-sm font-bold text-slate-700">
                                  {student.progress.reduce((acc, p) => acc + p.projectsCompleted.length, 0)}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-xs text-slate-500">
                                {new Date(student.progress[0]?.lastActive).toLocaleDateString()}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ) : !selectedSpec ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                  Elevate Your Career with <span className="text-indigo-600">Prowork Internship</span>
                </h1>
                <p className="text-lg text-slate-600">
                  Choose your specialization and start building real-world projects today.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {specializations.map((spec) => {
                  const Icon = IconMap[spec.icon];
                  return (
                    <motion.div
                      key={spec.id}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => setSelectedSpec(spec)}
                    >
                      <div className={`w-12 h-12 ${spec.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{spec.title}</h3>
                      <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                        {spec.description}
                      </p>
                      <div className="flex items-center text-indigo-600 font-semibold text-sm">
                        Explore Modules <ChevronRight size={16} className="ml-1" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="spec-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <button 
                onClick={handleBack}
                className="flex items-center text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
              >
                <ArrowLeft size={16} className="mr-2" /> Back to Specializations
              </button>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{selectedSpec.title}</h2>
                  <p className="text-slate-600 mt-1">{selectedSpec.description}</p>
                </div>
                <div className="flex bg-slate-200/50 p-1 rounded-xl">
                  <button 
                    onClick={() => { setActiveTab('modules'); setSelectedModule(null); setSelectedProject(null); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'modules' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Modules
                  </button>
                  <button 
                    onClick={() => { setActiveTab('projects'); setSelectedModule(null); setSelectedProject(null); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'projects' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Projects
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar / List */}
                <div className="lg:col-span-4 space-y-3">
                  {activeTab === 'modules' ? (
                    selectedSpec.modules.map((mod) => (
                      <button
                        key={mod.id}
                        onClick={() => setSelectedModule(mod)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${selectedModule?.id === mod.id ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white border-slate-200 hover:border-indigo-200'}`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className={`font-bold ${selectedModule?.id === mod.id ? 'text-indigo-700' : 'text-slate-800'}`}>{mod.title}</h4>
                            <span className="text-xs text-slate-500 mt-1 block">{mod.duration}</span>
                          </div>
                          <BookOpen size={18} className={selectedModule?.id === mod.id ? 'text-indigo-500' : 'text-slate-400'} />
                        </div>
                      </button>
                    ))
                  ) : (
                    selectedSpec.projects.map((proj) => (
                      <button
                        key={proj.id}
                        onClick={() => setSelectedProject(proj)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${selectedProject?.id === proj.id ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white border-slate-200 hover:border-indigo-200'}`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className={`font-bold ${selectedProject?.id === proj.id ? 'text-indigo-700' : 'text-slate-800'}`}>{proj.title}</h4>
                            <span className={`text-[10px] uppercase tracking-wider font-bold mt-1 block ${proj.difficulty === 'Advanced' ? 'text-rose-500' : 'text-amber-500'}`}>
                              {proj.difficulty}
                            </span>
                          </div>
                          <Rocket size={18} className={selectedProject?.id === proj.id ? 'text-indigo-500' : 'text-slate-400'} />
                        </div>
                      </button>
                    ))
                  )}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-8">
                  <AnimatePresence mode="wait">
                    {selectedModule ? (
                      <motion.div
                        key={selectedModule.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm min-h-[400px]"
                      >
                        <div className="flex items-center gap-2 text-indigo-600 mb-4">
                          <BookOpen size={20} />
                          <span className="text-sm font-bold uppercase tracking-widest">Module Content</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-6">{selectedModule.title}</h3>
                        <div className="prose prose-slate max-w-none">
                          <p className="text-slate-600 leading-relaxed text-lg">
                            {selectedModule.content}
                          </p>
                          <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <h4 className="font-bold flex items-center gap-2 mb-4">
                              <CheckCircle2 size={18} className="text-emerald-500" />
                              Learning Objectives
                            </h4>
                            <ul className="space-y-3">
                              <li className="flex items-center gap-3 text-slate-600 text-sm">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                                Master the core concepts of {selectedModule.title}
                              </li>
                              <li className="flex items-center gap-3 text-slate-600 text-sm">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                                Implement best practices and industry standards
                              </li>
                              <li className="flex items-center gap-3 text-slate-600 text-sm">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                                Build a solid foundation for your specialization project
                              </li>
                            </ul>
                          </div>

                          {selectedModule.resources && selectedModule.resources.length > 0 && (
                            <div className="mt-8">
                              <h4 className="font-bold flex items-center gap-2 mb-4 text-slate-800">
                                <FileText size={18} className="text-indigo-500" />
                                Study Materials & PDFs
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {selectedModule.resources.map((res, idx) => (
                                  <a
                                    key={idx}
                                    href={res.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center">
                                        <FileText size={20} />
                                      </div>
                                      <div>
                                        <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition-colors">{res.title}</p>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">PDF Document</p>
                                      </div>
                                    </div>
                                    <ExternalLink size={14} className="text-slate-300 group-hover:text-indigo-400" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : selectedProject ? (
                      <motion.div
                        key={selectedProject.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm min-h-[400px]"
                      >
                        <div className="flex items-center gap-2 text-indigo-600 mb-4">
                          <Rocket size={20} />
                          <span className="text-sm font-bold uppercase tracking-widest">Project Hub</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                        <p className="text-slate-600 mb-8">{selectedProject.description}</p>
                        
                        <div className="space-y-8">
                          <div>
                            <h4 className="font-bold flex items-center gap-2 mb-6 text-slate-800">
                              <Lightbulb size={20} className="text-amber-500" />
                              How to do this project
                            </h4>
                            <div className="relative">
                              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100" />
                              <div className="space-y-8 relative">
                                {selectedProject.steps.map((step, idx) => (
                                  <div key={idx} className="flex gap-6 items-start">
                                    <div className="w-8 h-8 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center text-indigo-600 font-bold text-sm z-10 shrink-0">
                                      {idx + 1}
                                    </div>
                                    <div className="pt-1">
                                      <p className="text-slate-700 font-medium">{step}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="p-6 bg-indigo-600 rounded-2xl text-white flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-lg">Ready to start?</h4>
                              <p className="text-indigo-100 text-sm">Submit your project for review once completed.</p>
                            </div>
                            <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                              Submit Project
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="bg-white rounded-2xl p-8 border border-dashed border-slate-300 flex flex-col items-center justify-center text-center min-h-[400px]">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                          <Code size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Select a {activeTab === 'modules' ? 'Module' : 'Project'}</h3>
                        <p className="text-slate-500 max-w-xs">
                          Choose from the list on the left to view detailed content and instructions.
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <GraduationCap size={18} />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-800">Prowork <span className="text-indigo-600">LMS</span></span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm">
                Empowering the next generation of tech leaders through hands-on internship experiences and industry-standard curriculum.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Specializations</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>Fullstack Development</li>
                <li>Data Science</li>
                <li>AI & Machine Learning</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>Help Center</li>
                <li>Community</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 mt-12 pt-8 text-center text-sm text-slate-400">
            © 2026 Prowork Internship. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdminLogin(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                      <Shield size={18} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Admin Access</h3>
                  </div>
                  <button 
                    onClick={() => setShowAdminLogin(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <ChevronRight className="rotate-90" />
                  </button>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Username</label>
                    <input 
                      type="text" 
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      placeholder="Enter admin username"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                    <input 
                      type="password" 
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      required
                    />
                  </div>
                  
                  {loginError && (
                    <p className="text-rose-500 text-xs font-medium bg-rose-50 p-3 rounded-lg border border-rose-100">
                      {loginError}
                    </p>
                  )}

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                      Login to Dashboard
                    </button>
                  </div>
                </form>

                <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-400">
                    Demo Credentials: <span className="font-bold text-slate-600">admin / password123</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
