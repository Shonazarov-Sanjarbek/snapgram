import { useSelector } from "react-redux";
import profileimg from "../../images/profile.png";
import {
    useFollowMutation,
    useGetUsersQuery,
    useProfileQuery,
} from "../../redux/api/user-api";
const profileData = Array(9).fill(0);
import { User } from "../../types";
import { RootState } from "../../redux";
import { IPost } from "../../types";
import { FcLike } from "react-icons/fc";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiShareForwardLine } from "react-icons/ri";
import { useGetPostsQuery } from "../../redux/api/file-api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

interface PostType {
    _id: string;
    caption: string;
    content_alt: string;
    createdAt: string;
    content: string[];
    likes_count: number;
    comments_count: number;
    shares_count: number;
    location: string;
}

const House = () => {
    const { data: proPost } = useProfileQuery({});
    const { data: proData } = useGetPostsQuery({});
    const proPosts = proData?.posts?.map((e: PostType) => (
        <div key={e._id}>
            <div className="flex items-center gap-x-5 mt-5">
                <p>{e?.content_alt}</p>
                <p className="text-[#5C5C7B]">#{e?.location}</p>
            </div>
            <div>
                <div className=" w-[600px]">
                    <Swiper
                        pagination={{
                            type: "fraction",
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper w-[600px]">
                        {e?.content?.map((i, inx) => (
                            <SwiperSlide className=" w-[600px]" key={inx}>
                                <img
                                    className="rounded-3xl w-[600px] object-contain my-[30px]"
                                    src={i}
                                    alt=""
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="flex items-center gap-x-[30px]">
                    <p className="flex items-center gap-x-[6px]">
                        <FcLike className="text-xl " />3 mln
                    </p>
                    <p className="flex items-center gap-x-[6px]">
                        <IoChatbubbleEllipsesOutline className="text-xl text-[#877EFF]" />
                        17.2 k
                    </p>
                    <p className="flex items-center gap-x-[6px]">
                        <RiShareForwardLine className="text-xl text-[#877EFF]" />
                        32.1 k
                    </p>
                </div>
            </div>
        </div>
    ));

    const proList: IPost = proPost?.posts[4];

    const { data } = useGetUsersQuery({ limit: 8 });
    const [followUser] = useFollowMutation();
    const userState = useSelector((state: RootState) => state.auth.user);
    const handleFollow = (username: string) => followUser(username);
    const userList: JSX.Element[] = data?.map(
        (user: User): JSX.Element => (
            <div
                className="border border-[#1F1F22] rounded-[20px] py-6 px-[35px] flex flex-col items-center"
                key={user._id}>
                <img
                    className="w-[54px] h-[54px] rounded-full"
                    src={import.meta.env.VITE_APP_BASE_URL + user.photo}
                    alt="User img"
                />
                <h3 className="text-sm font-semibold text-white mb-[2px] mt-[10px] text-center overflow-hidden whitespace-nowrap text-ellipsis">
                    {user.fullName}
                </h3>
                <p className="text-[10px] font-medium text-[#7878A3] text-center mb-3">
                    Followed by jsmastery
                </p>
                {user.followers.some((item) => item._id === userState?._id) ? (
                    <button
                        onClick={() =>
                            handleFollow("unfollow/" + user.username)
                        }
                        className="hover:opacity-60 block text-xs text-neutral-700 font-semibold py-[6px] px-[18px] rounded-lg bg-[#7ebeff]">
                        Unfollow
                    </button>
                ) : (
                    <button
                        onClick={() => handleFollow("follow/" + user.username)}
                        className="hover:opacity-60 block text-xs text-white font-semibold py-[6px] px-[18px] rounded-lg bg-[#877EFF]">
                        Follow
                    </button>
                )}
            </div>
        )
    );
    return (
        <div className="flex">
            <div className="pt-[60px] px-[54px] mr-[465px]">
                <div>
                    <div className="flex items-center gap-x-[21px]">
                        {profileData.map((_, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center">
                                <div className="w-[72px] h-[72px] rounded-full">
                                    <img
                                        className="rounded-full m-[3px] border-[3px] border-[#877EFF]"
                                        src={profileimg}
                                        alt="profile"
                                    />
                                </div>
                                <p className="text-white text-xs font-semibold">
                                    My Story
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <h2 className="text-[30px] font-bold text-white py-10">
                    Home Feed
                </h2>
                <div className="text-white px-7 py-8">
                    <div>
                        <div className="flex items-center gap-x-[10px]">
                            <img
                                className="w-10 h-10 rounded-full"
                                src={
                                    import.meta.env.VITE_APP_BASE_URL +
                                    userState?.photo
                                }
                                alt="img"
                            />
                            <div>
                                <p className="text-lg font-bold">
                                    {proList?.caption}
                                </p>
                                <p className="text-sm text-[#7878A3]">
                                    {proList?.createdAt}
                                </p>
                            </div>
                        </div>
                        <div>{proPosts}</div>
                    </div>
                </div>
            </div>{" "}
            <div className="w-[465px] fixed right-0 top-0 min-h-screen bg-[#09090A] border-l border-[#1F1F22]">
                <div className="pt-12 pl-6 pr-[37px] h-[2000px]">
                    <h2 className="text-white text-2xl font-bold mb-10">
                        Top Creators
                    </h2>
                    <div className="grid grid-cols-2 gap-6">{userList}</div>
                </div>
            </div>
        </div>
    );
};

export default House;
