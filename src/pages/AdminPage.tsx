import { useAuth } from "../contexts/authContext";
import LoginForm from "../components/admin/LoginForm";
import BookList from "../components/admin/BookList";

export default function AdminPage() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <BookList /> : <LoginForm />;
}
