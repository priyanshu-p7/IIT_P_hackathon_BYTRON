const GEMINI_API_KEY = "{AIzaSyDrTuh5HqjtcF8KiWGRaE3SusH098Gnkkc}";
const GOOGLE_MAPS_API_KEY = "{AIzaSyAUFKzd5eed2fyQWJylX5oxLuPXXBKY1kU}";
const MODEL_NAME = "gemini-2.0-flash";

const input = document.getElementById("userInput");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") sendMessage();
});

let typingInterval;
let typingMsg;

function toggleChatbot() {
  const chatbotWindow = document.getElementById("chatbot-window");
  chatbotWindow.style.display =
    chatbotWindow.style.display === "none" ? "flex" : "none";
}

function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  showTyping();
  processQuery(message);
  input.value = "";
}

function addMessage(sender, text) {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.className = `msg ${sender}`;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
  const chatBox = document.getElementById("chatBox");
  typingMsg = document.createElement("div");
  typingMsg.className = "msg bot typing";
  typingMsg.innerText = "Typing";
  chatBox.appendChild(typingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  let dotCount = 0;
  typingInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    typingMsg.innerText = "Typing" + ".".repeat(dotCount);
  }, 500);
}

function removeTyping() {
  clearInterval(typingInterval);
  if (typingMsg) {
    typingMsg.remove();
    typingMsg = null;
  }
}

// ---------------- PROCESS USER QUERY ----------------
async function processQuery(message) {
  const msg = message.toLowerCase();

  // Greetings
  if (["hi", "hii", "hiii", "hello", "hey"].includes(msg)) {
    removeTyping();
    addMessage(
      "bot",
      "Hello 👋, I am your tourist guide.\nTell me your location and what you want to explore!"
    );
    return;
  }

  // Detect "I am in ..." or "near me" → restaurants or attractions
  if (msg.includes("i am in") || msg.includes("i'm in") || /\b(near me|here|my location)\b/i.test(msg)) {
    removeTyping();
    if (msg.includes("restaurant") || msg.includes("food") || msg.includes("eat")) {
      await getNearbyPlaces(message, "restaurant");
    } else {
      await getNearbyPlaces(message, "tourist_attraction");
    }
    return;
  }

  // User asking nearby places
  if (
    msg.includes("nearby") ||
    msg.includes("attractions") ||
    msg.includes("places") ||
    msg.includes("restaurants")
  ) {
    removeTyping();
    if (msg.includes("restaurant")) {
      await getNearbyPlaces(message, "restaurant");
    } else {
      await getNearbyPlaces(message, "tourist_attraction");
    }
    return;
  }

  // User asking for directions
  if (
    msg.includes("how to reach") ||
    msg.includes("directions") ||
    msg.includes("path") ||
    msg.includes("route")
  ) {
    removeTyping();
    await getDirections(message);
    return;
  }

  // Default: Pass to Gemini
  const prompt = `You are a tourist guide bot. 
Answer the user's travel-related query in a helpful way. 
If the user says "I am in <place>", suggest popular restaurants or tourist attractions nearby.

User: "${message}"`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    removeTyping();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join(" ").trim() ||
      "Sorry, I couldn't get that. Please try again.";
    addMessage("bot", reply);
  } catch (err) {
    console.error(err);
    removeTyping();
    addMessage("bot", "Something went wrong while contacting Gemini.");
  }
}

// ---------------- LOCATION HELPERS ----------------
function extractLocationFromText(text) {
  const prepositionPattern = /(?:\b(in|at|near|around)\b)\s+([a-zA-Z\s().-]+?)(?=(?:\s+(?:suggest|recommend|restaurants?|food|eat|places?|place|attractions?|nearby|travel|visit|famous|top|best|please|help|guide|show|list|for|to|how|can|you|me|today|tomorrow|now)\b)|[.,!?]|$)/i;
  const m1 = text.match(prepositionPattern);
  if (m1 && m1[2]) return m1[2].trim().replace(/\s+/g, " ");

  const m2 = text.match(/([a-zA-Z]+(?:\s+[a-zA-Z]+){0,2})\s*$/);
  if (m2 && m2[1]) return m2[1].trim();

  return "";
}

function getCurrentCoords() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  });
}

async function fetchPlacesByLatLng(lat, lng, type, label) {
  const placesRes = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=4000&type=${type}&key=${GOOGLE_MAPS_API_KEY}`
  );
  const placesData = await placesRes.json();

  if (!placesData?.results?.length) {
    addMessage("bot", `No results found near ${label}.`);
    return;
  }

  let reply = `Here are some ${type === "restaurant" ? "popular restaurants" : "nearby tourist attractions"} around ${label}:\n\n`;
  placesData.results.slice(0, 5).forEach((place, i) => {
    reply += `${i + 1}. ${place.name} ⭐ ${place.rating || "N/A"}\n   📍 ${place.vicinity || "Address not available"}\n\n`;
  });

  addMessage("bot", reply);
}

// ---------------- GOOGLE MAPS FUNCTIONS ----------------
async function getNearbyPlaces(userText, type = "tourist_attraction") {
  try {
    const wantsHere = /\b(near me|here|my location)\b/i.test(userText);
    if (wantsHere) {
      try {
        const { lat, lng } = await getCurrentCoords();
        await fetchPlacesByLatLng(lat, lng, type, "your current location");
        return;
      } catch (e) {
        console.warn("Geolocation failed, falling back to text extraction:", e);
      }
    }

    let queryLocation = extractLocationFromText(userText);
    if (!queryLocation) queryLocation = userText.trim();

    const geoRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(queryLocation)}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const geoData = await geoRes.json();

    let lat, lng, resolvedName;
    if (geoData?.results?.length) {
      lat = geoData.results[0].geometry.location.lat;
      lng = geoData.results[0].geometry.location.lng;
      resolvedName = geoData.results[0].formatted_address.split(",")[0];
    } else {
      addMessage("bot", `I couldn’t figure out the location from: "${queryLocation}". Try like "restaurants in Lucknow".`);
      return;
    }

    await fetchPlacesByLatLng(lat, lng, type, resolvedName || queryLocation);
  } catch (err) {
    console.error(err);
    addMessage("bot", "Sorry, I couldn’t fetch nearby results.");
  }
}

// ---------------- DIRECTIONS ----------------
async function getDirections(message) {
  try {
    const match = message.match(/from (.*) to (.*)/i);
    if (!match) {
      addMessage("bot", "Please ask like: 'Directions from Hazratganj to Bara Imambara'");
      return;
    }
    const origin = match[1].trim();
    const destination = match[2].trim();

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK || status === "OK") {
          const steps = result.routes[0].legs[0].steps;
          let reply = `Here are the directions from ${origin} to ${destination}:\n\n`;

          steps.forEach((step, i) => {
            reply += `${i + 1}. ${step.instructions.replace(/<[^>]*>?/gm, "")} (${step.distance.text})\n`;
          });

          addMessage("bot", reply);
        } else {
          addMessage("bot", `Sorry, I couldn't fetch directions from ${origin} to ${destination}.`);
        }
      }
    );
  } catch (err) {
    console.error(err);
    addMessage("bot", "Something went wrong while fetching directions.");
  }
}