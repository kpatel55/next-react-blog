import { styled, Theme, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { Box } from '@mui/material'
import { HomeLayout } from '../components/landing/home-layout'
import { ReactElement } from 'react'

const HomePageText = styled('div')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  zIndex: 1,
  alignSelf: 'center',
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'end',
  width: '100%',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
  }
}));

const HomePageTextBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  maxWidth: '95%',
  [theme.breakpoints.up('md')]: {
    maxWidth: '45%',
    paddingRight: '3%'
  }
}));

const HomePage = () => {
  return (
    <>
      <Head>
        <title>
          Home | Next.js Blog
        </title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          width: '100%',
          position: 'relative'
        }}>
        <Image
          src="/images/landing.jpg"
          alt='Langing Image'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          style={{ zIndex: 0, opacity: 0.4 }}
        />
        <HomePageText>
          <HomePageTextBox>
            <Typography variant='h2' sx={{ fontFamily: 'Permanent Marker', letterSpacing: '.5rem' }}>
              John Doe
            </Typography>
            <Typography variant='h6' mb='5%' sx={{ lineHeight: 2, opacity: .7 }}>
              Job Title, Company Name
            </Typography>
            <Typography variant='h5' color='primary' sx={{ lineHeight: 2 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, asperiores impedit. Hic obcaecati nisi dolor architecto ullam suscipit exercitationem corrupti earum, delectus ab? Quos quae maxime eligendi nostrum obcaecati aliquam!
            </Typography>
          </HomePageTextBox>
        </HomePageText>
      </Box>
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomeLayout>
      {page}
    </HomeLayout>
  );
}

export default HomePage;