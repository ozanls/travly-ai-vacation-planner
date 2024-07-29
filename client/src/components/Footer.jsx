

export default function Footer() {
    return(
        <footer className="footer">
            <p className="footer__disclaimer">Please note that our travel recommendations are AI-generated and may contain inaccuracies; always verify details before planning your trip.</p>
            <p className="footer__copyright-notice">© Ozan Sereflioglu 2024 - All rights reserved</p>
            <ul className="footer__social-links">
                <li>
                    <a href="https://github.com/ozanls" target="_blank" rel="noreferrer">                    
                        <img className="footer__social-links__icon" src='./github.svg' ></img>
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/ozanlago/" target="_blank" rel="noreferrer">                    
                        <img className="footer__social-links__icon" src='./linkedin.svg' ></img>
                    </a>
                </li>
                <li>
                    <a href="https://x.com/ozanls" target="_blank" rel="noreferrer">                    
                        <img className="footer__social-links__icon" src='./x.svg' ></img>
                    </a>
                </li>
            </ul>
        </footer>
    )
}