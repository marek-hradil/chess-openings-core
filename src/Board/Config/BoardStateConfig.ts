import BoardData, { BoardStateData } from './BoardData'

class BoardStateConfig {
  public data: BoardData

  constructor(options?: BoardStateData) {
    this.data = new BoardData({
      type: 'BoardState',
      fieldRows: options?.fieldRows,
      fieldCols: options?.fieldCols,
    })
  }
}

export default BoardStateConfig
