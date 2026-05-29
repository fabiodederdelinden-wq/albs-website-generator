export interface ProjectItem {
  title: string
  caption: string
  imageUrl: string
}

export interface ProjectsProps {
  projects: ProjectItem[]
  primaryColor: string
  accentColor?: string
  note?: string
}
