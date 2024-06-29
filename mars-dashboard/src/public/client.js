let store = {
  selected_rover: "",
  selected_rover_info: "",
  rovers: ["Curiosity", "Opportunity", "Spirit"],
};

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  console.log(">>>", store);
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
  let { rovers, apod } = state;

  const mainAppFragment = document.createDocumentFragment();

  // Create <main> with dashboard header name
  const mainElement = document.createElement("main");
  const headerElement = document.createElement("h1");
  headerElement.innerHTML = "Mars Rovers Dashboard";
  mainElement.appendChild(headerElement);

  // Add dropdown menu below <h1>
  const selectMenu = createDropdownMenu(rovers, "rover-select");
  mainElement.appendChild(selectMenu);

  // Add <main> to fragment
  mainAppFragment.appendChild(mainElement);

  return mainAppFragment;
};

// Section for display Rover's info

// Section for display Rover's photos

// ------------------------------------------------------  COMPONENTS

// Function that returns a dropdown menu given an array of menu options and a label
const createDropdownMenu = (optionsArray, labelName) => {
  // Creating a fragment to hold all HTML elements needed for dropdown menu
  const dropdownMenuFragment = document.createDocumentFragment();

  // Label for dropdown
  const labelElement = document.createElement("label");
  labelElement.setAttribute("for", labelName);
  labelElement.innerHTML = "Select a rover >> ";

  // Add each rover name value to the dropdown menu
  const selectElement = document.createElement("select");
  selectElement.id = labelName;

  // Add placeholder option
  const defaultOption = document.createElement("option");
  defaultOption.setAttribute("disabled", "");
  defaultOption.innerHTML = "-- Select option --";
  if (store.selected_rover === "") defaultOption.setAttribute("selected", "");
  selectElement.appendChild(defaultOption);

  optionsArray.forEach((roverName) => {
    const selectOption = document.createElement("option");
    selectOption.setAttribute("value", roverName);
    selectOption.innerHTML = roverName;
    // Check if currently selected, keep it as selected
    if (store.selected_rover === roverName)
      selectOption.setAttribute("selected", "");

    selectElement.appendChild(selectOption);
  });

  dropdownMenuFragment.appendChild(labelElement);
  dropdownMenuFragment.appendChild(selectElement);

  return dropdownMenuFragment;
};

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
  if (name) {
    return `
            <h2>Welcome, ${name}!</h2>
        `;
  }

  return `
        <h1>Hello!</h1>
    `;
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
  // If image does not already exist, or it is not from today -- request it again
  const today = new Date();
  const photodate = new Date(apod.date);
  console.log(photodate.getDate(), today.getDate());

  console.log(photodate.getDate() === today.getDate());
  if (!apod || apod.date === today.getDate()) {
    getImageOfTheDay(store);
  }

  // check if the photo of the day is actually type video!
  if (apod.media_type === "video") {
    return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `;
  } else {
    return `
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `;
  }
};

// ------------------------------------------------------  API CALLS

const getRoverInfo = (state, roverName) => {
  const { selected_rover_info } = state;

  fetch(`http://localhost:3000/roverinfo/${roverName}`)
    .then((res) => res.json())
    .then((selected_rover_info) => updateStore(store, { selected_rover_info }))
    .then(() => console.log("Here!", store));
};

// Example API call
const getImageOfTheDay = (state) => {
  let { apod } = state;

  fetch(`http://localhost:3000/apod`)
    .then((res) => res.json())
    .then((apod) => updateStore(store, { apod }));

  return data;
};

// ------------------------------------------------------  Main Code
// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});
