import { Figure } from '../../Figure/Figure'

export enum FieldState {
  Idle = 'Idle',
  Selected = 'Selected',
  Playable = 'Playable',
}

export enum FieldColor {
  White = 'White',
  Black = 'Black',
}

export class Field {
  private color: FieldColor
  private figure: Figure | null = null
  private state: FieldState = FieldState.Idle

  constructor(color: FieldColor) {
    this.color = color
  }

  public getFigure() {
    return this.figure
  }

  public setFigure(figure: Figure | null) {
    this.figure = figure
  }

  public getColor() {
    switch (this.state) {
      case FieldState.Idle:
        return this.color === FieldColor.White ? '#FBFAF8' : '#804E49'
      case FieldState.Selected:
        return '#5A914D'
      case FieldState.Playable:
        return '#8FAD88'
    }
  }

  public getState() {
    return this.state
  }

  public setState(state: FieldState) {
    this.state = state
  }
}

export class WhiteField extends Field {
  constructor() {
    super(FieldColor.White)
  }
}

export class BlackField extends Field {
  constructor() {
    super(FieldColor.Black)
  }
}
