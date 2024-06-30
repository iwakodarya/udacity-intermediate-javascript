let store = {
  selected_rover: "",
  selected_rover_info: "",
  rovers: ["Curiosity", "Opportunity", "Spirit"],
};

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = ""; // Remove content, eg initial "Loading..."
  root.appendChild(App(state));

  // on change of dropdown menu, update state with selected rover's data
  document
    .getElementById("rover-select")
    .addEventListener("change", (event) => {
      store.selected_rover = event.target.value;
      getRoverInfo(store, event.target.value);
    });
};

// create content
const App = (state) => {
  let { rovers, selected_rover, selected_rover_info } = state;

  const mainAppFragment = document.createDocumentFragment();

  // Create <main> with dashboard header name
  const headerElement = document.createElement("h1");
  headerElement.innerHTML = "Mars Rovers Dashboard";
  mainAppFragment.appendChild(headerElement);

  // Add dropdown menu below <h1>
  mainAppFragment.appendChild(createDropdownMenu(rovers, selected_rover));

  // Add rover information card
  mainAppFragment.appendChild(
    roverInformationCard(selected_rover, selected_rover_info)
  );

  // Add rover photos
  mainAppFragment.appendChild(
    displayRoverPhotos(selected_rover, selected_rover_info)
  );

  return mainAppFragment;
};

// ------------------------------------------------------  COMPONENTS

// Function that returns a dropdown menu given an array of menu options and a label
const createDropdownMenu = (rovers, selected_rover) => {
  // Creating a fragment to hold all HTML elements needed for dropdown menu
  const dropdownMenuDiv = document.createElement("div");

  // Label for dropdown
  const labelElement = document.createElement("label");
  labelElement.setAttribute("for", "rover-select");
  labelElement.innerHTML = "Select a rover >> ";

  // Add each rover name value to the dropdown menu
  const selectElement = document.createElement("select");
  selectElement.id = "rover-select";

  // Add placeholder option
  const defaultOption = document.createElement("option");
  defaultOption.setAttribute("disabled", "");
  defaultOption.innerHTML = "-- Select option --";
  if (store.selected_rover === "") defaultOption.setAttribute("selected", "");
  selectElement.appendChild(defaultOption);

  rovers.forEach((roverName) => {
    const selectOption = document.createElement("option");
    selectOption.setAttribute("value", roverName);
    selectOption.innerHTML = roverName;
    // Check if currently selected, keep it as selected
    if (selected_rover === roverName) selectOption.setAttribute("selected", "");

    selectElement.appendChild(selectOption);
  });

  dropdownMenuDiv.appendChild(labelElement);
  dropdownMenuDiv.appendChild(selectElement);

  return dropdownMenuDiv;
};

// Function returns rover's information fragment
const roverInformationCard = (selected_rover, selected_rover_info) => {
  const roverInformationDiv = document.createElement("div");
  roverInformationDiv.id = "rover-information-card";

  if (selected_rover_info) {
    // Heading
    const heading = document.createElement("h2");
    heading.innerHTML = `Information about ${selected_rover_info.name}`;

    // Create an unordered list and add rover information to it
    const roverInfoList = document.createElement("ul");
    // Landing Date
    const landingDate = document.createElement("li");
    landingDate.innerHTML = `Landing Date: ${selected_rover_info.landing_date}`;
    roverInfoList.appendChild(landingDate);
    // Launch Date
    const launchDate = document.createElement("li");
    launchDate.innerHTML = `Launch Date: ${selected_rover_info.launch_date}`;
    roverInfoList.appendChild(launchDate);
    // Max Date
    const maxDate = document.createElement("li");
    maxDate.innerHTML = `Max Date: ${selected_rover_info.max_date}`;
    roverInfoList.appendChild(maxDate);
    // Status
    const status = document.createElement("li");
    status.innerHTML = `Status: ${selected_rover_info.status}`;
    roverInfoList.appendChild(status);

    // Add all elements to the fragment
    roverInformationDiv.appendChild(heading);
    roverInformationDiv.appendChild(roverInfoList);
  } else if (selected_rover) {
    roverInformationDiv.innerHTML("No information found.");
  }
  // Return empty div if no information present
  return roverInformationDiv;
};

// Function that returns rover's recent photos
const displayRoverPhotos = (selected_rover, selected_rover_info) => {
  const roverPhotoGallery = document.createElement("div");

  if (selected_rover_info) {
    const photosHeader = document.createElement("h2");
    photosHeader.innerHTML = `Showing ${selected_rover_info.photos.length} photos from ${selected_rover} taken on ${selected_rover_info.max_date}`;
    roverPhotoGallery.appendChild(photosHeader);

    const cameras = [];
    selected_rover_info.photos.forEach((photo) => {
      if (!cameras.includes(photo.camera_name)) cameras.push(photo.camera_name);
    });

    cameras.forEach((camera) => {
      const cameraPhotos = selected_rover_info.photos.filter(
        (photo) => photo.camera_name === camera
      );
      const cameraPhotosHeader = document.createElement("h3");
      cameraPhotosHeader.innerHTML = `Camera: ${camera}`;
      roverPhotoGallery.appendChild(cameraPhotosHeader);

      const roverPhotoGalleryGrid = document.createElement("div");
      roverPhotoGalleryGrid.id = "rover-photo-gallery";
      roverPhotoGallery.appendChild(roverPhotoGalleryGrid);

      cameraPhotos.forEach((photo) => {
        const roverPhoto = document.createElement("img");
        roverPhoto.setAttribute("src", photo.img_src);
        roverPhoto.classList.add("rover-photo");
        roverPhotoGalleryGrid.appendChild(roverPhoto);
      });
    });
  } else if (selected_rover) {
    roverPhotoGallery.innerHTML = "No photos found.";
  }

  return roverPhotoGallery;
};

// ------------------------------------------------------  API CALLS
const getRoverInfo = (state, roverName) => {
  const { selected_rover_info } = state;

  fetch(`http://localhost:3000/roverinfo/${roverName}`)
    .then((res) => res.json())
    .then((selected_rover_info) => updateStore(store, { selected_rover_info }))
    .then(() => console.log("Here!", store));
};

// ------------------------------------------------------  Main Code
// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});
