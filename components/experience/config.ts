export const EXPERIENCE_SECTIONS = [
  { id: "hero", tone: "blue", label: "Hero" },
  { id: "sobre", tone: "blue", label: "Arquitetura pessoal" },
  { id: "ecossistema", tone: "violet", label: "Ecossistema" },
  { id: "matriz", tone: "green", label: "Sistemas" },
  { id: "arquiteturas", tone: "blue", label: "Projetos" },
  { id: "stack", tone: "violet", label: "Stack" },
  { id: "contato", tone: "blue", label: "Contato" },
] as const;

export type ExperienceSectionId = (typeof EXPERIENCE_SECTIONS)[number]["id"];
export type ExperienceTone = (typeof EXPERIENCE_SECTIONS)[number]["tone"];

export const DEFAULT_EXPERIENCE_SECTION = EXPERIENCE_SECTIONS[0];

export function getExperienceSection(id: string) {
  return EXPERIENCE_SECTIONS.find((section) => section.id === id);
}
