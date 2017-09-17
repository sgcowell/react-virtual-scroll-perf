import * as React from 'react';
import './App.css';
import { PanelContainer } from './components/PanelContainer';
import { ComponentStatsPanel, ComponentStats, ComponentStatsMap } from './components/ComponentStatsPanel';
import { OperationTimingsPanel, OperationTimingMap } from './components/OperationTimingsPanel';

type AppState = {
  readonly stats: ComponentStatsMap;
  readonly timings: OperationTimingMap;
};

class App extends React.Component<{}, AppState> {

  private boundUpdateStats = this.updateStats.bind(this);
  private boundRecordTiming = this.recordTiming.bind(this);
  private numPanels = 100;
  private numItemsPerPanel = 100;
  private statsMap: ComponentStatsMap = {};
  private timingMap: OperationTimingMap = {};

  constructor() {
    super();
    this.state = { stats: {}, timings: {} };
  }

  render() {
    return (
      <div className="App">
        <div className="InfoPanelContainer">
          <ComponentStatsPanel stats={this.state.stats} />
          <OperationTimingsPanel timings={this.state.timings} />
        </div>
        <PanelContainer
          numPanels={this.numPanels}
          numItemsPerPanel={this.numItemsPerPanel}
          updateStats={this.boundUpdateStats}
          recordTiming={this.boundRecordTiming}
        />
      </div>
    );
  }

  private updateStats(name: string, stats: ComponentStats) {
    this.statsMap = { ...this.statsMap, [name]: stats };
    this.setState({ stats: this.statsMap });
  }

  private recordTiming(operation: string, elapsed: number) {
    let timing = this.timingMap[operation];
    if (!timing) {
      timing = { operationCount: 0, totalElapsed: 0, minElapsed: Number.MAX_VALUE, maxElapsed: 0 };
    }
    timing.operationCount++;
    timing.totalElapsed += elapsed;
    timing.minElapsed = Math.min(timing.minElapsed, elapsed);
    timing.maxElapsed = Math.max(timing.maxElapsed, elapsed);
    this.timingMap = { ...this.timingMap, [operation]: timing };
    this.setState({ timings: this.timingMap });
  }
}

export default App;
