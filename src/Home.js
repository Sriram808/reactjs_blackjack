import { Link } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Home = () => {
    const { initial } = useContext(DataContext);
    return (
        <header className="home">
            <h1>Black</h1>
            <h1>Jack</h1>
            <Link to={"/play"}>
                <button
                    type="submit"
                    onClick={initial}
                >Play</button>
            </Link>
        </header>
    );
};

export default Home;