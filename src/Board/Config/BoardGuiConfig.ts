import { BoardRendererData } from './BoardData'
import BoardSwitches from './BoardSwitches'

class BoardGuiConfig {
  public switches: BoardSwitches

  constructor(options?: BoardRendererData) {
    this.switches = new BoardSwitches({
      type: 'BoardGui',
      shouldRenderAsBlack: options?.shouldRenderAsBlack,
    })
  }
}

export default BoardGuiConfig
