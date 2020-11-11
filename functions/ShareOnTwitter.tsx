import * as Linking from 'expo-linking'

const shareOnTwitter = (score: number) => {
  Linking.openURL(
    `https://twitter.com/share?text=Jag fick ${score} poäng på Det Stora Blåvita Quizzet. https://detstorablavitaquizzet.netlify.app/ &hashtags=hejablåvitt,ifkgbg`
  )
}

export default shareOnTwitter
