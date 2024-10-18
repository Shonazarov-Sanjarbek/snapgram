import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../images/logo.svg";
import { RiHome3Line } from "react-icons/ri";
import { TbLibraryPhoto, TbLogout2 } from "react-icons/tb";
import { HiOutlineSaveAs } from "react-icons/hi";
import { TfiVideoClapper } from "react-icons/tfi";
import { BsPeople } from "react-icons/bs";
import {
    IoChatbubbleEllipsesOutline,
    IoSettingsOutline,
} from "react-icons/io5";
import { MdCreateNewFolder } from "react-icons/md";
import { useProfileQuery } from "../../redux/api/user-api";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { logout } from "../../redux/slice/auth-slice";

const Home = () => {
    const { data: prodata } = useProfileQuery({});
    const userState = useSelector((state: RootState) => state.auth.user);

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logout());
    };

    return (
        <div className="container mx-auto">
            <div className="w-[266px] fixed left-0 bg-[#09090A] top-0 min-h-screen pt-7 pb-8 px-6 border-r border-[#1F1F22]">
                <Link to={"/"}>
                    <img src={logo} alt="Logo" />
                </Link>
                <div>
                    <div className="flex items-center gap-x-[11px] py-6">
                        <img
                            className="w-[54px] h-[54px] rounded-full"
                            src={
                                import.meta.env.VITE_APP_BASE_URL +
                                userState?.photo
                            }
                            alt="User img"
                        />
                        <div>
                            <h3 className="text-lg text-white font-bold">
                                {userState?.fullName}
                            </h3>
                            <p className="text-sm text-[#7878A3]">
                                @{prodata?.username}
                            </p>
                        </div>
                    </div>
                </div>
                <ul className="flex flex-col gap-y-3 list_box mb-16">
                    <li>
                        <NavLink
                            className="px-4 py-2 w-full rounded-lg hover:bg-[#877EFF] home_nav text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/"}>
                            <RiHome3Line className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="px-4 py-2 w-full rounded-lg hover:bg-[#877EFF] home_nav text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/explore"}>
                            <TbLibraryPhoto className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Explore
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="px-4 py-2 w-full rounded-lg hover:bg-[#877EFF] home_nav text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/people"}>
                            <BsPeople className="text-2xl text-[#877EFF] link__icon" />{" "}
                            People
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="px-4 py-2 w-full rounded-lg hover:bg-[#877EFF] home_nav text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/saved"}>
                            <HiOutlineSaveAs className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Saved
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="px-4 py-2 w-full rounded-lg hover:bg-[#877EFF] home_nav text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/reels"}>
                            <TfiVideoClapper className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Reels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="px-4 py-2 w-full rounded-lg hover:bg-[#877EFF] home_nav text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/chats"}>
                            <IoChatbubbleEllipsesOutline className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Chats
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="px-4 py-2 w-full rounded-lg hover:bg-[#877EFF] home_nav text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/create"}>
                            <MdCreateNewFolder className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Create Post
                        </NavLink>
                    </li>
                </ul>
                <div className="list_box flex flex-col gap-y-2">
                    <button
                        onClick={() => handleLogOut()}
                        className="px-4 py-2 w-full rounded-lg text-lg hover:bg-neutral-300 hover:text-red-500 home_btn text-[#EFEFEF] font-medium flex items-center gap-x-4">
                        <TbLogout2 className="text-2xl text-[#877EFF] link__icon" />{" "}
                        Logout
                    </button>
                    <NavLink
                        className="px-4 py-2 w-full home_nav hover:bg-[#877EFF] rounded-lg text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                        to={"/settings"}>
                        <IoSettingsOutline className="text-2xl text-[#877EFF] link__icon" />{" "}
                        Settings
                    </NavLink>
                </div>
            </div>
            <div className="ml-[266px] mx-auto container w-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
