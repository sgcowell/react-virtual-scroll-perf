import * as React from 'react';
import './PanelItem.css';
import { ComponentStats } from './ComponentStatsPanel';

export type PanelItemProps = {
  index: number;
  width: number;
  renderMode: string;
  updateStats: (name: string, stats: ComponentStats) => void;
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
    return (this.props.renderMode === 'svg') ? this.renderSvg() : this.renderDiv();
  }

  private renderDiv(): JSX.Element {
    return (
      <div className="PanelItem">
        <div className="PanelItemBar" style={{ width: this.props.width }}>
          <div className="PanelItemBarHighlight"  style={{ width: this.props.width / 2 }}/>
        </div>
      </div>
      );
  }

/*
  private renderDiv(): JSX.Element {
    return (
      <div className="PanelItem">
        <div className="PanelItemBar" style={{ width: this.props.width }}>
          <div className="PanelItemBarHighlight"  style={{ width: this.props.width / 2 }}>
            <div className="PanelItemBarHighlight" style={{ width: this.props.width / 4, backgroundColor: "lightcoral" }}>
              <div className="PanelItemBarHighlight" style={{ width: this.props.width / 8, backgroundColor: "lightgreen" }}>
                <div className="PanelItemBarHighlight" style={{ width: this.props.width / 16, backgroundColor: "lightpurple" }}/>
               </div>
             </div>
          </div>
        </div>
      </div>
      );
  }
*/

  private renderSvg(): JSX.Element {
    return (
      <g>
        <rect x={0} y={this.props.index * 4} width={this.props.width} height={3} fill="lightgray" />
        <rect x={0} y={this.props.index * 4} width={this.props.width / 2} height={3} fill="lightblue" />
      </g>
      );
  }

}
