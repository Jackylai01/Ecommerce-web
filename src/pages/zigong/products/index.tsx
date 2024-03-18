import { ProductFormContent } from '@components/Form/FormCRUD/ProductsContent';
import AddButton from '@components/Icons/AddFormIcon';
import ProductTableContainer from '@components/Layout/AdminLayout/Products';
import TabsLayout from '@components/Layout/TabsLayout';
import { ProductsConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import { addProductAsync } from '@reducers/admin/products/actions';
import { NextPage } from 'next';

const ProductsPages: NextPage = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: any) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== 'coverImage' && key !== 'images') {
        formData.append(key, data[key]);
      }
    });

    if (data.coverImage && data.coverImage.length > 0) {
      formData.append('coverImage', data.coverImage[0]);
    }

    if (data.images && data.images.length) {
      data.images.forEach((image: any) => {
        formData.append('images', image);
      });
    }
    dispatch(addProductAsync(formData));
  };

  return (
    <>
      <AddButton
        formTitle='Add Product'
        formContent={<ProductFormContent />}
        onSubmit={handleSubmit}
      />
      <TabsLayout tabsConfig={ProductsConfig}>
        <ProductTableContainer />
      </TabsLayout>
    </>
  );
};

export default ProductsPages;
