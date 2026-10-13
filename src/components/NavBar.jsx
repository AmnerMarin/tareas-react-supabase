import { Link } from "react-router-dom";
import { supabaseClient } from "../supabase/client";

function NavBar() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Supabase React</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ms-auto">
                        <a
                            className="nav-link"
                            href="#!"
                            onClick={async () => await supabaseClient.auth.signOut()}
                        >
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;