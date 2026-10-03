import HomeDashboard from "../homeDashboard/HomeDashboard";
import { useAuth } from "../auth/context/AuthContext";

export default function HomePage() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <HomeDashboard
            user={{
                name: user.name,
                email: user.email,
                role: 'user',
            }}
        />
    );
}