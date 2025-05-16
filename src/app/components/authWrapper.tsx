/*
  authWrapper component
  Used to protect/redirect pages requiring user to be logged in.
*/

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";

export default function withAuth<T extends object>(Component: React.FC) {
  return function ProtectedPage(props: T) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace("/home/login");
      }
    }, [user, loading, router]);

    if (loading) return <p>Loading...</p>;

    return <Component {...props} />;
  };
}
