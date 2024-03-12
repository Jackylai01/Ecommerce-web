import { Button, useColorModeValue } from '@chakra-ui/react';
import { SettingsIcon } from '@components/Icons/Icons';

import PropTypes from 'prop-types';
import React from 'react';

interface FixedType {
  secondary: any;
  onChange: any;
  onSwitch: any;
  fixed: any;
  onOpen: any;
}

const FixedPlugin = ({
  secondary,
  onChange,
  onSwitch,
  fixed,
  onOpen,
}: FixedType) => {
  let navbarIcon = useColorModeValue('gray.500', 'gray.200');
  let bgButton = useColorModeValue('white', 'gray.600');
  let fixedDisplay = 'flex';
  if (secondary) {
    fixedDisplay = 'none';
  }

  const settingsRef = React.useRef<SVGSVGElement>(null);
  return (
    <>
      <Button
        h='52px'
        w='52px'
        onClick={onOpen}
        bg={bgButton}
        position='fixed'
        variant='no-hover'
        right='35px'
        bottom='30px'
        borderRadius='50px'
        boxShadow='0 2px 12px 0 rgb(0 0 0 / 16%)'
      >
        <SettingsIcon
          cursor='pointer'
          ref={settingsRef}
          color={navbarIcon}
          w='20px'
          h='20px'
        />
      </Button>
    </>
  );
};

FixedPlugin.propTypes = {
  fixed: PropTypes.bool,
  onChange: PropTypes.func,
  onSwitch: PropTypes.func,
};

export default FixedPlugin;
