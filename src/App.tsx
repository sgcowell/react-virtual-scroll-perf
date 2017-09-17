import * as React from 'react';
import './App.css';
import { PanelContainer } from './components/PanelContainer';
import { ComponentStatsPanel, ComponentStats, ComponentStatsMap } from './components/ComponentStatsPanel';

type AppState = {
  readonly stats: ComponentStatsMap;
};

class App extends React.Component<{}, AppState> {

  private boundUpdateStats = this.updateStats.bind(this);
  private numPanels = 100;
  private numItemsPerPanel = 100;
  private statsMap: ComponentStatsMap;

  constructor() {
    super();
    this.state = { stats: {} };
  }

  render() {
    return (
      <div className="App">
        <ComponentStatsPanel stats={this.state.stats} />
        <PanelContainer
          numPanels={this.numPanels}
          numItemsPerPanel={this.numItemsPerPanel}
          updateStats={this.boundUpdateStats}
        />
      </div>
    );
  }

  private updateStats(name: string, stats: ComponentStats) {
    this.statsMap = { ...this.statsMap, [name]: stats };
    this.setState({ stats: this.statsMap });
  }
}

export default App;
