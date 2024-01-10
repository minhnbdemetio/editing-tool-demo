import { MoveableObject } from '../MoveableObject';
import { Command } from './Command';

export class DeleteCommand extends Command {
  constructor(options: {
    moveableObject: MoveableObject | null;
    actionFunction: Function;
    undoFunction: Function;
    fromState?: Object;
    toState?: Object;
  }) {
    super(options);
  }
}
