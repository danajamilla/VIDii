function showNextItem(itemId) {
    const currentItem = document.getElementById(itemId);
    const nextItem = currentItem.nextElementSibling;
 
    if (nextItem) {
       currentItem.style.display = "none";
       nextItem.style.display = "block";
    }
 }
 