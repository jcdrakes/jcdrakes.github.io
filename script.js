document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.clickable-link');
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const clickedLink = event.target.closest('a');          //console log message 
            
            if (clickedLink) {
                console.log(`Link clicked: ${clickedLink.getAttribute('href')}`);
            }
        });
    });
});