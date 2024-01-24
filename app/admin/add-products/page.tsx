import { getCurrentUser } from "@/actions/getCurrentUser";
import AddProductForm from "@/components/admin/add-product-form";
import NullData from "@/components/null-data";

const AddProducts = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== 'ADMIN') {
        return <NullData title='Obs! Access denied' />
    }

    return ( 
        <div className="p-10">
            <AddProductForm />
        </div>
     );
}
 
export default AddProducts;