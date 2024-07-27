export default function Nav(){

    const redirectGithub = () => { 
        window.open(`https://github.com/ozanls/travly-ai-vacation-planner`);
    }

    return (
        <nav>
            <h2 className="nav__logo"><a href="/">Travly</a></h2>
            <div className="nav__attribution">
                <p className="nav__attribution__text">Created by Ozan Sereflioglu</p>
                <button className="button-3" onClick={redirectGithub}>Learn More</button>
            </div>
        </nav>
    )
}