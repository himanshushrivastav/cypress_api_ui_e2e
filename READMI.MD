Cypress e2e API and UI automation framework

to run script follow below steps:

git clone

cd cypress_api_ui_e2e

npm i

npx cypress run.

TEST LAYER FILES DETAILS

Please change var email at integration/api.spec.js file to avoid errors.

app.spec.js => containing UI related test cases each it block it one test case using reusable methods which are mentioned in commands.js file

api.spec.js => validating diffrent APIs of diffrent menthods like 'GET', 'PUT', 'POST', 'DELETE'.