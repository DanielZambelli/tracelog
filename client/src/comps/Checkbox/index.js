import React from 'react'
import './style.scss'
import checkIcon from '../../assets/icons/check.svg'

const Checkbox = ({ name, label, checked, onClick }) => {

  const eventShapedCallback = onClick.bind(null, {
    target: { name, value: !checked }
  })

  return (
    <div className='checkbox' onClick={eventShapedCallback}>
      {checked
        ? <div className='checkbox__box checkbox__box--checked'> <img src={checkIcon} alt='' draggable={false} /> </div>
        : <div className='checkbox__box'></div>
      }
      <div className='checkbox__label'>{label}</div>
    </div>
  )
}

export default Checkbox
