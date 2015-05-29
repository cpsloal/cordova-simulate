var Events = (function () {
    function init() {
        var eventList = document.getElementById('event-list');
        var events = ['deviceready', 'backbutton', 'menubutton', 'pause', 'resume', 'searchbutton', 'online', 'offline'];

        events.forEach(function (event) {
            var option = document.createElement('option');
            option.value = event;

            var caption = document.createTextNode(event);
            option.appendChild(caption);

            eventList.appendChild(option);
        });
    }
    init();

    var messages = new Messages('events');
    function fireEvent() {
        var eventList = document.getElementById('event-list');
        var option = eventList.options[eventList.selectedIndex];
        console.log('fireEvent: ' + option.value);
        messages.emit('event', option.value, function (result, err) {
            if (err) {
                window.alert('Firing event failed: ' + err);
            } else {
                window.alert('Fired event: ' + result);
            }
        });
    }

    return {
        fireEvent: fireEvent
    };
})();
