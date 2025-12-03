import React from 'react';
import { Paper, Talk, Teaching, RESEARCH_AREAS } from '../types';
import { ExternalLink, FileText, Github, Calendar, MapPin, BookOpen, Video, Mail } from 'lucide-react';

// --- ABOUT SECTION ---
export const AboutSection: React.FC = () => (
  <div className="p-4 border-l-2 border-pink-700 bg-pink-900/10 mb-4 font-mono text-sm md:text-base">
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* Profile Photo with Effects */}
      <div className="shrink-0 select-none hidden sm:block">
        <div className="relative w-32 h-32 border border-pink-600/50 p-1 bg-pink-900/20 group">
           <img 
             src="/images/tzuehlke.jpg" 
             alt="Kai Ye"
             className="w-full h-full object-cover"
           />
           <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-pink-500"></div>
           <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-pink-500"></div>
        </div>
        <div className="text-center text-xs text-pink-700 mt-2 font-bold">[IMG_Kai_Ye.JPG]</div>
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-bold mb-2 text-pink-300">USER: Kai Ye (PhD Student)</h2>
        <p className="mb-2">Institution: <a href="https://www.lse.ac.uk" target="_blank" className="text-pink-400 hover:text-pink-200 underline">The London School of Economics (LSE)</a></p>
        <div className="mb-4 text-gray-300 leading-relaxed">
          <p className="mb-2">
            I am a PhD student in the Department of Statistics at <a href="https://www.lse.ac.uk" target="_blank" className="text-pink-200 hover:text-pink-100 underline">The London School of Economics and Political Science (LSE)</a>, advised by <a href="https://callmespring.github.io/" target="_blank" className="text-pink-200 hover:text-pink-100 underline">Chengchun Shi</a>.
          </p>
          <p className="mb-2">
            Prior to this, I completed an MSc in Applicable Mathematics at LSE. Before that, I received a BSc in Mathematics with Finance from <a href="https://www.liverpool.ac.uk" target="_blank" className="text-pink-200 hover:text-pink-100 underline">The University of Liverpool</a> and <a href="https://www.xjtlu.edu.cn/en" target="_blank" className="text-pink-200 hover:text-pink-100 underline">Xi'an Jiaotong-Liverpool University</a>.
          </p>
          <p className="mt-3">
             <span className="text-pink-500 font-bold">{"> ROLE:"}</span> <a href="https://www.credly.com/badges/b62a84be-9e59-4c27-90ce-a00ebdf21c45/public_url" target="_blank" className="text-pink-200 hover:text-pink-100 underline">AWS Academy Educator</a>
          </p>
        </div>
        
        <h3 className="text-lg font-semibold text-pink-300 mt-4 mb-2">{">>"} RESEARCH_INTERESTS</h3>
        <p className="text-sm text-gray-400 mb-2 italic">Intersection of reinforcement learning and large language models</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {RESEARCH_AREAS.map((area, idx) => (
            <li key={idx} className="flex items-center space-x-2">
              <span className="text-pink-500">[+]</span>
              <span>{area}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
    <div className="mt-6 flex flex-wrap gap-3">
       <a href="https://github.com/noncollapse" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 border border-pink-800 px-3 py-1 cursor-pointer hover:bg-pink-900/30 transition-colors">
         <Github size={16} /> <span>GitHub</span>
       </a>
       <a href="mailto:k.ye1@lse.ac.uk" rel="noopener noreferrer" className="flex items-center space-x-2 border border-pink-800 px-3 py-1 cursor-pointer hover:bg-pink-900/30 transition-colors">
         <Mail size={16} /> <span>Email</span>
       </a>
       <a href="https://huggingface.co/Kyleyee" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 border border-pink-800 px-3 py-1 cursor-pointer hover:bg-pink-900/30 transition-colors">
         <span className="text-lg leading-none">🤗</span> <span>Hugging Face</span>
       </a>
    </div>
  </div>
);

// --- HELPER FOR PAPERS ---
const PaperItem: React.FC<{ paper: Paper, badgeColor?: string }> = ({ paper, badgeColor = "pink" }) => (
    <div className={`border border-dashed border-${badgeColor}-800 p-4 hover:bg-${badgeColor}-900/10 transition-colors group mb-4`}>
        <div className="flex flex-col md:flex-row justify-between items-start gap-2">
            <h3 className={`text-lg font-bold text-${badgeColor}-300 group-hover:text-${badgeColor}-200`}>{paper.title}</h3>
            <span className={`text-xs bg-${badgeColor}-900 text-${badgeColor}-300 px-2 py-0.5 whitespace-nowrap`}>{paper.venue} • {paper.year}</span>
        </div>
        <p className="text-sm text-gray-400 mb-2 mt-1">{paper.authors.join(", ")}</p>
        {paper.abstract && (
            <div className="text-sm text-gray-300 mb-3 leading-relaxed border-l-2 border-pink-900/50 pl-2 mt-2">
                {paper.abstract}
            </div>
        )}
        <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2 flex-wrap">
                {paper.tags?.map(tag => (
                    <span key={tag} className={`text-xs text-${badgeColor}-500 font-bold opacity-70`}>#{tag}</span>
                ))}
            </div>
            {paper.link && (
                <a href={paper.link} className={`flex items-center text-xs border border-${badgeColor}-600 px-2 py-1 hover:bg-${badgeColor}-600 hover:text-black transition-all shrink-0 ml-2`}>
                    <FileText size={12} className="mr-1" /> VIEW
                </a>
            )}
        </div>
    </div>
);

// --- PUBS SECTION ---
export const PubsSection: React.FC = () => {
  const papers: Paper[] = [
    {
      id: "p1",
      title: "Doubly Robust Alignment for Large Language Models",
      authors: ["Xu, E*.", "Ye, K*.", "Zhou, H*.", "Zhu, L.", "Quinzan, F.", "Shi, C."],
      venue: "NeurIPS",
      year: "Published",
      abstract: <>Python module: <a href="https://github.com/DRPO4LLM/DRPO4LLM" target="_blank" className="text-pink-400 underline hover:text-pink-200">DRPO4LLM</a></>,
      link: "https://arxiv.org/abs/2506.01183",
      tags: ["NeurIPS", "DRPO", "Double Robust"]
    },
    {
      id: "p2",
      title: "AdaDetectGPT: Adaptive Detection of LLM-Generated Text with Statistical Guarantees",
      authors: ["Zhou, H*.", "Zhu, J*", "Ye, K.", "Su, P.", "Yang, Y.", "Akilagun, S.", "Shi, C."],
      venue: "NeurIPS",
      year: "Published",
      abstract: <>Python module: <a href="https://github.com/Mamba413/AdaDetectGPT" target="_blank" className="text-pink-400 underline hover:text-pink-200">AdaDetectGPT</a></>,
      link: "https://arxiv.org/abs/2510.01268",
      tags: ["NeurIPS", "AdaDetectGPT", "Statistical Guarantees"]
    }
  ];

  return (
    <div className="mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-pink-500 mb-4 border-b border-pink-900 pb-1">{">>"} SELECTED_PUBLICATIONS</h3>
      {papers.map((paper) => <PaperItem key={paper.id} paper={paper} />)}
    </div>
  );
};

// --- PREPRINTS SECTION ---
export const PreprintsSection: React.FC = () => {
    const preprints: Paper[] = [
        {
            id: "pp1",
            title: "Robust Reinforcement Learning from Human Feedback for Large Language Models Fine-Tuning",
            authors: ["Ye, K*.", "Zhou, H*.", "Zhu, J*.", "Quinzan, F.", "Shi, C."],
            venue: "Preprint",
            year: "2024",
            abstract: <>Python module: <a href="https://github.com/VRPO/VRPO" target="_blank" className="text-pink-400 underline hover:text-pink-200">VRPO</a></>,
            link: "https://arxiv.org/abs/2504.03784",
            tags: ["VRPO", "RLHF", "Robust RL"]
        }
    ];

    return (
        <div className="mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h3 className="text-pink-500 mb-4 border-b border-pink-900 pb-1">{">>"} PREPRINTS &amp; WORK_IN_PROGRESS</h3>
             {preprints.map((paper) => <PaperItem key={paper.id} paper={paper} badgeColor="pink" />)}
        </div>
    );
};

// --- TALKS SECTION ---
export const TalksSection: React.FC = () => {
    const talks: Talk[] = [
        {
            id: "t1",
            title: "VRPO: Robust Reinforcement Learning from Human Feedback for Large Language Models Fine-Tuning",
            event: "gouxionghui Online Seminar (Invited)",
            date: "July 2025",
            location: "Online",
            link: "https://www.bilibili.com/video/BV17oMQzyEcC/?spm_id_from=333.1387.homepage.video_card.click"
        },
        {
            id: "t2",
            title: "VRPO: Robust Reinforcement Learning from Human Feedback for Large Language Models Fine-Tuning",
            event: "Annual Conference of Chinese Statistical Association of Young Scholars (Invited)",
            date: "April 2025",
            location: "China"
        }
    ];

    return (
        <div className="mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-pink-500 mb-4 border-b border-pink-900 pb-1">{">>"} TALKS_AND_PRESENTATIONS</h3>
            <div className="space-y-3">
                {talks.map(talk => (
                    <div key={talk.id} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-3 border-l border-pink-800 hover:bg-pink-900/20 hover:border-pink-500 transition-all">
                        <div className="w-24 text-xs font-bold text-pink-600 flex items-center shrink-0">
                            <Calendar size={12} className="mr-2" />
                            {talk.date}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-pink-200 font-bold">{talk.title}</h4>
                            <div className="flex items-center text-gray-400 text-sm mt-1">
                                <span className="mr-3">{talk.event}</span>
                                <span className="flex items-center text-xs text-gray-500"><MapPin size={10} className="mr-1"/> {talk.location}</span>
                            </div>
                        </div>
                        {talk.link && (
                            <a href={talk.link} className="text-pink-500 hover:text-white transition-colors">
                                <Video size={16} />
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- TEACHINGS SECTION ---
export const TeachingsSection: React.FC = () => {
    const teachings: Teaching[] = [
        {
            id: "tc1",
            courseCode: "ST-446",
            courseName: "Distributed Computing for Big Data",
            role: "Teaching Assistant / Educator",
            semester: "2026",
            institution: "LSE-Postgraduate Level"
        }
        ,{
            id: "tc2",
            courseCode: "ST-107",
            courseName: "	Quantitative Methods (Statistics)",
            role: "Teaching Assistant / Educator",
            semester: "2026",
            institution: "LSE-Undergraduate Level"
        }
    ];

    return (
        <div className="mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h3 className="text-pink-500 mb-4 border-b border-pink-900 pb-1">{">>"} ACADEMIC_TEACHING</h3>
             <div className="grid grid-cols-1 gap-3">
                 {teachings.map(t => (
                     <div key={t.id} className="bg-pink-950/20 p-3 border border-pink-900/50 flex items-center justify-between group hover:border-pink-600 transition-colors">
                         <div className="flex items-start gap-3">
                             <div className="bg-pink-900/30 p-2 rounded text-pink-400 group-hover:text-pink-200 transition-colors">
                                 <BookOpen size={18} />
                             </div>
                             <div>
                                 <div className="font-bold text-pink-200">{t.courseCode}: {t.courseName}</div>
                                 <div className="text-sm text-gray-400">{t.role} • {t.institution}</div>
                             </div>
                         </div>
                         <div className="text-xs font-mono text-pink-700 font-bold">
                             {t.semester}
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    );
};

// --- HELP SECTION ---
export const HelpSection: React.FC = () => (
  <div className="mb-4 text-sm animate-in fade-in duration-300">
    <p className="mb-2 text-pink-300">AVAILABLE COMMANDS:</p>
    <table className="w-full md:w-3/4 text-left border-collapse">
      <tbody>
        <tr className="border-b border-pink-900/30 hover:bg-pink-900/10"><td className="py-1 w-24 text-pink-500 font-bold">about</td><td className="text-gray-300">Bio, research interests, and contact.</td></tr>
        <tr className="border-b border-pink-900/30 hover:bg-pink-900/10"><td className="py-1 w-24 text-pink-500 font-bold">pubs</td><td className="text-gray-300">Conference and journal publications.</td></tr>
        <tr className="border-b border-pink-900/30 hover:bg-pink-900/10"><td className="py-1 w-24 text-pink-500 font-bold">preprints</td><td className="text-gray-300">Recent ArXiv papers and drafts.</td></tr>
        <tr className="border-b border-pink-900/30 hover:bg-pink-900/10"><td className="py-1 w-24 text-pink-500 font-bold">talks</td><td className="text-gray-300">Invited talks and presentations.</td></tr>
        <tr className="border-b border-pink-900/30 hover:bg-pink-900/10"><td className="py-1 w-24 text-pink-500 font-bold">teachings</td><td className="text-gray-300">Teaching assistant roles and courses.</td></tr>
        <tr className="border-b border-pink-900/30 hover:bg-pink-900/10"><td className="py-1 w-24 text-pink-500 font-bold">gui</td><td className="text-gray-300">Switch to Graphical User Interface.</td></tr>
        <tr className="border-b border-pink-900/30 hover:bg-pink-900/10"><td className="py-1 w-24 text-pink-500 font-bold">clear</td><td className="text-gray-300">Clear terminal buffer.</td></tr>
        <tr className="border-b border-pink-900/30 hover:bg-pink-900/10"><td className="py-1 w-24 text-pink-500 font-bold">help</td><td className="text-gray-300">Display this help menu.</td></tr>
      </tbody>
    </table>
  </div>
);