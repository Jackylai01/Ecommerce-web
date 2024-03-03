import crudConfigMap from '@fixtures/crud-configs';
import { useRouter } from 'next/router';
import FormLayout from './FormLayout';
import TableLayout from './TableLayout';

const CRUDLayout = () => {
  const router = useRouter();
  const { route = [] } = router.query as { route: string[] };
  const [moduleName, uuidOrCreate] = route;
  const crudConfig = crudConfigMap[moduleName];
  const layout = crudConfig?.layout[route.length - 1];

  return (
    <>
      {layout === 'table' && crudConfig?.tableConfigs ? (
        <TableLayout moduleName={moduleName} config={crudConfig} />
      ) : layout === 'form' && crudConfig?.fieldConfigs ? (
        <FormLayout
          moduleName={moduleName}
          id={uuidOrCreate}
          config={crudConfig}
        />
      ) : (
        <>功能建置中</>
      )}
    </>
  );
};

export default CRUDLayout;
