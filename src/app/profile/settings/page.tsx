import ProfileForm from "@/app/_components/ProfileForm/ProfileForm"
import PasswordForm from "@/app/_components/PasswordForm/PasswordForm"
import { getMyToken } from "@/utilities/getMyToken"
import { jwtDecode } from "jwt-decode"
import { User } from "@/types/product.types"

export default async function Settings() {

  const token = await getMyToken()
  if (!token) {
    return null
  }
  const decodedToken = jwtDecode<User>(token)
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your profile information and change your password
        </p>
      </div>

      <ProfileForm user={decodedToken} />
      <PasswordForm />
    </div>
  )
}