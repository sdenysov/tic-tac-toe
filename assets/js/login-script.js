var submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', function (event) {
    var form = document.getElementById('login-form');
    var sizeSelect = form.size;
    var initConfig = {
        player1: form.player1.value,
        player2: form.player2.value,
        size: sizeSelect.options[sizeSelect.selectedIndex].value
    };
    localStorage.setItem('initConfig', JSON.stringify(initConfig));
    window.location = siteMap.mainPage;
    event.preventDefault();
});