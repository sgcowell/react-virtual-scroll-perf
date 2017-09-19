import * as React from 'react';
import { PanelContainer } from '../components/PanelContainer';
import { Panel } from '../components/Panel';
import { PanelItem } from '../components/PanelItem';
import { ScenarioProps } from './ScenarioProps';

export class VirtualScrollAltKeyAssignScenario extends React.PureComponent<ScenarioProps> {

  static resetStats() {
    Panel.resetStats();
    PanelItem.resetStats();
  }

  render(): JSX.Element {
    return (
      <PanelContainer
        numPanels={this.props.numPanels}
        numItemsPerPanel={this.props.numItemsPerPanel}
        virtual={true}
        altKeyAssignment={true}
        updateStats={this.props.updateStats}
        recordTiming={this.props.recordTiming}
      />
      );
  }
}
