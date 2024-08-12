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
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { IMembershipLevel } from '@models/requests/membership.req';

import {
  Level,
  Member,
  MembershipLevelResponse,
} from '@models/responses/membership.res';
import {
  createMembershipLevelAsync,
  deleteMembershipLevelAsync,
  getAllMembershipLevelsAsync,
} from '@reducers/admin/admin-membership-level/actions';
import { ChevronDown, Plus, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const MembershipLevelManagement: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMembershipLevel>();

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

  useEffect(() => {
    if (createMembershipLevelSuccess) {
      toast({
        title: '新增成功',
        description: '會員分級已成功新增。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(getAllMembershipLevelsAsync({ page: 1, limit: 10 }));
      onClose();
      reset();
    } else if (createMembershipLevelFailed) {
      toast({
        title: '新增失敗',
        description: createMembershipLevelError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [
    toast,
    createMembershipLevelSuccess,
    createMembershipLevelFailed,
    createMembershipLevelError,
    onClose,
    reset,
  ]);

  const handleAddEdit = (level: MembershipLevelResponse | null = null) => {
    if (level) {
      const updatedLevel: Level = {
        ...level,
        minPointsRequired: level.minPointsRequired ?? 0,
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

  const onSubmit = (data: IMembershipLevel) => {
    dispatch(createMembershipLevelAsync(data));
  };

  const filteredLevels =
    membershipLevels?.filter(
      (level) => filterLevel === 'all' || level._id === filterLevel,
    ) || [];

  const filteredMembers = (members: Member[]) => {
    return members.filter(
      (member) =>
        member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.totalSpent.toString().includes(searchTerm),
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedLevel(expandedLevel === id ? null : id);
  };

  useEffect(() => {
    if (deleteMembershipLevelSuccess) {
      toast({
        title: '已刪除',
        description: '刪除成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else if (deleteMembershipLevelFailed) {
      toast({
        title: '刪除失敗',
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
            會員分級管理
          </Heading>
          <Text color='blue.700'>管理您的VIP客戶等級和優惠</Text>
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
              新增會員分級
            </Button>
            <Flex direction={{ base: 'column', sm: 'row' }} gap={4} w='full'>
              <FormControl position='relative'>
                <Input
                  type='text'
                  placeholder='搜尋會員...'
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
                <option value='all'>所有等級</option>
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
                  bg='blue.300'
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
                    <Box p={6} bg='gray.100'>
                      <Grid
                        templateColumns={{
                          base: '1fr',
                          sm: 'repeat(2, 1fr)',
                        }}
                        gap={4}
                        mb={6}
                      >
                        <Box>
                          <Text color='gray.600'>最低積分要求</Text>
                          <Text fontSize='2xl' fontWeight='bold'>
                            {level.minPointsRequired}
                          </Text>
                        </Box>
                        <Box>
                          <Text color='gray.600'>會員列表</Text>
                          {level.members && level.members.length > 0 ? (
                            <Grid gap={4}>
                              {filteredMembers(level.members).map((member) => (
                                <Box
                                  key={member._id}
                                  bg='white'
                                  p={4}
                                  rounded='md'
                                  shadow='sm'
                                >
                                  <Text fontWeight='bold'>
                                    {member.username}
                                  </Text>
                                  <Text>{member.email}</Text>
                                  <Text>總消費金額: {member.totalSpent}</Text>
                                </Box>
                              ))}
                            </Grid>
                          ) : (
                            <Text color='gray.500'>目前沒有符合條件的會員</Text>
                          )}
                        </Box>
                      </Grid>
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
        <ModalContent as='form' onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            {currentLevel ? '編輯會員分級' : '新增會員分級'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4} isInvalid={!!errors.name}>
              <FormLabel>名稱</FormLabel>
              <Input
                placeholder='名稱'
                defaultValue={currentLevel?.name}
                {...register('name', { required: '名稱是必填項目' })}
              />
              {errors.name && (
                <Text color='red.500'>{errors.name.message}</Text>
              )}
            </FormControl>
            <FormControl mb={4} isInvalid={!!errors.description}>
              <FormLabel>描述</FormLabel>
              <Textarea
                placeholder='描述'
                defaultValue={currentLevel?.description}
                {...register('description')}
                rows={3}
              />
            </FormControl>
            <FormControl mb={4} isInvalid={!!errors.minPointsRequired}>
              <FormLabel>最低積分要求</FormLabel>
              <Input
                type='number'
                placeholder='最低積分要求'
                defaultValue={currentLevel?.minPointsRequired}
                {...register('minPointsRequired', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <FormControl mb={4} isInvalid={!!errors.minTotalSpent}>
              <FormLabel>最低消費總額</FormLabel>
              <Input
                type='number'
                placeholder='最低消費總額'
                {...register('minTotalSpent', {
                  valueAsNumber: true,
                  required: '最低消費總額是必填項目',
                })}
              />
              {errors.minTotalSpent && (
                <Text color='red.500'>{errors.minTotalSpent.message}</Text>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>
              取消
            </Button>
            <Button
              colorScheme='blue'
              ml={3}
              type='submit'
              isLoading={createMembershipLevelLoading}
            >
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MembershipLevelManagement;
