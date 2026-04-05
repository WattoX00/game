let money = 0;
let storageCapacity = 1.44;
let storageUsed = 0;
let internetSpeed = 0.02;
let storageType = 'Floppy Disk';

const items = [
    { name: 'Junk', baseSize: 0.1, level: 1, unlocked: true, multiplier: 1 },
    { name: 'Single-bit file', baseSize: 1, level: 1, unlocked: false, multiplier: 10 },
    { name: 'Metadata fragment', baseSize: 1, level: 1, unlocked: false, multiplier: 2 },
    { name: 'Broken shortcut', baseSize: 5, level: 1, unlocked: false, multiplier: 5 },
    { name: 'Pixel sample', baseSize: 30, level: 1, unlocked: false, multiplier: 3 }
];

const storageTypes = [
    { name: 'Floppy Disk', capacity: 1.44 },
    { name: 'CD-ROM', capacity: 700 },
];

const internetSpeeds = [
    { level: 1, speed: 0.02, cost: 0.02 },
    { level: 2, speed: 0.05, cost: 0.5 },
    { level: 3, speed: 0.1, cost: 1 },
    { level: 4, speed: 0.5, cost: 10 },
    { level: 5, speed: 5, cost: 100 },
    { level: 6, speed: 20, cost: 500 },
    { level: 7, speed: 100, cost: 0.05 },
    { level: 8, speed: 500, cost: 10 },
    { level: 9, speed: 1000, cost: 0.1 },
    { level: 10, speed: 10000, cost: 0.05 },
    { level: 11, speed: 100000, cost: 10 },
    { level: 12, speed: 1000000, cost: 0 },

];

let currentInternetLevel = 1;
let currentStorageIndex = 0;

const storageItems = [];

function updateDisplay() {
    document.getElementById('money').textContent = `Money: $${money.toFixed(2)}`;
    document.getElementById('storage-info').textContent = `Storage: ${storageType} (${storageCapacity} MB used: ${storageUsed.toFixed(2)} MB)`;
    document.getElementById('internet-speed').textContent = `Internet Speed: ${(internetSpeed * 1000).toFixed(1)} kb/s`;
    
    renderDownloads();
    renderStorage();
    renderUpgrades();
}

function renderDownloads() {
    const downloadsDiv = document.getElementById('downloads');
    downloadsDiv.innerHTML = '';
    items.forEach((item, index) => {
        if (item.unlocked) {
            const size = item.baseSize * item.level;
            const time = size / internetSpeed;
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <p>${item.name} (Level ${item.level})</p>
                <p>Size: ${size.toFixed(4)} MB</p>
                <button onclick="downloadItem(${index})">Download (${time.toFixed(1)}s)</button>
                <button onclick="upgradeItem(${index})">Upgrade ($${ (item.level * 1).toFixed(2) })</button>
            `;
            downloadsDiv.appendChild(div);
        }
    });
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
            <button onclick="sellItem(${index})">Sell ($${(item.size * item.multiplier).toFixed(2)})</button>
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
            <button onclick="upgradeStorage()">Buy ($10)</button>
        `;
        upgradesDiv.appendChild(div);
    }
}

function downloadItem(index) {
    const item = items[index];
    const size = item.baseSize * item.level;
    if (storageUsed + size > storageCapacity) {
        alert('Not enough storage space!');
        return;
    }
    const time = size / internetSpeed;
    const button = event.target;
    button.disabled = true;
    button.textContent = 'Downloading...';
    setTimeout(() => {
        storageItems.push({ name: item.name, size: size, level: item.level, multiplier: item.multiplier });
        storageUsed += size;
        updateDisplay();
        button.disabled = false;
        button.textContent = `Download (${time.toFixed(1)}s)`;
    }, time * 1000);
}

function sellItem(index) {
    const item = storageItems[index];
    money += item.size * item.multiplier;
    storageUsed -= item.size;
    storageItems.splice(index, 1);
    updateDisplay();
}

function upgradeItem(index) {
    const item = items[index];
    const cost = item.level * 1;
    if (money >= cost) {
        money -= cost;
        item.level++;
        if (item.level >= 5 && index + 1 < items.length) {
            items[index + 1].unlocked = true;
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

updateDisplay();
