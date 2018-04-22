var buttonText = [
  "another doodle, daddio",
  "more",
  "order up",
  "hit me",
  "gimme more",
  "now this I can get into",
  "alright, one more"
];

var button = document.querySelector("[data-onclick]");
var instagramContainer = document.querySelector("[data-controller=instagram]");

var items = Array.prototype.slice
  .call(instagramContainer.querySelectorAll("[data-instagram-id]"))
  .map(function(item) {
    if (!item.dataset.instagramId) return null;

    return {
      id: item.dataset.instagramId,
      shuffle: !("force" in item.dataset)
    };
  })
  .filter(identity);

var ids = items
  .filter(function(item) {
    return !item.shuffle;
  })
  .concat(
    shuffle(
      items.filter(function(item) {
        return item.shuffle;
      })
    )
  )
  .map(function(item) {
    return item.id;
  });

var iterator = makeIterator(ids);

button.addEventListener("click", function(event) {
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
      if (index >= total) index = 0;
      var item = items[index];
      index++;
      return item;
    }
  };
}

function refreshDoodle(element, doodleId) {
  if (!element) return;

  element.innerHTML = "";
  element.append(createInstagramEmbedElement(doodleId));

  instgrm.Embeds.process();
}

function createInstagramEmbedElement(postId) {
  console.log("creating instagram element", postId);
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

function identity(item) {
  return item;
}
