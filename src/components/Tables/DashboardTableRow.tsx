import {
  Avatar,
  AvatarGroup,
  Flex,
  Icon,
  Progress,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import { useAdminColorMode } from 'src/context/colorMode';

const DashboardTableRow = (props: any) => {
  const { logo, name, members, budget, progression } = props;
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white.300';

  return (
    <Tr>
      <Td minWidth={{ sm: '250px' }} pl='0px'>
        <Flex align='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Icon as={logo} h={'24px'} w={'24px'} pe='5px' />
          <Text
            fontSize='md'
            color={textColor}
            fontWeight='bold'
            minWidth='100%'
          >
            {name}
          </Text>
        </Flex>
      </Td>

      <Td>
        <AvatarGroup size='sm'>
          {members.map((member: any, index: number) => {
            return (
              <Avatar
                name='Ryan Florence'
                key={index}
                src={member}
                _hover={{ zIndex: '3', cursor: 'pointer' }}
              />
            );
          })}
        </AvatarGroup>
      </Td>
      <Td>
        <Text fontSize='md' color={textColor} fontWeight='bold' pb='.5rem'>
          {budget}
        </Text>
      </Td>
      <Td>
        <Flex direction='column'>
          <Text
            fontSize='md'
            color='teal.300'
            fontWeight='bold'
            pb='.2rem'
          >{`${progression}%`}</Text>
          <Progress
            colorScheme={progression === 100 ? 'teal' : 'cyan'}
            size='xs'
            value={progression}
            borderRadius='15px'
          />
        </Flex>
      </Td>
    </Tr>
  );
};

export default DashboardTableRow;
