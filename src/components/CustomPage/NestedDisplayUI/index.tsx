import generateUUID from '@helpers/generate-uuid';
import { CustomPageElement } from '@models/entities/custom-page-template';
import Icon from './src/Icon';
import LoginBlock from './src/LoginBlock';
import SelectableImage from './src/SelectableImage';
import Table from './src/Table';
import TagElement from './src/TagElement';
import Items from './src/items';

type Props = {
  elements: CustomPageElement[];
  isEdit: boolean;
};

export type ElementProps = {
  element: CustomPageElement;
  isEdit: boolean;
  id?: string | any;
};

const NestedDisplayUI = ({ elements, isEdit = true }: Props) => {
  if (!elements || !elements.length) return <></>;

  return (
    <>
      {elements.map((element) => {
        switch (element.tagName) {
          case 'loginBlock':
            return <LoginBlock key={generateUUID()} />;
          case 'icon':
            return (
              <Icon key={generateUUID()} element={element} isEdit={isEdit} />
            );
          case 'items':
            return (
              <Items key={generateUUID()} element={element} isEdit={isEdit} />
            );
          case 'table':
            return (
              <Table key={generateUUID()} element={element} isEdit={isEdit} />
            );
          case 'img':
            return (
              <SelectableImage
                key={generateUUID()}
                element={element}
                isEdit={isEdit}
              />
            );

          default:
            return <TagElement element={element} isEdit={isEdit} />;
        }
      })}
    </>
  );
};

export default NestedDisplayUI;
