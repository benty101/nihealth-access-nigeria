
/**
 * Utility for tracking user activity and session management
 */
export class ActivityTracker {
  private updateCallback: () => void;
  private events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

  constructor(updateCallback: () => void) {
    this.updateCallback = updateCallback;
  }

  startTracking(): void {
    this.events.forEach(event => {
      document.addEventListener(event, this.updateCallback, true);
    });
  }

  stopTracking(): void {
    this.events.forEach(event => {
      document.removeEventListener(event, this.updateCallback, true);
    });
  }
}
