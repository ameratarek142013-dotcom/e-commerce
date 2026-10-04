import { getLoggedUserAddresses } from "@/api/getloggeduseraddresses.api";
import AddressesInfo from "@/app/_components/AddressesInfo/AddressesInfo";

export default async function Addresses() {

  const { data } = await getLoggedUserAddresses()
  return (
    <>
      <AddressesInfo data={data} />
    </>
  );
}