import { ComponentStats } from '../components/ComponentStatsPanel';

export type ScenarioProps = {
  numPanels: number;
  numItemsPerPanel: number;
  updateStats: (name: string, stats: ComponentStats) => void;
  recordTiming: (operation: string, elapsed: number) => void;
}
