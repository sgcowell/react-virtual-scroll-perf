import * as React from 'react';
import './PanelItem.css';
import { ComponentStats } from './ComponentStatsPanel';

export type PanelItemProps = {
  readonly width: number;
  readonly updateStats: (name: string, stats: ComponentStats) => void;
};

export class PanelItem extends React.PureComponent<PanelItemProps> {

  private static stats: ComponentStats = { mountCount: 0, updateCount: 0, renderCount: 0 };

  static resetStats() {
    PanelItem.stats = { mountCount: 0, updateCount: 0, renderCount: 0 };
  }

  componentDidMount() {
    PanelItem.stats.mountCount++;
    this.props.updateStats('PanelItem', PanelItem.stats);
  }

  componentDidUpdate() {
    PanelItem.stats.updateCount++;
    this.props.updateStats('PanelItem', PanelItem.stats);
  }

  render(): JSX.Element {
    PanelItem.stats.renderCount++;
    return (
      <div className="PanelItem">
        <div className="PanelItemBar" style={{ width: this.props.width }}>
          <div className="PanelItemBarHighlight"  style={{ width: this.props.width / 2 }}/>
        </div>
      </div>
      );
  }

}
