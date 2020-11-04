import { Audio } from 'expo-av'

const playAudio = async (audio: boolean) => {
  const soundObject = new Audio.Sound()
  try {
    await soundObject.loadAsync(require('./../assets/BLAVITT.mp3'))
    if (!audio) {
      await soundObject.playAsync()
      await soundObject.setIsLoopingAsync(true)
    } else {
      await soundObject.unloadAsync()
    }
  } catch (error) {
    console.log(error.message)
  }
}

export default playAudio
