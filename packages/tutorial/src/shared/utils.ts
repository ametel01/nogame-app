import { Position } from "../../../frontend/src/shared/types";

export function positionToString(position: Position) {
  return `${position.system} / ${position.orbit}`;
}
