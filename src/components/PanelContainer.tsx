import * as React from 'react';
import './PanelContainer.css';
import { ComponentStats } from './ComponentStatsPanel';
import { Panel } from './Panel';

export type PanelContainerProps = {
  readonly numPanels: number;
  readonly numItemsPerPanel: number;
  readonly updateStats: (name: string, stats: ComponentStats) => void;
};

export class PanelContainer extends React.PureComponent<PanelContainerProps> {

  private stats: ComponentStats = { mountCount: 0, updateCount: 0, renderCount: 0 };

  componentDidMount() {
    this.stats.mountCount++;
    this.props.updateStats('PanelContainer', this.stats);
  }

  componentDidUpdate() {
    this.stats.updateCount++;
    this.props.updateStats('PanelContainer', this.stats);
  }

  render(): JSX.Element {
    this.stats.renderCount++;
    return (
      <div className="PanelContainer">
        {this.renderPanels()}
      </div>
      );
  }

  private renderPanels(): JSX.Element[] {
    const panels: JSX.Element[] = [];
    for (let i = 0; i < this.props.numPanels; i++) {
      panels.push(
        <Panel
          key={i.toString()}
          id={i}
          numItems={this.props.numItemsPerPanel}
          updateStats={this.props.updateStats}
        />);
    }
    return panels;
  }
}
