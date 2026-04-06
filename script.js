let money = 1000000000;
let storageCapacity = 1.44;
let storageUsed = 0;
let internetSpeed = 0.02;
let storageType = 'Floppy Disk';
let currentBulkQuantity = 1;
const bulkOptions = [1,5,10,25];
let reservedStorage = 0;

const actionIcons = {
    sell: 'assets/actions/sell.png',
    levelup: 'assets/actions/levelup.png',
    download: 'assets/actions/download.png',
    info: 'assets/actions/information.png',
};

const uiIcons = {
    internet: 'assets/internet.png',
    printer: 'assets/printer.png',
    market: 'assets/market.png',
    lvl1: 'assets/storages/lvl1.png',
    lvl2: 'assets/storages/lvl2.png',
    lvl3: 'assets/storages/lvl3.png',
    lvl4: 'assets/storages/lvl4.png',
    lvl5: 'assets/storages/lvl5.png',
    lvl6: 'assets/storages/lvl6.png',
    lvl7: 'assets/storages/lvl7.png',
    lvl8: 'assets/storages/lvl8.png',
}

const backgrounds = {
    lvl1: 'assets/backgrounds/lvl1.png',
    lvl2: 'assets/backgrounds/lvl2.png',
    lvl3: 'assets/backgrounds/lvl3.png',
    lvl4: 'assets/backgrounds/lvl4.png',
    lvl5: 'assets/backgrounds/lvl5.png',
    lvl6: 'assets/backgrounds/lvl6.png',
    lvl7: 'assets/backgrounds/lvl7.png',
    lvl8: 'assets/backgrounds/lvl8.png',
    lvl9: 'assets/backgrounds/lvl9.png',
    lvl10: 'assets/backgrounds/lvl10.png',
    lvl11: 'assets/backgrounds/lvl11.png',
    lvl12: 'assets/backgrounds/lvl12.png',
    lvl13: 'assets/backgrounds/lvl13.png'
};

function getStorageIcon() {
    switch(currentStorageIndex) {
        case 0: return uiIcons.lvl1;
        case 1: return uiIcons.lvl2;
        case 2: return uiIcons.lvl3;
        case 3: return uiIcons.lvl4;
        case 4: return uiIcons.lvl5;
        case 5: return uiIcons.lvl6;
        case 6: return uiIcons.lvl7;
        case 7: return uiIcons.lvl8;
        default: return uiIcons.lvl1;
    }
}

