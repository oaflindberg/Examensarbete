import { createContext } from 'react'

type PointsContextType = {
  points: number
  setPoints: (points: number) => void
}

const PointsContext = createContext<PointsContextType>({ points: 0, setPoints: () => {} })

export default PointsContext
