"use client";

import { useSession, useUser } from "@clerk/nextjs";
import { UserProfile } from "@clerk/nextjs";
import Image from "next/image";

const DotIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
        >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
        </svg>
    )
}

function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

const CustomPage = () => {
    const { user } = useUser();
    const { session } = useSession();

    if (!user || !session) return null;

    return (
        <>
            <div className="p-16 rounded-lg border border-[#EDEDED] bg-[#F1F1F2] background relative">
                <div className="flex flex-col items-center gap-2 mb-6">
                    <div className="w-full relative flex justify-center">
                        <Image
                            width={80}
                            height={80}
                            className="size-20 rounded-full"
                            src={user.imageUrl}
                            alt="avatar"
                        />
                    </div>
                    {user.firstName && user.lastName ? (
                    <h1 className="text-[1.0625rem] font-semibold relative w-full text-center">
                        {user.firstName} {user.lastName}
                    </h1>
                    ) : (
                    <div className="h-4" />
                    )}
                </div>
                <div className="px-2.5 bg-[#FAFAFB] rounded-lg divide-y divide-[#EEEEF0]">
                    <div className="h-[2.125rem] grid grid-cols-2 items-center relative">
                        <span className="text-xs font-semibold block flex-shrink-0">Email</span>
                        <span className="text-xs text-[#7D7D7E] font-mono block relative">
                            <span className="block truncate w-full">{user.emailAddresses[0].emailAddress}</span>
                        </span>
                    </div>
                    <div className="h-[2.125rem] grid grid-cols-2 items-center relative">
                        <span className="text-xs font-semibold block flex-shrink-0">Last signed in</span>
                        <span className="text-xs text-[#7D7D7E] font-mono block relative">
                            <span className="block truncate w-full">{formatDate(user.lastSignInAt!)}</span>
                        </span>
                    </div>
                    <div className="h-[2.125rem] grid grid-cols-2 items-center relative">
                        <span className="text-xs font-semibold block flex-shrink-0">Joined on</span>
                        <span className="text-xs text-[#7D7D7E] font-mono block relative">
                            <span className="block truncate w-full">{formatDate(user.createdAt!)}</span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

const UserProfilePage = () => (
    <UserProfile path="/user-profile" routing="path">
        <UserProfile.Page
            label="Custom Page"
            labelIcon={<DotIcon />}
            url="custom-page"
        >
            <CustomPage />
        </UserProfile.Page>
        <UserProfile.Page label="security" />
    </UserProfile>
);

export default UserProfilePage;