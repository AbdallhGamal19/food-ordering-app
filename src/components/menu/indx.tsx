import { productWithRelations } from "../../lib/types";
import MenuItem from "./MenuItems";

const Menu = ({ items }: { items: productWithRelations[] }) => {
  return items ? (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((item: productWithRelations) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  ) : (
    <p className="text-accent text-center">No products found</p>
  );
};

export default Menu;
