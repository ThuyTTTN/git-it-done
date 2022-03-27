var issueContainerEl = document.querySelector("#issues-container");

// create getRepoIssues() function that will take in repo name as a parameter
var getRepoIssues = function(repo) {
    // Use the Fetch API to create an HTTP request to this endpoint
    //create a variable to hold the query
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    //create a request with fetch() and pass in the apiUrl
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert("There was a problem with your request!");
        }
    })

    console.log(repo);
};

//Turning GitHub issue data into DOM elements
var displayIssues = function(issues) {
    // This code will display a message in the issues container, letting users know there are no open issues for the given repository.
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        //create a link element to take users to the issue on gitHub
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        // issue objects have an html_url property, which links to the full issue on github; target='_blank' attr to each <a> element to open the link in a new tab
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        //append to container
        issueEl.appendChild(typeEl);
    }
    //append the <a> element onto the actual page
    issueContainerEl.appendChild(issueEl);
};

getRepoIssues("facebook/react");

