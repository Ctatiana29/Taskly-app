import { useState } from 'react';
import { 
  Home, 
  Grid, 
  BarChart2, 
  Settings, 
  Search, 
  Trash2, 
  Plus, 
  Calendar, 
  Check, 
  Briefcase, 
  User, 
  Heart, 
  ShoppingBag, 
  Zap, 
  Cloud, 
  ChevronRight,
  X
} from 'lucide-react';

// Switch Reusable
const ToggleSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-11 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 ease-in-out ${
      checked ? 'bg-indigo-600' : 'bg-slate-200'
    }`}
  >
    <div
      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [filter, setFilter] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Fecha');
  const [language, setLanguage] = useState('Español');

  // Perfil de Usuario
  const [profile, setProfile] = useState({
    name: 'Juan Díaz',
    email: 'juan.diaz@email.com'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);

  // Estados de Toggles
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [completionSound, setCompletionSound] = useState(false);
  const [localStorageEnabled, setLocalStorageEnabled] = useState(true);

  // Modal Crear Tarea - Estados según Figma
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('Preparar diapositivas del departamento');
  const [newTaskDescription, setNewTaskDescription] = useState('Recopilar informes de rendimiento de marketing y diseño para consolidar resultados del Q4.');
  const [newTaskCategory, setNewTaskCategory] = useState('Trabajo');
  const [newTaskPriority, setNewTaskPriority] = useState('Media');
  const [newTaskDueDate, setNewTaskDueDate] = useState('2025-10-26');
  const [newTaskReminderTime, setNewTaskReminderTime] = useState('09:00');
  const [newTaskReminderEnabled, setNewTaskReminderEnabled] = useState(true);

  const categories = ['Trabajo', 'Personal', 'Salud', 'Compras', 'Aprendizaje'];

  // Datos de Tareas
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Diseñar landing page de alta fidelidad para Taskly',
      category: 'Trabajo',
      due: 'Hoy',
      priority: 'Alta',
      completed: false
    },
    {
      id: 2,
      title: 'Reabastecer alimentos saludables para la semana',
      category: 'Salud',
      due: 'Hoy',
      priority: 'Media',
      completed: false
    },
    {
      id: 3,
      title: 'Completar carrera matutina de 5 km',
      category: 'Salud',
      due: 'Ayer',
      priority: 'Baja',
      completed: true
    },
    {
      id: 4,
      title: 'Preparar presentación para reunión de estrategia Q4',
      category: 'Trabajo',
      due: 'Mañana',
      priority: 'Alta',
      completed: false
    },
    {
      id: 5,
      title: 'Llamar a mamá para plática semanal',
      category: 'Personal',
      due: '24 Oct',
      priority: 'Baja',
      completed: false
    },
    {
      id: 6,
      title: 'Escribir 10 páginas del libro de desarrollo personal',
      category: 'Personal',
      due: '25 Oct',
      priority: 'Baja',
      completed: false
    }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      description: newTaskDescription,
      category: newTaskCategory,
      due: '26 Oct',
      priority: newTaskPriority,
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsAddingTask(false);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ name: editName, email: editEmail });
    setIsEditingProfile(false);
  };

  // Filtrado y Ordenamiento
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'Todas') return matchesSearch;
    if (filter === 'Pendientes') return matchesSearch && !task.completed;
    if (filter === 'Completadas') return matchesSearch && task.completed;
    return matchesSearch && task.category === filter;
  }).sort((a, b) => {
    if (sortBy === 'Prioridad') {
      const pMap = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
      return pMap[b.priority] - pMap[a.priority];
    }
    if (sortBy === 'Nombre') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-[#f8fafc] text-slate-800'} flex flex-col font-sans relative`}>
      
      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-md mx-auto w-full p-4 pb-24 flex-1">
        
        {/* --- VISTA: INICIO --- */}
        {activeTab === 'inicio' && (
          <div className="space-y-4">
            <header className="flex justify-between items-center pt-2">
              <div>
                <p className="text-xs text-slate-500 font-medium">Buenos días,</p>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Taskly</h1>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs border border-indigo-100">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
            </header>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={language === 'Español' ? "Buscar tareas..." : "Search tasks..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              {['Todas', 'Pendientes', 'Completadas', 'Trabajo', 'Personal', 'Salud', 'Compras'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap text-xs ${
                    filter === f 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="space-y-2.5">
              {filteredTasks.map((task) => (
                <div key={task.id} className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        task.completed 
                          ? 'bg-indigo-600 border-indigo-600 text-white' 
                          : 'border-slate-300 bg-white hover:border-indigo-500'
                      }`}
                    >
                      {task.completed && <Check className="w-3.5 h-3.5 stroke-3" />}
                    </button>

                    <div className="space-y-1.5 flex-1">
                      <h3 className={`font-bold text-xs leading-snug ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {task.title}
                      </h3>

                      <div className="flex items-center gap-2 text-[10px] font-medium flex-wrap">
                        <span className={`px-2 py-0.5 rounded-md ${
                          task.category === 'Trabajo' ? 'bg-indigo-50 text-indigo-600' :
                          task.category === 'Salud' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {task.category}
                        </span>
                        
                        <span className="text-slate-300">•</span>
                        
                        <div className="flex items-center gap-1 text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span>{task.due}</span>
                        </div>

                        <span className="text-slate-300">•</span>

                        <div className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            task.priority === 'Alta' ? 'bg-rose-500' :
                            task.priority === 'Media' ? 'bg-amber-500' : 'bg-blue-500'
                          }`}></span>
                          <span className="text-slate-500">{task.priority}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="text-slate-300 hover:text-rose-500 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsAddingTask(true)}
              className="fixed bottom-20 right-6 w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-transform active:scale-95 z-40"
            >
              <Plus className="w-6 h-6 stroke-2" />
            </button>
          </div>
        )}

        {/* --- VISTA: CATEGORÍAS --- */}
        {activeTab === 'categorias' && (
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Categorías</h1>
              <p className="text-xs text-slate-500">Seguimiento de metas e indicadores de rendimiento</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400">14 tareas</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Trabajo</h3>
                  <div className="mt-2">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>Progreso</span>
                      <span className="font-bold text-indigo-600">75%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400">8 tareas</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Personal</h3>
                  <div className="mt-2">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>Progreso</span>
                      <span className="font-bold text-indigo-600">40%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-blue-50 text-blue-500 rounded-xl">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400">6 tareas</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Salud</h3>
                  <div className="mt-2">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>Progreso</span>
                      <span className="font-bold text-indigo-600">100%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400">12 tareas</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Compras</h3>
                  <div className="mt-2">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>Progreso</span>
                      <span className="font-bold text-indigo-600">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h2 className="text-lg font-bold text-slate-900">Resumen Semanal</h2>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Check className="w-6 h-6 stroke-3" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700">Tareas Completadas</h4>
                    <p className="text-[11px] text-slate-400">Últimos 7 días hábiles</p>
                  </div>
                </div>
                <span className="text-2xl font-black text-slate-900">24</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
                    <Zap className="w-6 h-6 fill-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700">Racha Actual</h4>
                    <p className="text-[11px] text-slate-400">¡No rompas la cadena!</p>
                  </div>
                </div>
                <span className="text-2xl font-black text-amber-500">5 Días</span>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-indigo-600 text-xs font-medium">
                <Cloud className="w-4 h-4" />
                <span>Guardado en Almacenamiento Local</span>
              </div>
            </div>
          </div>
        )}

        {/* --- VISTA: ESTADÍSTICAS --- */}
        {activeTab === 'estadisticas' && (
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Estadísticas</h1>
              <p className="text-xs text-slate-500">Seguimiento de rendimiento</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-800">Tareas por Día</h3>
                <span className="text-xs font-semibold text-indigo-600">Esta Semana</span>
              </div>
              <div className="flex items-end justify-between h-32 pt-4 px-2">
                {[
                  { day: 'Lun', h: 'h-16' },
                  { day: 'Mar', h: 'h-20' },
                  { day: 'Mié', h: 'h-28', active: true },
                  { day: 'Jue', h: 'h-22' },
                  { day: 'Vie', h: 'h-24' },
                  { day: 'Sáb', h: 'h-12' },
                  { day: 'Dom', h: 'h-14' },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-3 bg-slate-100 rounded-full h-28 flex items-end">
                      <div className={`w-full rounded-full ${bar.active ? 'bg-indigo-600' : 'bg-indigo-200'} ${bar.h}`}></div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-semibold text-slate-500">Tareas Totales</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  <span className="text-lg font-black text-slate-900">{tasks.length}</span>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-semibold text-slate-500">Completadas</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-lg font-black text-slate-900">{tasks.filter(t => t.completed).length}</span>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-semibold text-slate-500">Pendientes</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="text-lg font-black text-slate-900">{tasks.filter(t => !t.completed).length}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Productividad</h3>
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-indigo-600"
                      strokeDasharray="85, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-sm font-black text-slate-900">85%</span>
                    <span className="text-[8px] font-bold text-slate-400 tracking-wider">TASA</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Promedio diario</span>
                    <span className="font-bold text-slate-800">4.2 tareas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mejor día</span>
                    <span className="font-bold text-indigo-600">Miércoles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- VISTA: AJUSTES --- */}
        {activeTab === 'ajustes' && (
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Ajustes</h1>
              <p className="text-xs text-slate-500">Personalización de la aplicación</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center space-y-3">
              <div className="flex items-center gap-3 w-full">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm border border-indigo-100">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{profile.name}</h3>
                  <p className="text-xs text-slate-400">{profile.email}</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setEditName(profile.name);
                  setEditEmail(profile.email);
                  setIsEditingProfile(true);
                }}
                className="w-full py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
              >
                Editar Perfil
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">GENERAL</span>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
                <div className="p-3.5 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Tema Oscuro</span>
                  <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
                </div>
                
                <div 
                  onClick={() => setLanguage(language === 'Español' ? 'English' : 'Español')}
                  className="p-3.5 flex justify-between items-center text-xs cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-800">Idioma</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="font-medium text-slate-600">{language}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-3.5 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Notificaciones</span>
                  <ToggleSwitch checked={notifications} onChange={setNotifications} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">TAREAS</span>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
                <div className="p-3.5 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Recordatorios</span>
                  <ToggleSwitch checked={reminders} onChange={setReminders} />
                </div>
                <div className="p-3.5 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Sonido de completado</span>
                  <ToggleSwitch checked={completionSound} onChange={setCompletionSound} />
                </div>

                <div 
                  onClick={() => {
                    const options = ['Fecha', 'Prioridad', 'Nombre'];
                    const next = options[(options.indexOf(sortBy) + 1) % options.length];
                    setSortBy(next);
                  }}
                  className="p-3.5 flex justify-between items-center text-xs cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-800">Ordenar por</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="font-medium text-indigo-600">{sortBy}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">DATOS</span>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
                <div className="p-3.5 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-800">Almacenamiento Local</p>
                    <p className="text-[10px] text-slate-400">Las tareas se guardan en tu dispositivo</p>
                  </div>
                  <ToggleSwitch checked={localStorageEnabled} onChange={setLocalStorageEnabled} />
                </div>
                <div 
                  onClick={() => alert('Tareas exportadas en formato JSON.')}
                  className="p-3.5 flex justify-between items-center text-xs cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-800">Exportar Tareas</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
                <div 
                  onClick={() => {
                    if (confirm('¿Eliminar todas las tareas?')) setTasks([]);
                  }}
                  className="p-3.5 flex justify-between items-center text-xs cursor-pointer hover:bg-rose-50 transition-colors"
                >
                  <span className="font-bold text-rose-500">Eliminar todas las tareas</span>
                  <ChevronRight className="w-4 h-4 text-rose-500" />
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL EDITAR PERFIL */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Editar Perfil</h3>
              <button onClick={() => setIsEditingProfile(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Nombre</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Correo electrónico</label>
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 py-2 border rounded-xl text-slate-600 font-semibold"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 bg-indigo-600 text-white rounded-xl font-semibold shadow-sm"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NUEVA TAREA (Diseño Exacto a Figma) */}
      {isAddingTask && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#f8fafc] rounded-t-3xl sm:rounded-3xl p-5 w-full max-w-md space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center">
              <h2 className="font-extrabold text-slate-900 text-lg">Nueva Tarea</h2>
              <button 
                onClick={() => setIsAddingTask(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              
              {/* TÍTULO DE LA TAREA */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  TÍTULO DE LA TAREA
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Preparar diapositivas del departamento"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
              </div>

              {/* DESCRIPCIÓN */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  DESCRIPCIÓN
                </label>
                <textarea 
                  rows="3"
                  placeholder="Recopilar informes de rendimiento de marketing y diseño para consolidar resultados del Q4."
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm resize-none"
                />
              </div>

              {/* CATEGORÍA (Chips/Pills) */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  CATEGORÍA
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewTaskCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        newTaskCategory === cat
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* PRIORIDAD (Alta / Media / Baja) */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  PRIORIDAD
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'Alta', color: 'bg-rose-500' },
                    { name: 'Media', color: 'bg-amber-500' },
                    { name: 'Baja', color: 'bg-blue-500' }
                  ].map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setNewTaskPriority(p.name)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                        newTaskPriority === p.name
                          ? 'bg-indigo-50/50 border-indigo-600 text-indigo-600 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${p.color}`}></span>
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* FECHA LÍMITE Y RECORDATORIO */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* FECHA LÍMITE */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    FECHA LÍMITE
                  </label>
                  <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
                    <Calendar className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">26 Oct, 2025</span>
                    <input 
                      type="date" 
                      value={newTaskDueDate}
                      onChange={(e) => setNewTaskDueDate(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                </div>

                {/* RECORDATORIO */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    RECORDATORIO
                  </label>
                  <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
                    <input 
                      type="time" 
                      value={newTaskReminderTime}
                      onChange={(e) => setNewTaskReminderTime(e.target.value)}
                      className="text-xs font-semibold text-slate-700 bg-transparent border-none p-0 focus:outline-none"
                    />
                    <ToggleSwitch 
                      checked={newTaskReminderEnabled} 
                      onChange={setNewTaskReminderEnabled} 
                    />
                  </div>
                </div>

              </div>

              {/* BOTÓN GUARDAR TAREA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-100 transition-all active:scale-[0.99]"
                >
                  Guardar Tarea
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* BARRA DE NAVEGACIÓN INFERIOR */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 py-2.5 px-6 flex justify-around items-center z-40 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('inicio')}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            activeTab === 'inicio' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Inicio</span>
        </button>

        <button
          onClick={() => setActiveTab('categorias')}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            activeTab === 'categorias' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span>Categorías</span>
        </button>

        <button
          onClick={() => setActiveTab('estadisticas')}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            activeTab === 'estadisticas' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <BarChart2 className="w-5 h-5" />
          <span>Estadísticas</span>
        </button>

        <button
          onClick={() => setActiveTab('ajustes')}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            activeTab === 'ajustes' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Ajustes</span>
        </button>
      </nav>
    </div>
  );
}