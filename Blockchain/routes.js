const routes = require("next-routes")();

routes
  .add("/login","/common/login")
  
  .add("/patients/register", "/patients/register")
  .add("/hospital/register", "/hospital/register")
  .add("/prof/register", "/prof/register")
  .add("/patients/:address/dash","/patients/dash")
  .add("/prof/:address/dash","/prof/dash")
  .add("/hospital/:address/dash","/hospital/dash")
  .add("/hospital/:address/addPatient","/hospital/addPatient")
  .add("/hospital/:address/addReport","/hospital/reportSub")
  .add("/patients/:address/report","/patients/reportSub")
  .add("/prof/:address/comments","/prof/comments")
  
  
  
// after : is the wildacrd or variable

module.exports = routes;
