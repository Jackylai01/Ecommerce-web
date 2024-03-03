import { Flex, IconButton, Spacer, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactElement } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BsFillCameraFill, BsListCheck } from 'react-icons/bs';
import { FaMapMarkedAlt, FaUsers } from 'react-icons/fa';

interface NavLinkProps {
  icon: ReactElement;
  label: string;
  href: string;
}

const ClientNavbar = () => {
  const NavLink = ({ icon, label, href }: NavLinkProps) => (
    <Link href={href} passHref>
      <VStack as='a' spacing={0} align='center'>
        <IconButton
          color='white'
          icon={icon}
          aria-label={label}
          background='none'
          _hover={{ bg: 'none' }}
          _active={{ bg: 'none' }}
          _focus={{ boxShadow: 'none' }}
          fontSize={{ base: '1rem', md: '2rem' }}
        />
        <Text fontSize={{ base: '0.5rem', md: '1rem' }} color='white'>
          {label}
        </Text>
      </VStack>
    </Link>
  );

  return (
    <Flex
      as='nav'
      align='center'
      justifyContent='center'
      wrap='wrap'
      padding='1.5rem'
      bg='gray.800'
      color='white'
      w='100%'
    >
      <Spacer />
      <Flex
        display='flex'
        align='center'
        flexGrow={1}
        justify='space-around'
        w='100%'
      >
        <NavLink
          icon={<AiOutlineHome />}
          label='建立模板'
          href='/client/template'
        />
        <NavLink
          icon={<FaMapMarkedAlt />}
          label='地圖製作'
          href='/client/map-making'
        />
        <NavLink
          icon={<BsListCheck />}
          label='現況調查'
          href='/client/landSurveyForm'
        />
        <NavLink
          icon={<BsFillCameraFill />}
          label='模板列表'
          href='/client/template/templatesList'
        />
        <NavLink icon={<FaUsers />} label='建立群組' href='/client/group' />
      </Flex>
    </Flex>
  );
};

export default ClientNavbar;
