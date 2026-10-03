import yaml from 'js-yaml';
import detailsSource from '../../legacy/_data/alldetails.yml?raw';

// 定义数据结构
export interface ProjectData {
  title: string;
  author: string;
  url: string;
  img?: string;
  selected?: boolean;
  gh_user?: string;
  repo?: string;
  desc?: string;
  journal?: string;
  status?: string;
  year?: string;
  tags?: string[];
}

export interface TalkData {
  title: string;
  event: string;
  date: string;
  location: string;
  link?: string;
  datetime?: string;
  type?: string;
  description?: string;
  eventLink?: string;
}

export interface TeachingData {
  courseCode?: string;
  courseName: string;
  role: string;
  semester: string;
  institution: string;
  level: string;
}

export interface AllDetailsYaml {
  news: { text: string; url: string }[];
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
    .split(/,\s*(?=[A-Z][A-Za-z-]+,)/)
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

const resolvePaperYear = (project: ProjectData, year?: string) => {
  if (year) return year;
  if (project.year) return project.year;

  const arxivMatch = project.url.match(/arxiv\.org\/(?:abs|pdf)\/(\d{2})(\d{2})\.\d+/i);
  if (arxivMatch) {
    const shortYear = Number(arxivMatch[1]);
    return `${shortYear >= 91 ? 1900 + shortYear : 2000 + shortYear}`;
  }

  return "Preprint";
};

// 从 YAML 数据转换为 Paper 类型的数据结构
export const convertToPaper = (project: ProjectData, id: string, venue: string, year?: string) => {
  const authors = parseAuthors(project.author);
  const githubLink = parseGithubLink(project.desc, project.gh_user, project.repo);
  
  return {
    id,
    title: project.title,
    authors,
    venue,
    status: project.status,
    year: resolvePaperYear(project, year),
    githubLink,
    repoName: project.repo,
    link: project.url,
    tags: project.tags || []
  };
};

// 从 YAML 数据转换为 Talk 类型
export const convertToTalk = (talk: TalkData, id: string) => {
  return {
    ...talk,
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
    ...teaching,
    id,
    courseCode: teaching.courseCode,
    courseName: teaching.courseName,
    role: teaching.role,
    semester: teaching.semester,
    institution: teaching.institution
  };
};

// Bundle the same source Jekyll reads, so every section also works without a
// separate YAML request or a development-only copy of the data.
export const allDetails = yaml.load(detailsSource) as AllDetailsYaml;
export const loadAllDetails = async (): Promise<AllDetailsYaml> => allDetails;
