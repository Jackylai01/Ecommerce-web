import { Flex } from '@chakra-ui/react';
import { ProductCategoryForm } from '@components/Form/FormCRUD/ProductCategory';
import AddButton from '@components/Icons/AddFormIcon';
import TabsLayout from '@components/Layout/TabsLayout';
import { UsersConfig } from '@fixtures/Tabs-configs';
import { dashboardTableData, tablesTableData } from 'src/variables/general';
import Authors from './components/Authors';
import Projects from './components/Projects';

const Tables = () => {
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Flex direction='column'>
      <AddButton
        formTitle='Add Users account'
        formContent={<ProductCategoryForm />}
        onSubmit={handleSubmit}
      />
      <TabsLayout tabsConfig={UsersConfig}>
        <Authors
          title={'帳號管理'}
          captions={['Author', 'Function', 'Status', 'Employed', '']}
          data={tablesTableData}
        />
      </TabsLayout>
      <Projects
        title={'Projects Table'}
        captions={['Companies', 'Budget', 'Status', 'Completion', '']}
        data={dashboardTableData}
      />
    </Flex>
  );
};

export default Tables;
