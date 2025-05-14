import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";

// Used to protect/redirect pages requiring user to be logged in
export default function withAuth<T extends object>(Component: React.FC) {
  return function ProtectedPage(props: T) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace("/home/login"); // Redirect if not logged in
      }
    }, [user, loading, router]);

    if (loading) return <p>Loading...</p>; // Optional loading state

    return <Component {...props} />;
  };
}
