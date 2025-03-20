import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Navbar = ({ language, setLanguage, currentPage, setCurrentPage }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    let pagesjson = {
        fr: [
            { link: '', text: 'Accueil' },
            { link: 'booking', text: 'Réservation' },
            { link: 'about', text: 'À propos' }
        ],
        eng: [
            { link: '', text: 'Home' },
            { link: 'booking', text: 'Booking' },
            { link: 'about', text: 'About' }
        ]
    };

    function changeLanguage() {
        switch (language) {
            case "fr":
                setLanguage("eng");
                break;
            case "eng":
                setLanguage("fr");
                break;
            default:
                setLanguage("fr");
        }
    }

    function changeCurrentPage() {
        setCurrentPage(window.location.pathname.slice(1));
    }

    changeCurrentPage();
    console.log(currentPage);

    function printLinks() {
        const pages = pagesjson[language];
        return (
            <>
                {pages.map(({ link, text }) => (
                    <Link
                        key={link}
                        to={`/${link}`}
                        className={link === currentPage ? 'activePage' : ''}
                        onClick={() => setCurrentPage(link)}
                    >
                        {text}
                    </Link>
                ))}
            </>
        );
    }

    return (
        <>
            {windowWidth >= 900 ? (
                <nav className='navbarDesktop'>
                    <span>
                        {printLinks()}
                    </span>
                    <span><Link to="/"><img src="images/logo.svg" alt="Logo" /></Link></span>
                    <span>
                        <button onClick={changeLanguage}>
                            {language === 'fr' ? 'ENG' : 'FR'}
                        </button>
                    </span>
                </nav>
            ) : (
                <nav className='navbarMobile'>
                    <span><svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1H25" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M1 9H25" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M1 17H25" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg></span>
                </nav>
            )}
        </>
    );
}

export default Navbar;