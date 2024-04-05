import { Box, Button, Icon, VStack, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { DeleteIcon } from '@chakra-ui/icons';
import ContentSelectionModal from '@components/CustomPage/ContentSelectionModal';
import NestedDisplayUI from '@components/CustomPage/NestedDisplayUI';
import { customPageTemplates } from '@fixtures/custom-page-templates';
import {
  CustomPageBlock,
  CustomPageTemplate,
} from '@models/entities/custom-page-template';

const ProductCustomBlocks = () => {
  const { setValue } = useFormContext();
  const [blocks, setBlocks] = useState<CustomPageBlock[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddBlock = (template: CustomPageTemplate) => {
    const newBlocks = [...blocks, template.block];
    setBlocks(newBlocks);
    setValue('detailDescription', newBlocks);
  };

  const handleDeleteBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(newBlocks);
    setValue('detailDescription', newBlocks);
  };

  return (
    <VStack spacing={4} className='custom-page__selected-items'>
      {blocks.map((block, index) => (
        <Box key={index} className='custom-block' position='relative'>
          <NestedDisplayUI elements={block.elements} isEdit={true} />
          <Icon
            as={DeleteIcon}
            cursor='pointer'
            position='absolute'
            top='0'
            right='0'
            color='red.500'
            w={6}
            h={6}
            onClick={() => handleDeleteBlock(index)}
          />
        </Box>
      ))}
      <Button onClick={onOpen}>新增組件</Button>
      <ContentSelectionModal
        isOpen={isOpen}
        onClose={onClose}
        onSelect={handleAddBlock}
        templates={customPageTemplates}
      />
    </VStack>
  );
};

export default ProductCustomBlocks;
