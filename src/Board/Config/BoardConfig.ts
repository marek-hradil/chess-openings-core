import BoardRendererConfig from './BoardRendererConfig'
import BoardRulesConfig from './BoardRulesConfig'
import BoardStateConfig from './BoardStateConfig'
import BoardTimeConfig from './BoardTimeConfig'

export type BoardConfigOptions = Partial<{
  rules: ConstructorParameters<typeof BoardRulesConfig>[0]
  time: ConstructorParameters<typeof BoardTimeConfig>[0]
  state: ConstructorParameters<typeof BoardStateConfig>[0]
  renderer: ConstructorParameters<typeof BoardRendererConfig>[0]
}>

class BoardConfig {
  public rules: BoardRulesConfig
  public time: BoardTimeConfig
  public state: BoardStateConfig
  public renderer: BoardRendererConfig

  constructor(options: BoardConfigOptions) {
    this.rules = new BoardRulesConfig(options?.rules)
    this.time = new BoardTimeConfig(options?.time)
    this.state = new BoardStateConfig(options?.state)
    this.renderer = new BoardRendererConfig(options?.renderer)
  }
}

export default BoardConfig
