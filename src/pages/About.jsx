import { Link } from 'react-router-dom';

export const About = () => {

    return (
        <div>
            <h1>About</h1>
            <Link to="/">Accueil</Link> | <Link to="/about">À propos</Link>
        </div>
    )
}

export default About;