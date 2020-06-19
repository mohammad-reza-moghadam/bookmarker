// Listen for form Submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    // get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)) {
        return false;
    }

    let bookmark = {
        name: siteName,
        url: siteUrl
    }

    // test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null) {
        // init array
        let bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        // set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from localstorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);
        // reset back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }   

    // clear=form
    document.getElementById('myForm').reset();


    // re-fetch bookmarks
    fetchbookmarks()

    // Prevent form from submitting
    e.preventDefault()
}


// Delete bookmark
function deleteBookmark(url){
    // get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks
    for(let i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // remove from array
            bookmarks.splice(i, 1);
        }
    }
    // reset back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // re-fetch bookmarks
    fetchbookmarks()
}


// fetch bookmarks
function fetchbookmarks(){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // get output id
    let bookmarkResults = document.getElementById('bookmarksResults');
    // build output
    bookmarkResults.innerHTML = '';
    for(let i = 0; i < bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarkResults.innerHTML += `
            <div class="card bg-light text-dark card-body">
                <h3>${name}</h3>
                <a class="btn btn-primary m-1" terget="_blank" href="${url}">Visit</a>
                <a onclick="deleteBookmark('${url}')" class="btn btn-danger m-1" href="#">Delete</a>
            </div>
        `
    }
}

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}