import { BoardGeneralData } from './BoardData'
import BoardGuiConfig from './BoardGuiConfig'
import BoardRendererConfig from './BoardRendererConfig'
import BoardRulesConfig from './BoardRulesConfig'
import BoardStateConfig from './BoardStateConfig'
import BoardTimeConfig from './BoardTimeConfig'

export type BoardConfigOptions = Readonly<
  Partial<{
    rules: ConstructorParameters<typeof BoardRulesConfig>[0]
    time: ConstructorParameters<typeof BoardTimeConfig>[0]
    state: ConstructorParameters<typeof BoardStateConfig>[0]
    renderer: ConstructorParameters<typeof BoardRendererConfig>[0]
    gui: ConstructorParameters<typeof BoardGuiConfig>[0]
    general: BoardGeneralData
  }>
>

class BoardConfig {
  public rules: BoardRulesConfig
  public time: BoardTimeConfig
  public state: BoardStateConfig
  public renderer: BoardRendererConfig
  public gui: BoardGuiConfig

  constructor(options: BoardConfigOptions) {
    this.rules = new BoardRulesConfig({ ...options?.rules, ...options?.general })
    this.time = new BoardTimeConfig({ ...options?.time, ...options?.general })
    this.state = new BoardStateConfig({ ...options?.state, ...options?.general })
    this.renderer = new BoardRendererConfig({ ...options?.renderer, ...options?.general })
    this.gui = new BoardGuiConfig({ ...options?.gui, ...options?.general })
  }
}

export default BoardConfig
