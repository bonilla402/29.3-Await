let myNumber = 13
let baseURL = "http://numbersapi.com";

const body = document.body;

function createParagraph(text) {
  // Create a new <p> element
  var paragraph = document.createElement('p');
  // Set the text content of the <p> element to the provided text
  paragraph.textContent = text;
  // Append the <p> element to the body
  body.appendChild(paragraph);
}

async function Part1()
{
  //1
  createParagraph("PART 1");
  let response = await axios.get(`${baseURL}/${myNumber}?json`);
  console.log(`${response.data.text}`);
  createParagraph(response.data.text);

  //2
  createParagraph("PART 2");
  let response2 = await axios.get(`${baseURL}/13,5,0?json`);
  let facts = response2.data;
  
  // Iterate over the keys of the responseData object
  Object.keys(facts).forEach(function(key) {
    var value = facts[key];
    createParagraph(value);
  });

  //3
  createParagraph("PART 3");

  let factsArray = await Promise.all([
    axios.get(`${baseURL}/${myNumber}?json`),
    axios.get(`${baseURL}/${myNumber}?json`),
    axios.get(`${baseURL}/${myNumber}?json`)
  ]);

  factsArray.forEach(p => createParagraph(p.data.text));
}

Part1();