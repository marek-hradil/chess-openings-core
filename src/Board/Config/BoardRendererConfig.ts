import BoardData, { BoardRendererData } from './BoardData'
import BoardSwitches from './BoardSwitches'

class BoardRendererConfig {
  public data: BoardData
  public switches: BoardSwitches

  constructor(options?: BoardRendererData) {
    this.data = new BoardData({
      type: 'BoardRenderer',
      figuresSpritePath: options?.figuresSpritePath,
    })
    this.switches = new BoardSwitches({
      type: 'BoardRenderer',
      shouldRenderAsBlack: options?.shouldRenderAsBlack,
    })
  }
}

export default BoardRendererConfig
