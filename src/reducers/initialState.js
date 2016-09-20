export default {
  storyMap: {
    allOwnerId: 99,
    ownerIdList: [1, 2],
    markers: [
      {
        id: 1,
        lat: 44.0,
        lng: -88.0,
        label: "Test",
        owner: {
          id: 1,
          name: "Mike",
          color: '#FF0000'
        }
      },
      {
        id: 2,
        lat: 44.01,
        lng: -88.04,
        label: "Test 2",
        owner: {
          id: 2,
          name: "Jen",
          color: '#00FF00'
        }
      },
      {
        id: 3,
        lat: 43.98,
        lng: -87.98,
        label: "Test 3",
        owner: {
          id: 99,
          name: "Both",
          color: '#0000FF'
        }
      },
      {
        id: 4,
        lat: 43.93,
        lng: -87.97,
        label: "Test 4",
        owner: {
          id: 99,
          name: "Both",
          color: '#0000FF'
        }
      },
      {
        id: 5,
        lat: 43.96,
        lng: -87.96,
        label: "Test 5",
        owner: {
          id: 1,
          name: "Mike",
          color: '#FF0000'
        }
      },
      {
        id: 6,
        lat: 43.96,
        lng: -87.94,
        label: "Test 6",
        owner: {
          id: 2,
          name: "Jen",
          color: '#00FF00'
        }
      }
    ],
    view: {
      position: {
        lat: 44.0,
        lng: -88.0
      },
      zoom: 13
    }
  }
};
