let baseURL = "https://deckofcardsapi.com/api/deck";
let deckId = null;
let drawnCards = []; // Array to store drawn cards

function LogCard(card)
{
  console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
}

async function Part2()
{
  //1
  console.log(`PART 1`);
  response = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
  deckId = response.data.deck_id;

  response = await axios.get(`${baseURL}/${deckId}/draw/?count=1`);
  LogCard(response.data.cards[0]);


  //2 
  console.log(`PART 2`);
  response = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
  deckId = response.data.deck_id;
  
  let cardsArr = await Promise.all([
    axios.get(`${baseURL}/${deckId}/draw/?count=1`),
    axios.get(`${baseURL}/${deckId}/draw/?count=1`)
  ]);

  cardsArr.forEach(card => LogCard(card.data.cards[0]));

  //3
  console.log(`PART 3`);
  response = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
  deckId = response.data.deck_id;
  document.getElementById('drawCardBtn').style.display = 'block';
}
  

// Function to draw a new card
async function drawNewCard() {
  
  let response = await axios.get(`${baseURL}/${deckId}/draw/?count=1`);
  
  const card = response.data.cards[0];
  const cardInfo = `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`;
  const cardImage = card.image;

  document.getElementById('remainingCardsCounter').textContent = response.data.remaining;

  if (response.data.remaining === 0)
  {
    document.getElementById('drawCardBtn').style.display = 'none';
  } 

  // Push the drawn card to the array
  drawnCards.push({ info: cardInfo, image: cardImage });
  
  // Update card display
  updateCardDisplay();
}

// Function to update the card display
function updateCardDisplay() {
  const cardDisplayElement = document.getElementById('cardDisplay');
  
  // Clear previous content
  cardDisplayElement.innerHTML = '';

  // Calculate the number of rows needed
  const numRows = Math.ceil(drawnCards.length / 4);

  // Loop through each row
  for (let row = 0; row < numRows; row++) {
    // Create a row element
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // Loop through each column (up to 4 columns per row)
    for (let col = 0; col < 4; col++) {
      // Calculate the index of the card in the drawnCards array
      const index = row * 4 + col;

      // Check if the card exists at this index
      if (index < drawnCards.length) {
        const card = drawnCards[index];

        // Create card container
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('col-12');
        cardContainer.classList.add('col-md-6');
        cardContainer.classList.add('col-lg-3');


        // Create card info element
        const cardInfoElement = document.createElement('div');
        cardInfoElement.innerText = card.info;

        // Append card info element to card container
        cardContainer.appendChild(cardInfoElement);

        // If card image is available, create image element and append it
        if (card.image) {
          const imgElement = document.createElement('img');
          imgElement.src = card.image;
          imgElement.alt = card.info;
          cardContainer.appendChild(imgElement);
        }

        // Append card container to row element
        rowElement.appendChild(cardContainer);
      }
    }

    // Append row element to card display
    cardDisplayElement.appendChild(rowElement);
  }
}

// Add event listener to the button
document.getElementById('drawCardBtn').addEventListener('click', drawNewCard);


Part2();