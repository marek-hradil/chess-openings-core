import { FigureVisuals } from './FigureVisuals'
import { v4 as uuid } from 'uuid'

export type FigureColor = 'White' | 'Black'
export type FigureName = 'King' | 'Queen' | 'Rook' | 'Bishop' | 'Knight' | 'Pawn'

export abstract class Figure {
  private readonly id: string
  private readonly color: FigureColor
  private readonly name: FigureName
  private readonly visuals: FigureVisuals

  constructor(name: FigureName, color: FigureColor) {
    this.id = uuid()
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

  public getId() {
    return this.id
  }
}
