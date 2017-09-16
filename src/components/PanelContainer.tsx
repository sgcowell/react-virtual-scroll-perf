import * as React from 'react';
import './PanelContainer.css';
import { ComponentStats } from './ComponentStatsPanel';

export type PanelContainerProps = {
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
      <div className="PanelContainer">hi</div>
      );
  }
}
