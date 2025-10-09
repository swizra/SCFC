document.getElementById("year").textContent = new Date().getFullYear();

const burger = document.getElementById("burger");
const nav = document.getElementById("primary-nav");

function closeMenu() {
  nav.classList.remove("active");
  burger.classList.remove("active");
}

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
  burger.classList.toggle("active");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  if (nav.classList.contains("active")) {
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  if (
    nav.classList.contains("active") &&
    !nav.contains(event.target) &&
    !burger.contains(event.target)
  ) {
    closeMenu();
  }
});

const cryptoIds = ["bitcoin", "ethereum", "cardano"];
let chartInstance = null;

async function fetchMarketData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd&include_24hr_change=true&include_market_cap=true"
    );
    const data = await response.json();
    displayMarketData(data);
  } catch (error) {
    console.error("Error fetching market data:", error);
  }
}

function displayMarketData(data) {
  const container = document.getElementById("cryptoData");
  container.innerHTML = "";

  const cryptoMap = {
    bitcoin: { symbol: "BTC", name: "Bitcoin" },
    ethereum: { symbol: "ETH", name: "Ethereum" },
    cardano: { symbol: "ADA", name: "Cardano" },
  };

  Object.entries(data).forEach(([id, info]) => {
    const crypto = cryptoMap[id];
    const price = info.usd;
    const change = info.usd_24h_change;
    const changeColor = change >= 0 ? "inherit" : "inherit";

    const html = `
      <div class="market-item">
        <div class="left">
          <div>
            <div class="symbol">${crypto.symbol}</div>
            <div class="name">${crypto.name}</div>
          </div>
        </div>
        <div class="right">
          <div class="price">$${price.toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}</div>
          <div class="change" style="color: ${changeColor};">${
      change >= 0 ? "+" : ""
    }${change.toFixed(2)}%</div>
        </div>
      </div>
    `;
    container.innerHTML += html;
  });
}

fetchMarketData();
setInterval(fetchMarketData, 30000);
