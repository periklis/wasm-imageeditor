import styles from './toolbox.scss';
import React, { Component } from 'react';
import {Dropdown} from 'react-toolbox/lib/dropdown';
import {List, ListDivider, ListItem, ListSubHeader} from 'react-toolbox/lib/list';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const dimensions = [
  {value: '640x480', label: '640x480'},
  {value: '800x600', label: '800x600'},
  {value: '1024x768', label: '1024x768'}
];

export default class Toolbox extends Component {
  static propTypes = {
    dimensions: PropTypes.object,
    histogram: PropTypes.array,
    onDrop: PropTypes.func.isRequired
  };

  static defaultProps = {
    dimensions: { x: 0, y: 0 },
    histogram: [],
    onDrop: () => {}
  };

  render() {
    const defaultValue = '640x480';
    return (
      <List className={styles.toolbox}>
        <ListSubHeader caption='Upload image' />
        <ListItem className={styles.dropzone}>
          <Dropzone className={styles.dropzoneArea}
                    multiple={false}
                    onDrop={this.props.onDrop}>
            <p>Try dropping some files here, or click to select files to upload</p>
          </Dropzone>
        </ListItem>
        <ListDivider />

        <ListSubHeader caption='Select a dimension' />
        <ListItem className={styles.dimensions}>
          <Dropdown source={dimensions}
                    value={defaultValue}/>
        </ListItem>
        <ListDivider />

        <ListSubHeader caption='About the image' />
        <ListItem className={styles.imageDimensions}>
          <p>Dimensions: {this.props.dimensions.x} x {this.props.dimensions.y}</p>
        </ListItem>
        <ListItem className={styles.imageHistogram}>
          <p>Histogram: {this.props.histogram.toString().substring(1,5) + "..."}</p>
        </ListItem>
      </List>
    );
  }
}
