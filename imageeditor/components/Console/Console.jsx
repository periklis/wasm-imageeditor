import styles from './console.scss';
import classnames from 'classnames';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Console extends Component {
  static propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      stream: PropTypes.string.isRequired
    })).isRequired
  }

  static defaultProps = {
    entries: []
  }

  render() {
    return (
     <div className={styles.console}>
        {this.props.entries.map((entry) =>
          <p key={entry.id}
             className={classnames({
              [`${styles.info}`]: entry.stream == 'STDOUT' ,
              [`${styles.error}`]: (entry.stream == 'STDERR')
            })}>{entry.text}</p>
         )}
      </div>
    );
  }
}
