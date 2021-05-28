import { FigureColor, FigureName } from './Figure'

export class FigureVisuals {
  private spriteX = 0
  private spriteY = 0
  private spriteHeight = 45
  private spriteWidth = 45

  constructor(name: FigureName, color: FigureColor) {
    const [x, y] = this.setSpriteCoordinates(name, color)

    this.spriteX = x ?? 0
    this.spriteY = y ?? 0
  }

  public serialize() {
    return [this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight] as const
  }

  private setSpriteCoordinates(name: FigureName, color: FigureColor) {
    const y = color === 'White' ? 0 : 45
    switch (name) {
      case 'King':
        return [0, y]
      case 'Queen':
        return [45, y]
      case 'Bishop':
        return [90, y]
      case 'Knight':
        return [135, y]
      case 'Rook':
        return [180, y]
      case 'Pawn':
        return [225, y]
    }
  }
}
