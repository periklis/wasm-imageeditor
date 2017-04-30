import styles from './toolbox.scss';
import React, { Component } from 'react';
import {Dropdown} from 'react-toolbox/lib/dropdown';
import {List, ListDivider, ListItem, ListSubHeader} from 'react-toolbox/lib/list';
import Slider from 'react-toolbox/lib/slider';
import Dropzone from 'react-dropzone';

const dimensions = [
  {value: {width: 320, height: 240}, label: '320x240'},
  {value: {width: 640, height: 480}, label: '640x480'},
  {value: {width: 800, height: 600}, label: '800x600'},
  {value: {width: 1024, height: 768}, label: '1024x768'},
  {value: {width: 2048, height: 1536}, label: '2048x1536'}
];

export default class Toolbox extends Component<IToolboxProps, {}> {

  public render() {
    return (
      <div className={styles.toolbox}>
        <List>
          <ListSubHeader caption='Upload image' />
          <ListItem className={styles.dropzone}>
            <Dropzone className={styles.dropzoneArea}
                      multiple={false}
                      onDrop={this.props.onSave}>
              <p>Try dropping some files here, or click to select files to upload</p>
            </Dropzone>
          </ListItem>
          <ListDivider />

          <ListSubHeader caption='Select a dimension' />
          <Dropdown className={styles.dimensions}
                    source={dimensions}
                    onChange={this.props.onResize}/>

          <ListDivider />

          <ListSubHeader caption='Zoom' />
          <Slider className={styles.zoomFactor}
                  pinned
                  snaps
                  min={10}
                  max={200}
                  step={10}
                  value={100}
                  onChange={this.props.onZoom} />
          <ListDivider />

          <ListSubHeader caption='About the image' />
          <ListItem className={styles.imageDimensions}>
            <p>Dimensions: {this.props.dimensions.width} x {this.props.dimensions.height}</p>
          </ListItem>
          <ListItem className={styles.imageHistogram}>
            <p>Histogram: {this.props.histogram.toString().substring(1,5) + "..."}</p>
          </ListItem>
        </List>
      </div>
    );
  }
}
