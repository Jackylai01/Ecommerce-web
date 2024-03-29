import {
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import Card from '@components/Card/Card';
import CardBody from '@components/Card/CardBody';
import IconBox from '@components/Icons/IconBox';
import { useAdminColorMode } from 'src/context/colorMode';

interface MiniStatisticsType {
  title: string;
  amount: number | string;
  percentage: number;
  icon: any;
}

const MiniStatistics = ({
  title,
  amount,
  percentage,
  icon,
}: MiniStatisticsType) => {
  const { colorMode } = useAdminColorMode();
  const iconTeal = colorMode === 'light' ? 'teal.300' : 'teal.300';
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';

  return (
    <Card minH='83px'>
      <CardBody>
        <Flex flexDirection='row' align='center' justify='center' w='100%'>
          <Stat me='auto'>
            <StatLabel
              fontSize='sm'
              color='gray.400'
              fontWeight='bold'
              pb='.1rem'
            >
              {title}
            </StatLabel>
            <Flex>
              <StatNumber fontSize='lg' color={textColor}>
                {amount}
              </StatNumber>
              <StatHelpText
                alignSelf='flex-end'
                justifySelf='flex-end'
                m='0px'
                color={percentage > 0 ? 'green.400' : 'red.400'}
                fontWeight='bold'
                ps='3px'
                fontSize='md'
              >
                {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
              </StatHelpText>
            </Flex>
          </Stat>
          <IconBox h={'45px'} w={'45px'} bg={iconTeal}>
            {icon}
          </IconBox>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MiniStatistics;
