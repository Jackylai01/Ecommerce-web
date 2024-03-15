export interface TabItem {
  label: string;
  path: string;
}

export interface TabsComponentProps {
  tabs: string[];
  onChange: (index: number) => void;
  index: number;
}
