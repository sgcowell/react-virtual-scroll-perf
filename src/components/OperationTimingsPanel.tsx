import * as React from 'react';
import './OperationTimingsPanel.css';

export type OperationTiming = {
  operationCount: number;
  totalElapsed: number;
  minElapsed: number;
  maxElapsed: number;
};

export interface OperationTimingMap {
  [name: string]: OperationTiming;
}

export type OperationTimingsPanelProps = {
  timings: OperationTimingMap;
};

export class OperationTimingsPanel extends React.PureComponent<OperationTimingsPanelProps> {

  render(): JSX.Element {
    return (
      <table className="ComponentStatsPanel">
        <thead>
          <tr>
            <th>Operation</th>
            <th>Count</th>
            <th>Avg (ms)</th>
            <th>Min (ms)</th>
            <th>Max (ms)</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTimingsRows()}
        </tbody>
      </table>
    );
  }

  private renderTimingsRows(): JSX.Element[] {
    let rows: JSX.Element[] = [];
    for (let op of Object.keys(this.props.timings)) {
      const timing = this.props.timings[op];
      rows.push(
        <tr key={op}>
          <td>{op}</td>
          <td className="Timing">{timing.operationCount}</td>
          <td className="Timing">{(timing.totalElapsed / timing.operationCount).toFixed(0)}</td>
          <td className="Timing">{timing.minElapsed.toFixed(0)}</td>
          <td className="Timing">{timing.maxElapsed.toFixed(0)}</td>
        </tr>
        );
    }
    return rows;
  }
}
