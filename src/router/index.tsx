import { lazy, LazyExoticComponent } from "react";
import { useRoutes } from "react-router-dom";
import { SuspenseComponent as Suspense } from "../utils";

const Settings: LazyExoticComponent<any> = lazy(
    () => import("../components/settings/Settings")
);

const House: LazyExoticComponent<any> = lazy(
    () => import("../components/house/House")
);

const Create: LazyExoticComponent<any> = lazy(
    () => import("../components/create/Create")
);

const People: LazyExoticComponent<any> = lazy(
    () => import("../components/people/People")
);

const Chats: LazyExoticComponent<any> = lazy(
    () => import("../components/chats/Chats")
);

const Reels: LazyExoticComponent<any> = lazy(
    () => import("../components/reels/Reels")
);

const Saved: LazyExoticComponent<any> = lazy(
    () => import("../components/saved/Saved")
);

const Explore: LazyExoticComponent<any> = lazy(
    () => import("../components/explore/Explore")
);

const Layout: LazyExoticComponent<any> = lazy(
    () => import("../pages/layout/Layout")
);

const Auth: LazyExoticComponent<any> = lazy(() => import("../pages/Auths"));

const Login: LazyExoticComponent<any> = lazy(
    () => import("../components/login/Auth")
);

const Home: LazyExoticComponent<any> = lazy(() => import("../pages/home/Home"));

const Routers = () => {
    return useRoutes([
        {
            path: "/",
            element: (
                <Suspense>
                    <Layout />
                </Suspense>
            ),
            children: [
                {
                    path: "/login",
                    element: (
                        <Suspense>
                            <Login />
                        </Suspense>
                    ),
                },
                {
                    path: "/",
                    element: (
                        <Suspense>
                            <Auth />
                        </Suspense>
                    ),
                    children: [
                        {
                            path: "",
                            element: (
                                <Suspense>
                                    <Home />
                                </Suspense>
                            ),
                            children: [
                                {
                                    path: "",
                                    element: (
                                        <Suspense>
                                            <House />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/explore",
                                    element: (
                                        <Suspense>
                                            <Explore />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/people",
                                    element: (
                                        <Suspense>
                                            <People />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/saved",
                                    element: (
                                        <Suspense>
                                            <Saved />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/reels",
                                    element: (
                                        <Suspense>
                                            <Reels />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/people",
                                    element: (
                                        <Suspense>
                                            <People />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/chats",
                                    element: (
                                        <Suspense>
                                            <Chats />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/create",
                                    element: (
                                        <Suspense>
                                            <Create />
                                        </Suspense>
                                    ),
                                },
                                {
                                    path: "/settings",
                                    element: (
                                        <Suspense>
                                            <Settings />
                                        </Suspense>
                                    ),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            path: "*",
            element: (
                <Suspense>
                    <h2>404</h2>
                </Suspense>
            ),
        },
    ]);
};

export default Routers;
