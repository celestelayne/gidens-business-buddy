// https://react-hook-form.com/get-started
import { useForm, SubmitHandler } from "react-hook-form"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const AdditionalUpdate = () => {

    const router = useRouter()

    type Inputs = {
        firstName: string
        lastName: string
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const { isLoaded, isSignedIn, user } = useUser()

    console.log(user)

    // onSubmit function is used for saving the updated information to the server
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log('Line 30 _____', data)
        try {
            // user.update function is used for updating the values
            user.update({
                firstName: data.firstName,
                lastName: data.lastName,
            })
            router.push('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    console.log(watch("firstName"))
    console.log(watch("lastName"))

    if (!isLoaded || !isSignedIn) {
        return null
    }

    return(
        <div className="mx-10">
            <h1 className="py-4 text-2xl font-bold">Update Additional Information</h1>
            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        defaultValue={user.firstName}
                        {...register('firstName', {
                            required: true,
                        })}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    />
                    {errors.firstName && <span className="text-sm text-red-600">This field is required</span>}
                </div>
                <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        defaultValue={user.lastName}
                        {...register('lastName', {
                            required: true,
                        })}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    />
                    {errors.lastName && <span className="text-sm text-red-600">This field is required</span>}
                </div>
                <button
                    type="submit"
                    className="my-4 bg-purple-500 px-8 py-2 text-lg font-semibold text-white transition-all hover:bg-purple-700">
                    Update
                </button>
            </form>
        </div>
    )
};

export default AdditionalUpdate;