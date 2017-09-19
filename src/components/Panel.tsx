import * as React from 'react';
import './Panel.css';
import { ComponentStats } from './ComponentStatsPanel';
import { PanelItem } from './PanelItem';

export type PanelProps = {
  readonly id: number;
  readonly numItems: number;
  readonly updateStats: (name: string, stats: ComponentStats) => void;
};

export class Panel extends React.PureComponent<PanelProps> {

  private static stats: ComponentStats = { mountCount: 0, updateCount: 0, renderCount: 0 };

  static resetStats() {
    Panel.stats = { mountCount: 0, updateCount: 0, renderCount: 0 };
  }

  componentDidMount() {
    Panel.stats.mountCount++;
    this.props.updateStats('Panel', Panel.stats);
  }

  componentDidUpdate() {
    Panel.stats.updateCount++;
    this.props.updateStats('Panel', Panel.stats);
  }

  render(): JSX.Element {
    Panel.stats.renderCount++;
    return (
      <div className="Panel">
        <div className="PanelHeader">{`Panel ${this.props.id + 1}`}</div>
        {this.renderItems()}
      </div>
      );
  }

  private renderItems(): JSX.Element[] {
    let items: JSX.Element[] = [];
    for (let i = 0; i < this.props.numItems; i++) {
      const width = (Math.sin(((i - (this.props.id * 10)) * Math.PI * 1.5) / this.props.numItems) * 40) + 40;
      items.push(<PanelItem key={i.toString()} width={width} updateStats={this.props.updateStats} />);
    }
    return items;
  }
}
