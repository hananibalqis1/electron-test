let $ = require('jquery')
let fs = require('fs')
let filename = 'User Data'
let no = 0

$('#add-to-list').on('click', () => {
   let username = $('#Username').val()
   let password = $('#Password').val()

   fs.appendFile('User Data', username + ',' + password + '\n')

   addEntry(username, password)
})

function addEntry(username, password) {
   if(username && password) {
      no++
      let updateString = '<tr><td>'+ no + '</td><td>'+ username +'</td><td>' 
         + password +'</td></tr>'
      $('#user-table').append(updateString)
   }
}

function loadAndDisplayUser() {  
   
   if(fs.existsSync(filename)) {
      let data = fs.readFileSync(filename, 'utf8').split('\n')
      
      data.forEach((userData, index) => {
         let [ username, password ] = userData.split(',')
         addEntry(username, password)
      })
   
   } else {
      console.log("File Doesn\'t Exist. Creating new file.")
      fs.writeFile(filename, '', (err) => {
         if(err)
            console.log(err)
      })
   }
}


// (function () {
   
//    'use strict';

// var $ = document.querySelector.bind(document);

// // IndexedDB

// var db = new PouchDB('mydb-idb');

// db.info().then(function (info) {
//    $('#idb').innerHTML = '&#10004; We can use PouchDB with IndexedDB!';
// }).catch(function (err) {
//    $('#idb').innerHTML = 'Error for IndexedDB';
// });


// })();

loadAndDisplayUser()