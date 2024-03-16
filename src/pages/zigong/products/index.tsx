import { ProductFormContent } from '@components/Form/FormCRUD/ProductsContent';
import AddButton from '@components/Icons/AddFormIcon';
import ProductTableContainer from '@components/Layout/AdminLayout/Products';
import TabsLayout from '@components/Layout/TabsLayout';
import { ProductsConfig } from '@fixtures/Tabs-configs';
import { NextPage } from 'next';

const ProductsPages: NextPage = () => {
  const handleSubmit = (data: any) => {
    console.log(data);
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
