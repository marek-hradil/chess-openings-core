import { IndexConverter } from '../../Converters'
import BoardRendererConfig from '../Config/BoardRendererConfig'
import BoardState from '../State/BoardState'
import BoardSwitches from '../Config/BoardSwitches'

export class BoardRenderer {
  private sprite: Promise<HTMLImageElement>
  private context: CanvasRenderingContext2D | null = null
  private sizes: [width: number, height: number] = [0, 0]
  private switches: BoardSwitches

  constructor(config: BoardRendererConfig, canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')

    const sprite = new Image()
    this.sprite = new Promise((resolve, reject) => {
      sprite.onload = () => resolve(sprite)
      sprite.onerror = reject
      sprite.src = config.data.figuresSpritePath
    })

    if (context) {
      this.context = context
      this.sizes = [canvas.width, canvas.height]
    }

    this.switches = config.switches
  }

  public render(state: BoardState) {
    if (!this.context) {
      return
    }

    const [canvasWidth, canvasHeight] = this.sizes
    const squareSizes = [canvasWidth / 8, canvasHeight / 8] as [number, number]
    const fields = state.getFields()

    for (const rowIndex in fields) {
      const row = fields[rowIndex]
      for (const colIndex in row) {
        const cell = row[Number(colIndex)]
        const color = cell?.getColor()
        const figure = cell?.getFigure()

        if (color) {
          this.context.fillStyle = color
        }

        const coordinates = IndexConverter.fromIndex(
          [Number(rowIndex), Number(colIndex)],
          squareSizes,
          this.switches.shouldRenderAsBlack
        )

        this.context.fillRect(...coordinates, ...squareSizes)

        if (figure) {
          const visuals = figure.getVisuals().serialize()
          const context = this.context

          this.sprite
            .then(sprite => context.drawImage(sprite, ...visuals, ...coordinates, ...squareSizes))
            .catch(() =>
              console.error(`Could not resolve figures path, please check if it is valid.`)
            )
        }
      }
    }
  }
}

export default BoardRenderer
