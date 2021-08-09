import { createBoard } from '../package'
import { useEffect, useRef } from 'react'

const practice = {
  plans: [
    {
      name: "Queen's gambit",
      color: 'White' as const,
      followablePlan: {
        White: [
          {
            from: 'd2',
            to: 'd4',
            color: 'White' as const,
            name: 'Pawn' as const,
            startingPosition: 'd2' as const,
          },
          {
            from: 'c2',
            to: 'c4',
            color: 'White' as const,
            name: 'Pawn' as const,
            startingPosition: 'c2' as const,
          },
          {
            from: 'c1',
            to: 'g5',
            color: 'White' as const,
            name: 'Bishop' as const,
            startingPosition: 'c1' as const,
          },
        ],
        Black: [],
      },
      inevitablePlan: {
        White: [],
        Black: [
          {
            from: 'e7',
            to: 'e5',
            color: 'Black' as const,
            name: 'Pawn' as const,
            startingPosition: 'e7' as const,
          },
          {
            from: 'g8',
            to: 'f6',
            color: 'Black' as const,
            name: 'Knight' as const,
            startingPosition: 'g8' as const,
          },
        ],
      },
    },
    {
      name: 'Sicilian Defense',
      color: 'White' as const,
      followablePlan: {
        White: [
          {
            from: 'e2',
            to: 'e4',
            color: 'White' as const,
            name: 'Pawn' as const,
            startingPosition: 'e2' as const,
          },
          {
            from: 'g1',
            to: 'f3',
            color: 'White' as const,
            name: 'Knight' as const,
            startingPosition: 'g1' as const,
          },
          {
            from: 'd2',
            to: 'd4',
            color: 'White' as const,
            name: 'Pawn' as const,
            startingPosition: 'd2' as const,
          },
        ],
        Black: [],
      },
      inevitablePlan: {
        White: [],
        Black: [
          {
            from: 'c7',
            to: 'c5',
            color: 'Black' as const,
            name: 'Pawn' as const,
            startingPosition: 'c7' as const,
          },
          {
            from: 'd7',
            to: 'd6',
            color: 'Black' as const,
            name: 'Pawn' as const,
            startingPosition: 'd7' as const,
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
