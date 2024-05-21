import { useUser } from '@clerk/nextjs'

import Image from 'next/image'
import Link from 'next/link'

const Profile = () => {
    const { isLoaded, isSignedIn, user } = useUser()
    if (!isLoaded || !isSignedIn) {
      return null
    }

    console.log(user)

    return (
        <div className="flex flex-col">
            <div className="mx-4">
                <Image
                    src={user.imageUrl}
                    priority
                    width={200}
                    height={200}
                    alt={user.fullName}
                    className="rounded-full"
                />
            </div>
            <div className="ml-4">
                <div className="inline-block w-full overflow-hidden rounded-lg shadow-md">
                <table className="w-full leading-normal">
                    <tbody>
                        {/* Firstname */}
                        <tr>
                            <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                            First Name
                            </td>
                            <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                            {user.firstName}
                            </td>
                        </tr>
                        {/* Last Name */}
                        <tr>
                            <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                            Last Name
                            </td>
                            <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                            {user.lastName}
                            </td>
                        </tr>
                        {/* Emails */}
                        <tr>
                            <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                            Emails
                            </td>
                            <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                            {user.emailAddresses.map((email) => (
                                <div key={email.emailAddress}>{email.emailAddress}, </div>
                            ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
            <div className="flex justify-center">
                <Link href={'/additional'}>
                    <button className="mt-4 bg-purple-600 px-4 py-2 font-bold text-white transition-all hover:bg-purple-800">
                        Update Additional Information
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Profile;