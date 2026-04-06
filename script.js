let money = 1000000;
let storageCapacity = 1.44;
let storageUsed = 0;
let internetSpeed = 0.02;
let storageType = 'Floppy Disk';

const items = [
    { name: 'Junk (empty .txt)', baseSize: 0.1, level: 1, unlocked: true, multiplier: 1, downloading: false, desc: 'Worth almost nothing… but hey, it’s better than nothing.' },
    { name: 'Single-bit file', baseSize: 0.3, level: 1, unlocked: false, multiplier: 1.3, downloading: false, desc: 'Just a lonely 0 or 1, but rare enough to brag about.' },
    { name: 'Game mods', baseSize: 1, level: 1, unlocked: false, multiplier: 1.6, downloading: false, desc: 'Tiny chaos waiting to be unleashed.' },
    { name: 'Image File', baseSize: 3, level: 1, unlocked: false, multiplier: 2, downloading: false, desc: '' },
    { name: 'Video File', baseSize: 12, level: 1, unlocked: false, multiplier: 2.5, downloading: false, desc: '' },
    { name: 'HD Movie', baseSize: 48, level: 1, unlocked: false, multiplier: 3, downloading: false, desc: '' },
    { name: 'Cs2 (60GB)', baseSize: 120, level: 1, unlocked: false, multiplier: 3.5, downloading: false, desc: '' },
    { name: 'Government files', baseSize: 300, level: 1, unlocked: false, multiplier: 4.5, downloading: false, desc: 'Top secret, highly dangerous, incredibly valuable.' },
    { name: 'Encryption keys', baseSize: 800, level: 1, unlocked: false, multiplier: 6, downloading: false, desc: 'Unlock everything… if you dare.' },
    { name: 'AI models', baseSize: 2000, level: 1, unlocked: false, multiplier: 8, downloading: false, desc: 'Artificial minds ready for your command.' },
    { name: 'Alien signals', baseSize: 6000, level: 1, unlocked: false, multiplier: 12, downloading: false, desc: 'Messages from somewhere, maybe not friendly.' },
    { name: 'The Galaxy Archive', baseSize: 20000, level: 1, unlocked: false, multiplier: 20, downloading: false, desc: 'Star systems, civilizations, cosmic secrets… all yours.' },
    { name: 'The BIG SECRET', baseSize: 100000, level: 1, unlocked: false, multiplier: 50, downloading: false, desc: 'The ultimate revelation, the plot twist, the thing they didn’t want you to see.' }
];

const storageTypes = [
    { name: 'Floppy Disk', capacity: 1.44 },
    { name: 'CD-ROM', capacity: 700 },
    { name: 'DVD', capacity: 4700 },
    { name: 'Hard Disk Drive (HDD)', capacity: 8192 },
    { name: 'Solid State Drive (SSD)', capacity: 16384 },
    { name: 'NVMe SSD', capacity: 65536 },
    { name: 'Neural Vault', capacity: 524288 },
    { name: 'Galaxy Archive Disk', capacity: 10485760 },
];

const internetSpeeds = [
    { level: 1, speed: 0.02, cost: 0.02 },
    { level: 2, speed: 0.05, cost: 0.5 },
    { level: 3, speed: 0.1, cost: 1 },
    { level: 4, speed: 0.5, cost: 10 },
    { level: 5, speed: 5, cost: 100 },
    { level: 6, speed: 20, cost: 500 },
    { level: 7, speed: 100, cost: 2000 },
    { level: 8, speed: 500, cost: 5000 },
    { level: 9, speed: 1000, cost: 10000 },
    { level: 10, speed: 10000, cost: 100000 },
    { level: 11, speed: 100000, cost: 1000000 },
    { level: 12, speed: 1000000, cost: 10000000 },
];

let currentInternetLevel = 1;
let currentStorageIndex = 0;

const storageItems = [];

let blackMarketUnlocked = false;
let blackMarketMultiplier = 2.0;
let boostedItemIndex = null;
let previousBoostedItem = null;
let boostTimer = null;
let countdownInterval = null;
let boostStartTime = 0;

function updateDisplay() {
    document.getElementById('money').textContent = `Money: $${money.toFixed(2)}`;
    document.getElementById('storage-info').textContent = `Storage: ${storageType} (${storageCapacity} MB used: ${storageUsed.toFixed(2)} MB)`;
    document.getElementById('internet-speed').textContent = `Internet Speed: ${(internetSpeed * 1000).toFixed(1)} kb/s`;
    
    renderDownloads();
    renderStorage();
    renderUpgrades();
    renderBlackMarket();
}

