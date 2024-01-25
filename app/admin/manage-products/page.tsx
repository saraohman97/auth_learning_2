
import { getCurrentUser } from "@/actions/getCurrentUser";
import getProducts from "@/actions/getProducts";
import NullData from "@/components/null-data";

const ManageProducts = async () => {
    const products = await getProducts({category: null})
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== 'ADMIN') {
        return <NullData title="Ops! Access denied!" />
    }

    return ( 
        
        <div>products</div>
     );
}
 
export default ManageProducts;