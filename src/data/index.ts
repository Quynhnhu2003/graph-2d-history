import { Graph, GraphLink, GraphNode } from "../views/home/utils/types/graph";

// --------------------
// Domains
// --------------------
const DOMAINS = [
  "CS",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "AI",
  "Networking",
  "Marketing",
  "Architecture",
  "MakeUp",
  "Game",
  "Design",
  "Tiktok",
  "Facebook",
  "Instagram",
  "Photo",
  "SVG",
  "Image",
  "PNG",
  "JPG",
  "Icons",
  "Data Analysis",
  "English",
  "Language",
  "Music",
  "Artist",
  "Musican",
  "Tree",
  "Flower",
  "Plan"
];

// --------------------
// Subtopics
// --------------------
export const SUBS: Record<string, string[]> = {
  CS: ["DSA", "OS", "Concurrency", "Algorithms", "Theory"],
  Frontend: ["HTML", "CSS", "JS", "React", "Vue", "StateManagement"],
  Backend: ["NodeJS", "PythonBackend", "API", "Microservices"],
  Database: ["SQL", "NoSQL", "Indexing", "Transactions", "Scaling"],
  DevOps: ["Docker", "Kubernetes", "CI/CD", "Monitoring", "Cloud"],
  AI: ["ML", "DL", "LLM", "CV", "NLP"],
  Networking: ["TCP/IP", "HTTP", "DNS", "CDN", "WebSocket"],
  Marketing: ["SEO", "ContentMarketing", "SocialMedia", "EmailMarketing"],
  Architecture: ["UrbanDesign", "InteriorDesign", "Landscape"],
  MakeUp: ["FaceMakeup", "EyesMakeup", "HairStyling"],
  Game: ["GameDesign", "Unity", "Unreal"],
  Design: ["GraphicDesign", "UXUI", "MotionDesign"],
  Tiktok: ["ContentCreation", "ViralTrends", "MarketingTips"],
  Facebook: ["Pages", "Ads", "Groups", "Insights"],
  Instagram: ["Posts", "Stories", "Reels", "IGTV"],
  Photo: ["Photography", "Editing", "Lighting", "Composition"],
  SVG: ["VectorDesign", "Icons", "Animation"],
  Image: ["JPEG", "PNG", "Compression", "Optimization"],
  PNG: ["Transparency", "Compression", "Optimization"],
  JPG: ["Compression", "ColorProfiles", "Resizing"],
  Icons: ["FontAwesome", "MaterialIcons", "CustomIcons"],
  "Data Analysis": ["Excel", "PythonPandas", "Visualization", "Statistics"],
  English: ["Grammar", "Vocabulary", "Speaking", "Writing"],
  Language: ["Spanish", "French", "German", "Chinese"],
  Music: ["Theory", "Composition", "Instruments", "Production"],
  Artist: ["Painting", "Sculpture", "Drawing"],
  Musican: ["Guitar", "Piano", "Violin", "Drums"],
  Tree: ["Botany", "Planting", "Forest", "Care"],
  Flower: ["Gardening", "FloralDesign", "PlantCare"],
  Plan: ["Planning", "Strategy", "Roadmap", "Execution"],
};

// --------------------
// Topics
// --------------------
const generateTopics = (
  domain: string,
  sub: string,
  count = 6
): GraphNode[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: `${domain}:${sub}:Topic${i + 1}`,
    label: `${sub} ${i + 1}`,
    type: "topic",
    level: 3,
  }));

// --------------------
// Graph generator
// --------------------
export const generateGraphData = (): Graph => {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  // ---- Domains
  DOMAINS.forEach((domain) => {
    nodes.push({
      id: domain,
      label: domain,
      type: "domain",
      level: 1,
    });
  });

  // ---- Sub + Topic
  DOMAINS.forEach((domain) => {
    const subs = SUBS[domain];
    if (!subs) return;

    subs.forEach((sub) => {
      const subId = `${domain}:${sub}`;

      // Sub node
      nodes.push({
        id: subId,
        label: sub,
        type: "sub",
        level: 2,
      });

      // Link domain → sub
      links.push({
        source: domain,
        target: subId,
        relation: "detail",
      });

      // Topics
      const topics = generateTopics(
        domain,
        sub,
        4 + Math.floor(Math.random() * 3)
      );

      topics.forEach((topic) => {
        nodes.push(topic);

        // Link sub → topic
        links.push({
          source: subId,
          target: topic.id,
          relation: "detail",
        });
      });
    });
  });

  console.log("Nodes:", nodes.length);
  console.log("Links:", links.length);

  return { nodes, links };
};

export function generateFullGraph(minDomains = 6, subsPerDomain = 4): Graph {
  const nodes: GraphNode[] = [];
  const links: { source: string; target: string }[] = [];

  // Tạo domain
  for (let d = 0; d < minDomains; d++) {
    const domainId = `domain-${d}`;
    nodes.push({
      id: domainId,
      label: `Domain ${d + 1}`,
      level: 1,
    });

    // Tạo sub
    for (let s = 0; s < subsPerDomain; s++) {
      const subId = `${domainId}-sub-${s}`;
      nodes.push({
        id: subId,
        label: `Sub ${s + 1}`,
        level: 2,
      });

      links.push({ source: domainId, target: subId });

      // Tạo leaf nhỏ
      const leafCount = Math.floor(Math.random() * 2) + 1; // 1-2 leaf
      for (let l = 0; l < leafCount; l++) {
        const leafId = `${subId}-leaf-${l}`;
        nodes.push({
          id: leafId,
          label: `Leaf ${l + 1}`,
          level: 3,
        });
        links.push({ source: subId, target: leafId });
      }
    }
  }

  return { nodes, links };
}