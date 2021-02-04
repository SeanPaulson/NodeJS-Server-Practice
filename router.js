let Profile = require("./profile.js");
const renderer = require('./renderer.js');
const querystring = require('querystring');

//Handle HTTP route GET / and POST / i.e. Home

/* function style(req, res) {
    res.setHeader('Content-Type', 'text/css');
    console.log('******inside style******');
    renderer.css('index', res);
    res.end();
} */


function home(req, res) {
    console.log('******Calling Home******');
    if(req.method.toLowerCase() === "get") {
      console.log(req.url);
  console.log('******Calling get******');
      res.setHeader('Content-Type', 'text/html');
      renderer.view('header', {}, res);
      renderer.view("search", {}, res);
      renderer.view("footer", {}, res);
      res.end();
      //if url === "/" POST
    }else {
  console.log('******POSTing home func******');
        //get the post data from body
        //extract username
        //redirect to /:username
        req.on('data', (postBody) => {
          let query = querystring.parse(postBody.toString());
          res.writeHead(303, {"Location": "/" + query.username });
          res.end();
        });
  }
}

//Handle HTTP route GET /username i.e. /chalkers

function user(req, res) {
  let username = req.url.replace("/", "");
  console.log('*****calling user***'+ username +'***');
    console.log('*******in user*****');
    res.setHeader('Content-Type', 'text/html');
    renderer.view("header", {}, res);
    
    let studentProfile = new Profile(username);
    
    studentProfile.on("end", (profileJSON) => {
      let values = {
        avatarUrl: profileJSON.gravatar_url,
        badges: profileJSON.badges.length,
        username: profileJSON.profile_name,
        javascriptPoints: profileJSON.points.JavaScript
      }
    //simple response
      renderer.view("profile", values, res);
      renderer.view("footer", {}, res);
      res.end();
    });
    
    studentProfile.on("error", (error) => {
      //show Error
      renderer.view('error', {errorMessage: error.message}, res);
      renderer.view("search", {}, res);
      renderer.view("footer", {}, res);
      res.end();
    });
}
//module.exports.style = style;
module.exports.home = home;
module.exports.user = user;