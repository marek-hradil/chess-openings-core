import BoardConfig from './Config/BoardConfig'
import BoardGui from './Gui/BoardGui'
import BoardRenderer from './Renderer/BoardRenderer'
import BoardRules from './Rules/BoardRules'
import BoardState from './State/BoardState'
import BoardTime from './Time/BoardTime'

class BoardSingletonFactory {
  private config: BoardConfig
  private state: BoardState | null = null
  private rules: BoardRules | null = null
  private time: BoardTime | null = null
  private renderer: BoardRenderer | null = null
  private gui: BoardGui | null = null

  constructor(config: BoardConfig) {
    this.config = config
  }

  public makeState() {
    if (!this.state) {
      return new BoardState(this.config.state)
    }

    return this.state
  }

  public makeRules() {
    if (!this.rules) {
      return new BoardRules(this.config.rules)
    }

    return this.rules
  }

  public makeTime() {
    if (!this.time) {
      return new BoardTime(this.config.time)
    }

    return this.time
  }

  public makeGui(canvas: HTMLCanvasElement) {
    if (!this.gui) {
      return new BoardGui(this.config.gui, canvas)
    }

    return this.gui
  }

  public makeRenderer(canvas: HTMLCanvasElement) {
    if (!this.renderer) {
      return new BoardRenderer(this.config.renderer, canvas)
    }

    return this.renderer
  }
}

export default BoardSingletonFactory
