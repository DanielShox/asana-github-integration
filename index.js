const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  const ASANA_PAT = process.env.ASANA_PAT;
  // fetch github.com/
  fetch("https://app.asana.com/api/1.0/stories/1200095260727289", {
    "method": "GET",
    "headers": {
      "user-agent": "vscode-restclient",
      "accept": "application/json",
      "authorization": `Bearer ${ASANA_PAT}`
    }
  })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}