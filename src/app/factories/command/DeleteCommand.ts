import { MoveableObject } from '../MoveableObject';
import { Command } from './Command';

export class DeleteCommand extends Command {
  deletedObject: MoveableObject | null;
  recreatedObject: MoveableObject | null;
  constructor(options: {
    actionFunction: Function;
    undoFunction: Function;
    redoFunction: Function;
  }) {
    super(options);
    this.deletedObject = null;
    this.recreatedObject = null;
  }
  setDeletedObject(deletedObject: MoveableObject | null) {
    this.deletedObject = deletedObject;
  }
  performCommand(...params: any) {
    this.actionFunction(this.deletedObject);
    return;
  }
  performUndo(...params: any) {
    const recreatedObject = this.undoFunction(this.deletedObject);
    this.recreatedObject = recreatedObject;
    this.deletedObject = null;
    return;
  }
  performRedo(...params: any) {
    const deletedObject = this.redoFunction(this.recreatedObject);
    this.deletedObject = deletedObject;
    this.recreatedObject = null;
    return;
  }
}
