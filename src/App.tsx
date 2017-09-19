import * as React from 'react';
import './App.css';
import { BaselineScenario } from './scenarios/BaselineScenario';
import { ComponentStatsPanel, ComponentStats, ComponentStatsMap } from './components/ComponentStatsPanel';
import { OperationTimingsPanel, OperationTimingMap } from './components/OperationTimingsPanel';

type AppState = {
  stats: ComponentStatsMap;
  timings: OperationTimingMap;
  scenario: string;
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
    this.state = { stats: {}, timings: {}, scenario: 'reset' };
  }

  render(): JSX.Element {
    return (
      <div className="App">
        <div className="ScenarioSelectorContainer">
          <span>Scenario:</span>
          {this.renderScenarioLinks()}
        </div>
        <div className="InfoPanelContainer">
          <ComponentStatsPanel stats={this.state.stats} />
          <OperationTimingsPanel timings={this.state.timings} />
        </div>
        {this.renderScenario()}
      </div>
    );
  }

  private renderScenario(): JSX.Element | null {
    if (this.state.scenario === 'baseline') {
      return (
        <BaselineScenario
          numPanels={this.numPanels}
          numItemsPerPanel={this.numItemsPerPanel}
          updateStats={this.boundUpdateStats}
          recordTiming={this.boundRecordTiming}
        />
        );
    }
    return null;
  }

  private renderScenarioLinks(): JSX.Element[] {
    const scenarios: string[] = [ 'reset', 'baseline' ];
    const links: JSX.Element[] = [];
    for (let s of scenarios) {
      if (this.state.scenario === s) {
        links.push(<span>{s}</span>);
      }
      else {
        links.push(<a href='#' onClick={this.onScenarioSelected.bind(this, s)}>{s}</a>);
      }
    }
    return links;
  }

  private resetStats() {
    this.statsMap = {};
    this.timingMap = {};
    BaselineScenario.resetStats();
  }

  private onScenarioSelected(scenario: string) {
    this.resetStats();
    this.setState({ stats: {}, timings: {}, scenario: scenario });
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
