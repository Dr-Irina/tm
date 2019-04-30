var mongoManager = (function () {
    return {
        addElem: function (value) {
            $.post('/tasks/add', value);
        },

        getAllElems: function () {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/tasks', false);
		xhr.send();
		return JSON.parse(xhr.responseText);
        },

        getOneElem: function (key) {
		let keystr = encodeURIComponent(key.toString());
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/tasks/' + keystr, false);
	//	console.log(keystr);
            	xhr.send()
	//	console.log(JSON.parse(xhr.responseTest));
                return xhr.responseText;
        },
        
        refactorElem: function (oldKey, newKey, newValue) {
            let oldID = JSON.parse(mongoManager.getOneElem(oldKey));
            let newElem = JSON.parse(newValue);
            newElem.id = oldID.id;
            $.post('/tasks/' + encodeURIComponent(oldID.taskName) + '/edit', newElem);
        },

        completeElem: {
            complete: function (key) {
                let elem = JSON.parse(mongoManager.getOneElem(key));
                elem.taskIsComplete = "true";
                $.post('/tasks/' + encodeURIComponent(elem.taskName) + '/edit', elem);
            },
            inProgress: function (key) {
                let elem = JSON.parse(mongoManager.getOneElem(key));
                elem.taskIsComplete = "false";
                $.post('/tasks/' + encodeURIComponent(elem.taskName) + '/edit', elem);
            }
        },

        delElem: function (key) {
            let elem = JSON.parse(mongoManager.getOneElem(key));
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/tasks/delete/' + encodeURIComponent(elem.taskName), elem.taskName, false);
		xhr.send();

           // $.get('/tasks/delete/' + elem.taskName, elem.taskName);
        }

    }
})();
