import React from 'react';
import { Paper, RESEARCH_AREAS } from '../types';
import { ExternalLink, FileText, Github, Calendar, MapPin, BookOpen, Video, Mail } from 'lucide-react';
import { allDetails, convertToPaper } from '../services/projectsService';

// --- ABOUT SECTION ---
export const AboutSection: React.FC = () => (
  <div className="p-4 border-l-2 border-pink-700 bg-pink-900/10 mb-4 font-mono text-sm md:text-base">
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
      {/* Profile Photo with Effects - visible on all screens */}
      <div className="shrink-0 select-none mx-auto md:mx-0">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 border border-pink-600/50 p-1 bg-pink-900/20 group">
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
        <p className="mb-2">Institution: <a href="https://www.lse.ac.uk" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-200 underline">The London School of Economics (LSE)</a></p>
        <div className="mb-4 text-gray-300 leading-relaxed">
          <p className="mb-2">
            I am a PhD student in the Department of Statistics at <a href="https://www.lse.ac.uk" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:text-pink-100 underline">The London School of Economics and Political Science (LSE)</a>, advised by <a href="https://callmespring.github.io/" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:text-pink-100 underline">Chengchun Shi</a>.
          </p>
          <p className="mb-2">
            I am also the Chief Technology Officer (CTO) at <a href="https://www.statspoweredai.com/company/" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:text-pink-100 underline">Stats-Powered AI</a>.
          </p>
          <p className="mb-2">
            Prior to this, I completed an MSc in Applicable Mathematics at LSE. Before that, I received a BSc in Mathematics with Finance from <a href="https://www.liverpool.ac.uk" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:text-pink-100 underline">The University of Liverpool</a> and <a href="https://www.xjtlu.edu.cn/en" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:text-pink-100 underline">Xi'an Jiaotong-Liverpool University</a>.
          </p>
          <p className="mt-3">
             <span className="text-pink-500 font-bold">{"> ROLE:"}</span> <a href="https://www.credly.com/badges/b62a84be-9e59-4c27-90ce-a00ebdf21c45/public_url" target="_blank" rel="noopener noreferrer" className="text-pink-200 hover:text-pink-100 underline">AWS Academy Educator</a>
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
       <a href="https://scholar.google.com/citations?user=a7G8Yo8AAAAJ" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 border border-pink-800 px-3 py-1 cursor-pointer hover:bg-pink-900/30 transition-colors">
         <BookOpen size={16} /> <span>Google Scholar</span>
       </a>
    </div>
  </div>
);

