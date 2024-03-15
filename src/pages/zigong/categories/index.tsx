import ProductCategories from '@components/Layout/AdminLayout/Products/components/ProductCategories';
import TabsLayout from '@components/Layout/TabsLayout';
import { ProductsConfig } from '@fixtures/Tabs-configs';
import { NextPage } from 'next';

const CategoriesPages: NextPage = () => {
  return (
    <TabsLayout tabsConfig={ProductsConfig}>
      <ProductCategories />
    </TabsLayout>
  );
};

export default CategoriesPages;
