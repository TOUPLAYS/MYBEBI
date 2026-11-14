
var GRID_SIZE = 36;

var game = {
    gold: 1000,
    food: 500,
    oil: 250,
    level: 1,
    buildings: [
        {
            id: 1,
            name: "Headquarters",
            icon: "🏢",
            level: 1,
            position: 14
        }
    ]
};

var buildingData = {
    "Barracks": {
        cost: 200,
        icon: "🪖",
        description: "Trains soldiers for your army."
    },

    "Gold Mine": {
        cost: 300,
        icon: "🪙",
        description: "Produces gold for your base."
    },

    "Farm": {
        cost: 150,
        icon: "🌾",
        description: "Produces food for your army."
    },

    "Defense Tower": {
        cost: 250,
        icon: "🛡️",
        description: "Protects your base from enemies."
    }
};

var selectedBuilding = null;
var buildingToPlace = null;
var movingBuilding = null;
var nextBuildingId = 2;


// CREATE THE BASE MAP

function createBase() {
    var grid = document.getElementById("baseGrid");

    grid.innerHTML = "";

    for (var i = 0; i < GRID_SIZE; i++) {
        var building = game.buildings.find(function(item) {
            return item.position === i;
        });

        var tile = document.createElement("button");

        tile.className = "tile";
        tile.type = "button";
        tile.dataset.position = i;

        if (building) {
            tile.classList.add("occupied");

            if (selectedBuilding === building.id) {
                tile.classList.add("selected");
            }

            var icon = document.createElement("span");
            icon.textContent = building.icon;

            var name = document.createElement("b");
            name.textContent = building.name.toUpperCase();

            var level = document.createElement("small");
            level.textContent = "LVL " + building.level;

            tile.appendChild(icon);
            tile.appendChild(name);
            tile.appendChild(level);

        } else {
            tile.classList.add("empty");
            tile.textContent = "+";
        }

        tile.addEventListener("click", function() {
            var position = Number(this.dataset.position);
            handleTileClick(position);
        });

        grid.appendChild(tile);
    }

    document.getElementById("baseInfo").textContent =
        game.buildings.length + " / " + GRID_SIZE + " building spaces occupied.";
}


// HANDLE TILE CLICKS

function handleTileClick(position) {

    var building = game.buildings.find(function(item) {
        return item.position === position;
    });

    // MOVING A BUILDING

    if (movingBuilding !== null) {

        if (building) {
            showMessage("Choose an empty tile!");
            return;
        }

        var moving = game.buildings.find(function(item) {
            return item.id === movingBuilding;
        });

        if (moving) {
            moving.position = position;
        }

        selectedBuilding = movingBuilding;
        movingBuilding = null;

        document.getElementById("btnCancelMove").hidden = true;

        updateUI();
        saveGame();
        showMessage("Building moved successfully!");
        return;
    }

    // PLACING A NEW BUILDING

    if (buildingToPlace !== null) {

        if (building) {
            showMessage("This tile is already occupied!");
            return;
        }

        placeBuilding(buildingToPlace, position);
        return;
    }

    // SELECTING AN EXISTING BUILDING

    if (building) {
        selectedBuilding = building.id;
        updateUI();
        showBuildingInfo();
    } else {
        selectedBuilding = null;
        updateUI();
        showBuildingInfo();
    }
}


// BUILDING PLACEMENT MODE

function selectBuild(name) {

    if (!buildingData[name]) return;

    buildingToPlace = name;
    movingBuilding = null;

    selectedBuilding = null;

    document.querySelectorAll(".shop-button").forEach(function(button) {
        button.classList.toggle(
            "active",
            button.dataset.build === name
        );
    });

    document.getElementById("btnCancelMove").hidden = true;

    updateUI();
    showMessage("Choose an empty tile for your " + name + ".");
}


// CONSTRUCT A BUILDING

