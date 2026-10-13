import { useState } from "react";
import { supabaseClient } from "../supabase/client";

function Login() {

    const [email, setEmail] = useState('');

    const handleEnviar = async (e) => {
        e.preventDefault();

        const { error } = await supabaseClient.auth.signInWithOtp({
            email: email
        });

        if (error) {
            console.log(error);
        } else {
            console.log("Te hemos enviado un correo electrónico con un enlace para iniciar sesión");
        }

    }

    return (
        <div className="row pt-4 justify-content-center">
            <div className="col-md-4">
                <form onSubmit={handleEnviar} className="card card-body">
                    <input
                        type="email"
                        name="email"
                        placeholder="youremail@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control mb-2"
                    />
                    <button className="btn btn-primary w-100">
                        Send
                    </button>
                </form>
            </div>
        </div>

    );
}

export default Login;