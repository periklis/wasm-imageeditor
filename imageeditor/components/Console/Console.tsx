import styles from './styles.scss';
import classnames from 'classnames';
import React, {Component} from 'react';

export default class Console extends Component<ILogProps, {}> {

  public render() {
    return (
      <div className={styles.console}>
        {this.props.log.map((entry, index) =>
          <p key={index}
             className={classnames({
              [`${styles.info}`]: entry.stream == StreamType.STDOUT,
              [`${styles.error}`]: (entry.stream == StreamType.STDERR)
            })}>{index}: {entry.text}</p>
         )}
      </div>
    );
  }
}
