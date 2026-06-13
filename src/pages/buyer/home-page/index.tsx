import { useQuery } from "@tanstack/react-query";
import { queryGetAllProduct } from "../../../services/query/home";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const { data } = useQuery(queryGetAllProduct());

  const navigate = useNavigate();

  const handleClick = (id: string, slug: string) => {
    navigate(`/product-details/${slug}/${id}`);
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.data?.map((d, i) => {
        return (
          <div
            key={i}
            className="bg-[#FFFFFF] p-4 cursor-pointer"
            onClick={() => handleClick(d._id, d.slug)}
          >
            <div className="bg-[#F5F5F5] p-4 rounded-lg">
              <img src={d.thumbnail.url} alt="" className="w-full h-60" />
            </div>
            <div className="pt-2 space-y-1">
              <h1 className="font-bold">{d.title}</h1>
              <p className="text-sm font-medium">
                Rs. {d.variants[0].salePrice}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
