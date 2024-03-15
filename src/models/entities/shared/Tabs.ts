export interface TabItem {
  label: string;
  path: string;
  icon: any;
}

export interface TabsComponentProps {
  tabs: string[];
  onChange: (index: number) => void;
  index: number;
}
