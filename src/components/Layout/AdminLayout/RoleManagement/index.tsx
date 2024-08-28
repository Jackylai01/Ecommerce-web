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
  Stack,
  useToast,
  VStack,
} from '@chakra-ui/react';
import LoadingLayout from '@components/Layout/LoadingLayout';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { getPermissionsAsync } from '@reducers/admin/admin-permissions/actions';
import { resetRoleState } from '@reducers/admin/admin-roles';
import {
  createRoleAsync,
  deleteRoleAsync,
  getAllRolesAsync,
  updateRolePermissionsAsync,
} from '@reducers/admin/admin-roles/actions';
import { useCallback, useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';

interface Permission {
  _id: string;
  name: string;
  description: string;
  module?: string;
}

interface PermissionGroup {
  module: string;
  permissions: Permission[];
}

const RoleManagement = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    list: roles,
    status: {
      createRoleFailed,
      createRoleLoading,
      createRoleSuccess,
      updateRoleFailed,
      updateRoleLoading,
      updateRoleSuccess,
      deleteRoleFailed,
      deleteRoleLoading,
      deleteRoleSuccess,
    },
    error: { createRoleError, updateRoleError, deleteRoleError },
  } = useAppSelector((state) => state.adminRoles);
  const { list: permissions } = useAppSelector(
    (state) => state.adminPermissions,
  );

  const [newRoleName, setNewRoleName] = useState<string>('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [groupedPermissions, setGroupedPermissions] = useState<
    PermissionGroup[]
  >([]);
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null);
  const [editingPermissions, setEditingPermissions] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getPermissionsAsync());
    dispatch(getAllRolesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (permissions) {
      const grouped = groupPermissionsByModule(permissions);
      setGroupedPermissions(grouped);
    }
  }, [permissions]);

  useEffect(() => {
    if (expandedRoleId && roles) {
      const role = roles.find((r: any) => r._id === expandedRoleId);
      if (role && role.permissions) {
        setEditingPermissions(role.permissions.map((perm: any) => perm._id));
      }
    }
  }, [expandedRoleId, roles]);

  const groupPermissionsByModule = (
    permissions: Permission[] = [],
  ): PermissionGroup[] => {
    const groups: { [key: string]: Permission[] } = {};

    permissions.forEach((permission) => {
      const moduleName = permission.module || '';

      if (!groups[moduleName]) {
        groups[moduleName] = [];
      }

      groups[moduleName].push(permission);
    });

    return Object.keys(groups).map((module) => ({
      module,
      permissions: groups[module],
    }));
  };

  const handleAddRole = useCallback(() => {
    if (newRoleName && selectedPermissions.length > 0) {
      dispatch(
        createRoleAsync({
          name: newRoleName,
          permissions: selectedPermissions,
        }),
      );
      setNewRoleName('');
      setSelectedPermissions([]);
    }
  }, [dispatch, newRoleName, selectedPermissions]);

  const handleInputChange = useCallback((e) => {
    setNewRoleName(e.target.value);
  }, []);

  const handlePermissionChange = useCallback((permissionId: string) => {
    setSelectedPermissions((prevSelected) =>
      prevSelected.includes(permissionId)
        ? prevSelected.filter((id) => id !== permissionId)
        : [...prevSelected, permissionId],
    );
  }, []);

  const handleRolePermissionChange = useCallback((permissionId: string) => {
    setEditingPermissions((prevPermissions) =>
      prevPermissions.includes(permissionId)
        ? prevPermissions.filter((id) => id !== permissionId)
        : [...prevPermissions, permissionId],
    );
  }, []);

  const handleModulePermissionChange = useCallback(
    (
      modulePermissions: string[],
      isChecked: boolean,
      target: 'selected' | 'editing',
    ) => {
      if (target === 'selected') {
        setSelectedPermissions((prevSelected) =>
          isChecked
            ? [
                ...prevSelected,
                ...modulePermissions.filter((id) => !prevSelected.includes(id)),
              ]
            : prevSelected.filter((id) => !modulePermissions.includes(id)),
        );
      } else {
        setEditingPermissions((prevSelected) =>
          isChecked
            ? [
                ...prevSelected,
                ...modulePermissions.filter((id) => !prevSelected.includes(id)),
              ]
            : prevSelected.filter((id) => !modulePermissions.includes(id)),
        );
      }
    },
    [],
  );

  const handleSavePermissions = useCallback(
    (roleId: string) => {
      dispatch(
        updateRolePermissionsAsync({ roleId, permissions: editingPermissions }),
      );
    },
    [dispatch, editingPermissions],
  );

  const handleDeleteRole = useCallback(
    (roleId: string) => {
      if (confirm('確定要刪除此角色嗎？')) {
        dispatch(deleteRoleAsync(roleId));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (updateRoleSuccess) {
      toast({
        title: '權限更新成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }

    if (updateRoleFailed) {
      toast({
        title: '更新角色與權限失敗',
        description: updateRoleError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [updateRoleFailed, updateRoleSuccess, updateRoleError, toast]);

  useEffect(() => {
    if (createRoleSuccess) {
      toast({
        title: '建立角色與權限成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    dispatch(getAllRolesAsync());
    if (createRoleFailed) {
      toast({
        title: '建立角色與權限失敗',
        description: createRoleError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [createRoleFailed, createRoleSuccess, createRoleError, toast]);

  useEffect(() => {
    if (deleteRoleSuccess) {
      toast({
        title: '刪除角色成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }

    if (deleteRoleFailed) {
      toast({
        title: '刪除角色失敗',
        description: createRoleError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [deleteRoleFailed, deleteRoleSuccess, deleteRoleError, toast]);

  useEffect(() => {
    return () => {
      dispatch(resetRoleState());
    };
  }, [dispatch]);

  const renderRolePermissions = useCallback(
    (role: any) => {
      if (!role || !role._id) return null;

      const rolePermissions = editingPermissions || [];

      return (
        <Box w='full'>
          <Stack pl={6} mt={1} spacing={1}>
            {groupPermissionsByModule(permissions || []).map(
              ({ module, permissions }) => {
                const modulePermissionIds = permissions.map((p) => p._id);
                const allChecked = modulePermissionIds.every((id) =>
                  rolePermissions.includes(id),
                );
                const isIndeterminate =
                  modulePermissionIds.some((id) =>
                    rolePermissions.includes(id),
                  ) && !allChecked;

                return (
                  <Box key={module} w='full'>
                    <Checkbox
                      isChecked={allChecked}
                      isIndeterminate={isIndeterminate}
                      onChange={(e) =>
                        handleModulePermissionChange(
                          modulePermissionIds,
                          e.target.checked,
                          'editing',
                        )
                      }
                      borderColor='gray.700'
                    >
                      {module}（全部選擇）
                    </Checkbox>
                    <VStack align='start' spacing={1} pl={4}>
                      {permissions.map((perm) => (
                        <Checkbox
                          key={perm._id}
                          isChecked={rolePermissions.includes(perm._id)}
                          onChange={() => handleRolePermissionChange(perm._id)}
                          borderColor='gray.400'
                          colorScheme='green'
                        >
                          {perm.description}
                        </Checkbox>
                      ))}
                    </VStack>
                  </Box>
                );
              },
            )}
          </Stack>
          <Button
            mt={4}
            colorScheme='blue'
            onClick={() => handleSavePermissions(role._id)}
          >
            保存更改
          </Button>
        </Box>
      );
    },
    [
      editingPermissions,
      groupPermissionsByModule,
      handleModulePermissionChange,
      handleRolePermissionChange,
      handleSavePermissions,
      permissions,
    ],
  );

  const renderAddRolePermissions = useCallback(() => {
    return (
      <Stack pl={6} mt={1} spacing={1}>
        {groupPermissionsByModule(permissions || []).map(
          ({ module, permissions }) => {
            const modulePermissionIds = permissions.map((p) => p._id);
            const allChecked = modulePermissionIds.every((id) =>
              selectedPermissions.includes(id),
            );
            const isIndeterminate =
              modulePermissionIds.some((id) =>
                selectedPermissions.includes(id),
              ) && !allChecked;

            return (
              <Box key={module} w='full' mt='1rem'>
                <Checkbox
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  borderColor='gray.700'
                  onChange={(e) =>
                    handleModulePermissionChange(
                      modulePermissionIds,
                      e.target.checked,
                      'selected',
                    )
                  }
                >
                  {module}（全部選擇）
                </Checkbox>
                <VStack align='start' spacing={1} pl={4}>
                  {permissions.map((perm) => (
                    <Checkbox
                      key={perm._id}
                      isChecked={selectedPermissions.includes(perm._id)}
                      onChange={() => handlePermissionChange(perm._id)}
                      borderColor='gray.400'
                      colorScheme='green'
                    >
                      {perm.description}
                    </Checkbox>
                  ))}
                </VStack>
              </Box>
            );
          },
        )}
      </Stack>
    );
  }, [
    groupPermissionsByModule,
    handleModulePermissionChange,
    handlePermissionChange,
    permissions,
    selectedPermissions,
  ]);

  return (
    <LoadingLayout
      isLoading={createRoleLoading || updateRoleLoading || deleteRoleLoading}
    >
      <Box
        p={6}
        w='90%'
        mx='auto'
        bg='gray.50'
        rounded='lg'
        shadow='lg'
        mt='1rem'
      >
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
                onChange={handleInputChange}
              />
              <Button
                colorScheme='blue'
                onClick={handleAddRole}
                leftIcon={<AddIcon />}
                disabled={!newRoleName || selectedPermissions.length === 0}
              >
                新增角色
              </Button>
            </HStack>
            {renderAddRolePermissions()}
          </CardBody>
        </Card>

        <HStack spacing={6} mt={6}>
          <Card flex='1'>
            <CardHeader>
              <Heading as='h2' size='md'>
                角色列表
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={2}>
                {roles?.map((role: any) => (
                  <Box key={role?._id} w='full'>
                    <Button
                      variant={
                        expandedRoleId === role?._id ? 'solid' : 'outline'
                      }
                      leftIcon={<FaUser />}
                      w='full'
                      onClick={() =>
                        setExpandedRoleId(
                          expandedRoleId === role?._id ? null : role?._id,
                        )
                      }
                    >
                      {role?.name}
                      <ChevronDownIcon
                        ml='auto'
                        transform={
                          expandedRoleId === role?._id
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)'
                        }
                        transition='transform 0.2s'
                      />
                    </Button>
                    <Collapse in={expandedRoleId === role?._id} animateOpacity>
                      <Box mt={4} p={4} borderWidth='1px' rounded='lg'>
                        <Heading as='h3' size='sm' mb={4}>
                          權限列表
                        </Heading>
                        {renderRolePermissions(role)}
                        <Button
                          mt={4}
                          colorScheme='red'
                          onClick={() => handleDeleteRole(role?._id)}
                        >
                          刪除角色
                        </Button>
                      </Box>
                    </Collapse>
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </HStack>
      </Box>
    </LoadingLayout>
  );
};

export default RoleManagement;
