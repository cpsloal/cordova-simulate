var savedSims = require('saved-sims'),
    event = require('event');

module.exports = {
    initialize: function () {
        var sims = savedSims.sims;

        var execList = document.getElementById('exec-list');
        execList.addEventListener('itemremoved', function (e) {
            savedSims.removeSim(e.detail.itemIndex);
            addEmptyItem();
        });

        event.on('saved-sim-added', function (sim) {
            removeEmptyItem();
            execList.addItem(cordovaItemFromSim(sim));
        });

        if (sims && sims.length) {
            sims.forEach(function (sim) {
                execList.addItem(cordovaItemFromSim(sim));
            });
        } else {
            // Create a "No values saved" item
            addEmptyItem();
        }
    }
};

function cordovaItemFromSim(sim) {
    var labeledValue = new CordovaLabeledValue();
    labeledValue.label = sim.service + '.' + sim.action;
    labeledValue.value = sim.value;
    var cordovaItem = new CordovaItem();
    cordovaItem.appendChild(labeledValue);
    return cordovaItem;
}

function createEmptyItem() {
    var labeledValue = new CordovaLabeledValue();
    labeledValue.label = 'No values saved';
    labeledValue.value = '';
    var cordovaItem = new CordovaItem();
    cordovaItem.appendChild(labeledValue);
    return cordovaItem;
}

var hasEmptyItem = false;
function addEmptyItem() {
    if (hasEmptyItem) {
        return;
    }

    var execList = document.getElementById('exec-list');
    var sims = savedSims.sims;
    if (sims.length === 0) {
        execList.addItem(createEmptyItem());
    }
    hasEmptyItem = true;
}

function removeEmptyItem() {
    if (!hasEmptyItem) {
        return;
    }

    var execList = document.getElementById('exec-list');
    execList.removeItem(0);
    hasEmptyItem = false;
}