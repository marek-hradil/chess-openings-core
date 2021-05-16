import { Bishop } from '../../Figure/Bishop'
import { Figure, FigureColor, FigureName } from '../../Figure/Figure'
import { King } from '../../Figure/King'
import { Knight } from '../../Figure/Knight'
import { Pawn } from '../../Figure/Pawn'
import { Queen } from '../../Figure/Queen'
import { Rook } from '../../Figure/Rook'
import { BishopMovementRule } from '../Rules/BishopMovementRule'
import { KingMovementRule } from '../Rules/KingMovementRule'
import { KnightMovementRule } from '../Rules/KnightMovementRule'
import { MovementRule } from '../Rules/MovementRule'
import { PawnMovementRule } from '../Rules/PawnMovementRule'
import { QueenMovementRule } from '../Rules/QueenMovementRule'
import { RookMovementRule } from '../Rules/RookMovementRule'
import BoardTimeRecord from '../Time/BoardTimeRecord'

export type BoardRulesData = {
  layout?: { [position: string]: Figure }
  movements?: { [type in FigureName]: MovementRule }
}

export type BoardStateData = {
  fieldRows?: number
  fieldCols?: number
}

export type BoardTimeData = {
  inevitablePlan?: { [color in FigureColor]: BoardTimeRecord[] }
  followablePlan?: { [color in FigureColor]: BoardTimeRecord[] }
}

export type BoardRendererData = {
  figuresSpritePath?: string
}

type DataConstructor =
  | (BoardRulesData & { type: 'BoardRules' })
  | (BoardStateData & { type: 'BoardState' })
  | (BoardTimeData & { type: 'BoardTime' })
  | (BoardRendererData & { type: 'BoardRenderer' })
  | never

interface Data
  extends Required<BoardRulesData>,
    Required<BoardStateData>,
    Required<BoardTimeData>,
    Required<BoardRendererData> {}

class BoardData implements Data {
  private readonly defaultLayout: Data['layout'] = {
    a1: new Rook('White'),
    b1: new Knight('White'),
    c1: new Bishop('White'),
    e1: new King('White'),
    d1: new Queen('White'),
    f1: new Bishop('White'),
    g1: new Knight('White'),
    h1: new Rook('White'),
    a2: new Pawn('White'),
    b2: new Pawn('White'),
    c2: new Pawn('White'),
    d2: new Pawn('White'),
    e2: new Pawn('White'),
    f2: new Pawn('White'),
    g2: new Pawn('White'),
    h2: new Pawn('White'),
    a8: new Rook('Black'),
    b8: new Knight('Black'),
    c8: new Bishop('Black'),
    d8: new Queen('Black'),
    e8: new King('Black'),
    f8: new Bishop('Black'),
    g8: new Knight('Black'),
    h8: new Rook('Black'),
    a7: new Pawn('Black'),
    b7: new Pawn('Black'),
    c7: new Pawn('Black'),
    d7: new Pawn('Black'),
    e7: new Pawn('Black'),
    f7: new Pawn('Black'),
    g7: new Pawn('Black'),
    h7: new Pawn('Black'),
  }
  public layout = this.defaultLayout

  private readonly defaultMovements: Data['movements'] = {
    Bishop: new BishopMovementRule(),
    King: new KingMovementRule(),
    Queen: new QueenMovementRule(),
    Pawn: new PawnMovementRule(),
    Rook: new RookMovementRule(),
    Knight: new KnightMovementRule(),
  }
  public movements = this.defaultMovements

  public fieldRows = 8
  public fieldCols = 8

  public figuresSpritePath = '/figures/sprite.svg'

  public inevitablePlan = {
    White: new Array<BoardTimeRecord>(),
    Black: new Array<BoardTimeRecord>(),
  }
  public followablePlan = {
    White: new Array<BoardTimeRecord>(),
    Black: new Array<BoardTimeRecord>(),
  }

  constructor(data: DataConstructor) {
    if (data.type === 'BoardRules') {
      this.layout = data.layout ?? this.defaultLayout
      this.movements = data.movements ?? this.defaultMovements
    }

    if (data.type === 'BoardState') {
      this.fieldRows = data.fieldRows ?? 8
      this.fieldCols = data.fieldCols ?? 8
    }

    if (data.type === 'BoardRenderer') {
      this.figuresSpritePath = data.figuresSpritePath ?? '/figures/sprite.svg'
    }

    if (data.type === 'BoardTime') {
      this.inevitablePlan = data.inevitablePlan ?? {
        White: [],
        Black: [],
      }
      this.followablePlan = data.followablePlan ?? {
        White: [],
        Black: [],
      }
    }
  }
}

export default BoardData
