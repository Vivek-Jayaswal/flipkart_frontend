import { useQuery } from "@tanstack/react-query";
import { queryGetAllProduct } from "../../../services/query/home";
export const Home = () => {
  const { data } = useQuery(queryGetAllProduct());

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.data?.map((d, i) => {
        return (
          <div key={i} className="bg-[#FFFFFF] p-4">
            <div className="bg-[#F5F5F5] p-4 rounded-lg">
              <img src={d.imageURL} alt="" className="w-full h-60" />
            </div>
            <div className="pt-2 space-y-1">
              <h1 className="font-bold">{d.name}</h1>
              <p className="text-sm font-medium">Rs. {d.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
