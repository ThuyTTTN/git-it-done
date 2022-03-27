var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username"); // form input 
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

//Getting the form to do something
var formSubmitHandler = function(event) {
  event.preventDefault();
  
  //get value from input element; trim trailing spaces
  var username = nameInputEl.value.trim();  

  //check to see if there's a value in the 'username' variable
  if (username) {
    getUserRepos(username);       //if there
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
}


var getUserRepos = function(user) {
  //format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  //make a request to the url
  fetch(apiUrl).then(function(response){
    //when status is 200s, the 'ok' property will be 'true'
    if (response.ok) {
      //when response data is converted to JSON, it will be sent from getUserRepos() to displayRepos()
      response.json().then(function(data) {
        displayRepos(data, user);
      });
      // when 'ok' property is false (something wrong with HTTP request)
    } else {
      alert("Error: GitHub User Not Found");
    }
  })
  .catch(function(error) {
    //Notice this '.catch()' getting chained onto the end of the '.then()'
    //if the fetch() request fails, the error will be sent to .catch()
    alert("Unable to connect to GitHub");
  })
}

//Create a function to display Repos data to the page!
var displayRepos = function(repos, searchTerm) {
  // check if api returned any repos (Username name exist, but no repos has been created yet)
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }

  console.log(repos);
  console.log(searchTerm);

  // always clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    //format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    //connecting to the 2nd html page
    repoEl.setAttribute("href", ".single-repo.html?repo=" + repoName);

    //create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    //append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    // if there are issues, the it will be displayed with the number of issues and add a red X
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issues(s)";
    } else {      //if no issues, display blue check mark
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    //append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};


//call the function
userFormEl.addEventListener("submit", formSubmitHandler);