function renderDownloads() {
    const downloadsDiv = document.getElementById('downloads');
    downloadsDiv.innerHTML = '';
    function getUpgradeCost(index, level) {
        const baseCost = 1;
        const itemTierScale = Math.pow(3, index);
        const levelScale = Math.pow(1.4, level - 1);

        return Math.floor(baseCost * itemTierScale * levelScale);
    }

    items.forEach((item, index) => {
        if (item.unlocked) {
            const size = item.baseSize * Math.pow(1.2, item.level - 1);
            const time = Math.max(1, Math.ceil(size / internetSpeed));
            const div = document.createElement('div');
            div.className = 'item';
            div.style.position = 'relative';

            div.innerHTML = `
                <button 
                    onclick="toggleItemInfo(${index})"
                    onmouseover="showItemInfo(${index})"
                    onmouseout="hideItemInfo(${index})"
                    style="position:absolute; font-size:12px; padding:2px 6px; top:5px; right:5px;"
                >ℹ️</button>

                <p>${item.name} (Level ${item.level})</p>
                <p>Size: ${size.toFixed(2)} MB</p>

                <button onclick="downloadItem(${index})" ${item.downloading ? 'disabled' : ''}>
                    ${item.downloading ? 'Downloading...' : `Download (${Math.floor(time)}s)`}
                </button>

                <button onclick="upgradeItem(${index})">
                    Upgrade ($${getUpgradeCost(index, item.level)})
                </button>

                <div id="info-${index}" 
                     style="display:none; position:absolute; top:25px; right:5px; 
                            background:#111; color:#fff; padding:6px; font-size:12px; 
                            border:1px solid #444; max-width:200px; z-index:10;">
                    ${item.desc || 'No info available.'}
                </div>
            `;

            downloadsDiv.appendChild(div);
        }
    });
}

let pinnedInfoIndex = null;

function toggleItemInfo(index) {
    const el = document.getElementById(`info-${index}`);

    if (pinnedInfoIndex !== null && pinnedInfoIndex !== index) {
        const old = document.getElementById(`info-${pinnedInfoIndex}`);
        if (old) old.style.display = 'none';
    }

    if (pinnedInfoIndex === index) {
        el.style.display = 'none';
        pinnedInfoIndex = null;
    } else {
        el.style.display = 'block';
        pinnedInfoIndex = index;
    }
}

function showItemInfo(index) {
    if (pinnedInfoIndex !== index) {
        const el = document.getElementById(`info-${index}`);
        if (el) el.style.display = 'block';
    }
}

function hideItemInfo(index) {
    if (pinnedInfoIndex !== index) {
        const el = document.getElementById(`info-${index}`);
        if (el) el.style.display = 'none';
    }
}

