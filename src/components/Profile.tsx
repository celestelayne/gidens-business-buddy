import {useClerk} from '@clerk/nextjs'

const Profile = () => {

    const { user } = useClerk();
    // console.log('user details here _____', user)

    return(
        <>Welcome, {user?.firstName}</>
    )
}

export default Profile;