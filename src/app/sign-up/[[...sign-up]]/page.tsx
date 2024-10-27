import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SignUp 
        appearance={{
          elements: { formButtonPrimary: "bg-blue-700" },
        }}
      />
    </div>
  );
}
