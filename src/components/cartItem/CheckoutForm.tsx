"use client";
import { getTotalAmount } from "../../lib/cart";
import { formatCurrency } from "../../lib/formatters";
import { selectCartItems } from "../../redux/features/cart/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const CheckoutForm = () => {
  const cart = useAppSelector(selectCartItems);
  const totalAmount = getTotalAmount(cart);
  return (
    cart &&
    cart.length > 0 && (
      <div className="grid gap-6 bg-gray-100 rounded-md p-4">
        <h2 className="text-black text-2xl font-semibold">Checkout</h2>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="phone" className="text-accent">
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                type="text"
                name="phone"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="address" className="text-accent">
                Address
              </Label>
              <Textarea
                className="resize-none"
                id="address"
                placeholder="Enter your address"
                name="address"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="postal-code" className="text-accent">
                Postal Code
              </Label>
              <Input
                id="postal-code"
                placeholder="Enter Postal Code"
                type="text"
                name="postal-code"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="city" className="text-accent">
                City
              </Label>
              <Input
                id="city"
                placeholder="Enter Your City"
                type="text"
                name="city"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="country" className="text-accent">
                Country
              </Label>
              <Input
                id="country"
                placeholder="Enter Your Country"
                type="text"
                name="country"
              />
            </div>
            <Button className="h-10">Pay {formatCurrency(totalAmount)}</Button>
          </div>
        </form>
      </div>
    )
  );
};

export default CheckoutForm;
