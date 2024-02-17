import {Component} from 'react'
import Select from 'react-select'

class MySelect extends Component {
  render() {
    const {selected, onChange, options} = this.props
    const mappedOptions = options.map(option => ({
      value: option.state_code,
      label: option.state_name,
    }))
    console.log(options)
    console.log(selected)
    return (
      <Select value={selected} onChange={onChange} options={mappedOptions} />
      //   <div>
      //     <select>
      //       {options.map(item => (
      //         <option value={item.state_code}>{item.state_name}</option>
      //       ))}
      //     </select>
      //   </div>
    )
  }
}

export default MySelect
