import * as React from 'react';
import './App.css';
import { PanelContainer } from './components/PanelContainer';
import { ComponentStatsPanel, ComponentStats, ComponentStatsMap } from './components/ComponentStatsPanel';

type AppState = {
  readonly stats: ComponentStatsMap;
};

class App extends React.Component<{}, AppState> {

  private boundUpdateStats = this.updateStats.bind(this);

  constructor() {
    super();
    this.state = { stats: {} };
  }

  render() {
    return (
      <div className="App">
        <PanelContainer updateStats={this.boundUpdateStats} />
        <ComponentStatsPanel stats={this.state.stats} />
      </div>
    );
  }

  private updateStats(name: string, stats: ComponentStats) {
    this.setState({ stats: { ...this.state.stats, [name]: stats }});
  }
}

export default App;
