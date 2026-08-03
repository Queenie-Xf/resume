export type Lang = 'zh' | 'en'

export interface Metric {
  value: string
  label: string
}

export interface ExperienceItem {
  role: string
  company: string
  location: string
  period: string
  points: string[]
  tags: string[]
  metrics: Metric[]
}

export interface ProjectItem {
  name: string
  org: string
  period: string
  highlights: { label: string; text: string }[]
  tags: string[]
  metrics: Metric[]
}

export interface EducationItem {
  school: string
  degree: string
  location: string
  period: string
}

export interface SiteContent {
  nav: { about: string; skills: string; experience: string; projects: string; education: string; contact: string }
  hero: {
    greeting: string
    name: string
    title: string
    tagline: string
    ctaPrimary: string
    ctaSecondary: string
    stats: { value: string; label: string }[]
  }
  skills: {
    title: string
    subtitle: string
    groups: { title: string; items: string[] }[]
    languages: { name: string; level: string }[]
    languagesTitle: string
  }
  experience: { title: string; subtitle: string; items: ExperienceItem[] }
  projects: { title: string; subtitle: string; items: ProjectItem[] }
  education: { title: string; subtitle: string; items: EducationItem[] }
  contact: {
    title: string
    subtitle: string
    emailLabel: string
    phoneLabel: string
    githubLabel: string
    locationLabel: string
    location: string
  }
  footer: string
}

export const contact = {
  email: 'xiangf07@outlook.com',
  phone: '15021112769',
  github: 'github.com/Queenie-Xf',
  githubUrl: 'https://github.com/Queenie-Xf',
}

