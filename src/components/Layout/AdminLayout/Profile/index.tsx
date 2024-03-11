import { Flex, Grid, useColorModeValue } from '@chakra-ui/react';

import Conversations from './components/Conversations';
import Header from './components/Header';
import PlatformSettings from './components/PlatformSettings';
import ProfileInformation from './components/ProfileInformation';
import Projects from './components/Projects';

const Profile = () => {
  const textColor = useColorModeValue('gray.700', 'white');
  const bgProfile = useColorModeValue(
    'hsla(0,0%,100%,.8)',
    'linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)',
  );

  return (
    <Flex direction='column' mt='2rem'>
      <Header
        backgroundHeader='https://res.cloudinary.com/dqawkwte9/image/upload/v1709726163/csxaregkhrbscmtkizgx.png'
        backgroundProfile={bgProfile}
        avatarImage='https://res.cloudinary.com/dqawkwte9/image/upload/v1709726207/nwjj0vb50pbh6sdkwwrk.png'
        name={'Esthera Jackson'}
        email={'esthera@simmmple.com'}
      />
      <Grid templateColumns={{ sm: '1fr', xl: 'repeat(3, 1fr)' }} gap='22px'>
        <PlatformSettings
          title={'Platform Settings'}
          subtitle1={'ACCOUNT'}
          subtitle2={'APPLICATION'}
        />
        <ProfileInformation
          title={'Profile Information'}
          description={
            'Hi, I’m Esthera Jackson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).'
          }
          name={'Esthera Jackson'}
          mobile={'(44) 123 1234 123'}
          email={'esthera@simmmple.com'}
          location={'United States'}
        />
        <Conversations title={'Conversations'} />
      </Grid>
      <Projects title={'Projects'} description={'Architects design houses'} />
    </Flex>
  );
};

export default Profile;