const items = [
    { name: 'Junk (empty .txt)', baseSize: 0.1, level: 1, unlocked: true, multiplier: 1, downloading: false, desc: 'Worth almost nothing… but hey, it’s better than nothing.', img: 'assets/items/lvl1.png' },
    { name: 'Single-bit file', baseSize: 0.3, level: 1, unlocked: false, multiplier: 1.3, downloading: false, desc: 'Just a lonely 0 or 1, but rare enough to brag about.', img: 'assets/items/lvl2.png' },
    { name: 'Game mods', baseSize: 1, level: 1, unlocked: false, multiplier: 1.6, downloading: false, desc: 'Tiny chaos waiting to be unleashed.', img: 'assets/items/lvl3.png' },
    { name: 'Image File', baseSize: 3, level: 1, unlocked: false, multiplier: 2, downloading: false, desc: '', img: 'assets/items/lvl4.png' },
    { name: 'Video File', baseSize: 12, level: 1, unlocked: false, multiplier: 2.5, downloading: false, desc: '', img: 'assets/items/lvl5.png' },
    { name: 'HD Movie', baseSize: 48, level: 1, unlocked: false, multiplier: 3, downloading: false, desc: '', img: 'assets/items/lvl6.png' },
    { name: 'Cs2 (60GB)', baseSize: 120, level: 1, unlocked: false, multiplier: 3.5, downloading: false, desc: '', img: 'assets/items/lvl7.png' },
    { name: 'Government files', baseSize: 300, level: 1, unlocked: false, multiplier: 4.5, downloading: false, desc: 'Top secret, highly dangerous, incredibly valuable.', img: 'assets/items/lvl8.png' },
    { name: 'Encryption keys', baseSize: 800, level: 1, unlocked: false, multiplier: 6, downloading: false, desc: 'Unlock everything… if you dare.', img: 'assets/items/lvl9.jpeg' },
    { name: 'AI models', baseSize: 2000, level: 1, unlocked: false, multiplier: 8, downloading: false, desc: 'Artificial minds ready for your command.', img: 'assets/items/lvl10.png' },
    { name: 'Alien signals', baseSize: 6000, level: 1, unlocked: false, multiplier: 12, downloading: false, desc: 'Messages from somewhere, maybe not friendly.', img: 'assets/items/lvl11.png' },
    { name: 'The Galaxy Archive', baseSize: 20000, level: 1, unlocked: false, multiplier: 20, downloading: false, desc: 'Star systems, civilizations, cosmic secrets… all yours.', img: 'assets/items/lvl12.png' },
    { name: 'The BIG SECRET', baseSize: 100000, level: 1, unlocked: false, multiplier: 50, downloading: false, desc: 'The ultimate revelation, the plot twist, the thing they didn’t want you to see.', img: 'assets/items/lvl13.png' }
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
let showStorage = false;

const storageItems = [];

let blackMarketUnlocked = false;
let blackMarketMultiplier = 2.0;
let boostedItemIndex = null;
let previousBoostedItem = null;
let boostTimer = null;
let countdownInterval = null;
let boostStartTime = 0;

let printerUnlocked = false;
let printerActive = false;
let printerItem = null;
let printerEndTime = 0;
let printerTimerId = null;
let printerUpgradeLevel = 0;
let autosellerBought = false;
let autosellerEnabled = false;
let autobuyerBought = false;
let doublePrintBought = false;
let doublePrintUpgrades = 0;
let autobuyerQueueName = null;
const PRINTER_BASE_TIME = 60;

function getPrintDuration() {
    const duration = PRINTER_BASE_TIME * Math.pow(0.95, printerUpgradeLevel);
    return Math.max(1, Math.ceil(duration));
}

function formatDisplayNumber(val) {
    if (!isFinite(val)) return String(val);
    function trimZeros(s) { return s.replace(/\.?0+$/, ''); }
    if (val >= 100) return Math.round(val).toString();
    if (val >= 10) return trimZeros(val.toFixed(1));
    if (val >= 1) return trimZeros(val.toFixed(2));
    return trimZeros(val.toFixed(3));
}

function formatSizeFromMB(valueMB) {
    const units = ['kb','mb','gb','tb','pb'];
    if (isNaN(valueMB)) valueMB = 0;
    let value = valueMB * 1000;
    let idx = 0;
    while (idx < units.length - 1) {
        const next = value / 1000;
        if (next >= 1) {
            value = next;
            idx++;
        } else {
            break;
        }
    }
    return `${formatDisplayNumber(value)} ${units[idx]}`;
}

function formatDataRateMBps(valueMBps) {
    return `${formatSizeFromMB(valueMBps)}/s`;
}

function getSellPriceGlobal(item) {
    let price = item.size * item.multiplier * 0.5;
    if (boostedItemIndex !== null && item.name === items[boostedItemIndex].name) {
        price *= blackMarketMultiplier;
    }
    return price;
}

function updateDisplay() {
    const moneyEl = document.getElementById('money');
    const storageInfoEl = document.getElementById('storage-info');
    const internetEl = document.getElementById('internet-speed');

    if (moneyEl) moneyEl.innerHTML = `${money.toFixed(2)} <img src="${actionIcons.sell}" style="width:32px;height:32px;">`;
    if (storageInfoEl) {
    storageInfoEl.innerHTML = `<img src="${getStorageIcon()}" style="width:32px;height:32px;"> ${storageType} (${formatSizeFromMB(storageUsed)} used, ${formatSizeFromMB(reservedStorage)} reserved / ${formatSizeFromMB(storageCapacity)})`;}
    if (internetEl) internetEl.innerHTML = `<img src="${uiIcons.internet}" style="width:16px;height:16px;"> ${formatDataRateMBps(internetSpeed)}`;

    renderBulkControls();
    renderDownloads();
    renderStorage();
    renderUpgrades();
    renderBlackMarket();
    renderPrinter();

    const downloadsEl = document.getElementById('downloads');
    const storageEl = document.getElementById('storage');
    const toggleBtn = document.getElementById('view-toggle');
    if (downloadsEl && storageEl) {
        if (showStorage) {
            downloadsEl.style.display = 'none';
            storageEl.style.display = 'block';
            if (toggleBtn) toggleBtn.innerHTML = `<img src="${actionIcons.download}" style="width:16px;height:16px;">`;
            const centerTitle = document.getElementById('center-title');
            if (centerTitle) centerTitle.textContent = 'Storage';
        } else {
            downloadsEl.style.display = 'block';
            storageEl.style.display = 'none';
            if (toggleBtn) toggleBtn.innerHTML = `<img src="${getStorageIcon()}" style="width:64px;height:64px;">`;
            const centerTitle = document.getElementById('center-title');
            if (centerTitle) centerTitle.textContent = 'Downloads';
        }
    }
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
            const quantity = currentBulkQuantity;
            const totalSize = size * quantity;
            const time = Math.max(1, Math.ceil(totalSize / internetSpeed));
            const div = document.createElement('div');
            div.className = 'item';
            div.style.position = 'relative';
            const bgKey = `lvl${index + 1}`;

            if (backgrounds[bgKey]) {
                div.style.backgroundImage = `url(${backgrounds[bgKey]})`;
            }

            div.innerHTML = `
                <button 
                    onclick="toggleItemInfo(${index})"
                    onmouseover="showItemInfo(${index})"
                    onmouseout="hideItemInfo(${index})"
                    style="position:absolute; font-size:12px; padding:2px 6px; top:5px; right:5px;"
                ><img src="${actionIcons.info}" style="width:16px;height:16px;"></button>

                <img src="${item.img}" alt="${item.name}" style="width:40px;height:40px;margin-right:6px;vertical-align:middle;">
                <p>${item.name} (Level ${item.level})</p>
                <p>Size: ${formatSizeFromMB(size)}</p>

                <button onclick="bulkDownloadItem(${index}, ${quantity})" ${item.downloading ? 'disabled' : ''}>
                            <img src="${actionIcons.download}" style="width:16px;height:16px;">${item.downloading ? 'Downloading...' : `x${quantity} (${Math.floor(time)}s)`}
                </button>

                <button onclick="upgradeItem(${index})">
                    <img src="${actionIcons.levelup}" style="width:16px;height:16px;">$${getUpgradeCost(index, item.level)}
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

function renderBulkControls() {
    const bcDiv = document.getElementById('bulk-controls');
    if (!bcDiv) return;
    const bulkUnlocked = items[8] && items[8].unlocked;
    if (!bulkUnlocked) {
        bcDiv.innerHTML = '';
        return;
    }
    const optionsHtml = bulkOptions.map(o => `<option value="${o}" ${o === currentBulkQuantity ? 'selected' : ''}>${o}x</option>`).join('');
    bcDiv.innerHTML = `
        <label style="font-size:14px;">Download Amount:
            <select id="bulk-select" onchange="setBulkQuantity(parseInt(this.value))">
                ${optionsHtml}
            </select>
        </label>
    `;
}

function setBulkQuantity(q) {
    currentBulkQuantity = q;
    updateDisplay();
}

function toggleView() {
    showStorage = !showStorage;
    updateDisplay();
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
    const formatUnlocked = items[5] && items[5].unlocked;
    const controls = document.createElement('div');
    controls.style.marginBottom = '6px';
    controls.innerHTML = `<button onclick="formatDisk()" ${formatUnlocked ? '' : 'disabled'}>Format Disk (Sell All)</button>`;
    storageDiv.appendChild(controls);
    const row = document.createElement('div');
    row.className = 'storage-row';
    storageDiv.appendChild(row);

    if (storageItems.length === 0) {
        const empty = document.createElement('div');
        empty.textContent = 'No items in storage.';
        storageDiv.appendChild(empty);
        return;
    }

    storageItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item';
        const price = getSellPriceGlobal(item);

        let buttons = `<button onclick="sellItem(${index})">${price.toFixed(2)} <img src="${actionIcons.sell}" style="width:32px;height:32px;"></button>`;

        if (printerUnlocked) {
            buttons += ` <button onclick="startPrintFromStorage(${index})"><img src="${uiIcons.printer}" style="width:32px;height:32px;"></button>`;
        }

        if (autobuyerBought) {
            const queuedLabel = autobuyerQueueName === item.name ? 'Unqueue' : 'Queue';
            buttons += ` <button onclick="setAutobuyerQueue(${index})">${queuedLabel}</button>`;
        }

        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" 
                style="width:40px; height:40px; margin-right:6px; vertical-align:middle;">
            <p>${item.name} (Level ${item.level})</p>
            <p>Size: ${formatSizeFromMB(item.size)}</p>
            ${buttons}
        `;

        row.appendChild(div);
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
            <p><img src="${uiIcons.internet}" style="width:32px;height:32px;"> ${formatDataRateMBps(nextInternet.speed)}</p>
            <button onclick="upgradeInternet()">${nextInternet.cost} <img src="${actionIcons.sell}" style="width:32px;height:32px;"></button>
        `;
        upgradesDiv.appendChild(div);
    }
    
    const nextStorage = storageTypes[currentStorageIndex + 1];
    if (nextStorage) {
        const div = document.createElement('div');
        div.className = 'upgrade';
        div.innerHTML = `
            <p>Upgrade Storage to <img src="${getStorageIcon()}" style="width:32px;height:32px;"> ${nextStorage.name} (${formatSizeFromMB(nextStorage.capacity)})</p>
            <button onclick="upgradeStorage()">${getStorageCost(currentStorageIndex)} <img src="${actionIcons.sell}" style="width:32px;height:32px;"></button>
        `;
        upgradesDiv.appendChild(div);
    }

    if (blackMarketUnlocked) {
        const cost = Math.pow(2, Math.floor((blackMarketMultiplier - 2) / 0.1)) * 100;
        const div = document.createElement('div');
        div.className = 'upgrade';
        div.innerHTML = `
            <p><img src="${uiIcons.market}" style="width:32px;height:32px;">${(blackMarketMultiplier + 0.1).toFixed(1)}x</p>
            <button onclick="upgradeBlackMarket()">${Math.floor(cost)} <img src="${actionIcons.sell}" style="width:32px;height:32px;"></button>
        `;
        upgradesDiv.appendChild(div);
    }

    if (printerUnlocked) {
        const divP = document.createElement('div');
        divP.className = 'upgrade';
        const curTime = getPrintDuration();
        divP.innerHTML = `
            <p>Decrease print time (current: ${curTime}s)</p>
            <button onclick="buyPrinterUpgrade()">${getPrinterUpgradeCost()} <img src="${actionIcons.sell}" style="width:32px;height:32px;"></button>
        `;
        upgradesDiv.appendChild(divP);

        if (!autosellerBought) {
            const cost = 1000;
            const d = document.createElement('div');
            d.className = 'upgrade';
            d.innerHTML = `
                <p>Autoseller: Automatically sell duplicated items</p>
                <button onclick="buyAutoseller()">${cost} <img src="${actionIcons.sell}" style="width:32px;height:32px;"></button>
            `;
            upgradesDiv.appendChild(d);
        }

        if (!autobuyerBought) {
            const cost = 2000;
            const d = document.createElement('div');
            d.className = 'upgrade';
            d.innerHTML = `
                <p>Autobuyer: Requeue an item to print again automatically</p>
                <button onclick="buyAutobuyer()">${cost} <img src="${actionIcons.sell}" style="width:32px;height:32px;"></button>
            `;
            upgradesDiv.appendChild(d);
        }

        if (!doublePrintBought) {
            const cost = 5000;
            const d = document.createElement('div');
            d.className = 'upgrade';
            d.innerHTML = `
                <p>Double Print Chance: 20% chance to print 2 copies</p>
                <button onclick="buyDoublePrint()">${cost} <img src="${actionIcons.sell}" style="width:32px;height:32px;"></button>
            `;
            upgradesDiv.appendChild(d);
        }

        if (doublePrintBought) {
            const cost = getDoublePrintUpgradeCost();
            const d2 = document.createElement('div');
            d2.className = 'upgrade';
            d2.innerHTML = `
                <p>Increase Double Print Chance (+4% per upgrade). Current: ${(getDoublePrintChance()*100).toFixed(1)}%</p>
                <button onclick="buyDoublePrintUpgrade()">${cost} <img src="${actionIcons.sell}" style="width:32px;height:32px;"></button>
            `;
            upgradesDiv.appendChild(d2);
        }
    }
}

function renderPrinter() {
    const pDiv = document.getElementById('printer');
    if (!printerUnlocked) {
        pDiv.innerHTML = '';
        return;
    }

    if (printerActive && printerItem) {
        const timeLeftMs = Math.max(0, printerEndTime - Date.now());
        const seconds = Math.ceil(timeLeftMs / 1000);
        pDiv.innerHTML = `
            <p>Printing: ${printerItem.name} (Level ${printerItem.level})</p>
            <p>Time left: ${seconds}s</p>
        `;
    } else {
        const queued = autobuyerBought && autobuyerQueueName ? autobuyerQueueName : 'None';
        let html = '';
        html += `<img src="${uiIcons.printer}" style="width:32px;height:32px;">`;
        html += `<p>Print Duration: ${getPrintDuration()}s</p>`;
        html += `<p>Autobuyer Queue: ${queued}</p>`;
        if (autosellerBought) {
            html += `<p>Autoseller: ${autosellerEnabled ? 'On' : 'Off'} <button onclick="toggleAutoseller()">${autosellerEnabled ? 'Disable' : 'Enable'}</button></p>`;
        } else {
            html += `<p>Autoseller: Not bought</p>`;
        }
        html += `<p>Double Print Chance: ${(getDoublePrintChance()*100).toFixed(1)}%</p>`;
        html += `<p>To print an item, click <strong>Print</strong> on an item in Storage.</p>`;
        pDiv.innerHTML = html;
    }
}

function startPrintFromStorage(storageIndex) {
    if (!printerUnlocked) {
        alert('Printer not unlocked yet.');
        return;
    }
    if (printerActive) {
        alert('Printer is busy!');
        return;
    }
    const item = storageItems[storageIndex];
    if (!item) return;

    storageItems.splice(storageIndex, 1);
    storageUsed -= item.size;

    printerActive = true;
    printerItem = item;
    printerEndTime = Date.now() + getPrintDuration() * 1000;

    printerTimerId = setInterval(() => {
        updateDisplay();
        if (Date.now() >= printerEndTime) {
            clearInterval(printerTimerId);
            printerTimerId = null;
            finishPrint();
        }
    }, 250);
    updateDisplay();
}

function finishPrint() {
    if (!printerActive || !printerItem) return;

    const copies = Math.random() < getDoublePrintChance() ? 2 : 1;

    for (let i = 0; i < copies; i++) {
        if (i > 0 && autosellerBought && autosellerEnabled) {
            const sale = getSellPriceGlobal(printerItem);
            money += sale;
            continue;
        }

        if (storageUsed + reservedStorage + printerItem.size <= storageCapacity) {
            storageItems.push({
                name: printerItem.name,
                size: printerItem.size,
                level: printerItem.level,
                multiplier: printerItem.multiplier,
                img: printerItem.img
            });
            storageUsed += printerItem.size;
        } else {
            const sale = getSellPriceGlobal(printerItem);
            money += sale;
        }
    }

    printerActive = false;
    printerItem = null;
    printerEndTime = 0;

    updateDisplay();

    if (autobuyerBought && autobuyerQueueName) {
        const idx = storageItems.findIndex(it => it.name === autobuyerQueueName);
        if (idx !== -1) {
            setTimeout(() => startPrintFromStorage(idx), 200);
        }
    }
}

function formatDisk() {
    const formatUnlocked = items[5] && items[5].unlocked;
    if (!formatUnlocked) {
        alert('Format Disk not unlocked yet!');
        return;
    }
    if (storageItems.length === 0) {
        alert('Storage is already empty!');
        return;
    }

    let total = 0;
    for (const it of storageItems) {
        total += getSellPriceGlobal(it);
    }
    money += total;
    storageItems.length = 0;
    storageUsed = 0;
    updateDisplay();
}

function getPrinterUpgradeCost() {
    return Math.floor(250 * Math.pow(2, printerUpgradeLevel));
}

function buyPrinterUpgrade() {
    const cost = getPrinterUpgradeCost();
    if (money >= cost) {
        money -= cost;
        printerUpgradeLevel++;
        updateDisplay();
    } else {
        alert('Not enough money!');
    }
}

function buyAutoseller() {
    const cost = 1000;
    if (money >= cost) {
        money -= cost;
        autosellerBought = true;
        autosellerEnabled = true;
        updateDisplay();
    } else {
        alert('Not enough money!');
    }
}

function buyAutobuyer() {
    const cost = 2000;
    if (money >= cost) {
        money -= cost;
        autobuyerBought = true;
        updateDisplay();
    } else {
        alert('Not enough money!');
    }
}

function buyDoublePrint() {
    const cost = 5000;
    if (money >= cost) {
        money -= cost;
        doublePrintBought = true;
        updateDisplay();
    } else {
        alert('Not enough money!');
    }
}

function getDoublePrintChance() {
    if (!doublePrintBought) return 0;
    return Math.min(1, 0.20 + doublePrintUpgrades * 0.04);
}

function getDoublePrintUpgradeCost() {
    return Math.floor(2000 * Math.pow(2, doublePrintUpgrades));
}

function buyDoublePrintUpgrade() {
    if (!doublePrintBought) {
        alert('Buy the base Double Print upgrade first!');
        return;
    }
    const cost = getDoublePrintUpgradeCost();
    if (money >= cost) {
        money -= cost;
        doublePrintUpgrades++;
        updateDisplay();
    } else {
        alert('Not enough money!');
    }
}

function setAutobuyerQueue(storageIndex) {
    if (!autobuyerBought) {
        alert('Autobuyer not purchased.');
        return;
    }
    const item = storageItems[storageIndex];
    if (!item) return;
    if (autobuyerQueueName === item.name) {
        autobuyerQueueName = null;
    } else {
        autobuyerQueueName = item.name;
    }
    updateDisplay();
}

function toggleAutoseller() {
    if (!autosellerBought) {
        alert('Autoseller not purchased.');
        return;
    }
    autosellerEnabled = !autosellerEnabled;
    updateDisplay();
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
        <p><img src="${uiIcons.market}" style="width:32px;height:32px;"> ${boostedName} (${blackMarketMultiplier.toFixed(1)}x)</p>
        <p>Next boost in: ${minutes}:${seconds.toString().padStart(2, '0')}</p>
    `;
}

function getStorageCost(index) {
    return Math.floor(50 * Math.pow(5, index));
}

function downloadItem(index) {
    bulkDownloadItem(index, 1);
}
function bulkDownloadItem(index, quantity = currentBulkQuantity) {
    const item = items[index];
    if (!item) return;
    if (item.downloading) return;

    const sizeEach = item.baseSize * Math.pow(1.2, item.level - 1);
    const totalSize = sizeEach * quantity;

    if (storageUsed + reservedStorage + totalSize > storageCapacity) {
        alert('Not enough storage space!');
        return;
    }

    const time = Math.max(1, Math.ceil(totalSize / internetSpeed));

    reservedStorage += totalSize;
    item.downloading = true;
    updateDisplay();

    setTimeout(() => {
        reservedStorage -= totalSize;
        for (let i = 0; i < quantity; i++) {
            storageItems.push({
                name: item.name,
                size: sizeEach,
                level: item.level,
                multiplier: item.multiplier,
                img: item.img
            });
            storageUsed += sizeEach;
        }

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
        const baseCost = 1;
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
            if (index + 1 === 2) {
                blackMarketUnlocked = true;
                startBlackMarket();
            }
            if (index + 1 === 4) {
                printerUnlocked = true;
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
