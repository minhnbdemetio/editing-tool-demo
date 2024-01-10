export abstract class Command {
  fromState?: Object;
  toState?: Object;
  actionFunction: Function;
  undoFunction: Function;
  constructor(options: {
    actionFunction: Function;
    undoFunction: Function;
    fromState?: Object;
    toState?: Object;
  }) {
    this.fromState = options.fromState;
    this.toState = options.toState;
    this.actionFunction = options.actionFunction;
    this.undoFunction = options.undoFunction;
  }

  performCommand(...params: any) {
    return this.actionFunction(...params);
  }

  performUndo(...params: any) {
    return this.undoFunction(...params);
  }
}
