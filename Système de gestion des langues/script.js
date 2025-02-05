document.addEventListener('DOMContentLoaded', function () {

    function switchlang() {
        fetch('content.json')
            .then(response => response.json())
            .then(data => {
                const elements = Object.keys(data[lang]);
                elements.forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.textContent = data[lang][id][0];
                    }
                });
            })
            .catch(error => console.error("Gros flop en chargeant le contenu de content.json :", error));
    }

    let lang = localStorage.getItem('selectedLang') || 'fr';

    switchlang();

    document.getElementById('langswitch').addEventListener('click', function () {
        if (lang == 'fr') {
            lang = 'eng';
        } else {
            lang = 'fr';
        }
        localStorage.setItem('selectedLang', lang);
        switchlang();
    });
});