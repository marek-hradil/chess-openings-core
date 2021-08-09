import BoardData, { BoardGeneralData } from './BoardData'

class BoardGuiConfig {
  public data: BoardData

  constructor(options?: BoardGeneralData) {
    this.data = new BoardData({
      type: 'BoardGui',
      startAs: options?.startAs,
    })
  }
}

export default BoardGuiConfig
