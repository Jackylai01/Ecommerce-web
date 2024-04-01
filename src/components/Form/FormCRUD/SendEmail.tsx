import { Box, Checkbox, FormControl, FormLabel, Stack } from '@chakra-ui/react';
import useAppSelector from '@hooks/useAppSelector';
import { useController, useFormContext } from 'react-hook-form';
import { TextInput } from './Field/TextInput';

const SendEmailForm = () => {
  const { control, setValue, getValues } = useFormContext();
  const { list } = useAppSelector((state) => state.adminClientUsers);

  const { field } = useController({
    name: 'userIds',
    control,
    defaultValue: [],
  });

  const handleCheckboxChange = (isChecked: boolean, userId: any) => {
    const currentIds = getValues('userIds') || [];
    if (isChecked) {
      setValue('userIds', [...currentIds, userId]);
    } else {
      setValue(
        'userIds',
        currentIds.filter((id: any) => id !== userId),
      );
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Recipients</FormLabel>
        <Stack
          spacing={3}
          p='1rem'
          m='1rem'
          borderRadius='10px'
          color='black'
          boxShadow='lg'
        >
          {list?.map((user) => (
            <Checkbox
              key={user._id}
              isChecked={field.value.includes(user._id)}
              onChange={(e) => handleCheckboxChange(e.target.checked, user._id)}
              borderColor='gray.700'
            >
              {user.username}
            </Checkbox>
          ))}
        </Stack>
      </FormControl>
      <TextInput
        name='subject'
        label='Subject'
        placeholder='Enter email subject'
        isRequired={true}
      />
      <TextInput
        name='content'
        label='Content'
        placeholder='Enter email content'
        isRequired={true}
        as='textarea'
        height='100px'
      />
    </Box>
  );
};

export default SendEmailForm;
