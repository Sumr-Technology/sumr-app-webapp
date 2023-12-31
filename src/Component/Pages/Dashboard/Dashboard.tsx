import { useEffect, useState } from "react";
import { apiGETCall } from "../../../Helpers/Service";
import SumrFeedCard from "./SumrFeedCard";
import { Sumr } from "../../../Types/Sumrs";
import FilterSidebar from "../../Layout/Sidebar/FilterSidebar";
import { auth } from "../../../Helpers/Firebase";
import { useUser } from "../../../Layout/DefaultLayout";
import InfiniteScroll from "react-infinite-scroller";

const availableCategories = [
  "Fintech",
  "Funding",
  "AI",
  "M&A",
  "Startups",
  "Cybersecurity",
  "Robotics",
  "Crypto",
  "Transportation",
  "Consumer",
  "Regulations",
];

const Dashboard = () => {
  const [sumrs, setSumrs] = useState<Sumr[]>([]);

  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      let url = "/api/sumrs/latest";
      if (categories.length > 0) {
        url = url + `?filter=${JSON.stringify(categories)}`;
      } else if (user.interestList.length > 0) {
        url = url + `?filter=${JSON.stringify(user.interestList)}`;
      }
      apiGETCall(url).then((r: Sumr[]) => {
        if (categories.length > 0) {
          url = url + `?filter=${JSON.stringify(categories)}`;
        } else if (user.interestList.length > 0) {
          url = url + `?filter=${JSON.stringify(user.interestList)}`;
        }
        setSumrs(r);
        setPage(1);
      });
    }
  }, [categories, auth, user]);

  function resetFeed(category: string) {
    setPage(0);
    setSumrs([]);
    setTimeout(() => {
      setCategories([...categories, category]);
    }, 200);
  }

  function fetchMore() {
    if (user && page > 0) {
      let url = "/api/sumrs/latest";
      if (categories.length > 0) {
        url = url + `?filter=${JSON.stringify(categories)}`;
      } else if (user.interestList.length > 0) {
        url = url + `?filter=${JSON.stringify(user.interestList)}`;
      }
      url = url + `&page=${page}`;
      apiGETCall(url).then((r: Sumr[]) => {
        setSumrs([...sumrs, ...r]);
        setPage(page + 1);
      });
    }
  }

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
          resetFeed(category);
        }}
        categories={availableCategories}
      />

      {categories?.length > 0 && (
        <div className="sticky flex gap-1 px-10 flex-wrap bg-primaryDark py-4 top-20 ">
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
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            fetchMore();
          }}
          hasMore={true}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {sumrs?.length > 0 &&
            sumrs?.map((sm, i) => {
              return <SumrFeedCard user={user} key={i} data={sm} />;
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Dashboard;
