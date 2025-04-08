import Lottie from "lottie-react"
import animationData from "../../assets/animations/NavbarAnimations/Animation - 1740411042807.json"

const Learn = () => {

  return (
    <div>
        create lovely animation with lottie

        <Lottie animationData={animationData} style={{ width: 300, height: 300 }}/>
    </div>
  )
}

export default Learn