import { getLoggedUserCart } from "@/api/cartapi/getLoggedUserCart.api";
import { getAllCategories } from "@/api/getAllCategories.api";
import { getLoggedUserWishlist } from "@/api/wishlistapi/getLoggedUserWishlist.api";
import NavbarDetails from "@/app/_components/NavBarDetails/NavBarDetails";



export default async function Navbar() {

  const response = await getLoggedUserCart()
  const responseWishlist = await getLoggedUserWishlist()
  const responseCategories = await getAllCategories()
  return (
    <>
      <NavbarDetails numOfCartItems={response?.numOfCartItems} numOfWishlistItems={responseWishlist?.count} responseCategories={responseCategories.data} />
    </>
  );
}