export const content: Record<Lang, SiteContent> = {
  zh: {
    nav: { about: '首页', skills: '技能', experience: '工作经历', projects: '项目作品', education: '教育背景', contact: '联系我' },
    hero: {
      greeting: '你好，我是',
      name: '方向',
      title: '数据分析师 / Data Analyst',
      tagline: '南加州大学应用数据科学硕士，擅长用 SQL、Python 与 BI 工具把复杂数据变成清晰的商业决策。',
      ctaPrimary: '查看我的经历',
      ctaSecondary: '联系我',
      stats: [
        { value: '3 段', label: '数据分析经历' },
        { value: '12,000+', label: '数据治理记录' },
        { value: '20+', label: '技术工具栈' },
      ],
    },
    skills: {
      title: '专业技能',
      subtitle: '覆盖数据全链路：从采集清洗、分析建模到可视化与部署',
      groups: [
        { title: '数据分析与可视化', items: ['SQL', 'Excel', 'Tableau', 'PowerBI', 'R'] },
        { title: '编程与大数据', items: ['Python', 'MySQL', 'MongoDB', 'Spark', 'Hadoop', 'AWS', 'Google Colab', 'Firebase', 'DB Browser'] },
        { title: '工程与协作', items: ['Docker', 'Git', 'Google API', 'Figma', 'Vibe Coding', 'Codex'] },
      ],
      languagesTitle: '语言能力',
      languages: [
        { name: '中文', level: '母语' },
        { name: '英语', level: '流利（可全英文工作环境）' },
      ],
    },
    experience: {
      title: '工作经历',
      subtitle: '三段数据分析相关实习，聚焦数据处理、数据看板与 AI 应用落地',
      items: [
        {
          role: '数据分析',
          company: '国际银联',
          location: '上海',
          period: '2025.05 – 2025.08',
          points: [
            '参与负责异常交易行为的监控分析，独立编写复杂 SQL 多表关联与校验逻辑，实现异常流水的高效批量提取，将风险筛查耗时缩短 20%。',
            '基于分析结果优化风控规则，运用 SQL 在历史海量数据中测算新规则的拦截成功率与误伤率，参与编写 12 条高阶拦截规则，将风险发现率提升 10%。',
          ],
          tags: ['SQL', '异常检测', '数据提取'],
          metrics: [
            { value: '-20%', label: '风险筛查耗时' },
            { value: '+10%', label: '风险发现率' },
            { value: '12', label: '高阶拦截规则' },
          ],
        },
        {
          role: '数据分析',
          company: 'USC Annenberg Web Team',
          location: '洛杉矶',
          period: '2024.09 – 2025.01',
          points: [
            '针对覆盖全美多校区、包含异构传感器的校园安全原始数据质量低的现状，主导使用 Python (Pandas) 和 SQL 进行数据清理，成功将数据看板的查询响应速度提升 30%。',
            '参与使用 SQLite 搭建结构化业务数据库，并利用 Docker 容器化封装数据服务以保障系统稳定可用；独立对接 Google Maps API 落地交互式热力地图，实现空间维度的实时数据可视化支撑。',
          ],
          tags: ['Python', 'Pandas', 'SQLite', 'Docker', 'Google Maps API'],
          metrics: [
            { value: '+30%', label: '看板查询响应速度' },
            { value: '实时', label: '空间数据可视化' },
          ],
        },
        {
          role: '数据分析',
          company: '格尔公司',
          location: '上海',
          period: '2024.05 – 2024.08',
          points: [
            '独立设计并搭建 BI 动态仪表盘，整合全量销售数据，可视化呈现关键绩效指标与季节性趋势；主动跨部门对接销售与运营团队，统一业务数据口径，使跨团队决策响应周期缩短 40%。',
            '主导基于 FastGPT 与 Docker 部署内部 HR 智能问答助手，将 500+ 条企业政策文档转化为可检索知识库，使 HR 部门的人工咨询工单量降低 60%。',
          ],
          tags: ['BI 看板', 'FastGPT', 'Docker', '知识库'],
          metrics: [
            { value: '-40%', label: '跨团队决策周期' },
            { value: '-60%', label: 'HR 人工咨询工单' },
            { value: '500+', label: '政策文档知识库' },
          ],
        },
      ],
    },
    projects: {
      title: '项目作品',
      subtitle: '两个完整的个人项目：从数据治理到智能检索的端到端实践',
      items: [
        {
          name: 'Query Language ChatDB',
          org: '南加州大学 计算机系（个人项目）',
          period: '2025.01 – 2025.05',
          highlights: [
            { label: '项目背景', text: '针对非技术人员难以直接提取多源异构旅游数据的痛点，主导设计一套「智能交互式数据检索系统」，旨在降低跨库数据查询门槛并缩短取数周期。' },
            { label: '数据治理', text: '采集并整合来自多个主流旅游网站的 12,000+ 条混乱异构数据，利用 Python (Pandas) / Spark 进行分布式规范化清洗与字段对齐，成功构建规范的 MongoDB 数据库，将后续数据查询与准备效率提升 50%。' },
            { label: '智能检索', text: '基于 Docker 容器化部署数据库服务并调试 Ollama 本地大模型，实现自然语言到标准 SQL/NoSQL 查询语句的自动转换与高效提取，将复杂检索成功率提升 10%，平均查询响应时间缩短 30%。' },
            { label: '最终成果', text: '项目成功落地为一套完备的低门槛取数工具，彻底替代了传统的「手动提需求—技术写 SQL 跑数」的低效运营模式，使非技术业务人员的数据自助获取效率实现跨越式提效。' },
          ],
          tags: ['Python', 'Spark', 'MongoDB', 'Docker', 'Ollama', 'LLM'],
          metrics: [
            { value: '12,000+', label: '异构数据治理' },
            { value: '+50%', label: '查询准备效率' },
            { value: '+10%', label: '复杂检索成功率' },
            { value: '-30%', label: '平均响应时间' },
          ],
        },
        {
          name: 'TrailMind 智能导览',
          org: '南加州大学 计算机系（个人项目）',
          period: '2025.09 – 2025.12',
          highlights: [
            { label: '项目背景', text: '针对户外出行中多源非结构化信息（如天气、路况、文本指南）碎片化且难以高效检索的痛点，主导设计智能推荐与导览系统，旨在通过全自动流水线加速用户的出行决策流程。' },
            { label: '数据治理', text: '运用 Embedding（向量嵌入）技术对 CSV/PDF/HTML 等多源异构数据进行统一向量化清洗，并基于 LangChain 搭建自动化数据流水线，将实时环境数据转化为结构化公告，使语义检索准确率达 90% 以上，信息分发效率提升 80%。' },
            { label: '推荐策略', text: '设计对话驱动（Dialogue-Driven）推荐引擎，利用 Redis 高速缓存机制精细化管理多轮会话状态与用户意图上下文，将系统延迟控制在毫秒级，成功将用户的出行筛选与决策时间缩短 50%。' },
            { label: '最终成果', text: '成功落地全自动化智能导览闭环，实现从「异构数据实时清洗」到「多轮对话精准推荐」的端到端提效，彻底替代传统的人工信息检索与整理模式。' },
          ],
          tags: ['LangChain', 'Embedding', 'Redis', 'RAG', '推荐系统'],
          metrics: [
            { value: '90%+', label: '语义检索准确率' },
            { value: '+80%', label: '信息分发效率' },
            { value: '-50%', label: '出行决策时间' },
            { value: 'ms', label: '系统延迟级别' },
          ],
        },
      ],
    },
    education: {
      title: '教育背景',
      subtitle: '',
      items: [
        { school: '南加州大学 (USC)', degree: '硕士 · 应用数据科学', location: '洛杉矶，美国', period: '2024.09 – 2026.05' },
        { school: '罗格斯大学 (Rutgers)', degree: '学士 · 商业数据分析（辅修数学）', location: '新泽西，美国', period: '2020.09 – 2024.05' },
      ],
    },
    contact: {
      title: '联系我',
      subtitle: '正在寻找数据分析相关机会，欢迎随时联系',
      emailLabel: '邮箱',
      phoneLabel: '电话',
      githubLabel: 'GitHub',
      locationLabel: '所在地',
      location: '上海 / 洛杉矶',
    },
    footer: '© 2026 方向 · 用数据讲故事',
  },
  en: {
    nav: { about: 'Home', skills: 'Skills', experience: 'Experience', projects: 'Projects', education: 'Education', contact: 'Contact' },
    hero: {
      greeting: "Hi, I'm",
      name: 'Xiang Fang',
      title: 'Data Analyst',
      tagline: "Master's student in Applied Data Science at USC, with hands-on experience in SQL, Python, BI dashboards, and AI applications.",
      ctaPrimary: 'View My Experience',
      ctaSecondary: 'Get in Touch',
      stats: [
        { value: '3', label: 'Work Experiences' },
        { value: '12,000+', label: 'Data Records Processed' },
        { value: '20+', label: 'Tools & Technologies' },
      ],
    },
    skills: {
      title: 'Skills',
      subtitle: 'Covering the full data pipeline: from collection and cleaning to visualization and deployment',
      groups: [
        { title: 'Analytics & Visualization', items: ['SQL', 'Excel', 'Tableau', 'PowerBI', 'R'] },
        { title: 'Programming & Big Data', items: ['Python', 'MySQL', 'MongoDB', 'Spark', 'Hadoop', 'AWS', 'Google Colab', 'Firebase', 'DB Browser'] },
        { title: 'Engineering & Collaboration', items: ['Docker', 'Git', 'Google API', 'Figma', 'Vibe Coding', 'Codex'] },
      ],
      languagesTitle: 'Languages',
      languages: [
        { name: 'English', level: 'Fluent' },
        { name: 'Chinese', level: 'Native' },
      ],
    },
    experience: {
      title: 'Work Experience',
      subtitle: 'Three data analysis experiences across data processing, data dashboards, and AI application implementation',
      items: [
        {
          role: 'Data Analysis',
          company: 'UnionPay International',
          location: 'Shanghai',
          period: '2025.05 – 2025.08',
          points: [
            'Participated in monitoring and analyzing abnormal transaction behaviors. Independently wrote complex SQL multi-table association and verification logic, achieved efficient batch extraction of abnormal transaction records, and shortened risk screening time by 20%.',
            'Optimized risk control rules based on the analysis results. Used SQL to calculate the interception success rate and false-positive rate of new rules in massive historical data. Participated in writing 12 advanced interception rules and increased the risk discovery rate by 10%.',
          ],
          tags: ['SQL', 'Anomaly Detection', 'Data Extraction'],
          metrics: [
            { value: '-20%', label: 'Risk screening time' },
            { value: '+10%', label: 'Risk discovery rate' },
            { value: '12', label: 'Interception rules' },
          ],
        },
        {
          role: 'Data Analysis',
          company: 'USC Annenberg Web Team',
          location: 'Los Angeles',
          period: '2024.09 – 2025.01',
          points: [
            'In response to the low quality of raw campus safety data covering multiple campuses across the United States and containing heterogeneous sensors, led the use of Python (Pandas) and SQL for data cleaning and successfully improved the query response speed of the data dashboard by 30%.',
            'Participated in using SQLite to build a structured business database and used Docker to containerize the data service to ensure that the system was stable and available. Independently connected with Google Maps API to implement an interactive heatmap and achieved real-time data visualization support from the spatial dimension.',
          ],
          tags: ['Python', 'Pandas', 'SQLite', 'Docker', 'Google Maps API'],
          metrics: [
            { value: '+30%', label: 'Dashboard query speed' },
            { value: 'Real-time', label: 'Spatial visualization' },
          ],
        },
        {
          role: 'Data Analysis',
          company: 'Koal Company',
          location: 'Shanghai',
          period: '2024.05 – 2024.08',
          points: [
            'Independently designed and built a BI dynamic dashboard, integrated all sales data, and visually presented key performance indicators and seasonal trends. Actively communicated with the sales and operations teams across departments, unified business data standards, promoted the dashboard to be frequently used across departments in daily work, drove product strategy adjustments, and shortened the cross-team decision response cycle by 40%.',
            'Led the deployment of an internal HR intelligent question-and-answer assistant based on FastGPT and Docker, transformed more than 500 company policy documents into a searchable knowledge base, and reduced the number of manual consultation tickets in the HR department by 60%.',
          ],
          tags: ['BI Dashboard', 'FastGPT', 'Docker', 'Knowledge Base'],
          metrics: [
            { value: '-40%', label: 'Decision cycle' },
            { value: '-60%', label: 'HR manual tickets' },
            { value: '500+', label: 'Policy docs indexed' },
          ],
        },
      ],
    },
    projects: {
      title: 'Projects',
      subtitle: 'Two personal projects at the Department of Computer Science, USC',
      items: [
        {
          name: 'Query Language ChatDB',
          org: 'Department of Computer Science, University of Southern California',
          period: '2025.01 – 2025.05',
          highlights: [
            { label: 'Project Background', text: 'In response to the problem that non-technical personnel find it difficult to directly extract multi-source heterogeneous tourism data, led the design of an "intelligent interactive data retrieval system," aiming to reduce the difficulty of cross-database data queries and shorten the data extraction cycle.' },
            { label: 'Data Governance', text: 'Collected and integrated more than 12,000 messy and heterogeneous data records from multiple mainstream tourism websites. Used Python (Pandas) / Spark to conduct distributed standardized cleaning and field alignment, successfully built a standardized MongoDB database, and improved subsequent data query and preparation efficiency by 50%.' },
            { label: 'Intelligent Retrieval', text: 'Used Docker to containerize and deploy database services and debugged the Ollama local large language model, achieved automatic conversion from natural language to standard SQL/NoSQL query statements and efficient extraction, increased the success rate of complex retrieval by 10%, and shortened the average query response time by 30%.' },
            { label: 'Final Result', text: 'The project was successfully implemented as a complete low-threshold data extraction tool, completely replacing the traditional inefficient operating model of "manually submitting requirements—technical personnel writing SQL and running data," and greatly improving the self-service data acquisition efficiency of non-technical business personnel.' },
          ],
          tags: ['Python', 'Spark', 'MongoDB', 'Docker', 'Ollama', 'LLM'],
          metrics: [
            { value: '12,000+', label: '异构数据治理' },
            { value: '+50%', label: '查询准备效率' },
            { value: '+10%', label: '复杂检索成功率' },
            { value: '-30%', label: '平均响应时间' },
          ],
        },
        {
          name: 'TrailMind',
          org: 'Department of Computer Science, University of Southern California',
          period: '2025.09 – 2025.12',
          highlights: [
            { label: 'Project Background', text: 'In response to the problem that multi-source unstructured information in outdoor travel, such as weather, road conditions, and text guides, is fragmented and difficult to retrieve efficiently, led the design of an intelligent recommendation and navigation system, aiming to accelerate users\u2019 travel decision-making process through a fully automated pipeline.' },
            { label: 'Data Governance', text: 'Used Embedding technology to conduct unified vectorized cleaning of multi-source heterogeneous data such as CSV/PDF/HTML, and built an automated data pipeline based on LangChain to transform real-time environmental data into structured announcements, achieving a semantic retrieval accuracy rate of more than 90% and improving information distribution efficiency by 80%.' },
            { label: 'Recommendation Strategy', text: 'Designed a dialogue-driven recommendation engine and used the Redis high-speed caching mechanism to finely manage multi-turn conversation states and user intent context, controlled system latency at the millisecond level, and successfully shortened users\u2019 travel screening and decision-making time by 50%.' },
            { label: 'Final Result', text: 'Successfully implemented a fully automated intelligent navigation closed loop, achieved end-to-end efficiency improvement from "real-time cleaning of heterogeneous data" to "accurate recommendation through multi-turn conversations," and completely replaced the traditional manual information retrieval and organization model.' },
          ],
          tags: ['LangChain', 'Embedding', 'Redis', 'RAG', 'Recommender System'],
          metrics: [
            { value: '90%+', label: 'Semantic accuracy' },
            { value: '+80%', label: 'Distribution efficiency' },
            { value: '-50%', label: 'Decision time' },
            { value: 'ms', label: 'System latency' },
          ],
        },
      ],
    },
    education: {
      title: 'Education',
      subtitle: '',
      items: [
        { school: 'University of Southern California', degree: 'Master, Applied Data Science', location: 'Los Angeles, USA', period: '2024.09 – 2026.05' },
        { school: 'Rutgers University', degree: 'Bachelor, Business Analysis and Information Technology', location: 'New Jersey, USA', period: '2020.09 – 2024.05' },
      ],
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Open to data analysis opportunities — feel free to reach out',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      githubLabel: 'GitHub',
      locationLabel: 'Location',
      location: 'Shanghai / Los Angeles',
    },
    footer: '© 2026 Xiang Fang · Telling stories with data',
  },
}
