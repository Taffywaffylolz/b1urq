import { useState, useEffect } from "react";

export default function Discord() {
    const [user, setUser] = useState({
        id: "",
        username: "",
        avatar: "",
        public_flags: 0,
    });
    const [userStatus, setUserStatus] = useState("1242127179655942195");
    const [badges, setBadges] = useState({
        badge_HYPESQUAD_ONLINE_HOUSE_1: false,
        badge_HYPESQUAD_ONLINE_HOUSE_2: false,
        badge_HYPESQUAD_ONLINE_HOUSE_3: false,
        badge_ACTIVE_DEVELOPER: false,
        badge_DISCORD_EMPLOYEE: false,
        badge_PARTNERED_SERVER_OWNER: false,
        badge_NITRO: false,
        badge_SERVER_BOOST: false,
    });
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://api.lanyard.rest/v1/users/1297957381724176437");
            const data = await response.json();
            const userData = data.data.discord_user;
            const statusData = data.data.discord_status;
            let activitiesData = data.data.activities;

            setUser(userData);

            switch (statusData) {
                case "dnd":
                    setUserStatus("1242127177147744327");
                    break;
                case "offline":
                    setUserStatus("1242127179655942195");
                    break;
                case "online":
                    setUserStatus("1242127175902171136");
                    break;
                case "idle":
                    setUserStatus("1242127178309566547");
                    break;
                default:
                    setUserStatus("1242127179655942195");
                    break;
            }

            const flags = userData.public_flags || 0;
            const badges = {
                badge_HYPESQUAD_ONLINE_HOUSE_1: (flags & 64) === 64,
                badge_HYPESQUAD_ONLINE_HOUSE_2: (flags & 128) === 128,
                badge_HYPESQUAD_ONLINE_HOUSE_3: (flags & 256) === 256,
                badge_ACTIVE_DEVELOPER: (flags & 4194304) === 4194304,
                badge_DISCORD_EMPLOYEE: (flags & 8) === 8,
                badge_PARTNERED_SERVER_OWNER: (flags & 16) === 16,
                badge_NITRO: (flags & 16384) === 16384,
                badge_SERVER_BOOST: (flags & 2) === 2,
            };
            setBadges(badges);

            activitiesData = activitiesData.filter((activity) => activity.name !== "Spotify");
            const customActivities = activitiesData.map((activity) => {
                const currentTime = Date.now();
                const elapsedTimeMs = currentTime - activity.timestamps.start;
                const formattedElapsedTime = `${Math.floor(elapsedTimeMs / (1000 * 60 * 60)) % 24}:${Math.floor(elapsedTimeMs / (1000 * 60)) % 60}:${Math.floor(elapsedTimeMs / 1000) % 60}`;

                const formattedImageUrlLarge = activity.assets.large_image.startsWith("https") ? activity.assets.large_image : `https://${activity.assets.large_image.split("/").slice(2).join("/")}`;
                const formattedImageUrlSmall = activity.assets.small_image ? `https://${activity.assets.small_image.split("/").slice(2).join("/")}` : "";

                return {
                    ...activity,
                    formattedElapsedTime,
                    formattedImageUrlLarge,
                    formattedImageUrlSmall,
                };
            });

            setActivities(customActivities);
        };

        fetchData();
        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    return (
        <div className="border-2 border-[#101010] bg-[#090909] p-4 rounded-lg shadow-lg">
            <div className="flex items-start gap-4">
                <div>
                    <div className="relative">
                        <img
                            draggable="false"
                            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=4096`}
                            alt={`Avatar of ${user.username}`}
                            className="rounded-full shadow-lg h-20 w-20"
                        />
                        <img
                            draggable="false"
                            src={`https://cdn.discordapp.com/emojis/${userStatus}.webp?size=96&quality=lossless`}
                            alt="User status emoji"
                            className="absolute bottom-0 left-14 transform translate-y-1/4 w-6 h-6 border-4 border-[#090909] bg-[#090909] rounded-full"
                        />
                    </div>
                </div>
                <div>
                    <p className="text-white font-medium text-2xl" id="userName">{user.username}</p>
                    <div className="flex items-center bg-[#101010] rounded-lg shadow-lg px-1 py-0.5 mt-2">
                        {badges.badge_HYPESQUAD_ONLINE_HOUSE_1 && (
                            <img
                                draggable="false"
                                src="https://raw.githubusercontent.com/mezotv/discord-badges/1d46c1feb168386ee2771d61397cf6b1eb4dde8f/assets/hypesquadbravery.svg"
                                alt="HypeSquad Bravery badge"
                                className="h-7 w-7"
                            />
                        )}
                        {badges.badge_HYPESQUAD_ONLINE_HOUSE_2 && (
                            <img
                                draggable="false"
                                src="https://raw.githubusercontent.com/mezotv/discord-badges/1d46c1feb168386ee2771d61397cf6b1eb4dde8f/assets/hypesquadbrilliance.svg"
                                alt="HypeSquad Brilliance badge"
                                className="h-7 w-7"
                            />
                        )}
                        {badges.badge_HYPESQUAD_ONLINE_HOUSE_3 && (
                            <img
                                draggable="false"
                                src="https://raw.githubusercontent.com/mezotv/discord-badges/1d46c1feb168386ee2771d61397cf6b1eb4dde8f/assets/hypesquadbalance.svg"
                                alt="HypeSquad Balance badge"
                                className="h-7 w-7"
                            />
                        )}
                        {badges.badge_ACTIVE_DEVELOPER && (
                            <img
                                draggable="false"
                                src="https://raw.githubusercontent.com/mezotv/discord-badges/1d46c1feb168386ee2771d61397cf6b1eb4dde8f/assets/activedeveloper.svg"
                                alt="Active Developer badge"
                                className="h-7 w-7"
                            />
                        )}
                        {badges.badge_DISCORD_EMPLOYEE && (
                            <img
                                draggable="false"
                                src="https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/staff.svg"
                                alt="Discord Employee badge"
                                className="h-7 w-7"
                            />
                        )}
                        {badges.badge_PARTNERED_SERVER_OWNER && (
                            <img
                                draggable="false"
                                src="https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/partner.svg"
                                alt="Partnered Server Owner badge"
                                className="h-7 w-7"
                            />
                        )}
                        {badges.badge_NITRO && (
                            <img
                                draggable="false"
                                src="https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/nitro.svg"
                                alt="Discord Nitro badge"
                                className="h-7 w-7"
                            />
                        )}
                        {badges.badge_SERVER_BOOST && (
                            <img
                                draggable="false"
                                src="https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/serverboost.svg"
                                alt="Server Boost badge"
                                className="h-7 w-7"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="bg-[#101010] rounded-lg shadow-lg p-4 mt-4">
                <div className="space-y-4">
                    {activities.length === 0 && (
                        <p className="text-gray-400 text-sm">Not Playing Anything...</p>
                    )}
                    {activities.map((activity, index) => (
                        <div key={index}>
                            <p className="text-white text-sm font-medium mb-1 uppercase">Playing A Game</p>
                            <div className="flex items-start gap-4">
                                <div>
                                    <div className="relative">
                                        <img
                                            draggable="false"
                                            src={activity.formattedImageUrlLarge}
                                            alt={`Cover art for ${activity.name}`}
                                            className="rounded-lg shadow-lg h-16 w-16"
                                        />
                                        {activity.assets.small_image && (
                                            <img
                                                draggable="false"
                                                src={activity.formattedImageUrlSmall}
                                                alt={`Small icon for ${activity.name}`}
                                                className="absolute bottom-0 left-11 transform translate-y-1/4 w-8 h-8 border-4 border-[#101010] bg-[#101010] rounded-full"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-white font-medium">{activity.name ? activity.name : ""}</p>
                                    <p className="text-gray-400 text-sm">{activity.state ? activity.state : ""}</p>
                                    <p className="text-gray-400 text-sm">{activity.details ? activity.details : ""}</p>
                                    {activity.timestamps.hasOwnProperty("start") && (
                                        <p className="text-gray-400 text-sm">{activity.formattedElapsedTime} elapsed</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