// All sections use the same bundled YAML source as the graphical site.
export const NewsSection: React.FC = () => (
  <div className="space-y-2">
    {allDetails.news.map(item => <p key={item.url}><span className="text-pink-400">[News]</span> <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-200 underline underline-offset-4 hover:text-pink-200">{item.text}</a></p>)}
  </div>
);

const PaperItem: React.FC<{ paper: Paper; githubLink?: string }> = ({ paper, githubLink }) => (
  <article className="border border-dashed border-pink-800 p-4 hover:bg-pink-900/10 transition-colors mb-4">
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2 text-xs text-pink-200">
        <span className="bg-pink-950 px-2 py-1">{paper.venue} · {paper.year}</span>
        {paper.status && <span>{paper.status}</span>}
      </div>
      <h3 className="text-lg font-bold text-pink-200 leading-snug">{paper.title}</h3>
    </div>
    <p className="text-sm text-gray-300 mt-3">{paper.authors.join(', ')}</p>
    <div className="flex flex-wrap gap-3 mt-3 text-xs text-pink-300">
      {paper.tags?.map(tag => <span key={tag}>#{tag}</span>)}
    </div>
    <div className="flex flex-wrap gap-4 mt-4 text-sm">
      <a href={paper.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-pink-200 underline underline-offset-4"><FileText size={14} aria-hidden="true" />Read paper</a>
      {githubLink && <a href={githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-pink-200 underline underline-offset-4"><Github size={14} aria-hidden="true" />Code</a>}
    </div>
  </article>
);

export const PubsSection: React.FC = () => (
  <section className="mb-4">
    <h2 className="text-pink-400 mb-2 border-b border-pink-900 pb-2">{">>"} PUBLICATIONS</h2>
    <p className="text-gray-400 text-xs mb-4">* Equal contribution.</p>
    {allDetails.published.map((project, index) => {
      const paper = convertToPaper(project, `p${index}`, project.journal || 'Published');
      return <PaperItem key={paper.id} paper={paper} githubLink={paper.githubLink} />;
    })}
  </section>
);

export const PreprintsSection: React.FC = () => (
  <section className="mb-4">
    <h2 className="text-pink-400 mb-2 border-b border-pink-900 pb-2">{">>"} PREPRINTS</h2>
    <p className="text-gray-400 text-xs mb-4">* Equal contribution.</p>
    {allDetails.preprints.map((project, index) => {
      const paper = convertToPaper(project, `pp${index}`, 'Preprint');
      return <PaperItem key={paper.id} paper={paper} githubLink={paper.githubLink} />;
    })}
  </section>
);

export const TalksSection: React.FC = () => (
  <section className="mb-4">
    <h2 className="text-pink-400 mb-4 border-b border-pink-900 pb-2">{">>"} TALKS_AND_PRESENTATIONS</h2>
    <div className="space-y-4">
      {allDetails.talk.map(talk => (
        <article key={talk.title + talk.date} className="border-l-2 border-pink-800 pl-4 py-2">
          <div className="flex flex-wrap gap-3 items-center text-xs text-pink-300 mb-2">
            <time dateTime={talk.datetime} className="flex gap-2 items-center"><Calendar size={12} aria-hidden="true" />{talk.date}</time>
            {talk.type && <span className="bg-pink-950 px-2 py-1">{talk.type}</span>}
          </div>
          <h3 className="text-pink-200 font-bold">{talk.title}</h3>
          <p className="text-gray-300 text-sm mt-2">{talk.event}</p>
          <p className="flex items-start gap-2 text-gray-400 text-sm mt-1"><MapPin size={14} className="shrink-0 mt-1" aria-hidden="true" />{talk.location}</p>
          {talk.description && <p className="text-gray-300 text-sm mt-3">{talk.description}</p>}
          <div className="flex flex-wrap gap-4 mt-3 text-sm">
            {talk.link && <a href={talk.link} target="_blank" rel="noopener noreferrer" aria-label={`Watch recording: ${talk.title}`} className="inline-flex items-center gap-2 text-pink-200 underline underline-offset-4"><Video size={14} aria-hidden="true" />Watch recording</a>}
            {talk.eventLink && <a href={talk.eventLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-pink-200 underline underline-offset-4"><ExternalLink size={14} aria-hidden="true" />Conference details</a>}
          </div>
        </article>
      ))}
    </div>
  </section>
);

export const TeachingsSection: React.FC = () => (
  <section className="mb-4">
    <h2 className="text-pink-400 mb-4 border-b border-pink-900 pb-2">{">>"} TEACHING</h2>
    <div className="space-y-3">
      {allDetails.teaching.map(teaching => (
        <article key={teaching.courseName} className="bg-pink-950/20 p-4 border border-pink-900/50">
          <div className="flex flex-wrap gap-2 justify-between text-xs text-pink-300 mb-3"><span>{teaching.role}</span><span>{teaching.semester} · {teaching.level}</span></div>
          <h3 className="font-bold text-pink-200">{teaching.courseCode && <span className="block text-sm mb-1">{teaching.courseCode}</span>}{teaching.courseName}</h3>
          <p className="text-sm text-gray-300 mt-2">{teaching.institution}</p>
        </article>
      ))}
    </div>
  </section>
);

export const HelpSection: React.FC = () => (
  <div className="mb-4 text-sm">
    <p className="mb-2 text-pink-300">AVAILABLE COMMANDS:</p>
    <dl className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 gap-y-2 text-gray-300">
      {[
        ['about', 'Bio, research interests, and contact.'],
        ['pubs', 'Conference and journal publications.'],
        ['preprints', 'Recent preprints.'],
        ['talks', 'Invited talks and presentations.'],
        ['teaching', 'Courses and teaching roles.'],
        ['gui', 'Open the graphical homepage.'],
        ['clear', 'Clear the terminal.'],
        ['help', 'Display this help menu.'],
      ].map(([command, description]) => <React.Fragment key={command}><dt className="text-pink-400 font-bold">{command}</dt><dd>{description}</dd></React.Fragment>)}
    </dl>
  </div>
);
