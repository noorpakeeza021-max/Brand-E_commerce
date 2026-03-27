import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Folder, Search, Plus, Calendar, Users, Eye, Heart, Share2, MapPin, Clock, ChevronRight, Filter } from 'lucide-react';

export default function Projects() {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform Redesign',
      description: 'Complete overhaul of the shopping experience with modern UI/UX',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
      category: 'web',
      status: 'In Progress',
      progress: 65,
      team: 5,
      views: 1240,
      likes: 89,
      location: 'Remote',
      deadline: '2024-04-15',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      description: 'Secure and intuitive mobile banking solution for iOS and Android',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600',
      category: 'mobile',
      status: 'Planning',
      progress: 20,
      team: 8,
      views: 890,
      likes: 156,
      location: 'New York, NY',
      deadline: '2024-06-30',
      tags: ['Flutter', 'Firebase', 'AWS']
    },
    {
      id: 3,
      title: 'Healthcare Management System',
      description: 'Comprehensive patient management and appointment scheduling system',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
      category: 'enterprise',
      status: 'In Progress',
      progress: 45,
      team: 12,
      views: 2100,
      likes: 234,
      location: 'San Francisco, CA',
      deadline: '2024-05-20',
      tags: ['Vue.js', 'Python', 'PostgreSQL']
    },
    {
      id: 4,
      title: 'AI-Powered Analytics Dashboard',
      description: 'Business intelligence dashboard with machine learning insights',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
      category: 'data',
      status: 'Completed',
      progress: 100,
      team: 6,
      views: 3500,
      likes: 445,
      location: 'Austin, TX',
      deadline: '2024-02-28',
      tags: ['React', 'TensorFlow', 'Python']
    },
    {
      id: 5,
      title: 'Real Estate Listing Platform',
      description: 'Modern property listing and management platform with virtual tours',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
      category: 'web',
      status: 'In Progress',
      progress: 80,
      team: 4,
      views: 1800,
      likes: 167,
      location: 'Remote',
      deadline: '2024-03-31',
      tags: ['Next.js', 'Three.js', 'Prisma']
    },
    {
      id: 6,
      title: 'Fitness Tracking App',
      description: 'Personal fitness tracking with workout plans and progress analytics',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600',
      category: 'mobile',
      status: 'Review',
      progress: 95,
      team: 3,
      views: 980,
      likes: 123,
      location: 'Los Angeles, CA',
      deadline: '2024-03-15',
      tags: ['React Native', 'GraphQL', 'TypeScript']
    },
    {
      id: 7,
      title: 'Education Learning Platform',
      description: 'Online learning management system with interactive courses',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600',
      category: 'web',
      status: 'Planning',
      progress: 10,
      team: 7,
      views: 560,
      likes: 78,
      location: 'Boston, MA',
      deadline: '2024-08-01',
      tags: ['Angular', 'Java', 'MySQL']
    },
    {
      id: 8,
      title: 'Smart Home IoT System',
      description: 'IoT platform for smart home device management and automation',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600',
      category: 'iot',
      status: 'In Progress',
      progress: 55,
      team: 9,
      views: 1450,
      likes: 198,
      location: 'Seattle, WA',
      deadline: '2024-07-15',
      tags: ['React', 'Python', 'AWS IoT']
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'enterprise', label: 'Enterprise' },
    { id: 'data', label: 'Data & Analytics' },
    { id: 'iot', label: 'IoT' },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = category === 'all' || project.category === category;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Planning': return 'bg-yellow-100 text-yellow-700';
      case 'Review': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0A84FF] to-[#5BA3F7] rounded-xl p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
              <Folder className="w-8 h-8" />
              Our Projects
            </h1>
            <p className="text-blue-100">Explore our portfolio of innovative solutions</p>
          </div>
          <button className="flex items-center gap-2 bg-white text-[#0A84FF] px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            <Plus className="w-4 h-4" />
            Submit Project
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-[#0A84FF]">50+</p>
          <p className="text-sm text-gray-500">Total Projects</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-[#0A84FF]">30+</p>
          <p className="text-sm text-gray-500">Completed</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-[#0A84FF]">15+</p>
          <p className="text-sm text-gray-500">In Progress</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-[#0A84FF]">25</p>
          <p className="text-sm text-gray-500">Team Members</p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              category === cat.id
                ? 'bg-[#0A84FF] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p>
              
              {/* Progress */}
              {project.status !== 'Completed' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-800">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-[#0A84FF] h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {project.team}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {project.views}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {project.deadline}
                </div>
                <button className="text-[#0A84FF] text-sm font-medium flex items-center gap-1 hover:underline">
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">No projects found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or category</p>
        </div>
      )}
    </div>
  );
}
