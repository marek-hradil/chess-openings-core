import { createBoard } from '../package'
import { useEffect, useRef } from 'react'

const practice = {
  plans: [
    {
      name: 'Dutch Defense',
      color: 'Black' as const,
      layout: [
        { name: 'Rook' as const, color: 'White' as const, position: 'a1' },
        { name: 'Knight' as const, color: 'White' as const, position: 'b1' },
        { name: 'Bishop' as const, color: 'White' as const, position: 'c1' },
        { name: 'King' as const, color: 'White' as const, position: 'e1' },
        { name: 'Queen' as const, color: 'White' as const, position: 'd1' },
        { name: 'Bishop' as const, color: 'White' as const, position: 'f1' },
        { name: 'Knight' as const, color: 'White' as const, position: 'g1' },
        { name: 'Rook' as const, color: 'White' as const, position: 'h1' },
        { name: 'Pawn' as const, color: 'White' as const, position: 'a2' },
        { name: 'Pawn' as const, color: 'White' as const, position: 'b2' },
        { name: 'Pawn' as const, color: 'White' as const, position: 'c2' },
        { name: 'Pawn' as const, color: 'White' as const, position: 'd4', startingPosition: 'd2' },
        { name: 'Pawn' as const, color: 'White' as const, position: 'e2' },
        { name: 'Pawn' as const, color: 'White' as const, position: 'f2' },
        { name: 'Pawn' as const, color: 'White' as const, position: 'g2' },
        { name: 'Pawn' as const, color: 'White' as const, position: 'h2' },
        { name: 'Rook' as const, color: 'Black' as const, position: 'a8' },
        { name: 'Knight' as const, color: 'Black' as const, position: 'b8' },
        { name: 'Bishop' as const, color: 'Black' as const, position: 'c8' },
        { name: 'Queen' as const, color: 'Black' as const, position: 'd8' },
        { name: 'King' as const, color: 'Black' as const, position: 'e8' },
        { name: 'Bishop' as const, color: 'Black' as const, position: 'f8' },
        { name: 'Knight' as const, color: 'Black' as const, position: 'g8' },
        { name: 'Rook' as const, color: 'Black' as const, position: 'h8' },
        { name: 'Pawn' as const, color: 'Black' as const, position: 'a7' },
        { name: 'Pawn' as const, color: 'Black' as const, position: 'b7' },
        { name: 'Pawn' as const, color: 'Black' as const, position: 'c7' },
        { name: 'Pawn' as const, color: 'Black' as const, position: 'd7' },
        { name: 'Pawn' as const, color: 'Black' as const, position: 'e7' },
        { name: 'Pawn' as const, color: 'Black' as const, position: 'f7' },
        { name: 'Pawn' as const, color: 'Black' as const, position: 'g7' },
        { name: 'Pawn' as const, color: 'Black' as const, position: 'h7' },
      ],
      inevitablePlan: {
        White: [],
        Black: [],
      },
      followablePlan: {
        White: [],
        Black: [
          {
            from: 'f7',
            to: 'f5',
            color: 'Black' as const,
            name: 'Pawn' as const,
            startingPosition: 'f7',
          },
        ],
      },
    },
  ],
}

const App = () => {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvas.current) {
      return
    }

    createBoard([
      canvas.current,
      {
        general: {
          startAs: practice.plans[0]?.color,
        },
        rules: {
          layout: practice.plans[0]?.layout,
        },
        renderer: {
          figuresSpritePath: '/figures/sprite.svg',
        },
        time: {
          followablePlan: practice.plans[0]?.followablePlan,
          inevitablePlan: practice.plans[0]?.inevitablePlan,
        },
      },
    ])
  }, [canvas])

  return (
    <div>
      <canvas ref={canvas} width={500} height={500} />
    </div>
  )
}

export default App
