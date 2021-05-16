import BoardData, { BoardRendererData } from './BoardData'

class BoardRendererConfig {
  public data: BoardData

  constructor(options?: BoardRendererData) {
    this.data = new BoardData({
      type: 'BoardRenderer',
      figuresSpritePath: options?.figuresSpritePath,
    })
  }
}

export default BoardRendererConfig
