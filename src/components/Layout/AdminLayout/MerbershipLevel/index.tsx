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
import { Award, ChevronDown, Edit, Plus, Search, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Member {
  id: number;
  name: string;
  points: number;
}

interface Level {
  id: number;
  name: string;
  description: string;
  minPointsRequired: number;
  discountRate: number;
  color: string;
  members: Member[];
}

const MembershipLevelManagement: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [levels, setLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    // 模擬從API獲取數據
    setLevels([
      {
        id: 1,
        name: '銅牌會員',
        description: '初級會員',
        minPointsRequired: 0,
        discountRate: 0,
        color: 'linear(to-r, blue.500, blue.500)',
        members: [
          { id: 1, name: '張三', points: 500 },
          { id: 2, name: '李四', points: 800 },
          { id: 3, name: '王五', points: 300 },
        ],
      },
      {
        id: 2,
        name: '銀牌會員',
        description: '中級會員',
        minPointsRequired: 1000,
        discountRate: 5,
        color: 'linear(to-r, gray.300, gray.400)',
        members: [
          { id: 4, name: '趙六', points: 1500 },
          { id: 5, name: '孫七', points: 2000 },
        ],
      },
      {
        id: 3,
        name: '金牌會員',
        description: '高級會員',
        minPointsRequired: 5000,
        discountRate: 10,
        color: 'linear(to-r, yellow.300, yellow.500)',
        members: [
          { id: 6, name: '周八', points: 6000 },
          { id: 7, name: '吳九', points: 7000 },
        ],
      },
    ]);
  }, []);

  const handleAddEdit = (level: Level | null = null) => {
    setCurrentLevel(level);
    onOpen();
  };

  const handleDelete = (id: number) => {
    setLevels(levels.filter((level) => level.id !== id));
    toast({
      title: '已刪除',
      description: `已成功刪除等級 ID: ${id}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredLevels = levels.filter(
    (level) => filterLevel === 'all' || level.id.toString() === filterLevel,
  );

  const filteredMembers = (members: Member[]) => {
    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.points.toString().includes(searchTerm),
    );
  };

  const toggleExpand = (id: number) => {
    setExpandedLevel(expandedLevel === id ? null : id);
  };

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
                {levels.map((level) => (
                  <option key={level.id} value={level.id.toString()}>
                    {level.name}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>
          <Grid gap={6}>
            {filteredLevels.map((level) => (
              <Box
                key={level.id}
                bg='white'
                rounded='xl'
                shadow='md'
                overflow='hidden'
              >
                <Box
                  p={6}
                  bgGradient={level.color}
                  cursor='pointer'
                  onClick={() => toggleExpand(level.id)}
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
                          expandedLevel === level.id ? 'rotate(180deg)' : ''
                        }
                      />
                    </Flex>
                  </Flex>
                  <Text color='white' mt={2}>
                    {level.description}
                  </Text>
                </Box>
                {expandedLevel === level.id && (
                  <Box p={6}>
                    <Grid
                      templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }}
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
                        <Text color='gray.600'>折扣率</Text>
                        <Text fontSize='2xl' fontWeight='bold'>
                          {level.discountRate}%
                        </Text>
                      </Box>
                    </Grid>
                    <Heading fontSize='xl' fontWeight='semibold' mb={4}>
                      會員列表
                    </Heading>
                    <Box overflowX='auto'>
                      <Table>
                        <Thead bg='gray.100'>
                          <Tr>
                            <Th>ID</Th>
                            <Th>姓名</Th>
                            <Th>積分</Th>
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
                        編輯
                      </Button>
                      <Button
                        onClick={() => handleDelete(level.id)}
                        leftIcon={<Icon as={Trash} />}
                        colorScheme='red'
                      >
                        刪除
                      </Button>
                    </Flex>
                  </Box>
                )}
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {currentLevel ? '編輯會員分級' : '新增會員分級'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>名稱</FormLabel>
              <Input placeholder='名稱' defaultValue={currentLevel?.name} />
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
              <FormLabel>最低積分要求</FormLabel>
              <Input
                type='number'
                placeholder='最低積分要求'
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
