import * as React from 'react';
import './PanelContainer.css';
import { ComponentStats } from './ComponentStatsPanel';
import { Panel } from './Panel';

export type PanelContainerProps = {
  numPanels: number;
  numItemsPerPanel: number;
  virtual: boolean;
  updateStats: (name: string, stats: ComponentStats) => void;
  recordTiming: (operation: string, elapsed: number) => void;
};

export class PanelContainer extends React.PureComponent<PanelContainerProps> {

  private static nextComponentId: number = 0;
  private componentId: number = PanelContainer.nextComponentId++;
  private stats: ComponentStats = { mountCount: 0, updateCount: 0, renderCount: 0 };
  private element: HTMLDivElement | null = null;
  private boundOnPaintComplete = this.onPaintComplete.bind(this);
  private boundOnScroll = this.onScroll.bind(this);
  private readonly viewWidth = 800;
  private readonly panelWidth = 90 + 8 + 4 + 2; // width + padding + border + margin

  componentWillMount() {
    performance.mark(this.getMarkName('mount', 'Start'));
    setTimeout(this.boundOnPaintComplete, 0);
  }

  componentDidMount() {
    this.stats.mountCount++;
    this.props.updateStats('PanelContainer', this.stats);
  }

  componentDidUpdate() {
    this.stats.updateCount++;
    this.props.updateStats('PanelContainer', this.stats);
  }

  render(): JSX.Element {
    this.stats.renderCount++;
    return (
      <div
        ref={(elem) => this.element = elem}
        className="PanelContainer"
        onScroll={this.boundOnScroll}>
        {this.renderPanels()}
      </div>
      );
  }

  private renderPanels(): JSX.Element[] {
    const panels: JSX.Element[] = [];
    for (let i = 0; i < this.props.numPanels; i++) {
      panels.push(
        <Panel
          key={i.toString()}
          id={i}
          numItems={this.props.numItemsPerPanel}
          updateStats={this.props.updateStats}
        />);
    }
    return panels;
  }

  private getMarkName(eventType: string, eventName: string): string {
    return `PanelContainer:${this.componentId}:${eventType}:${eventName}}`;
  }

  private onPaintComplete() {
    const onScrollMark = this.getMarkName('onScroll', 'Start');
    let marks = performance.getEntriesByName(onScrollMark, 'mark');
    for (let mark of marks) {
      performance.measure('PanelContainer:onScroll', mark.name);
      const elapsed = performance.now() - mark.startTime;
      this.props.recordTiming('PanelContainer:Scroll', elapsed);
    }
    performance.clearMarks(onScrollMark);
    performance.clearMeasures('PanelContainer:onScroll');

    const onMountMark = this.getMarkName('mount', 'Start');
    marks = performance.getEntriesByName(onMountMark, 'mark');
    for (let mark of marks) {
      performance.measure('PanelContainer:mount', mark.name);
      const elapsed = performance.now() - mark.startTime;
      this.props.recordTiming('PanelContainer:Init', elapsed);
    }
    performance.clearMarks(onMountMark);
    performance.clearMeasures('PanelContainer:mount');
  }

  private onScroll() {
    if (this && this.element) {
      console.log(`PanelContainer.scrollLeft === ${this.element.scrollLeft}`);
    }
    performance.mark(this.getMarkName('onScroll', 'Start'));
    setTimeout(this.boundOnPaintComplete, 0);
  }
}
