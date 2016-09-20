import React, { PropTypes } from 'react';
import { Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';

class StoryMap extends React.Component {
  constructor(props) {
    super(props);
    this.onMapClick = this.onMapClick.bind(this);
    this.bindMap = this.bindMap.bind(this);
    this.allOwnerId = this.props.allOwnerId; // Id of the 'All Owner'
    this.ownerIdList = this.props.ownerIdList; // List of real individual Owners
  }

  onMapClick() {
    console.log('Story Map Click', event);
  }

  bindMap(el) {
    this.map = el.leafletElement;

    // The window seems to repaint in the middle of the initial draw, so
    // we invalidate to force redraw.
    let self = this;
    setTimeout(function() {
      self.map.invalidateSize(false);
    }, 1000);
  }

  pathComponents(markers) {
    let paths = [];
    let pathColor;

    for (let i = 0; i < markers.length - 1; i++) {
      let startNode = markers[i];
      let startCoord = [startNode.lat, startNode.lng];
      let endNodes = this.findNextNodes(i + 1, markers, startNode.owner.id);

      if (endNodes) {
        for (let j = 0; j < endNodes.length; j++) {
          let endNode = endNodes[j];
          let endCoord = [endNode.lat, endNode.lng];

          if (startNode.owner.id === this.allOwnerId) {
            pathColor = endNode.owner.color ;
          } else {
            pathColor = startNode.owner.color ;
          }

          paths.push(
            <Polyline key={i.toString() + '_' + j.toString()}
                      positions={[startCoord, endCoord]}
                      color={pathColor}
                      opacity="1.0" />
          );
        }
      }
    }
    return paths;
  }

  findNextNodes(startIndex, markers, currentOwnerId) {
    let endNodes;

    if (currentOwnerId === this.allOwnerId) {
      console.log("Finding All Next");
      endNodes = this._findAllNextNodes(startIndex, markers);
      console.log(endNodes);
    } else {
      console.log("Finding Single Next");
      let endNode = this._findNextNode(startIndex, markers, currentOwnerId);
      if (endNode !== null) {
        endNodes = [endNode];
      }
    }

    return endNodes;
  }

  _findAllNextNodes(startIndex, markers) {
    let nextNodes = [];
    console.log('looking for owner nodes');
    for (let i = 0; i <= this.ownerIdList.length; i++) {
      let nextNode = this._findNextNode(startIndex, markers, i);
      console.log(i, nextNode);
      if (nextNode !== null) nextNodes.push(nextNode);
    }
    return nextNodes;
  }

  _findNextNode(startIndex, markers, currentOwnerId) {
    // Find the next node in the marker series owned by OwnerIds, which should be len(2) array of the real owner, and the
    // code for owned by all
    const ownerIds = [currentOwnerId, this.allOwnerId ];

    for (let i = startIndex; i < markers.length; i++) {
      if (ownerIds.indexOf(markers[i].owner.id) >= 0) {
        return markers[i];
      }
    }
    return null;
  }

  markerComponents(markers) {
    return markers.map(function(marker) {
        return (
          <Marker position={[marker.lat, marker.lng]} key={marker.id} >
            <Popup key={marker.id}>
              <span>Popup {marker.label}</span>
            </Popup>
          </Marker>
        );
      }
    );
  }

  render() {
    const { markers, view } = this.props;

    return (
      <Map center={[view.position.lat, view.position.lng]}
           ref={this.bindMap}
           zoom={view.zoom}
           className="story-map">
        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXdyZW5uIiwiYSI6ImNpcmNqam5objAxZ3JnN20zYzdmYzQ2Z2IifQ.X6IZFIaP-km4ccxfJmAPxQ"
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        { this.markerComponents(markers) }
        { this.pathComponents(markers) }
      </Map>
    );
  }
}

StoryMap.propTypes = {
  markers: PropTypes.array.isRequired,
  view: PropTypes.object.isRequired,
  allOwnerId: PropTypes.number.isRequired,
  ownerIdList: PropTypes.array.isRequired
};

export default StoryMap;
