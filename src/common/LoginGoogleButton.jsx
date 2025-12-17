import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";

export default function LoginGoogleButton() {
  const {loginWithGoogle} = useAuth();
  return (
    <GoogleLogin
      onSuccess={async (cred) => {
        console.log("Google ID Token:", cred.credential);

        await loginWithGoogle(cred.credential);
        console.log("BE trả về: ", res.data);
      }}
      onError={() => console.log("Login failed")}
    />
  );
}
