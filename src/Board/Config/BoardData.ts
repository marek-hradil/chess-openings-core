import { Bishop } from '../../Figure/Bishop'
import { BishopMovementRule } from '../Rules/BishopMovementRule'
import { Figure, FigureColor, FigureName } from '../../Figure/Figure'
import { King } from '../../Figure/King'
import { KingMovementRule } from '../Rules/KingMovementRule'
import { Knight } from '../../Figure/Knight'
import { KnightMovementRule } from '../Rules/KnightMovementRule'
import { MovementRule } from '../Rules/MovementRule'
import { Pawn } from '../../Figure/Pawn'
import { PawnMovementRule } from '../Rules/PawnMovementRule'
import { Queen } from '../../Figure/Queen'
import { QueenMovementRule } from '../Rules/QueenMovementRule'
import { Rook } from '../../Figure/Rook'
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
  shouldRenderAsBlack?: boolean
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
    a1: new Rook('White', 'a1'),
    b1: new Knight('White', 'b1'),
    c1: new Bishop('White', 'c1'),
    e1: new King('White', 'e1'),
    d1: new Queen('White', 'd1'),
    f1: new Bishop('White', 'f1'),
    g1: new Knight('White', 'g1'),
    h1: new Rook('White', 'h1'),
    a2: new Pawn('White', 'a2'),
    b2: new Pawn('White', 'b2'),
    c2: new Pawn('White', 'c2'),
    d2: new Pawn('White', 'd2'),
    e2: new Pawn('White', 'e2'),
    f2: new Pawn('White', 'f2'),
    g2: new Pawn('White', 'g2'),
    h2: new Pawn('White', 'h2'),
    a8: new Rook('Black', 'a8'),
    b8: new Knight('Black', 'b8'),
    c8: new Bishop('Black', 'c8'),
    d8: new Queen('Black', 'd8'),
    e8: new King('Black', 'e2'),
    f8: new Bishop('Black', 'f8'),
    g8: new Knight('Black', 'g8'),
    h8: new Rook('Black', 'h8'),
    a7: new Pawn('Black', 'a7'),
    b7: new Pawn('Black', 'b7'),
    c7: new Pawn('Black', 'c7'),
    d7: new Pawn('Black', 'd7'),
    e7: new Pawn('Black', 'e7'),
    f7: new Pawn('Black', 'f7'),
    g7: new Pawn('Black', 'g7'),
    h7: new Pawn('Black', 'h7'),
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
  public shouldRenderAsBlack = false

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
      this.shouldRenderAsBlack = data.shouldRenderAsBlack ?? false
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
