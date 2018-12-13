(function() {
    // initializeDB();
    // checkIndexedDB();
    if(navigator.serviceWorker) {
        navigator.serviceWorker.register('./serviceworker.js')
        .then(registration => navigator.serviceWorker.ready)
        .then(function(registration) {
            console.log('lsdjf');
            // // here we'll use a little feature detection to make sure the user has background sync available!
            if(registration.sync) {
                document.getElementById('submitForm').addEventListener('click', () => {
                    event.preventDefault();
                    saveData();
                    registration.sync.register('example-sync').then(() => { 
                        console.log('Sync registered!');
                    });
                });
            // if they don't have background sync available, we'll set up something else!
            } else {
                document.getElementById('submitForm').addEventListener('click', checkInternet);
            }
        })
        .catch(function(err) {
            console.log("??? ", err);
        });
    } else {
        document.getElementById('submitForm').addEventListener('click', checkInternet);
    }
}())

function checkIndexedDB() {
    if(navigator.onLine) {
        var newsletterDB = window.indexedDB.open('newsletterSignup');
        newsletterDB.onsuccess = function(event) {
            this.result.transaction("newsletterObjStore").objectStore("newsletterObjStore").getAll().onsuccess = function(event) {
                event.target.result.forEach(function(record) {
                    window.fetch('https://www.mocky.io/v2/5c0452da3300005100d01d1f', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers:{
                          'Content-Type': 'application/json'
                        }
                    }).then(function(rez) {
                        return rez.json();
                    }).then(function(response) {
                        db.transaction("newsletterSignup", "readwrite")
                        .objectStore("newsletterObjStore")
                        .clear();
                    }).catch(function(err) {
                        console.log('err ', err);
                    })
                });
            };
        };
    }
}

function initializeDB() {
    var newsletterDB = window.indexedDB.open('newsletterSignup');

    newsletterDB.onupgradeneeded = function(event) {
        var db = event.target.result;

        var newsletterObjStore = db.createObjectStore("newsletterObjStore", { autoIncrement: true });
        newsletterObjStore.createIndex("firstName", "firstName", { unique: false });
        newsletterObjStore.createIndex("lastName", "lastName", { unique: false });
        newsletterObjStore.createIndex("email", "email", { unique: true });
        newsletterObjStore.createIndex("dateAdded", "dateAdded", { unique: true });
    }
}

function saveData() {
    var tmpObj = {
        firstName: document.getElementById('firstname').value,
        lastName: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        dateAdded: new Date()
    };

    var myDB = window.indexedDB.open('newsletterSignup');

    myDB.onsuccess = function(event) {
      var objStore = this.result.transaction('newsletterObjStore', 'readwrite').objectStore('newsletterObjStore');
      objStore.add(tmpObj);
    }
}

function fetchData() {
    var myDB = window.indexedDB.open('newsletterSignup');

    myDB.onsuccess = function(event) {
        this.result.transaction("newsletterObjStore").objectStore("newsletterObjStore").getAll().onsuccess = function(event) {
            return event.target.result;
        };
    };
}

function checkInternet() {
    event.preventDefault();
    saveData();
    var data = fetchData();

    var postObj = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
    };
    if(navigator.onLine) {
        // send request
        fetchIt('https://www.mocky.io/v2/5c0452da3300005100d01d1f', postObj)
        .then(function(response) {
            var db = window.indexedDB.open('newsletterSignup');
            db.onsuccess = function(event) {
                db.transaction("newsletterSignup", "readwrite")
                .objectStore("newsletterObjStore")
                .clear();
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    } else {
        alert("You are offline! When your internet returns, we'll finish up your request.");
    }
}