function renderStorage() {
    const storageDiv = document.getElementById('storage');
    storageDiv.innerHTML = '';
    storageItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <p>${item.name} (Level ${item.level})</p>
            <p>Size: ${item.size.toFixed(3)} MB</p>
            `;
        function getSellPrice(item) {
            const rarityScale = Math.pow(item.multiplier, 1.15);
            const levelScale = Math.pow(1.08, item.level);

            return item.size * rarityScale * levelScale * 0.45;
        }
        let price = getSellPrice(item);

            if (
                boostedItemIndex !== null &&
                item.name === items[boostedItemIndex].name
            ) {
                price *= blackMarketMultiplier;
            }

            div.innerHTML = `
                <p>${item.name} (Level ${item.level})</p>
                <p>Size: ${item.size.toFixed(3)} MB</p>
                <button onclick="sellItem(${index})">
                    Sell ($${price.toFixed(2)})
                </button>
            `;
    storageDiv.appendChild(div);
        });
}

function renderUpgrades() {
    const upgradesDiv = document.getElementById('upgrades');
    upgradesDiv.innerHTML = '';
    
    const nextInternet = internetSpeeds.find(s => s.level === currentInternetLevel + 1);
    if (nextInternet) {
        const div = document.createElement('div');
        div.className = 'upgrade';
        div.innerHTML = `
            <p>Upgrade Internet Speed to ${(nextInternet.speed * 1000).toFixed(1)} kb/s</p>
            <button onclick="upgradeInternet()">Buy ($${nextInternet.cost})</button>
        `;
        upgradesDiv.appendChild(div);
    }
    
    const nextStorage = storageTypes[currentStorageIndex + 1];
    if (nextStorage) {
        const div = document.createElement('div');
        div.className = 'upgrade';
        div.innerHTML = `
            <p>Upgrade Storage to ${nextStorage.name} (${nextStorage.capacity} MB)</p>
            <button onclick="upgradeStorage()">Buy ($${getStorageCost(currentStorageIndex)})</button>
        `;
        upgradesDiv.appendChild(div);
    }

    if (blackMarketUnlocked) {
        const cost = Math.pow(2, Math.floor((blackMarketMultiplier - 2) / 0.1)) * 100;
        const div = document.createElement('div');
        div.className = 'upgrade';
        div.innerHTML = `
            <p>Upgrade Black Market Multiplier to ${(blackMarketMultiplier + 0.1).toFixed(1)}x</p>
            <button onclick="upgradeBlackMarket()">Buy $${Math.floor(cost)}</button>
        `;
        upgradesDiv.appendChild(div);
    }
}

function renderBlackMarket() {
    const bmDiv = document.getElementById('black-market');
    if (!blackMarketUnlocked) {
        bmDiv.innerHTML = '';
        return;
    }

    const boostedName = boostedItemIndex !== null ? items[boostedItemIndex].name : 'None';
    const timeLeft = Math.max(0, 30000 - (Date.now() - boostStartTime));
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    bmDiv.innerHTML = `
        <p>Current Boost: ${boostedName} (${blackMarketMultiplier.toFixed(1)}x)</p>
        <p>Next boost in: ${minutes}:${seconds.toString().padStart(2, '0')}</p>
    `;
}

function getStorageCost(index) {
    return Math.floor(50 * Math.pow(5, index));
}

function downloadItem(index) {
    const item = items[index];

    if (item.downloading) return;

    const size = item.baseSize * Math.pow(1.2, item.level - 1);

    if (storageUsed + size > storageCapacity) {
        alert('Not enough storage space!');
        return;
    }

    const time = Math.max(1, Math.ceil(size / internetSpeed));

    item.downloading = true;
    updateDisplay();

    setTimeout(() => {
        storageItems.push({
            name: item.name,
            size: size,
            level: item.level,
            multiplier: item.multiplier
        });

        storageUsed += size;
        item.downloading = false;

        updateDisplay();
    }, time * 1000);
}

function sellItem(index) {
    const item = storageItems[index];
    let sellPrice = item.size * item.multiplier * 0.5;
    if (boostedItemIndex !== null && item.name === items[boostedItemIndex].name) {
        sellPrice *= blackMarketMultiplier;
    }
    money += sellPrice;
    storageUsed -= item.size;
    storageItems.splice(index, 1);
    updateDisplay();
}

function upgradeItem(index) {
    const item = items[index];

    function getUpgradeCost(index, level) {
        const baseCost = 25;
        const itemTierScale = Math.pow(3, index);
        const levelScale = Math.pow(1.4, level - 1);

        return Math.floor(baseCost * itemTierScale * levelScale);
    }

    const cost = getUpgradeCost(index, item.level);

    if (money >= cost) {
        money -= cost;
        item.level++;

        if (item.level >= 5 && index + 1 < items.length) {
            items[index + 1].unlocked = true;
            if (index + 1 === 3) {
                blackMarketUnlocked = true;
                startBlackMarket();
            }
        }

        updateDisplay();
    } else {
        alert('Not enough money!');
    }
}

function upgradeInternet() {
    const next = internetSpeeds.find(s => s.level === currentInternetLevel + 1);
    if (next && money >= next.cost) {
        money -= next.cost;
        currentInternetLevel++;
        internetSpeed = next.speed;
        updateDisplay();
    } else {
        alert('Not enough money!');
    }
}

function upgradeStorage() {
    const next = storageTypes[currentStorageIndex + 1];
    if (next && money >= 10) {
        money -= 10;
        currentStorageIndex++;
        storageType = next.name;
        storageCapacity = next.capacity;
        updateDisplay();
    } else {
        alert('Not enough money!');
    }
}

function startBlackMarket() {
    if (boostTimer) return;

    selectRandomBoost();

    boostTimer = setInterval(() => {
        selectRandomBoost();
    }, 30000);

    countdownInterval = setInterval(() => {
        renderBlackMarket();
    }, 1000);
}

function resetBoost() {
    previousBoostedItem = boostedItemIndex;
    boostedItemIndex = null;
}

function selectRandomBoost() {
    const availableItems = items.filter(item => item.unlocked);
    if (availableItems.length === 0) return;

    let newItem;
    do {
        newItem = availableItems[Math.floor(Math.random() * availableItems.length)];
    } while (newItem === previousBoostedItem && availableItems.length > 1);

    boostedItemIndex = items.indexOf(newItem);
    previousBoostedItem = newItem;
    boostStartTime = Date.now();
}

function upgradeBlackMarket() {
    const cost = Math.pow(2, Math.floor((blackMarketMultiplier - 2) / 0.1)) * 100;
    if (money >= cost) {
        money -= cost;
        blackMarketMultiplier = Math.round((blackMarketMultiplier + 0.1) * 10) / 10;
        updateDisplay();
    } else {
        alert('Not enough money!');
    }
}

updateDisplay();
