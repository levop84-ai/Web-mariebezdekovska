(function () {
    const panel = document.getElementById('cookie-panel');
    if (!panel || localStorage.getItem('cookie-consent')) return;

    panel.classList.add('visible');

    function dismiss(value) {
        localStorage.setItem('cookie-consent', value);
        panel.classList.remove('visible');
    }

    document.getElementById('cookie-btn-accept').addEventListener('click', function () { dismiss('accepted'); });
    document.getElementById('cookie-btn-decline').addEventListener('click', function () { dismiss('declined'); });
}());
