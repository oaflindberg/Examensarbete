import { createContext } from 'react'

const PointsContext = createContext<any>(0)
export const PointsProvider = PointsContext.Provider

export default PointsContext
