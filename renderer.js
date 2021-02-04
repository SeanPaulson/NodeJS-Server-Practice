const fs = require('fs');

function mergeValues(values, content) {
  //cycle over the keys
  
  for(let key in values) {
    //replace{{key}} with the value from the values param
    content = content.replace("{{" + key + "}}", values[key]);
    
  }
    
    return content;
  //return merged content
}

function view(templateName, values, res) {
  //Read from the template file
  console.log('******rendering Data******');
  let data = fs.readFileSync(`./views/${templateName}.html`, 'utf8');
  
  //insert values into the content
  data = mergeValues(values, data)
  
  //write out to the response
  res.write(data);
}

/* function css(fileName, res) {
  let data = fs.readFileSync(`./views/recources/${fileName}.css`, "utf8");
  res.write(data);
} */


module.exports.view = view;
//module.exports.css = css;