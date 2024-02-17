import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import MySelect from '../select'
import './index.css'
import Footer from '../Footer'

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

class Home extends Component {
  state = {
    apistatus: 'INITIAL',
    selected: null,
    totalActive: 0,
    totalConfirmed: 0,
    totalRecovered: 0,
    totalDeceased: 0,
    statesDataList: [],
    search: '',
  }

  componentDidMount() {
    this.getData()
  }

  handleChange = value => {
    this.setState({
      selected: value,
    })
  }

  changeSearch = e => {
    this.setState(
      {
        search: e.target.value,
      },
      this.getStatesDropdown,
    )
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
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0

        if (
          statesList.find(state => state.state_code === keyName) !== undefined
        ) {
          resultList.push({
            stateCode: keyName,
            name: statesList.find(state => state.state_code === keyName)
              .state_name,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        }
      }
    })
    return resultList
  }

  sortByNameAscending = () => {
    const {statesDataList} = this.state
    const updatedList = statesDataList.sort((a, b) =>
      a.name.localeCompare(b.name),
    )
    this.setState({
      statesDataList: updatedList,
    })
  }

  sortByNameDescending = data => {
    const {statesDataList} = this.state
    const updatedList = statesDataList.sort((a, b) =>
      b.name.localeCompare(a.name),
    )
    this.setState({
      statesDataList: updatedList,
    })
  }

  getStatesDropdown = () => {
    const {search} = this.state
    const updatedStatesList = statesList.filter(
      item =>
        item.state_code.toLowerCase().includes(search.toLowerCase()) ||
        item.state_name.toLowerCase().includes(search.toLowerCase()),
    )
    if (search !== '') {
      return (
        <ul testid="searchResultsUnorderedList" className="dropdown">
          {updatedStatesList.map(item => (
            <li key={item.state_code}>
              <Link
                className="option-container"
                to={`/state/${item.state_code}`}
              >
                <p>{item.state_name}</p>
                <div className="state-code-icon-container">
                  <p className="state-code">{item.state_code}</p>
                  <p>
                    <BiChevronRightSquare />
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )
    }
    return null
  }

  loadingView = () => (
    <div testid="homeRouteLoader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getData = async () => {
    this.setState({
      apiStatus: apiStatusList.loading,
    })
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')

    const data = await response.json()
    const convertedData = this.convertObjectsDataIntoListItemsUsingForInMethod(
      data,
    )

    const totalActive = convertedData.reduce(
      (accumulator, item) => accumulator + item.active,
      0,
    )

    const totalConfirmed = convertedData.reduce(
      (accumulator, item) => accumulator + item.confirmed,
      0,
    )

    const totalRecovered = convertedData.reduce(
      (accumulator, item) => accumulator + item.recovered,
      0,
    )

    const totalDeceased = convertedData.reduce(
      (accumulator, item) => accumulator + item.deceased,
      0,
    )

    this.setState({
      statesDataList: convertedData,
      totalActive,
      totalConfirmed,
      totalDeceased,
      totalRecovered,
      apiStatus: apiStatusList.success,
    })
  }

  successView = () => {
    const {
      selected,
      totalActive,
      totalConfirmed,
      totalDeceased,
      totalRecovered,
      statesDataList,
    } = this.state
    return (
      <>
        <div testid="countryWideDeceasedCases" className="cards-container">
          <div testid="countryWideConfirmedCases" className="confirm-card card">
            <p>Confirmed</p>
            <img
              src="https://res.cloudinary.com/dhrxxm585/image/upload/v1706537329/check-mark_1confirm_eey3oh.png"
              alt="country wide confirmed cases pic"
              className="card-img"
            />
            <p>{totalConfirmed}</p>
          </div>
          <div testid="countryWideActiveCases" className="active-card card">
            <p>Active</p>
            <img
              src="https://res.cloudinary.com/dhrxxm585/image/upload/v1706537329/protection_1active_yriomx.png"
              alt="country wide active cases pic"
              className="card-img"
            />
            <p>{totalActive}</p>
          </div>
          <div testid="countryWideRecoveredCases" className="recover-card card">
            <p>Recovered</p>
            <img
              src="https://res.cloudinary.com/dhrxxm585/image/upload/v1706537329/recovered_1recovered_ufumf9.png"
              alt="country wide recovered cases pic"
              className="card-img"
            />
            <p>{totalRecovered}</p>
          </div>
          <div testid="countryWideDeceasedCases" className="decease-card card">
            <p>Deceased</p>
            <img
              src="https://res.cloudinary.com/dhrxxm585/image/upload/v1706537329/breathing_1deceased_as9x4l.png"
              alt="country wide deceased cases pic"
              className="card-img"
            />
            <p>{totalDeceased}</p>
          </div>
        </div>
        <div testid="stateWiseCovidDataTable" className="table-container">
          <div className="table">
            <div className="table-head">
              <div className="table-row">
                <div className="table-data states-names">
                  <h1 colSpan="0" rowSpan="0">
                    States/UT{' '}
                    <button
                      testid="ascendingSort"
                      onClick={this.sortByNameAscending}
                    >
                      <FcGenericSortingDesc />.
                    </button>{' '}
                    <button
                      testid="descendingSort"
                      onClick={this.sortByNameDescending}
                    >
                      <FcGenericSortingAsc />.
                    </button>{' '}
                  </h1>
                </div>
                <div className="table-data">
                  <p colSpan="0" rowSpan="0">
                    Confirmed
                  </p>
                </div>
                <div className="table-data">
                  <p colSpan="0" rowSpan="0">
                    Active
                  </p>
                </div>
                <div className="table-data">
                  <p colSpan="0" rowSpan="0">
                    Recovered
                  </p>
                </div>
                <div className="table-data">
                  <p colSpan="0" rowSpan="0">
                    Deceased
                  </p>
                </div>
                <div className="table-data">
                  <p colSpan="0" rowSpan="0">
                    Population
                  </p>
                </div>
              </div>
              <hr key="1" />
            </div>
            <ul className="table-body">
              {statesDataList.map(state => (
                <li className="table-row" key={state.state_code}>
                  {console.log(state)}
                  <div className="table-data states-names">
                    <p className="name-card">{state.name}</p>
                  </div>
                  <div className="table-data">
                    <p className="confirm-card">{state.confirmed}</p>
                  </div>
                  <div className="table-data">
                    <p className="active-card">{state.active}</p>
                  </div>
                  <div className="table-data">
                    <p className="recover-card">{state.recovered}</p>
                  </div>
                  <div className="table-data">
                    <p className="decease-card">{state.deceased}</p>
                  </div>
                  <div className="table-data">
                    <p className="population-card">{state.population}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  getView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.success:
        return this.successView()
      case apiStatusList.loading:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    const {
      selected,
      totalActive,
      totalConfirmed,
      totalDeceased,
      totalRecovered,
      statesDataList,
      search,
    } = this.state
    return (
      <div className="body">
        <div className="search-content-container">
          <div className="search-container">
            <div className="search-icon-container">
              <BsSearch className="search-icon" />
            </div>
            {/* <ul>.</ul> */}
            <input
              onChange={this.changeSearch}
              className="search-input"
              type="search"
              value={search}
              placeholder="Enter the State"
            />
          </div>
          {this.getStatesDropdown()}
        </div>
        {this.getView()}
        <Footer />
      </div>
    )
  }
}

export default Home