function placeBuilding(name, position) {

    var data = buildingData[name];

    if (!data) return;

    if (game.gold < data.cost) {
        showMessage("Not enough gold!");
        return;
    }

    var occupied = game.buildings.some(function(item) {
        return item.position === position;
    });

    if (occupied) {
        showMessage("This tile is already occupied!");
        return;
    }

    game.gold -= data.cost;

    var newBuilding = {
        id: nextBuildingId,
        name: name,
        icon: data.icon,
        level: 1,
        position: position
    };

    nextBuildingId++;

    game.buildings.push(newBuilding);

    selectedBuilding = newBuilding.id;
    buildingToPlace = null;

    clearShopSelection();

    updateUI();
    showBuildingInfo();
    saveGame();

    showMessage(name + " constructed successfully!");
}


// SHOW BUILDING INFORMATION

function showBuildingInfo() {

    var panel = document.getElementById("buildingInfo");

    var upgradeButton = document.getElementById("btnUpgrade");
    var moveButton = document.getElementById("btnMove");

    var building = game.buildings.find(function(item) {
        return item.id === selectedBuilding;
    });

    if (!building) {
        panel.textContent = "Select a building on your map to see its information.";

        upgradeButton.disabled = true;
        moveButton.disabled = true;

        return;
    }

    var description = buildingData[building.name];

    panel.innerHTML = "";

    var name = document.createElement("h3");
    name.textContent = building.icon + " " + building.name;

    var level = document.createElement("p");
    level.textContent = "Level: " + building.level;

    var location = document.createElement("p");
    location.textContent = "Tile: " + (building.position + 1);

    var details = document.createElement("p");
    details.textContent = description
        ? description.description
        : "Your main command structure.";

    var upgradeCost = document.createElement("p");
    upgradeCost.textContent =
        "Upgrade cost: " + getUpgradeCost(building) + " Gold";

    panel.appendChild(name);
    panel.appendChild(level);
    panel.appendChild(location);
    panel.appendChild(details);
    panel.appendChild(upgradeCost);

    upgradeButton.disabled =
        building.name === "Headquarters" || building.level >= 10;

    moveButton.disabled = building.name === "Headquarters";
}


// UPGRADE BUILDING

function getUpgradeCost(building) {
    return building.level * 150;
}

function upgradeBuilding() {

    var building = game.buildings.find(function(item) {
        return item.id === selectedBuilding;
    });

    if (!building) return;

    if (building.name === "Headquarters") {
        showMessage("Headquarters upgrades are not available yet.");
        return;
    }

    if (building.level >= 10) {
        showMessage("Maximum building level reached!");
        return;
    }

    var cost = getUpgradeCost(building);

    if (game.gold < cost) {
        showMessage("Not enough gold for this upgrade!");
        return;
    }

    game.gold -= cost;
    building.level++;

    updateUI();
    showBuildingInfo();
    saveGame();

    showMessage(building.name + " upgraded to level " + building.level + "!");
}


// MOVE BUILDING

function startMovingBuilding() {

    var building = game.buildings.find(function(item) {
        return item.id === selectedBuilding;
    });

    if (!building) return;

    if (building.name === "Headquarters") {
        showMessage("Headquarters cannot be moved.");
        return;
    }

    buildingToPlace = null;
    movingBuilding = building.id;

    clearShopSelection();

    document.getElementById("btnCancelMove").hidden = false;

    showMessage("Now click an empty tile to move your building.");
}


// CANCEL ACTION

function cancelAction() {

    buildingToPlace = null;
    movingBuilding = null;

    clearShopSelection();

    document.getElementById("btnCancelMove").hidden = true;

    updateUI();
    showBuildingInfo();

    showMessage("Action cancelled.");
}

function clearShopSelection() {
    document.querySelectorAll(".shop-button").forEach(function(button) {
        button.classList.remove("active");
    });
}


// RESOURCE COLLECTION

function collectResources() {

    game.gold += 100;
    game.food += 50;
    game.oil += 25;

    updateUI();
    saveGame();

    showMessage("Resources collected successfully!");
}


// UPDATE INTERFACE

function updateUI() {

    document.getElementById("gold").textContent = game.gold;
    document.getElementById("food").textContent = game.food;
    document.getElementById("oil").textContent = game.oil;
    document.getElementById("level").textContent = game.level;

    createBase();
    showBuildingInfo();
}


// NOTIFICATIONS

