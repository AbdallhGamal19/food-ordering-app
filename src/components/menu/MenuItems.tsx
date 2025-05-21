import Image from "next/image.js";
import { formatCurrency } from "../../lib/formatters";
import AddToCardButton from "../add-to-card-button/index";

import { productWithRelations } from "../../lib/types";
function MenuItem({ item }: { item: productWithRelations }) {
  return (
    <li className="">
      <div className="text-center bg-opacity-70 hover:bg-opacity-100 transition-all duration-200 bg-gray-200 px-5 py-3 rounded-lg ">
        <div className="relative w-48 h-48 mx-auto ">
          <Image
            src={item.image}
            className="object-cover"
            alt={item.name}
            fill
          />
        </div>
        <div className="flex items-center justify-around mb-4">
          <h4 className="font-semibold text-xl my-3">{item.name}</h4>
          <strong className="text-accent">
            {formatCurrency(item.basePrice)}
          </strong>
        </div>
        <p className="text-gray-500 text-sm line-clamp-3">{item.description}</p>
        <AddToCardButton item={item} />
      </div>
    </li>
  );
}

export default MenuItem;
