var ids = [
  "BXOZH1lFM-r",
  "BWODrkwlcMp",
  "BUzcdjaFeh-",
  "BVp8nlglRKE",
  "BS9J1HsFP-n",
  "BUXyzV3F1PE",
  "BSOvKAQj_2k",
  "BSRScP0DOoi",
  "BSTzxm_DAJX",
  "BNhjAN1j4P8",
  "BNXKkO9D4SV",
  "BUNSRR9Fysh",
  "BMzXdzKg5H-",
  "BM4WUX1Duu9",
  "BNcUuRUDrd6",
  "BNpOJnFj9eQ",
  "BNzy3u1g_xo",
  "BONYaiHARKW",
  "BOppiergic6",
  "BO2cWR_Ahch",
  "BO5ILPMAlz7",
  "BPaeJ_9gNQS",
  "BPftKwzAF5V",
  "BP5jB1LAPB0",
  "BQJcxYqgV0f",
  "BQL51ZGAunj",
  "BRL6crXjdLz",
  "BRbzbJ7j--E",
  "BRqxBjcDTJL",
  "BR3Z-euDrFW",
  "BR9YtzvDm9j",
  "BSbftFnjBcc",
  "BSgzRClDfU-",
  "BS1V85ul1O9",
  "BTAIh8gFEd9",
  "BTFKjpqj7qL",
  "BTM8x3eFnCs",
  "BTXOwrNFA55",
  "BTb9r0sF6Ad",
  "BTpkO1CFjAH",
  "BTxIcS7FJjX",
  "BUAAft7Ffea",
  "BULCqaVlPs1",
  "BUSloB5FhCc",
  "BUagPpClulr",
  "BUcwHDVlrTJ",
  "BUe7J66lcHx",
  "BUhmILOl2fT",
  "BUkpEPilcF6",
  "BUxG5f8FPtX",
  "BVK1fa5FQ63",
  "BVssHvPl8xa",
  "BV78fi1lmfo",
  "BWBWjFhlCuW",
  "BWLhXvAFHVA",
  "BWQPZE0lzBM",
  "BWYVwRclin1",
  "BXBOEYVldp0",
  "BXDorUQFJDe",
  "BXLwwK-FoPX",
  "BXblx6CFoio",
  "BXgnJv8lX2n"
];

var buttonText = [
  "another doodle, daddio",
  "more",
  "order up",
  "hit me",
  "gimme more",
  "now this I can get into",
  "alright, one more"
];

var iterator = makeIterator(shuffle(ids));

var button = document.querySelector("[data-onclick]");

var instagramContainer = document.querySelector("[data-instagram-container]");

button.addEventListener("click", function(event) {
  var action = event.target.dataset.onclick;

  var nextDoodleId = iterator.next();
  refreshDoodle(instagramContainer, nextDoodleId);
  button.innerText = randomMember(buttonText);
});

simulateClick(button);

function makeIterator(items) {
  var index = 0;
  var total = items.length;

  return {
    next: function() {
      index++;
      if (index >= total) index = 0;
      return items[index];
    }
  };
}

function refreshDoodle(element, doodleId) {
  console.log(doodleId);
  if (!element) return;

  element.innerHTML = "";
  element.append(createInstagramEmbedElement(doodleId));

  instgrm.Embeds.process();
}

function createInstagramEmbedElement(postId) {
  var instagramElement = document.createElement("blockquote");

  instagramElement.classList.add("instagram-media");

  instagramElement.dataset.instgrmVersion = 8;

  // instagramElement.dataset.instgrmCaptioned = true;

  instagramElement.dataset.instgrmPermalink = [
    "https://www.instagram.com/p/",
    postId,
    "/"
  ].join("");

  return instagramElement;
}

// thanks mike bostocks!
function shuffle(array) {
  var copy = [];
  var n = array.length;
  var i;

  while (n) {
    i = Math.floor(Math.random() * array.length);

    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }

  return copy;
}

function simulateClick(element) {
  var event = document.createEvent("Event");
  event.initEvent("click", false, true);
  element.dispatchEvent(event);
}

function randomMember(list) {
  return list[Math.floor(Math.random() * list.length)];
}
