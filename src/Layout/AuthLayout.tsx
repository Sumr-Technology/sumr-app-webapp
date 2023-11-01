import Landing from "../Component/Layout/Landing/Landing";

const AuthLayout = () => {
  const token: any = localStorage.getItem("token");

  return (
    <>
      {" "}
      <Landing />
    </>
  );
};

export default AuthLayout;
