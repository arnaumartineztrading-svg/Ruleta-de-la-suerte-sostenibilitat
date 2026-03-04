(function() {
    // Estilos del menú hamburguesa
    const menuStyles = document.createElement('style');
    menuStyles.textContent = `
        .nav-menu {
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 10000;
        }
        .hamburger-btn {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 40px;
            height: 30px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
        }
        .hamburger-btn span {
            width: 100%;
            height: 3px;
            background: #2e7d32;
            border-radius: 2px;
            display: block;
        }
        .dropdown-menu {
            display: none;
            position: absolute;
            top: 45px;
            left: 0;
            background: white;
            border: 2px solid black;
            border-radius: 8px;
            min-width: 220px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 9999;
        }
        .dropdown-menu.active {
            display: block;
        }
        .dropdown-menu a {
            display: block;
            padding: 12px 15px;
            color: #2e7d32;
            text-decoration: none;
            font-size: 14px;
            border-bottom: 1px solid black;
            transition: background-color 0.3s ease;
        }
        .dropdown-menu a:last-child {
            border-bottom: none;
        }
        .dropdown-menu a:hover {
            background-color: #e8f5e9;
        }
    `;
    document.head.appendChild(menuStyles);

    // HTML del menú
    const menuHTML = document.createElement('div');
    menuHTML.className = 'nav-menu';
    menuHTML.innerHTML = `
        <button class="hamburger-btn" onclick="toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <div class="dropdown-menu" id="dropdownMenu">
            <a href="Principal.html">PÀGINA PRINCIPAL</a>
            <a href="#" id="menu-palabras">PARAULES</a>
            <a href="#" id="menu-game">JOC (Última paraula)</a>
            <a href="#" id="menu-ruleta">RULETA</a>
            <a href="Clasificacion.html">CLASSIFICACIÓ</a>
            <a href="Normas.html">NORMES</a>
        </div>
    `;
    document.body.insertBefore(menuHTML, document.body.firstChild);

    // Funció toggleMenu
    window.toggleMenu = function() {
        const menu = document.getElementById('dropdownMenu');
        menu.classList.toggle('active');
    };

    // Tancar menú si es fa click fora
    document.addEventListener('click', function(event) {
        const menu = document.getElementById('dropdownMenu');
        const btn = document.querySelector('.hamburger-btn');
        if (menu && btn && !menu.contains(event.target) && !btn.contains(event.target)) {
            menu.classList.remove('active');
        }
    });

    // Enllaç a Palabras.html
    const menuPalabras = document.getElementById('menu-palabras');
    if (menuPalabras) {
        menuPalabras.addEventListener('click', function(event) {
            event.preventDefault();
            sessionStorage.setItem('mostrarRecordatorio', 'true');
            window.location.href = 'Palabras.html';
        });
    }

    // Enllaç a Ruleta.html
    const menuRuleta = document.getElementById('menu-ruleta');
    if (menuRuleta) {
        menuRuleta.addEventListener('click', function(event) {
            event.preventDefault();
            const equips = JSON.parse(localStorage.getItem('equips')) || [];
            if (equips.length === 0) {
                // Mostrar overlay si existeix
                const overlay = document.getElementById('overlay-recordatorio-equip');
                if (overlay) {
                    overlay.classList.add('actiu') || (overlay.style.display = 'flex');
                } else {
                    alert('Has d\'afegir almenys 1 equip abans de poder jugar a la ruleta.');
                }
                return;
            }
            sessionStorage.setItem('mostrarRecordatorioRuleta', 'true');
            window.location.href = 'Ruleta.html';
        });
    }

    // Enllaç a Game.html
    const menuGame = document.getElementById('menu-game');
    if (menuGame) {
        menuGame.addEventListener('click', function(event) {
            event.preventDefault();
            // Si existeix la variable currentPlayer en el scope global (estem a Ruleta.html)
            if (typeof currentPlayer !== 'undefined') {
                sessionStorage.setItem('equipSeleccionat', currentPlayer.toString());
            }
            window.location.href = 'Game.html';
        });
    }
})();
