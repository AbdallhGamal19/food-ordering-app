import MainHeading from "../../../components/mainHeading/index";
import Menu from "../../../components/menu/indx";
import getDictionary from "../../../lib/dictionaries";
import { getCurrentLocale } from "../../../lib/getCurrentLocale";
import { getBestSellers } from "../../../server/db/products";

async function BestSellers() {
  const bestSellers = await getBestSellers(3);
  const locale = await getCurrentLocale();
  const { home } = await getDictionary(locale);
  const { bestSeller } = home;
  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading
            subtitle={bestSeller.checkOut}
            title={bestSeller.OurBestSellers}
          />
        </div>
        <Menu items={bestSellers} />
      </div>
    </section>
  );
}

export default BestSellers;
