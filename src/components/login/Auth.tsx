import { useState, useEffect } from "react";
import logbg from "../../images/logbg.png";
import logoimg from "../../images/logo.svg";
import LogIn from "./LogIn";
import SignIn from "./SignIn";
import {
    useRegisterUserMutation,
    useSignInMutation,
} from "../../redux/api/user-api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux";
import { setToken, setUser } from "../../redux/slice/auth-slice";

const Auth = () => {
    const [action, setAction] = useState<string>("Log in");
    const [users, { isSuccess }] = useRegisterUserMutation();
    const [user, { isSuccess: isUserSuccess }] = useSignInMutation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const handleSendMessage = async (e: any) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let data = Object.fromEntries(formData.entries());
        user(data)
            .unwrap()
            .then((res: { accessToken: string; user: any }) => {
                dispatch(setToken(res.accessToken));
                dispatch(setUser(res.user));
                navigate("/");
            });
    };

    const handleSendLog = (e: any) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let data = Object.fromEntries(formData.entries());
        users(data)
            .unwrap()
            .then((res: { accessToken: string; user: any }) => {
                dispatch(setToken(res.accessToken));
                dispatch(setUser(res.user));
                navigate("/");
            });
    };

    useEffect(() => {
        if (isSuccess) {
            setAction("Log In");
        }
        if (isUserSuccess) {
            navigate("/");
        }
    }, [isSuccess, isUserSuccess, navigate]);

    return (
        <section className="bg-black">
            <div>
                <div className="flex">
                    <div className="w-1/2 flex items-center justify-center">
                        <div>
                            {action !== "Sign In" && (
                                <img
                                    className="block mx-auto mb-[68px]"
                                    src={logoimg}
                                    alt="logo"
                                />
                            )}
                            <h2 className="text-white text-3xl font-bold leading-10 mb-3 text-center">
                                {action === "Sign In"
                                    ? "Create a new account"
                                    : "Log in to your account"}
                            </h2>
                            <p className="text-[#7878A3] leading-5 mb-8 text-center">
                                {action === "Sign In"
                                    ? " To use snapgram, Please enter your details."
                                    : "Welcome back! Please enter your details."}
                            </p>
                            {action === "Sign In" ? (
                                <LogIn
                                    action={action}
                                    setAction={setAction}
                                    handleSendLog={handleSendLog}
                                />
                            ) : (
                                <SignIn
                                    action={action}
                                    setAction={setAction}
                                    handleSendMessage={handleSendMessage}
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-1/2 max-h-[100vh]">
                        <img
                            className="object-cover w-full h-full"
                            src={logbg}
                            alt="Log bg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Auth;
