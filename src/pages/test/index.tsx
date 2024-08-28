import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Collapse,
  Heading,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

interface Role {
  id: number;
  name: string;
  permissions: Record<string, string[]>;
}

const RoleManagement = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: '管理員',
      permissions: {
        用戶管理: ['新增', '修改', '查詢', '刪除'],
        內容管理: ['新增', '修改', '查詢', '刪除'],
        系統設置: ['查詢', '修改'],
      },
    },
    {
      id: 2,
      name: '編輯',
      permissions: { 內容管理: ['新增', '修改', '查詢'] },
    },
  ]);

  const [newRoleName, setNewRoleName] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const permissionCategories: Record<string, string[]> = {
    用戶管理: ['新增', '修改', '查詢', '刪除'],
    內容管理: ['新增', '修改', '查詢', '刪除'],
    系統設置: ['查詢', '修改'],
    數據分析: ['查看報表', '導出數據'],
    財務管理: ['查看財務', '審批付款'],
  };

  const handleAddRole = () => {
    if (newRoleName) {
      setRoles([
        ...roles,
        { id: roles.length + 1, name: newRoleName, permissions: {} },
      ]);
      setNewRoleName('');
    }
  };

  const handlePermissionChange = (category: string, permission: string) => {
    if (selectedRole) {
      const updatedPermissions = { ...selectedRole.permissions };

      // 檢查類別是否存在，不存在則創建空的權限列表
      if (!updatedPermissions[category]) {
        updatedPermissions[category] = [];
      }

      // 如果已經存在該權限，則移除它，否則添加它
      if (updatedPermissions[category].includes(permission)) {
        updatedPermissions[category] = updatedPermissions[category].filter(
          (p) => p !== permission,
        );
      } else {
        updatedPermissions[category].push(permission);
      }

      // 如果該類別的所有權限都被取消，移除該類別
      if (updatedPermissions[category].length === 0) {
        delete updatedPermissions[category];
      }

      // 更新角色權限狀態
      const updatedRoles = roles.map((role) =>
        role.id === selectedRole.id
          ? { ...role, permissions: updatedPermissions }
          : role,
      );
      setRoles(updatedRoles);
      setSelectedRole({ ...selectedRole, permissions: updatedPermissions });
    }
  };

  return (
    <Box p={6} maxW='6xl' mx='auto' bg='gray.50' rounded='lg' shadow='lg'>
      <Heading as='h1' size='xl' mb={6}>
        角色管理系統
      </Heading>

      <Card mb={6}>
        <CardHeader>
          <Heading as='h2' size='md'>
            新建角色
          </Heading>
        </CardHeader>
        <CardBody>
          <HStack spacing={2}>
            <Input
              placeholder='輸入角色名稱'
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
            <Button
              colorScheme='blue'
              onClick={handleAddRole}
              leftIcon={<AddIcon />}
            >
              添加角色
            </Button>
          </HStack>
        </CardBody>
      </Card>

      <HStack spacing={6}>
        <Card flex='1'>
          <CardHeader>
            <Heading as='h2' size='md'>
              角色列表
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={2}>
              {roles.map((role) => (
                <Button
                  key={role.id}
                  variant={selectedRole?.id === role.id ? 'solid' : 'outline'}
                  onClick={() => setSelectedRole(role)}
                  leftIcon={<FaUser />}
                  w='full'
                >
                  {role.name}
                </Button>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {selectedRole && (
          <Card flex='3'>
            <CardHeader>
              <Heading as='h2' size='md'>
                權限設置: {selectedRole.name}
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                {Object.entries(permissionCategories).map(
                  ([category, permissions]) => (
                    <Box key={category} borderWidth='1px' rounded='lg' p={4}>
                      <Button
                        variant='ghost'
                        w='full'
                        justifyContent='space-between'
                        onClick={() =>
                          setExpandedCategory(
                            expandedCategory === category ? null : category,
                          )
                        }
                        rightIcon={
                          <ChevronDownIcon
                            transform={
                              expandedCategory === category
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)'
                            }
                            transition='transform 0.3s'
                          />
                        }
                      >
                        {category}
                      </Button>
                      <Collapse
                        in={expandedCategory === category}
                        animateOpacity
                      >
                        <VStack spacing={4} mt={2}>
                          {permissions.map((permission) => (
                            <HStack key={permission}>
                              <Checkbox
                                isChecked={selectedRole.permissions[
                                  category
                                ]?.includes(permission)}
                                onChange={() =>
                                  handlePermissionChange(category, permission)
                                }
                              >
                                {permission}
                              </Checkbox>
                            </HStack>
                          ))}
                        </VStack>
                      </Collapse>
                    </Box>
                  ),
                )}
              </VStack>
            </CardBody>
          </Card>
        )}
      </HStack>
    </Box>
  );
};

export default RoleManagement;
