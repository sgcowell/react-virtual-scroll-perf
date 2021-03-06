import * as React from 'react';
import './ComponentStatsPanel.css';

export type ComponentStats = {
  mountCount: number;
  updateCount: number;
  renderCount: number;
};

export interface ComponentStatsMap {
  [name: string]: ComponentStats;
}

export type ComponentStatsPanelProps = {
  stats: ComponentStatsMap;
};

export class ComponentStatsPanel extends React.PureComponent<ComponentStatsPanelProps> {
  render(): JSX.Element {
    return (
      <table className="ComponentStatsPanel">
        <thead>
          <tr>
            <th>Name</th>
            <th># Mount</th>
            <th># Update</th>
            <th># Render</th>
          </tr>
        </thead>
        <tbody>
          {this.renderStatsRows()}
        </tbody>
      </table>
    );
  }

  private renderStatsRows(): JSX.Element[] {
    let rows: JSX.Element[] = [];
    for (let name of Object.keys(this.props.stats)) {
      const stats = this.props.stats[name];
      rows.push(
        <tr key={name}>
          <td>{name}</td>
          <td className="Stat">{stats.mountCount}</td>
          <td className="Stat">{stats.updateCount}</td>
          <td className="Stat">{stats.renderCount}</td>
        </tr>
        );
    }
    return rows;
  }
}
