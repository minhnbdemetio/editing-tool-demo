import { Command } from './Command';

export class DeleteCommand extends Command {
  constructor(options: {
    actionFunction: Function;
    undoFunction: Function;
    fromState?: Object;
    toState?: Object;
  }) {
    super(options);
  }
}
