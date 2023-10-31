import Sidebar from "../Component/Layout/Sidebar/Sidebar";
import Header from "../Component/Layout/Header/Header";
import {
  Navigate,
  Outlet,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { auth } from "../Helpers/Firebase";
import { getCurrentUser } from "../Helpers/FireStore";
import { useState } from "react";
import ChooseInterestModal from "../Component/Pages/ChooseInterestModal";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "../Types/User";

type ContextType = { user: User | null; refetchCurrentUser: () => void };

function DefaultLayout() {
  const token: any = localStorage.getItem("token");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (_user) => {
    if (_user) {
      if (!user) {
        getCurrentUser(_user.uid).then((u) => {
          setUser(u as User);
        });
      }
      // ...
    } else {
      navigate("/login");
      localStorage.clear();
    }
  });

  const refetchCurrentUser = () => {
    getCurrentUser(user?.uid ?? "").then((u) => {
      setUser(u as User);
    });
  };

  return (
    <>
      {user?.interestList?.length === 0 && (
        <ChooseInterestModal userId={user.uid} />
      )}
      {token ? (
        <>
          <Header />
          <Sidebar />
          <div
          // mdsm:ml-96 mdsm:mr-96
            className="p-4 bg-primaryDark lg2:ml-96 lg2:mr-96 lg1:ml-64 lg1:mr-64 mdsm:ml-56 mdsm:mr-56"
            style={{ marginTop: "120px" }}
          >
            <Outlet
              context={{ user, refetchCurrentUser } satisfies ContextType}
            />
          </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}

export default DefaultLayout;
