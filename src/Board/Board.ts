import BoardSingletonFactory from './BoardSingletonFactory'
import BoardConfig, { BoardConfigOptions } from './Config/BoardConfig'
import BoardGui from './Gui/BoardGui'
import BoardRenderer from './Renderer/BoardRenderer'
import BoardRules from './Rules/BoardRules'
import BoardState from './State/BoardState'
import BoardTime from './Time/BoardTime'

class Board {
  private gui: BoardGui
  private state: BoardState
  private rules: BoardRules
  private time: BoardTime
  private renderer: BoardRenderer

  constructor(options: BoardConfigOptions, canvas: HTMLCanvasElement) {
    const factory = new BoardSingletonFactory(new BoardConfig(options))

    this.state = factory.makeState()
    this.rules = factory.makeRules()
    this.gui = factory.makeGui(canvas)
    this.renderer = factory.makeRenderer(canvas)
    this.time = factory.makeTime()

    canvas.onclick = e => {
      const elem = canvas.getBoundingClientRect()
      const x = Math.max(e.clientX - elem.left, 0)
      const y = Math.max(e.clientY - elem.top)

      this.gui.onClick([x, y], this.state, this.rules, this.time)
      this.renderer.render(this.state)
    }

    this.rules.setup(this.state)
    this.renderer.render(this.state)
  }
}

export default Board
