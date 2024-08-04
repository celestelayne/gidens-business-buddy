import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn
        initialValues={{
          emailAddress: "john.doe@example.com"
        }} 
        appearance={{
          elements: { formButtonPrimary: "bg-blue-700" },
        }}
      />
    </div>
  )
}