import React, { Component } from 'react'
import Header from '../../comps/Header'
import { connect } from 'react-redux'
import { getFilteredTracelogs, getTracelogById } from '../../state/selectors'
import { clearState, fetchLogs } from '../../state/actionCreators'
import { TerminalLines, Sidebar } from '../../comps/Terminal'
import './style.scss'

const TitleOverlay = ({title}) => (
  <div className='titleOverlay '>{title}</div>
)

class TerminalRoute extends Component {

  componentDidMount(){
    this.props.fetchLogs()
  }

  handleClick = (tracelog, event) => {
    this.props.history.push(`/view/${tracelog.id}`)
  }

  handleCloseClick = () => {
    this.props.history.push(`/view/`)
  }

  render() {
    const { tracelogs, selectedTracelog } = this.props
    return (
      <div className='terminal'>
        <Header />
        <TitleOverlay title='recent first' />
        <div className="spacer"/>
        <TerminalLines
          logs={tracelogs}
          onClick={this.handleClick}
          markedLogId={selectedTracelog ? selectedTracelog.id : null}
        />
        {selectedTracelog && <Sidebar
          display={true}
          onCloseClick={this.handleCloseClick}
          tracelog={selectedTracelog}
        />}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  tracelogs: getFilteredTracelogs(state),
  selectedTracelog: getTracelogById(state, props.match.params.tracelogId)
})

const mapDispatchToProps = ({
  clearState,
  fetchLogs,
})

export default connect(mapStateToProps, mapDispatchToProps)(TerminalRoute)
