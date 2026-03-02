import yaml from 'js-yaml';

// 定义数据结构
export interface ProjectData {
  title: string;
  author: string;
  url: string;
  img?: string;
  gh_user?: string;
  repo?: string;
  desc?: string;
  journal?: string;
  tags?: string[];
}

export interface TalkData {
  title: string;
  event: string;
  date: string;
  location: string;
  link?: string;
}

export interface TeachingData {
  courseCode: string;
  courseName: string;
  role: string;
  semester: string;
  institution: string;
}

export interface AllDetailsYaml {
  preprints: ProjectData[];
  published: ProjectData[];
  talk: TalkData[];
  teaching: TeachingData[];
}

// 解析作者字符串，去除HTML标记和转义字符
const parseAuthors = (authorString: string): string[] => {
  return authorString
    .replace(/<\/?b>/g, '') // 移除 <b> 标签
    .replace(/<sup>\*<\/sup>/g, '*') // 转换上标星号
    .replace(/<sup>([^<]*)<\/sup>/g, '$1') // 移除其他上标
    .split(',')
    .map(a => a.trim())
    .filter(a => a.length > 0);
};

// 解析 desc 字段，提取 GitHub 仓库信息
const parseGithubLink = (desc: string | undefined, gh_user?: string, repo?: string) => {
  if (!desc) return null;
  
  // 如果有 gh_user 和 repo，构建 GitHub 链接
  if (gh_user && repo) {
    return `https://github.com/${gh_user}/${repo}`;
  }
  
  return null;
};

// 从 YAML 数据转换为 Paper 类型的数据结构
export const convertToPaper = (project: ProjectData, id: string, venue: string, year: string) => {
  const authors = parseAuthors(project.author);
  const githubLink = parseGithubLink(project.desc, project.gh_user, project.repo);
  
  return {
    id,
    title: project.title,
    authors,
    venue,
    year,
    githubLink,
    repoName: project.repo,
    link: project.url,
    tags: project.tags || []
  };
};

// 从 YAML 数据转换为 Talk 类型
export const convertToTalk = (talk: TalkData, id: string) => {
  return {
    id,
    title: talk.title,
    event: talk.event,
    date: talk.date,
    location: talk.location,
    link: talk.link
  };
};

// 从 YAML 数据转换为 Teaching 类型
export const convertToTeaching = (teaching: TeachingData, id: string) => {
  return {
    id,
    courseCode: teaching.courseCode,
    courseName: teaching.courseName,
    role: teaching.role,
    semester: teaching.semester,
    institution: teaching.institution
  };
};

// 加载并解析 alldetails.yml
export const loadAllDetails = async (): Promise<AllDetailsYaml> => {
  try {
    const response = await fetch('/legacy/_data/alldetails.yml');
    const yamlText = await response.text();
    const data = yaml.load(yamlText) as AllDetailsYaml;
    
    return data;
  } catch (error) {
    console.error('Error loading alldetails.yml:', error);
    return { preprints: [], published: [], talk: [], teaching: [] };
  }
};
