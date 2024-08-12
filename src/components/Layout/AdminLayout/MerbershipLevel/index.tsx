import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {
  deleteMembershipLevelAsync,
  getAllMembershipLevelsAsync,
} from '@reducers/admin/admin-membership-level/actions';
import React, { useEffect, useState } from 'react';

import {
  Level,
  Member,
  MembershipLevelResponse,
} from '@models/responses/membership.res';
import { Award, ChevronDown, Edit, Plus, Search, Trash } from 'lucide-react';

const MembershipLevelManagement: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const {
    membershipLevels,
    metadata,
    status: {
      deleteMembershipLevelFailed,
      deleteMembershipLevelLoading,
      deleteMembershipLevelSuccess,
      createMembershipLevelFailed,
      createMembershipLevelLoading,
      createMembershipLevelSuccess,
    },
    error: { createMembershipLevelError, deleteMembershipLevelError },
  } = useAppSelector((state) => state.adminMembershipLevel);

  useEffect(() => {
    dispatch(getAllMembershipLevelsAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleAddEdit = (level: MembershipLevelResponse | null = null) => {
    if (level) {
      const updatedLevel: Level = {
        ...level,
        minPointsRequired: level.minPointsRequired ?? 0,
        discountRate: level.discountRate ?? 0,
        members: level.members || [],
        description: level.description || '',
      };
      setCurrentLevel(updatedLevel);
    } else {
      setCurrentLevel(null);
    }
    onOpen();
  };

  const handleDelete = (id: string) => {
    dispatch(deleteMembershipLevelAsync(id));
  };

  const filteredLevels =
    membershipLevels?.filter(
      (level) => filterLevel === 'all' || level._id === filterLevel,
    ) || [];

  const filteredMembers = (members: Member[]) => {
    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.points.toString().includes(searchTerm),
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedLevel(expandedLevel === id ? null : id);
  };

  useEffect(() => {
    if (deleteMembershipLevelSuccess) {
      toast({
        title: '已删除',
        description: '删除成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else if (deleteMembershipLevelFailed) {
      toast({
        title: '删除失败',
        description: deleteMembershipLevelError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [
    toast,
    deleteMembershipLevelSuccess,
    deleteMembershipLevelFailed,
    deleteMembershipLevelError,
  ]);

  return (
    <Box minH='100vh'>
      <Box
        w='100%'
        mx='auto'
        bg='white'
        borderRadius='20px'
        shadow='xl'
        overflow='hidden'
        mt='1rem'
      >
        <Box
          p={{ base: 6, sm: 8 }}
          bgGradient='linear(to-r, blue.600, indigo.700)'
        >
          <Heading
            fontSize={{ base: '3xl', sm: '4xl' }}
            fontWeight='bold'
            color='black'
            mb={2}
          >
            会员分级管理
          </Heading>
          <Text color='blue.700'>管理您的VIP客户等级和优惠</Text>
        </Box>
        <Box p={{ base: 4, sm: 6, md: 8 }}>
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            justify='space-between'
            align={{ base: 'start', sm: 'center' }}
            mb={6}
            gap={4}
          >
            <Button
              onClick={() => handleAddEdit()}
              colorScheme='teal'
              leftIcon={<Icon as={Plus} />}
              w={{ base: 'full', sm: 'auto' }}
              transform='hover:translateY(-2px) hover:scale(1.05)'
            >
              新增会员分级
            </Button>
            <Flex direction={{ base: 'column', sm: 'row' }} gap={4} w='full'>
              <FormControl position='relative'>
                <Input
                  type='text'
                  placeholder='搜索会员...'
                  pl='10'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Icon
                  as={Search}
                  position='absolute'
                  left={3}
                  top='50%'
                  transform='translateY(-50%)'
                  color='gray.400'
                />
              </FormControl>
              <Select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                focusBorderColor='blue.500'
              >
                <option value='all'>所有等级</option>
                {membershipLevels?.map((level) => (
                  <option key={level._id} value={level._id}>
                    {level.name}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>
          <LoadingLayout
            isLoading={
              deleteMembershipLevelLoading || createMembershipLevelLoading
            }
            arrayData={membershipLevels}
          >
            <Grid gap={6}>
              {filteredLevels.map((level) => (
                <Box
                  key={level._id}
                  bg='white'
                  rounded='xl'
                  shadow='md'
                  overflow='hidden'
                >
                  <Box
                    p={6}
                    bgGradient='linear(to-r, blue.600, indigo.700)'
                    cursor='pointer'
                    onClick={() => toggleExpand(level._id)}
                  >
                    <Flex justify='space-between' align='center'>
                      <Heading
                        fontSize={{ base: 'xl', sm: '2xl' }}
                        fontWeight='semibold'
                        color='white'
                      >
                        {level.name}
                      </Heading>
                      <Flex align='center'>
                        <Icon
                          as={Award}
                          h={{ base: 6, sm: 8 }}
                          w={{ base: 6, sm: 8 }}
                          color='white'
                          opacity={0.75}
                          mr={2}
                        />
                        <Icon
                          as={ChevronDown}
                          h={6}
                          w={6}
                          color='white'
                          transform={
                            expandedLevel === level._id ? 'rotate(180deg)' : ''
                          }
                        />
                      </Flex>
                    </Flex>
                    <Text color='white' mt={2}>
                      {level.description}
                    </Text>
                  </Box>
                  {expandedLevel === level._id && (
                    <Box p={6}>
                      <Grid
                        templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }}
                        gap={4}
                        mb={6}
                      >
                        <Box>
                          <Text color='gray.600'>最低积分要求</Text>
                          <Text fontSize='2xl' fontWeight='bold'>
                            {level.minPointsRequired}
                          </Text>
                        </Box>
                        <Box>
                          <Text color='gray.600'>折扣率</Text>
                          <Text fontSize='2xl' fontWeight='bold'>
                            {level.discountRate}%
                          </Text>
                        </Box>
                      </Grid>
                      <Heading fontSize='xl' fontWeight='semibold' mb={4}>
                        会员列表
                      </Heading>
                      <Box overflowX='auto'>
                        <Table>
                          <Thead bg='gray.100'>
                            <Tr>
                              <Th>ID</Th>
                              <Th>姓名</Th>
                              <Th>积分</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {filteredMembers(level.members).map((member) => (
                              <Tr
                                key={member.id}
                                borderBottom='1px'
                                borderColor='gray.200'
                              >
                                <Td>{member.id}</Td>
                                <Td>{member.name}</Td>
                                <Td>{member.points}</Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </Box>
                      <Flex justify='flex-end' gap={2} mt={6}>
                        <Button
                          onClick={() => handleAddEdit(level)}
                          leftIcon={<Icon as={Edit} />}
                          colorScheme='yellow'
                        >
                          编辑
                        </Button>
                        <Button
                          onClick={() => handleDelete(level._id)}
                          leftIcon={<Icon as={Trash} />}
                          colorScheme='red'
                        >
                          删除
                        </Button>
                      </Flex>
                    </Box>
                  )}
                </Box>
              ))}
            </Grid>
          </LoadingLayout>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {currentLevel ? '编辑会员分级' : '新增会员分级'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>名称</FormLabel>
              <Input placeholder='名称' defaultValue={currentLevel?.name} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>描述</FormLabel>
              <Textarea
                placeholder='描述'
                defaultValue={currentLevel?.description}
                rows={3}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>最低积分要求</FormLabel>
              <Input
                type='number'
                placeholder='最低积分要求'
                defaultValue={currentLevel?.minPointsRequired}
              />
            </FormControl>
            <FormControl>
              <FormLabel>折扣率 (%)</FormLabel>
              <Input
                type='number'
                placeholder='折扣率'
                defaultValue={currentLevel?.discountRate}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>
              取消
            </Button>
            <Button colorScheme='blue' ml={3}>
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MembershipLevelManagement;
