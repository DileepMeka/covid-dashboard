import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer">
      <div className="logo-container">
        <h1 className="logo">
          COVID19<span>INDIA</span>
        </h1>
      </div>
      <p>we stand with everyone fighting on the front lines</p>
      <div className="social-icons-container">
        <VscGithubAlt className="icon" />
        <FiInstagram className="icon" />
        <FaTwitter className="icon" />
      </div>
    </div>
  )
}
