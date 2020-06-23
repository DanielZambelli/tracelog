import React from 'react'
import moment from 'moment'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import './style.scss'

const DATE_FORMAT = 'DDMMMYY HH:MM'

const TypeStyling = (type, label) => (
  <span className={`typeStyling--${type}`}>{label}</span>
)

const PropLabel = ({propKey,propValue}) => (
  <div className='propLabel'>
    <div className='propLabel__prop'>{propKey}</div> {propValue}
  </div>
)

const getLogFromProps = ({ lineNumber, onClick, marked, ...log }) => log

const TerminalLine = (props) => {
  const { lineNumber, onClick, createdAt, type, data, marked } = props
  const propLabels = Object.keys(data).map(key =>
    <PropLabel
      key={key}
      propKey={key}
      propValue={typeof data[key] === 'object'
        ? JSON.stringify(data[key])
        : data[key]}
    />
  )
  return (
    <div className={'terminalLine' + (marked ? ' terminalLine--marked' : '')} onClick={onClick.bind(null, getLogFromProps(props))}>
      <div className='terminalLine--lineNumber'>{lineNumber}</div>
      <div className='terminalLine--date'>{moment(createdAt).format(DATE_FORMAT)}</div>
      <div className='terminalLine--type'>{TypeStyling(type, type)}</div>
      <div className='terminalLine--output'>{TypeStyling(type, propLabels)}</div>
    </div>
  )
}

export const TerminalLines = ({ logs, markedLogId, onClick }) => {
  return (
    <div className='terminalLines'>
      {logs.map((log, index) => (
        <TerminalLine
          key={log.id}
          {...log}
          lineNumber={index+1}
          marked={log.id === markedLogId}
          onClick={onClick}
        />
      ))}
    </div>
  )
}

const getFlattenTracelog = tracelog => {
  const { data, ...tracelogWithoutData } = tracelog
  return { ...data, ...tracelogWithoutData }
}

export const Sidebar = ({ onCloseClick, tracelog, display }) => {
  tracelog = getFlattenTracelog(tracelog)
  return (
    <div className={'sidebar' + (display ? ' sidebar--visible' : '')}>
      <div className='sidebar__header'>
        <img
          className='sidebar__header--icon'
          src={arrowLeft}
          alt=''
          draggable={false}
          onClick={onCloseClick}
        />
        <div className='sidebar__header--title'>Tracelog</div>
      </div>
      <div className='sidebar__content'>
        {Object.keys(tracelog).map(key =>
          <PropLabel
            key={key}
            propKey={key}
            propValue={typeof
            tracelog[key] === 'object'
              ? JSON.stringify(tracelog[key])
              : tracelog[key]}
          />
        )}
      </div>
    </div>
  )
}
