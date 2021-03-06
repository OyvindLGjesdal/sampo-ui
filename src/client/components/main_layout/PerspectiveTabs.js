import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import intl from 'react-intl-universal'

const styles = () => ({
  root: {
    flexGrow: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
})

/**
 * A component for generating view tabs for a faceted search perspective or an entity landing page.
 */
class PerspectiveTabs extends React.Component {
  constructor (props) {
    super(props)
    const value = this.pathnameToValue(this.props.routeProps.location.pathname)
    this.state = { value }
  }

  componentDidUpdate = prevProps => {
    const newPath = this.props.routeProps.location.pathname
    const oldPath = prevProps.routeProps.location.pathname
    if (newPath !== oldPath) {
      this.setState({ value: this.pathnameToValue(newPath) })
    }
  }

  pathnameToValue = pathname => {
    const activeID = pathname.split('/').pop()
    let value = 0
    this.props.tabs.map(tab => {
      if (tab.id === activeID) {
        value = tab.value
      }
    })
    return value
  }

  handleChange = (event, value) => {
    this.setState({ value })
  };

  render () {
    const { classes, tabs, screenSize } = this.props
    const scrollable = screenSize === 'xs' || screenSize === 'sm' || screenSize === 'md'
    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor='secondary'
          textColor='secondary'
          variant={scrollable ? 'scrollable' : 'fullWidth'}
        >
          {tabs.map(tab =>
            <Tab
              key={tab.id}
              icon={tab.icon}
              label={intl.get(`tabs.${tab.id}`)}
              component={Link}
              to={tab.id}
            />
          )}
        </Tabs>
      </Paper>
    )
  }
}

PerspectiveTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  routeProps: PropTypes.object.isRequired,
  tabs: PropTypes.array.isRequired,
  screenSize: PropTypes.string.isRequired
}

export const PerspectiveTabsComponent = PerspectiveTabs

export default withStyles(styles)(PerspectiveTabs)