function showMessage(message) {
    document.getElementById("message").textContent = message;
}


// SAVE GAME

function saveGame() {

    var saveData = JSON.stringify(game);

    localStorage.setItem("socialWarsSave", saveData);
}


// LOAD GAME

function loadGame() {

    var saved = localStorage.getItem("socialWarsSave");

    if (saved) {

        try {

            var loaded = JSON.parse(saved);

            if (
                !loaded ||
                !Number.isSafeInteger(loaded.gold) ||
                !Number.isSafeInteger(loaded.food) ||
                !Number.isSafeInteger(loaded.oil) ||
                !Number.isSafeInteger(loaded.level) ||
                !Array.isArray(loaded.buildings) ||
                loaded.buildings.length < 1 ||
                loaded.buildings.length > GRID_SIZE
            ) {
                throw new Error("Invalid save data");
            }

            var occupiedPositions = [];
            var validBuildings = [];
            var usedIds = [];

            loaded.buildings.forEach(function(building, index) {

                if (
                    !building ||
                    typeof building.name !== "string" ||
                    !Number.isSafeInteger(building.level) ||
                    building.level < 1 ||
                    building.level > 10
                ) {
                    throw new Error("Invalid building");
                }

                var data = buildingData[building.name];

                if (building.name !== "Headquarters" && !data) {
                    throw new Error("Unknown building");
                }

                var position = Number.isInteger(building.position)
                    ? building.position
                    : index;

                if (
                    position < 0 ||
                    position >= GRID_SIZE ||
                    occupiedPositions.includes(position)
                ) {
                    throw new Error("Invalid building position");
                }

                var id = Number.isSafeInteger(building.id) &&
                    building.id > 0 &&
                    !usedIds.includes(building.id)
                    ? building.id
                    : index + 1;

                while (usedIds.includes(id)) {
                    id++;
                }

                occupiedPositions.push(position);
                usedIds.push(id);

                validBuildings.push({
                    id: id,
                    name: building.name,
                    icon: building.name === "Headquarters"
                        ? "🏢"
                        : data.icon,
                    level: building.level,
                    position: position
                });
            });

            if (
                validBuildings.filter(function(item) {
                    return item.name === "Headquarters";
                }).length !== 1
            ) {
                throw new Error("Headquarters missing or duplicated");
            }

            game = {
                gold: Math.max(0, loaded.gold),
                food: Math.max(0, loaded.food),
                oil: Math.max(0, loaded.oil),
                level: Math.max(1, loaded.level),
                buildings: validBuildings
            };

            nextBuildingId = Math.max.apply(
                null,
                validBuildings.map(function(item) {
                    return item.id;
                })
            ) + 1;

        } catch (error) {

            showMessage("Save data is invalid. Starting a new game.");

            localStorage.removeItem("socialWarsSave");
        }
    }

    updateUI();
}


// BUTTON EVENTS

document.querySelectorAll(".shop-button").forEach(function(button) {

    button.addEventListener("click", function() {
        selectBuild(this.dataset.build);
    });

});

document.getElementById("btnUpgrade").addEventListener(
    "click",
    upgradeBuilding
);

document.getElementById("btnMove").addEventListener(
    "click",
    startMovingBuilding
);

document.getElementById("btnCancel").addEventListener(
    "click",
    cancelAction
);

document.getElementById("btnCancelMove").addEventListener(
    "click",
    cancelAction
);

document.getElementById("btnCollect").addEventListener(
    "click",
    collectResources
);

document.getElementById("btnSave").addEventListener(
    "click",
    function() {
        saveGame();
        showMessage("Game saved successfully!");
    }
);

document.getElementById("btnBase").addEventListener(
    "click",
    cancelAction
);

document.getElementById("btnArmy").addEventListener(
    "click",
    function() {
        showMessage("Army management is coming in Phase 4.");
    }
);

document.getElementById("btnMissions").addEventListener(
    "click",
    function() {
        showMessage("Missions are coming in Phase 6.");
    }
);

document.getElementById("btnShop").addEventListener(
    "click",
    function() {
        document.querySelector(".build-options").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
);


// START GAME

loadGame();
