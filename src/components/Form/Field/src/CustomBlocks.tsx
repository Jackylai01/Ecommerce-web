import {
  Box,
  Button,
  Flex,
  Heading,
  useBreakpointValue,
  useMediaQuery,
} from '@chakra-ui/react';
import CustomPage from '@components/CustomPage';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { CustomPageBlock } from '@models/entities/custom-page-template';
import { ModuleFolderId } from '@models/requests/archive.req';
import {
  setCustomPageActive,
  setPageBlocks,
} from '@reducers/admin/custom-page';
import { setFileSelectFolderId } from '@reducers/file-select';
import { useEffect, useRef } from 'react';
import { InnerProps } from '..';

const CustomBlocks = ({
  watch,
  setValue,
  fieldConfig: { name, label, required, col, moduleName },
}: InnerProps) => {
  const dispatch = useAppDispatch();
  const current = watch(name);
  const [isLargerThanTablet] = useMediaQuery('(min-width: 1400px)');
  const { active, pageBlocks } = useAppSelector((store) => store.customPage);
  const buttonSize = useBreakpointValue({ base: 'xs', md: 'md' });

  const block = useRef<HTMLDivElement>(null);
  const saveButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!moduleName) return;
    dispatch(setFileSelectFolderId(ModuleFolderId[moduleName]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleName]);

  useEffect(() => {
    dispatch(setPageBlocks((watch(name) as any) ?? []));
  }, [dispatch, current, watch, name]);

  // 藉由實際按鈕的觸發解決更新問題，掛載地方為畫面儲存送出按鈕與架站器的的側欄選單
  useEffect(() => {
    const currentPageSubmitButton =
      document.querySelector('.container__header');
    const customPageOptionItems: HTMLElement | null = document.querySelector(
      '.custom-page__option-items',
    );
    currentPageSubmitButton?.addEventListener('click', clickSaveButton);
    customPageOptionItems?.addEventListener('mouseenter', clickSaveButton);
    return () => {
      currentPageSubmitButton?.removeEventListener('click', clickSaveButton);
      customPageOptionItems?.removeEventListener('mouseenter', clickSaveButton);
    };
  }, []);

  const clickSaveButton = () => {
    saveButton.current?.click();
  };

  let copySelectedItems: CustomPageBlock[] = JSON.parse(
    JSON.stringify(pageBlocks ?? []),
  );

  const setBlock = () => {
    setValue(name, copySelectedItems);
    setValue('blockText', block.current?.innerText.replace(/(\n|\r|\t)/g, ''));
  };

  return (
    <>
      <Flex
        direction='column'
        w={isLargerThanTablet ? '100%' : '100vw'}
        mb='60px'
      >
        <Flex
          justifyContent='space-between'
          alignItems='center'
          p={4}
          bg='gray.100'
        >
          <Heading as='h2' size='md'>
            {required && '* '}
            {label}
          </Heading>
          <Flex>
            <Button
              ref={saveButton}
              colorScheme={active ? 'red' : 'blue'}
              onClick={() => (
                dispatch(setCustomPageActive(!active)), setBlock()
              )}
              size={buttonSize}
            >
              {active ? '取消編輯內容' : '編輯模式'}
            </Button>
          </Flex>
        </Flex>
        <Box ref={block} flex='1'>
          <CustomPage
            copySelectedItems={copySelectedItems}
            clickSaveButton={clickSaveButton}
          />
        </Box>
      </Flex>
    </>
  );
};

export default CustomBlocks;
