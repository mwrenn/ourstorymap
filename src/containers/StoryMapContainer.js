import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/storyMapActions';
import StoryMap from '../components/StoryMap';

export const StoryMapContainer = (props) => {
  const storyMap = props.storyMap;
  return (
    <StoryMap markers={storyMap.markers}
              view={storyMap.view}
              allOwnerId={storyMap.allOwnerId}
              ownerIdList={storyMap.ownerIdList}
    />
  );
};

StoryMapContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  storyMap: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    storyMap: state.storyMap
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryMapContainer);
