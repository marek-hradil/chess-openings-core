import BoardData, { BoardGeneralData, BoardRendererData } from './BoardData'

class BoardRendererConfig {
  public data: BoardData

  constructor(options?: BoardRendererData & BoardGeneralData) {
    this.data = new BoardData({
      type: 'BoardRenderer',
      figuresSpritePath: options?.figuresSpritePath,
      startAs: options?.startAs,
    })
  }
}

export default BoardRendererConfig
