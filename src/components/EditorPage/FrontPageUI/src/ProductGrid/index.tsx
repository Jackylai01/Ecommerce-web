import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Grid,
  GridItem,
  IconButton,
  Image,
  Input,
  Select,
} from '@chakra-ui/react';
import { Component, testImage } from '@fixtures/componentLibrary';
import useAppDispatch from '@hooks/useAppDispatch';
import { updateBlock } from '@reducers/admin/design-pages';
import { uploadImageAsync } from '@reducers/admin/design-pages/actions';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ProductGridEditorProps {
  element: Component;
  index: number;
  isEdit: boolean;
  onBlur: () => void;
}

const ProductGridEditor: React.FC<ProductGridEditorProps> = ({
  element,
  index,
  isEdit,
  onBlur,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState(element.elements || []);
  const [cardWidth, setCardWidth] = useState(
    products[0]?.className || 'medium',
  );
  const [backgroundColor, setBackgroundColor] = useState(
    element.style?.backgroundColor || '#ffffff',
  );
  const dispatch = useAppDispatch();

  // 當選擇新的卡片寬度時，更新所有產品的寬度
  useEffect(() => {
    if (isEdit) {
      const updatedProducts = products.map((product) => ({
        ...product,
        className: cardWidth,
      }));
      setProducts(updatedProducts);
      dispatch(
        updateBlock({
          index,
          block: { ...element, elements: updatedProducts },
        }),
      );
    }
  }, [cardWidth, isEdit]);

  const uploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    elIndex: number,
    elementId: string,
  ) => {
    const elementUuid = products[elIndex].elementUuid;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      dispatch(uploadImageAsync({ file, index, elementUuid, elementId }));
    }
  };

  const handleLinkChange = (
    productIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newProducts = products.map((product, index) =>
      index === productIndex
        ? { ...product, href: event.target.value }
        : product,
    );

    setProducts(newProducts);
    dispatch(
      updateBlock({ index, block: { ...element, elements: newProducts } }),
    );
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: `product-${products.length + 1}`,
      elementUuid: `uuid-${products.length + 1}`,
      tagName: 'img',
      src: testImage,
      href: '#',
      context: `產品 ${products.length + 1}`,
      className: cardWidth,
    };
    const newProducts = [...products, newProduct];
    setProducts(newProducts);
    dispatch(
      updateBlock({ index, block: { ...element, elements: newProducts } }),
    );
  };

  const handleRemoveProduct = (productIndex: number) => {
    const newProducts = products.filter((_, index) => index !== productIndex);
    setProducts(newProducts);
    dispatch(
      updateBlock({ index, block: { ...element, elements: newProducts } }),
    );
  };

  const handleIconClick = (productIndex: number, elementId: any) => {
    const elementUuid = products[productIndex].elementUuid;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.dataset.elementUuid = elementUuid;
      fileInputRef.current.dataset.elementId = elementId;
      fileInputRef.current.dataset.elIndex = `${productIndex}`;
      fileInputRef.current.click();
    }
  };

  const handleBackgroundColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newColor = e.target.value;
    setBackgroundColor(newColor);
    dispatch(
      updateBlock({
        index,
        block: {
          ...element,
          style: { ...element.style, backgroundColor: newColor },
        },
      }),
    );
  };

  // 根據 cardWidth 設定 maxWidth
  const getMaxWidth = () => {
    switch (cardWidth) {
      case 'small':
        return '200px';
      case 'medium':
        return '300px';
      case 'large':
        return '400px';
      default:
        return '300px';
    }
  };

  useEffect(() => {
    setProducts(element.elements || []);
  }, [element.elements]);

  useEffect(() => {
    const updatedProducts = (element.elements || []).map((el) => ({
      ...el,
      elementUuid: el.elementUuid || uuidv4(),
    }));
    setProducts(updatedProducts);
  }, [element.elements]);

  return (
    <Box className='product-grid' style={{ backgroundColor }}>
      {isEdit && (
        <Box mb={4}>
          <Select
            value={cardWidth}
            onChange={(e) => setCardWidth(e.target.value)}
            placeholder='選擇卡片寬度'
          >
            <option value='small'>小 (200px)</option>
            <option value='medium'>中 (300px)</option>
            <option value='large'>大 (400px)</option>
          </Select>
          <Input
            type='color'
            value={backgroundColor}
            onChange={handleBackgroundColorChange}
            mt={2}
          />
        </Box>
      )}
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        gap={6}
      >
        {products.map((product, productIndex) => (
          <GridItem key={product.id} maxW={getMaxWidth()}>
            <Box className='product-grid__card' position='relative'>
              {isEdit && (
                <IconButton
                  aria-label='刪除產品卡片'
                  icon={<CloseIcon />}
                  size='xs'
                  position='absolute'
                  top='5px'
                  right='5px'
                  onClick={() => handleRemoveProduct(productIndex)}
                />
              )}
              <Image
                src={product.src}
                alt={product.context}
                className='product-grid__image'
                onClick={() => handleIconClick(productIndex, product.id)}
              />
              {isEdit && (
                <Box mt={2}>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={(e) =>
                      uploadImage(
                        e,
                        parseInt(
                          fileInputRef.current?.dataset.elIndex || '0',
                          10,
                        ),
                        fileInputRef.current?.dataset.elementId || '',
                      )
                    }
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  <Input
                    mt={2}
                    type='url'
                    placeholder='輸入超連結'
                    value={product.href}
                    onChange={(event) => handleLinkChange(productIndex, event)}
                  />
                </Box>
              )}
            </Box>
          </GridItem>
        ))}
      </Grid>
      {isEdit && (
        <Button mt={4} onClick={handleAddProduct}>
          新增產品卡片
        </Button>
      )}
    </Box>
  );
};

export default ProductGridEditor;
