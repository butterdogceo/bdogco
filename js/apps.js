const link = window.location.href;
if (!link.includes("https://b-dog.co")) {
    var things = document.querySelectorAll("a");
    things.forEach(obj => {
        if (obj.parentElement.className = "card") {
            if (obj.getAttribute('data-alt-link')) {
                obj.href = obj.getAttribute('data-alt-link');
                obj.title = "Click to open alternate link";
            }
        }
    });
}