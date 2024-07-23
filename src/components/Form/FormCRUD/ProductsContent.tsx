import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Switch,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { IProduct } from '@models/requests/products';
import { getAllProductsCategoryAsync } from '@reducers/admin/product-category/actions';

import { getAllProductsTagsAsync } from '@reducers/admin/product-tags/actions';
import {
  deleteProductImageAsync,
  getProductByIdAsync,
} from '@reducers/admin/products/actions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAdminColorMode } from 'src/context/colorMode';
import CustomSelect from './Field/CustomSelect';
import ImageUpload from './Field/ImageUpload';
import DynamicSpecifications from './Field/Specifications';
import { TagsMultiSelect } from './Field/TagsSelect';
import TextInput from './Field/TextInput';
import ToggleSwitch from './Field/ToggleSwitch';
import ProductCustomBlocks from './ProductCustomBlocks';

interface UpsellProduct {
  productId: string;
  productName: string;
  upsellPrice: string;
  upsellLimit: string;
  upsellStock: string;
}

interface UpsellProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUpsellProducts: UpsellProduct[];
  setSelectedUpsellProducts: React.Dispatch<
    React.SetStateAction<UpsellProduct[]>
  >;
}

const UpsellProductModal: React.FC<UpsellProductModalProps> = ({
  isOpen,
  onClose,
  selectedUpsellProducts,
  setSelectedUpsellProducts,
}) => {
  const { list: products } = useAppSelector((state) => state.adminProducts);

  const handleProductSelect = (product: IProduct) => {
    setSelectedUpsellProducts((prev) => {
      const isSelected = prev.some((item) => item.productId === product._id);
      if (isSelected) {
        return prev.filter((item) => item.productId !== product._id);
      } else {
        return [
          ...prev,
          {
            productId: product._id,
            productName: product.name,
            upsellPrice: '',
            upsellLimit: '',
            upsellStock: '',
          },
        ];
      }
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>選擇加購產品</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {products?.map((product: any) => (
              <Box
                key={product._id}
                p={4}
                borderWidth={1}
                borderRadius='md'
                boxShadow='md'
                cursor='pointer'
                onClick={() => handleProductSelect(product)}
                bg={
                  selectedUpsellProducts.some(
                    (item) => item.productId === product._id,
                  )
                    ? 'teal.100'
                    : 'white'
                }
              >
                <Text fontWeight='bold'>{product.name}</Text>
                <Text fontSize='sm'>{product.description}</Text>
                <Text fontSize='sm'>售價: {product.price}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            完成
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const ProductFormContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { setValue, watch, register } = useFormContext();
  const statusValue = watch('status');
  const { uploadedImages } = useAppSelector((state) => state.adminUpload);
  const { list: categories } = useAppSelector(
    (state) => state.adminProductsCategory,
  );
  const { list: tags } = useAppSelector((state) => state.adminProductsTags);
  const { id: productId } = router.query as any;
  const {
    productDetails,
    status: { deleteProductImageLoading },
  } = useAppSelector((state) => state.adminProducts);

  const [coverImagePreview, setCoverImagePreview] = useState<any>(null);
  const [productImagesPreviews, setProductImagesPreviews] = useState<any>([]);
  const [isUpsellEnabled, setIsUpsellEnabled] = useState(false);
  const [selectedUpsellProducts, setSelectedUpsellProducts] = useState<any[]>(
    [],
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useAdminColorMode();
  const textColor = colorMode === 'light' ? 'gray.700' : 'white';

  const handleRemoveProductImage = () => {
    if (productId && coverImagePreview?.imageId) {
      dispatch(
        deleteProductImageAsync({
          productId,
          imageId: coverImagePreview.imageId,
        }),
      ).then(() => {
        setCoverImagePreview(null);
      });
    }
  };

  const categoryOptions =
    categories?.map((category) => ({
      value: category._id ?? '',
      label: category.name ?? '',
    })) || [];

  const tagsOptions =
    tags?.map((tag) => ({
      value: tag._id ?? '',
      label: tag.name ?? '',
    })) || [];

  useEffect(() => {
    dispatch(getAllProductsCategoryAsync({ page: 1, limit: 100 }));
    dispatch(getAllProductsTagsAsync({ page: 1, limit: 100 }));

    if (productId) {
      dispatch(getProductByIdAsync(productId));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    // 當產品詳情存在時，設置產品資料
    if (productDetails) {
      setValue('name', productDetails.name);
      setValue('description', productDetails.description);
      setValue('price', productDetails.price);
      setValue('category', productDetails.category[0]);
      setValue('status', productDetails.status);
      setValue('stock', productDetails.stock);
      setValue('minimumPurchase', productDetails.minimumPurchase);
      setValue('maximumPurchase', productDetails.maximumPurchase);
      setValue('cost', productDetails.cost);
      setValue('tags', productDetails.tags);
      setValue('discount', productDetails.discount);
      setValue('upsellProducts', productDetails.upsellProducts);

      if (productDetails.specifications) {
        setValue(
          'specifications',
          productDetails.specifications.map((spec: any) => ({ ...spec })),
        );
      }

      if (productDetails.coverImage) {
        setCoverImagePreview({
          url: productDetails.coverImage.imageUrl,
          file: null,
          imageId: productDetails.coverImage.imageId,
        });
      }

      setProductImagesPreviews(
        productDetails.images.map((image) => ({
          url: image.imageUrl,
          imageId: image.imageId,
        })),
      );

      const detailDescription = productDetails.detailDescription.map(
        (block: any) => {
          if (block.className === 'image-selectable') {
            return {
              ...block,
              elements: block.elements.map((element: any) => {
                if (element.tagName === 'img') {
                  return {
                    ...element,
                    src: element.src,
                    imageId: element.imageId,
                  };
                }
                return element;
              }),
            };
          }
          return block;
        },
      );

      setValue('detailDescription', detailDescription);
    }
  }, [productDetails, setValue]);

  useEffect(() => {
    if (uploadedImages.length > 0 && !productId) {
      const imageBlocks = uploadedImages.map((image) => ({
        className: 'image-selectable',
        elements: [
          {
            tagName: 'img',
            src: image.imageUrl,
            imageId: image.imageId,
          },
        ],
      }));

      setValue('detailDescription', imageBlocks);
    }
  }, [uploadedImages, productId, setValue]);

  // 设置初始值
  useEffect(() => {
    selectedUpsellProducts.forEach((product, index) => {
      setValue(`upsellProducts[${index}].productId`, product.productId);
    });
  }, [selectedUpsellProducts, setValue]);

  return (
    <VStack spacing={4} align='flex-start' color={textColor}>
      <TextInput
        name='name'
        label='商品名稱'
        placeholder='請輸入商品名稱'
        isRequired
      />
      <TextInput
        name='description'
        label='商品描述'
        placeholder='請輸入商品描述'
        isRequired
      />
      <TextInput
        name='price'
        label='價格'
        placeholder='請輸入商品價格'
        isRequired
      />
      <TextInput
        name='minimumPurchase'
        label='最低購買數量'
        placeholder='請輸入商品最低購買數量(選填)'
        isRequired
      />
      <TextInput
        name='maximumPurchase'
        label='最高購買數量'
        placeholder='請輸入商品最高購買數量(選填)'
        isRequired
      />
      <TextInput
        name='cost'
        label='商品總成本'
        placeholder='請輸入商品總成本'
      />
      <TextInput name='stock' label='庫存' placeholder='請輸入商品總庫存' />
      <CustomSelect
        name='category'
        label='產品類別'
        options={categoryOptions}
        isRequired
      />
      <TagsMultiSelect name='tags' label='產品標籤' options={tagsOptions} />

      <ToggleSwitch
        name='status'
        label='產品狀態'
        onValue='onSale'
        offValue='offShelf'
        onLabel='上架'
        offLabel='下架'
        value={statusValue}
        onChange={(value) => setValue('status', value)}
      />
      <DynamicSpecifications />
      <ImageUpload
        name='coverImage'
        label='封面照片'
        isRequired
        previewUrl={coverImagePreview}
        onRemoveImage={handleRemoveProductImage}
        deleteLoading={deleteProductImageLoading}
      />
      <ImageUpload
        name='images'
        label='產品圖片'
        isRequired
        multiple
        previewUrls={productImagesPreviews}
        productId={productId}
        onRemoveImage={handleRemoveProductImage}
        deleteLoading={deleteProductImageLoading}
      />
      <ProductCustomBlocks name='detailDescription' label='詳細商品內容' />

      <HStack spacing={4} alignItems='center'>
        <Text>是否啟用加購</Text>
        <Switch
          isChecked={isUpsellEnabled}
          onChange={(e) => setIsUpsellEnabled(e.target.checked)}
        />
      </HStack>
      {isUpsellEnabled && (
        <>
          <Button onClick={onOpen} colorScheme='blue'>
            選擇加購產品
          </Button>
          {selectedUpsellProducts.map((product, index) => (
            <Box
              key={product.productId}
              p={4}
              borderWidth={1}
              borderRadius='md'
              boxShadow='md'
            >
              <HStack spacing={4} display='flex' flexDirection='column'>
                <TextInput
                  name={`upsellProducts[${index}].productId`}
                  label='加購產品ID'
                  placeholder='加購產品ID'
                  isRequired
                  value={product.productId}
                  style={{ display: 'none' }}
                />
                <Text fontWeight='bold'>
                  加購產品名稱: {product.productName}
                </Text>
                <TextInput
                  name={`upsellProducts[${index}].upsellPrice`}
                  label='加購價格'
                  placeholder='輸入加購價格'
                  isRequired
                />
                <TextInput
                  name={`upsellProducts[${index}].upsellLimit`}
                  label='加購上限'
                  placeholder='輸入加購上限'
                  isRequired
                />
                <TextInput
                  name={`upsellProducts[${index}].upsellStock`}
                  label='加購庫存數量'
                  placeholder='輸入加購庫存數量'
                  isRequired
                />
              </HStack>
            </Box>
          ))}

          <UpsellProductModal
            isOpen={isOpen}
            onClose={onClose}
            selectedUpsellProducts={selectedUpsellProducts}
            setSelectedUpsellProducts={setSelectedUpsellProducts}
          />
        </>
      )}
    </VStack>
  );
};
