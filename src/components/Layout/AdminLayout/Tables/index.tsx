import { Flex } from '@chakra-ui/react';
import { UsersForm } from '@components/Form/FormCRUD/Users';
import AddButton from '@components/Icons/AddFormIcon';
import TabsLayout from '@components/Layout/TabsLayout';
import { UsersConfig } from '@fixtures/Tabs-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import { adminCreateAccountsAsync } from '@reducers/admin/auth/actions';
import { dashboardTableData, tablesTableData } from 'src/variables/general';
import Authors from './components/Authors';
import Projects from './components/Projects';

const Tables = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (data: any) => {
    dispatch(adminCreateAccountsAsync(data));
  };

  return (
    <Flex direction='column'>
      <AddButton
        formTitle='Add Users account'
        formContent={<UsersForm />}
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
