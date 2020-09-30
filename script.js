const modal=document.getElementById('modal');
const addBookmark=document.getElementById("show-modal");
const closeModal=document.getElementById('close-modal');
const bookmarkForm=document.getElementById("bookmark-form");
const bookmarksContainer=document.getElementById('bookmarks-container');
const websiteNameEl=document.getElementById('website-name');
const websiteUrlEl=document.getElementById('website-url');
const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
const regex = new RegExp(expression);
let bookmarks={};
let items=[];
websiteUrlEl.addEventListener('input',function(event){
    websiteUrlEl.value=event.target.value.replace(/\s/g, '');
})
function deleteBookmarks(index){
    items[index].remove();
    bookmarks.splice(index,1);
    items.splice(index,1);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    // if(bookmarks.length>=1 || (bookmarks.length===1 && bookmarks[0].websiteName!=='Google'))
    fetchBookmarks();
}
function buildBookmarks(){
    bookmarksContainer.textContent='';
    if(bookmarks.length){
    bookmarks.forEach(function(website,index){
        const {websiteName,websiteUrl}=website;
        const item=document.createElement('div');
        const name=document.createElement('div');
        const deleteBookmark=document.createElement('i');
        const img=document.createElement('img');
        const a=document.createElement('a');
    
        a.setAttribute('target','_blank');
        a.setAttribute('href',websiteUrl);
        a.textContent=websiteName;
        
        img.setAttribute('src',`http://s2.googleusercontent.com/s2/favicons?domain=${websiteUrl}`);
        img.setAttribute('alt',"Favicon");
        
        deleteBookmark.addEventListener('click',deleteBookmarks.bind(this,index));
        deleteBookmark.setAttribute('title','Delete Bookmark');
        deleteBookmark.classList.add('fas','fa-times');
        deleteBookmark.id="delete-bookmark";
        
        item.classList.add('item');
        
        name.append(img,a);
        item.append(deleteBookmark,name);
        bookmarksContainer.append(item);
        items.push(item);
    })
}
}
function fetchBookmarks(){
    bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    // if(bookmarks.length){
    //     console.log(bookmarks.length)
    // }else{
    //     bookmarks=[
    //         {
    //             websiteName:'Google',
    //             websiteUrl:'https://google.com'
    //         }
    //     ];
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    // }   
    buildBookmarks();
}
function modalClose(){
    setTimeout(function(){
        modal.style.display="none";
    },400);
    modal.classList.add("close-modal");
}
function storeBookmarks(event){
    event.preventDefault();
    const websiteName=event.srcElement[0].value;
    let websiteUrl=event.srcElement[1].value;
    if(!websiteUrl.includes('http://','https://')){
         websiteUrl=`https://${websiteUrl}`;
    }
    if(!websiteUrl.match(regex)){
        alert("Please ,Enter a valid url");
        return false;
    }else{
        bookmarks.push({websiteName,websiteUrl});
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
        location.reload();
        websiteNameEl.focus();
    }
}
modal.addEventListener('click',function(event){
    if(this===event.target)
        modalClose();
});
closeModal.addEventListener('click',modalClose);
addBookmark.addEventListener('click',function(){
    modal.classList.remove("close-modal");
    modal.style.display="flex";
    websiteNameEl.focus();
});
bookmarkForm.addEventListener('submit',storeBookmarks);
fetchBookmarks();
