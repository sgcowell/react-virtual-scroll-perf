import * as React from 'react';
import './PanelContainer.css';
import { ComponentStats } from './ComponentStatsPanel';
import { Panel } from './Panel';

export type PanelContainerProps = {
  numPanels: number;
  numItemsPerPanel: number;
  virtual: boolean;
  altKeyAssignment: boolean;
  updateStats: (name: string, stats: ComponentStats) => void;
  recordTiming: (operation: string, elapsed: number) => void;
};

type PanelContainerState = {
  visiblePanelIndex: number;
}

export class PanelContainer extends React.PureComponent<PanelContainerProps, PanelContainerState> {

  private static nextComponentId: number = 0;
  private componentId: number = PanelContainer.nextComponentId++;
  private stats: ComponentStats = { mountCount: 0, updateCount: 0, renderCount: 0 };
  private element: HTMLDivElement | null = null;
  private boundOnPaintComplete = this.onPaintComplete.bind(this);
  private boundOnScroll = this.onScroll.bind(this);
  private readonly viewWidth = 800;
  private readonly panelWidth = 90 + 8 + 4 + 2; // width + padding + border + margin
  private readonly renderMode = 'svg';

  constructor(props: PanelContainerProps) {
    super(props);
    this.state = { visiblePanelIndex: 0 };
  }

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
        <div className="ScrollContentBox" style={{ width: this.props.numPanels * this.panelWidth }}>
          {this.renderPanels()}
        </div>
      </div>
      );
  }

  private getFirstVisiblePanelIndex(scrollLeft: number): number {
    return Math.floor(scrollLeft / this.panelWidth);
  }

  private getVisiblePanelCount(): number {
    return Math.ceil(this.viewWidth / this.panelWidth) + 1;
  }

  private renderPanels(): JSX.Element[] {
    if (this.props.virtual) {
      return this.renderPanelsVirtual();
    }
    return this.renderPanelsBaseline();
  }

  private renderPanelsBaseline(): JSX.Element[] {
    const panels: JSX.Element[] = [];
    for (let i = 0; i < this.props.numPanels; i++) {
      const key = i.toString();
      panels.push(
        <Panel
          key={key}
          id={i}
          panelKey={key}
          numItems={this.props.numItemsPerPanel}
          updateStats={this.props.updateStats}
          rightMargin={0}
          renderMode={this.renderMode}
        />);
    }
    return panels;
  }

  private renderPanelsVirtual(): JSX.Element[] {
    const panels: JSX.Element[] = [];
    const panelCount = this.getVisiblePanelCount();
    const startIndex = this.state.visiblePanelIndex;
    const endIndex = Math.min(this.props.numPanels, startIndex + panelCount);
    const rightMargin = (this.props.numPanels - endIndex) * this.panelWidth;

    if (startIndex > 0) {
      panels.push(<div key="spacerleft" style={{ width: startIndex * this.panelWidth }} />)
    }

    for (let i = startIndex; i < endIndex; i++) {
      const key = (this.props.altKeyAssignment ? i % panelCount : i).toString();
      if ((rightMargin > 0) && (i === endIndex - 1)) {
        panels.push(
          <Panel
            key={key}
            id={i}
            panelKey={key}
            numItems={this.props.numItemsPerPanel}
            updateStats={this.props.updateStats}
            rightMargin={rightMargin}
            renderMode={this.renderMode}
          />);
      } else {
        panels.push(
          <Panel
            key={key}
            id={i}
            panelKey={key}
            numItems={this.props.numItemsPerPanel}
            updateStats={this.props.updateStats}
            rightMargin={0}
            renderMode={this.renderMode}
          />);
      }
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
      this.setState({ visiblePanelIndex: this.getFirstVisiblePanelIndex(this.element.scrollLeft) });
    }
    performance.mark(this.getMarkName('onScroll', 'Start'));
    setTimeout(this.boundOnPaintComplete, 0);
  }
}
