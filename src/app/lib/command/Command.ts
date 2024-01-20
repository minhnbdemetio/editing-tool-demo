export abstract class Command {
  actionFunction: Function;
  undoFunction: Function;
  redoFunction: Function;
  constructor(options: {
    actionFunction: Function;
    undoFunction: Function;
    redoFunction: Function;
  }) {
    this.actionFunction = options.actionFunction;
    this.undoFunction = options.undoFunction;
    this.redoFunction = options.redoFunction;
  }

  performCommand(...params: any) {
    return this.actionFunction(...params);
  }

  performUndo(...params: any) {
    return this.undoFunction(...params);
  }

  performRedo(...params: any) {
    return this.redoFunction(...params);
  }
}
