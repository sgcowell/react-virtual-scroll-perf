/*
const getUniqueId = (() => {
  let i = 0;
  return () => ++i;
})();
*/

function getMarkerName(timerName: string): string {
  // return `${timerName}:${getUniqueId()}`;
  return timerName;
}

function closeActiveMark(markerName: string, timerName: string) {
  let marks = performance.getEntriesByName(markerName, 'mark');
  for (let mark of marks) {
    performance.measure(timerName, mark.name);
  }
  performance.clearMarks(markerName);
  performance.clearMeasures(timerName);
}

export function renderingPerformanceTimer(timerName: string) {
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalFn = descriptor.value;
    if (typeof originalFn === 'function') {
      descriptor.value = function(...args: any[]) {
        const markerName = getMarkerName(timerName);

        // If multiple events are queued for processing, setTimeout callbacks may be
        // delayed until all events have been processed.  User event processing
        // is synchronous so it's safe to close out any pending markers before
        // starting a new one.
        closeActiveMark(markerName, timerName);

        performance.mark(markerName);
        originalFn.apply(this, args);
        setTimeout(() => {
          closeActiveMark(markerName, timerName);
        }, 0);
      };
    }
  };
}
