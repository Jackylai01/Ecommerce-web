import {
  Box,
  Flex,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  useMediaQuery,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getInventoryStatisticsAsync } from '@reducers/admin/admin-erp/inventory/actions';
import { useEffect } from 'react';

const InventoryStatistics = () => {
  const dispatch = useAppDispatch();
  const { inventoryTurnoverRate, safetyStock, reorderPoints } = useAppSelector(
    (state) => state.adminERPInventory,
  );
  const [isLargerThan600] = useMediaQuery('(min-width: 600px)');

  useEffect(() => {
    dispatch(getInventoryStatisticsAsync());
  }, [dispatch]);

  return (
    <Box bg='white' p='25px' mb='2rem' borderRadius='10px' boxShadow='md'>
      <StatGroup>
        <Stat>
          <StatLabel>庫存周轉率</StatLabel>
          <StatNumber>
            {inventoryTurnoverRate !== null
              ? inventoryTurnoverRate.toFixed(2)
              : 'N/A'}
          </StatNumber>
          <StatHelpText>
            <StatArrow
              type={
                inventoryTurnoverRate && inventoryTurnoverRate > 1
                  ? 'increase'
                  : 'decrease'
              }
            />
            {inventoryTurnoverRate && inventoryTurnoverRate > 1
              ? '良好'
              : '低於正常'}
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>安全庫存</StatLabel>
          <StatNumber>{safetyStock !== null ? safetyStock : 'N/A'}</StatNumber>
          <StatHelpText>建議量</StatHelpText>
        </Stat>
      </StatGroup>
      <Box mt='1rem'>
        <Box>建議補貨點:</Box>
        <Flex
          flexDirection={isLargerThan600 ? 'row' : 'column'}
          mt='1rem'
          wrap='wrap'
        >
          {reorderPoints &&
            reorderPoints.map((item) => (
              <Stat
                key={item.productId}
                p='10px'
                m='5px'
                border='1px'
                borderColor='gray.200'
                borderRadius='10px'
                width={isLargerThan600 ? 'calc(33.3333% - 10px)' : '100%'}
              >
                <StatLabel>產品 {item.productName}</StatLabel>
                <StatNumber>
                  {item.reorderPoint !== null ? item.reorderPoint : 'N/A'}
                </StatNumber>
              </Stat>
            ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default InventoryStatistics;
