import * as Linking from 'expo-linking'

const shareOnTwitter = (score: any) => {
  Linking.openURL(
    `https://twitter.com/share?text=Jag fick ${score} poäng på Det Stora Blåvita Quizzet. &hashtags=hejablavitt,ifkgbg`
  )
}

export default shareOnTwitter
