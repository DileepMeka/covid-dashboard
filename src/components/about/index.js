import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class About extends Component {
  state = {
    faq: [],
    apistatus: 'INITIAL',
  }

  componentDidMount() {
    this.getQuestions()
  }

  getQuestions = async () => {
    this.setState({
      apistatus: 'LOADING',
    })
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    if (response.ok) {
      const data = await response.json()

      this.setState({
        faq: data.faq,
        apistatus: 'SUCCESS',
      })
    } else {
      this.setState({
        apistatus: 'FAILURE',
      })
    }
  }

  successView = () => {
    const {faq} = this.state
    return (
      <div className="body about">
        <h1 className="about-heading">About</h1>
        <p className="banner">COVID-19 vaccines be ready for distribution</p>
        <ul testid="faqsUnorderedList">
          {faq.map(item => (
            <li key={item.qno} className="question-container">
              <p className="question">{item.question}</p>
              <p className="answer">{item.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  LoadingView = () => (
    <div testid="aboutRouteLoader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getView = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case 'SUCCESS':
        return this.successView()
      case 'LOADING':
        return this.LoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.getView()}</div>
  }
}

export default About
