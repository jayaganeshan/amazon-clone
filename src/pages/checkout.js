import Header from "../components/Header";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { getTotal, selectItems } from "../slices/basketSlice";
import { useSelector } from "react-redux";
import CheckoutProducts from "../components/CheckoutProducts";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);
function Checkout() {
  const items = useSelector(selectItems);
  const totalPrice = useSelector(getTotal);
  const [session] = useSession();
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    //call the backend to create backend session

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });
    console.log(checkoutSession);
    // redirect user to stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) alert(result.error.message);
  };
  return (
    <div className="bg-gray-200 h-screen">
      <Header />
      <main className="lg: max-w-screen-2xl mx-auto flex flex-col sm:flex sm:flex-row ">
        {/* left page */}
        <div className="flex-grow m-5 shadow-sm md:max-w-6xl">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-5 bg-white ">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your Basket is empty" : "Shopping Cart"}
            </h1>
            <div>
              {items.map((item) => (
                <CheckoutProducts
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                  rating={item.rating}
                  isPrime={item.isPrime}
                />
              ))}
            </div>
          </div>
        </div>

        {/* right page */}
        <div className="flex flex-col p-10 bg-white shadow-md mb-5">
          {items.length > 0 ? (
            <>
              <h1>
                {`SubTotal(${items.length})is `}{" "}
                <span className="font-bold">
                  <Currency quantity={totalPrice} />
                </span>
              </h1>

              <button
                role="link"
                className={`button ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-800 cursor-not-allowed ring-0 focus:ring-gray-500 active:from-gray-500"
                }`}
                onClick={createCheckoutSession}
              >
                {session ? "Proceed to checkout" : "Sign in to continue"}
              </button>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
