const shuffleAlternatives = (alternatives: object): any => {
  return Object.entries(alternatives).sort(() => Math.random() - 0.5)
}

export default shuffleAlternatives
