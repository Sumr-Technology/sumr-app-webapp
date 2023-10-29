import { useEffect, useState } from "react";
import { apiGETCall } from "../../../Helpers/Service";
import SumrFeedCard from "./SumrFeedCard";
import { Sumr } from "../../../Types/Sumrs";
import FilterSidebar from "../../Layout/Sidebar/FilterSidebar";
import { auth } from "../../../Helpers/Firebase";
import { useUser } from "../../../Layout/DefaultLayout";

const Dashboard = () => {
  const [sumrs, setSumrs] = useState<Sumr[]>([]);

  const [categories, setCategories] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const { user } = useUser();

  useEffect(() => {
    apiGETCall("/api/sumrs/categories").then((r: string[]) => {
      setAvailableCategories(r);
    });
  }, []);

  useEffect(() => {
    if (user) {
      let url = "/api/sumrs/latest";
      if (categories.length > 0) {
        url = url + `?filter=${JSON.stringify(categories)}`;
      } else if (user.interestList.length > 0) {
        url = url + `?filter=${JSON.stringify(user.interestList)}`;
      }
      apiGETCall(url).then((r: Sumr[]) => {
        setSumrs(r);
      });
    }
  }, [categories, auth, user]);

  function handleRemoveCategory(c: string) {
    const filteredCategories = categories.filter((sc) => sc !== c);
    setCategories(filteredCategories);
  }

  return (
    <div className="relative">
      <FilterSidebar
        selectedCategories={categories}
        onClickCategory={(category) => {
          const search = categories.find((c) => c === category);
          if (search) {
            return;
          }
          setCategories([...categories, category]);
        }}
        categories={availableCategories}
      />

      {categories?.length > 0 && (
        <div className="sticky flex gap-1 flex-wrap bg-primaryDark py-4 top-24 ">
          {categories.map((c, i) => (
            <div className="border text-white flex gap-2 border-primary rounded-lg min-w-[100px] p-2">
              <button
                onClick={() => handleRemoveCategory(c)}
                key={i}
                className="border-r-primary pr-1.5 border-r"
              >
                X
              </button>
              <span>{c}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex px-10 flex-col gap-6">
        {sumrs?.map((sm, i) => {
          return <SumrFeedCard key={i} data={sm} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
