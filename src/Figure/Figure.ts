import { FigureVisuals } from './FigureVisuals'

export type FigureColor = 'White' | 'Black'
export type FigureName = 'King' | 'Queen' | 'Rook' | 'Bishop' | 'Knight' | 'Pawn'

export abstract class Figure {
  private readonly startingPosition: string
  private readonly color: FigureColor
  private readonly name: FigureName
  private readonly visuals: FigureVisuals

  constructor(name: FigureName, color: FigureColor, startingPosition: string) {
    this.startingPosition = startingPosition
    this.name = name
    this.color = color

    this.visuals = new FigureVisuals(name, color)
  }

  public getColor() {
    return this.color
  }

  public getName() {
    return this.name
  }

  public getVisuals() {
    return this.visuals
  }

  public getStartingPosition() {
    return this.startingPosition
  }
}
