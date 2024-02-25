import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

const apiStatusList = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class StatePage extends Component {
  state = {
    districtsApiStatus: 'INITIAL',
    timelinesApiStatus: 'INITIAL',
    districtsData: [],
    timelinesData: [],
    stateDetails: [],
    activeOption: 'CONFIRM',
    barGraphData: [],
    activegraphData: {},
    recoverdgraphData: {},
    confirmgraphData: {},
    deceasedgraphData: {},
    testedgraphData: {},
  }

  componentDidMount() {
    this.getDistrictsData()
    this.getTimelinesData()
  }

  changeActiveOption = option => {
    this.setState(
      {
        activeOption: option,
      },
      this.getTimelinesData,
    )
  }

  getTopDistricts = () => {
    const {districtsData, activeOption} = this.state
    let updatedActiveOption
    if (activeOption === 'ACTIVE') {
      updatedActiveOption = 'active'
    } else if (activeOption === 'RECOVER') {
      updatedActiveOption = 'recovered'
    } else if (activeOption === 'CONFIRM') {
      updatedActiveOption = 'confirmed'
    } else if (activeOption === 'DECEASED') {
      updatedActiveOption = 'deceased'
    }
    districtsData.sort(
      (a, b) => b[updatedActiveOption] - a[updatedActiveOption],
    )
    return districtsData
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []

    const keyNames = Object.keys(data)
    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0

        resultList.push({
          name: keyName,
          confirmed,
          deceased,
          recovered,
          tested,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  getDistrictsData = async () => {
    this.setState({
      districtsApiStatus: apiStatusList.loading,
    })
    const {match} = this.props
    const {params} = match
    const {state} = params
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    if (response.ok) {
      const data = await response.json()

      const stateData = data[state]

      const inputDate = new Date(stateData.meta.last_updated)

      const options = {month: 'long', day: 'numeric', year: 'numeric'}
      let outputDateString = new Intl.DateTimeFormat('en-US', options).format(
        inputDate,
      )

      outputDateString = outputDateString.replace(/\b(\d{1,2})\b/g, '$1th')

      const stateDetails = {
        confirmed: stateData.total.confirmed,
        deceased: stateData.total.deceased,
        recovered: stateData.total.recovered,
        tested: stateData.total.tested,
        active:
          stateData.total.confirmed -
          (stateData.total.deceased + stateData.total.recovered),
        date: stateData.meta.date,
        lastUpdated: outputDateString,
        population: stateData.meta.population,
        name: statesList.filter(item => item.state_code === state)[0]
          .state_name,
      }
      const districtsData = stateData.districts
      const updatedDistrictsData = this.convertObjectsDataIntoListItemsUsingForInMethod(
        districtsData,
      )
      this.setState({
        districtsData: updatedDistrictsData,
        stateDetails,
        districtsApiStatus: apiStatusList.success,
      })
    }
  }

  getTimelinesData = async () => {
    this.setState({
      timelinesApiStatus: apiStatusList.loading,
    })
    const {match} = this.props
    const {params} = match
    const {state} = params
    const {districtsData, activeOption} = this.state
    let updatedActiveOption
    if (activeOption === 'ACTIVE') {
      updatedActiveOption = 'active'
    } else if (activeOption === 'RECOVER') {
      updatedActiveOption = 'recovered'
    } else if (activeOption === 'CONFIRM') {
      updatedActiveOption = 'confirmed'
    } else if (activeOption === 'DECEASED') {
      updatedActiveOption = 'deceased'
    }

    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${state}`,
    )

    if (response.ok) {
      let graphData
      const data = await response.json()
      const keyNames = Object.keys(data[state].dates)

      if (activeOption === 'ACTIVE') {
        graphData = keyNames.map(item => {
          const confirmedCases = data[state].dates[item].total.confirmed
            ? data[state].dates[item].total.confirmed
            : 0
          const recoveredCases = data[state].dates[item].total.recovered
            ? data[state].dates[item].total.recovered
            : 0

          const deceasedCases = data[state].dates[item].total.deceased
            ? data[state].dates[item].total.deceased
            : 0

          return {
            date: item,
            count: confirmedCases - (recoveredCases + deceasedCases),
          }
        })
      } else {
        graphData = keyNames.map(item => ({
          date: item,
          count: data[state].dates[item].total[updatedActiveOption]
            ? data[state].dates[item].total[updatedActiveOption]
            : 0,
        }))
      }

      console.log(graphData)
      console.log(activeOption)

      const confirmgraphData = keyNames.map(item => ({
        date: item,
        count: data[state].dates[item].total.confirmed
          ? data[state].dates[item].total.confirmed
          : 0,
      }))

      const deceasedgraphData = keyNames.map(item => {
        console.log('')
        return {
          date: item,
          count: data[state].dates[item].total.deceased
            ? data[state].dates[item].total.deceased
            : 0,
        }
      })

      const recoverdgraphData = keyNames.map(item => {
        console.log('')
        return {
          date: item,
          count: data[state].dates[item].total.recovered
            ? data[state].dates[item].total.recovered
            : 0,
        }
      })

      const testedgraphData = keyNames.map(item => {
        console.log('')
        return {
          date: item,
          count: data[state].dates[item].total.tested
            ? data[state].dates[item].total.tested
            : 0,
        }
      })

      const activegraphData = keyNames.map(item => {
        const confirmedCases = data[state].dates[item].total.confirmed
          ? data[state].dates[item].total.confirmed
          : 0
        const recoveredCases = data[state].dates[item].total.recovered
          ? data[state].dates[item].total.recovered
          : 0

        const deceasedCases = data[state].dates[item].total.deceased
          ? data[state].dates[item].total.deceased
          : 0

        return {
          date: item,
          count: confirmedCases - (recoveredCases + deceasedCases),
        }
      })

      this.setState({
        timelinesApiStatus: apiStatusList.success,
        barGraphData: graphData,
        activegraphData,
        recoverdgraphData,
        confirmgraphData,
        deceasedgraphData,
        testedgraphData,
      })
    }
  }

  renderBarChart = () => {
    const {barGraphData, activeOption} = this.state
    let color
    if (activeOption === 'ACTIVE') {
      color = '#007bff'
    } else if (activeOption === 'RECOVER') {
      color = '#28a745'
    } else if (activeOption === 'CONFIRM') {
      color = '#ff073a'
    } else if (activeOption === 'DECEASED') {
      color = '#6c757d'
    }
    return (
      <div>
        <div>
          <BarChart
            width={1200}
            height={450}
            data={barGraphData.slice(
              barGraphData.length - 10,
              barGraphData.length,
            )}
          >
            <CartesianGrid strokeDasharray="" />
            <XAxis dataKey="date" />
            {/* <YAxis /> */}
            <Tooltip />
            <Legend />
            <Bar
              dataKey="count"
              fill={`${color}`}
              className="bar"
              label={{position: 'top', color}}
            />
          </BarChart>
        </div>
      </div>
    )
  }

  renderLineChart = (data, option) => {
    let color
    let title

    if (option === 'ACTIVE') {
      color = '#007bff'
      title = 'Total Active'
    } else if (option === 'RECOVER') {
      color = '#28a745'
      title = 'Recovered'
    } else if (option === 'CONFIRM') {
      color = '#ff073a'
      title = 'Confirmed'
    } else if (option === 'DECEASED') {
      color = '#6c757d'
      title = 'Deceased'
    } else if (option === 'TESTED') {
      color = '#9673b9'
      title = 'Tested'
    }

    return (
      <div
        className={`${option.toLowerCase()}-line-chart line-chart bar-graph-container`}
      >
        <p className="title">{title}</p>
        <div
          className={`${option.toLowerCase()}-line-chart line-chart bar-graph-container`}
        >
          <LineChart
            width={1200}
            height={450}
            data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke={color} />
          </LineChart>
        </div>
      </div>
    )
  }

  districtsDataSuccessView = () => {
    const {
      stateDetails,
      activeOption,
      activegraphData,
      recoverdgraphData,
      confirmgraphData,
      deceasedgraphData,
      testedgraphData,
      timelinesApiStatus,
      districtsApiStatus,
    } = this.state
    const topDistricts = this.getTopDistricts()
    let updatedActiveOption
    if (activeOption === 'ACTIVE') {
      updatedActiveOption = 'active'
    } else if (activeOption === 'RECOVER') {
      updatedActiveOption = 'recovered'
    } else if (activeOption === 'CONFIRM') {
      updatedActiveOption = 'confirmed'
    } else if (activeOption === 'DECEASED') {
      updatedActiveOption = 'deceased'
    }

    return (
      <>
        <div className="state-details-container">
          <div className="name-update-container">
            <h1 className="state-name">{stateDetails.name}</h1>
            <p className="last-updated">
              Last update on {stateDetails.lastUpdated}.
            </p>
          </div>
          <div className="tested-container">
            <p className="tested">Tested</p>
            <p className="tested-count">{stateDetails.tested}</p>
          </div>
        </div>
        <div className="cards-container state-page-cards">
          <button
            onClick={() => this.changeActiveOption('CONFIRM')}
            className={`confirm-card card confirm-${
              activeOption === 'CONFIRM' ? 'selected' : ''
            }`}
          >
            <div testid="stateSpecificConfirmedCasesContainer">
              <p>Confirmed</p>
              <img
                src="https://res.cloudinary.com/dhrxxm585/image/upload/v1706537329/check-mark_1confirm_eey3oh.png"
                alt="state specific confirmed cases pic"
                className="card-img"
              />
              <p>{stateDetails.confirmed}</p>
            </div>
          </button>
          <button
            onClick={() => this.changeActiveOption('ACTIVE')}
            className={`active-card card active-${
              activeOption === 'ACTIVE' ? 'selected' : ''
            }`}
          >
            <div testid="stateSpecificActiveCasesContainer">
              <p>Active</p>
              <img
                src="https://res.cloudinary.com/dhrxxm585/image/upload/v1706537329/protection_1active_yriomx.png"
                alt="state specific active cases pic"
                className="card-img"
              />
              <p>{stateDetails.active}</p>
            </div>
          </button>
          <button
            onClick={() => this.changeActiveOption('RECOVER')}
            className={`recover-card card vv recover-${
              activeOption === 'RECOVER' ? 'selected' : ''
            }`}
          >
            <div testid="stateSpecificRecoveredCasesContainer">
              <p>Recovered</p>
              <img
                src="https://res.cloudinary.com/dhrxxm585/image/upload/v1706537329/recovered_1recovered_ufumf9.png"
                alt="state specific recovered cases pic"
                className="card-img"
              />
              <p>{stateDetails.recovered}</p>
            </div>
          </button>
          <button
            onClick={() => this.changeActiveOption('DECEASED')}
            className={`decease-card card deceased-${
              activeOption === 'DECEASED' ? 'selected' : ''
            }`}
          >
            <div testid="stateSpecificDeceasedCasesContainer">
              <p>Deceased</p>
              <img
                src="https://res.cloudinary.com/dhrxxm585/image/upload/v1706537329/breathing_1deceased_as9x4l.png"
                alt="state specific deceased cases pic"
                className="card-img"
              />
              <p>{stateDetails.deceased}</p>
            </div>
          </button>
        </div>
        <div testid="lineChartsContainer" className="top-districts-container">
          <h1 className={`top-districts-heading ${activeOption}`}>
            Top Districts
          </h1>
          <ul className="top-districts" testid="topDistrictsUnorderedList">
            {topDistricts.map(item => (
              <li key={item.name} className="top-district-item">
                <p className="count">{item[updatedActiveOption]}</p>
                <p className="district-name">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  timelinesDataSuccessView = () => {
    const {
      stateDetails,
      activeOption,
      activegraphData,
      recoverdgraphData,
      confirmgraphData,
      deceasedgraphData,
      testedgraphData,
      timelinesApiStatus,
      districtsApiStatus,
    } = this.state
    const topDistricts = this.getTopDistricts()
    let updatedActiveOption
    if (activeOption === 'ACTIVE') {
      updatedActiveOption = 'active'
    } else if (activeOption === 'RECOVER') {
      updatedActiveOption = 'recovered'
    } else if (activeOption === 'CONFIRM') {
      updatedActiveOption = 'confirmed'
    } else if (activeOption === 'DECEASED') {
      updatedActiveOption = 'deceased'
    }

    return (
      <>
        <div className="bar-graph-container">{this.renderBarChart()}</div>
        {/* <div testid="lineChartsContainer"> */}
        <div>
          <div className="bar-graph-container">
            {this.renderLineChart(confirmgraphData, 'CONFIRM')}
          </div>
          <div className="bar-graph-container">
            {this.renderLineChart(activegraphData, 'ACTIVE')}
          </div>
          <div className="bar-graph-container">
            {this.renderLineChart(recoverdgraphData, 'RECOVER')}
          </div>
          <div className="bar-graph-container">
            {this.renderLineChart(deceasedgraphData, 'DECEASED')}
          </div>
          <div className="bar-graph-container">
            {this.renderLineChart(testedgraphData, 'TESTED')}
          </div>
        </div>
      </>
    )
  }

  districtsDataLoadingView = () => (
    <div className="loader-container" testid="stateDetailsLoader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  timelinesDataLoadingView = () => (
    <div className="loader-container" testid="timelinesDataLoader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getDistrictsDataView = () => {
    const {timelinesApiStatus, districtsApiStatus} = this.state
    switch (districtsApiStatus) {
      case apiStatusList.success:
        return this.districtsDataSuccessView()
      case apiStatusList.loading:
        return this.districtsDataLoadingView()
      case apiStatusList.failure:
        return null
      default:
        return null
    }
  }

  getTimelinesDataView = () => {
    const {timelinesApiStatus} = this.state
    switch (timelinesApiStatus) {
      case apiStatusList.success:
        return this.timelinesDataSuccessView()
      case apiStatusList.loading:
        return this.timelinesDataLoadingView()
      case apiStatusList.failure:
        return null
      default:
        return null
    }
  }

  render() {
    return (
      <div className="body">
        {this.getDistrictsDataView()}
        {this.getTimelinesDataView()}
      </div>
    )
  }
}

export default StatePage
