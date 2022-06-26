import { AppBar, Box, Button, IconButton, Slide, Toolbar, Typography, useScrollTrigger } from "@mui/material"
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import _ from "lodash";
import { ReactElement, useState } from "react";
import { HomeSidebar } from "./home-sidebar";

type Props = {
    window?: () => Window
    children: ReactElement
}

function HiddenNav(props: Props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined
    });

    return (
        <Slide appear={false} direction="down" in={!trigger} >
            {children}
        </Slide>
    );
}

const HomeNavRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: theme.palette.primary.contrastText,
    boxShadow: 'none',
    display: 'flex',
    padding: '10px 0',
    zIndex: 500,
    backdropFilter: 'blur(0.125rem)',
}));

const pages = [
    {
        href: '/',
        title: 'Home'
    },
    {
        href: '/blog',
        title: 'Blog'
    },
    {
        href: '/contact',
        title: 'Contact'
    },
]

export const HomeNav = () => {
    const router = useRouter();
    const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        if (!anchorNav) {
            setAnchorNav(event.currentTarget);
        }
        else {
            setAnchorNav(null);
        }
    };

    const pagesList = _.map(pages, page => (
        <Link href={page.href} key={page.title}>
            <a style={{ textDecoration: 'none' }}>
                <Button
                    sx={{
                        color: (
                            page.href ? (router.pathname === page.href) : false
                        ) ? 'primary.main' : 'primary.contrastText',
                        borderBottom: (
                            page.href ? (router.pathname === page.href) : false
                        ) ? '1px solid #DBDFFD': 'none',
                        px: 0,
                        transition: 'all .1s',
                        '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'transparent',
                            borderBottom: '1px solid #DBDFFD',
                            transform: 'translateY(-2px)'
                        }
                    }}
                >
                    {page.title}
                </Button> 
            </a>
        </Link>
    ));

    return (
        <>
            <HiddenNav>
                <Box>
                    <HomeNavRoot position="fixed">
                        <Toolbar disableGutters sx={{ px: '3.6%' }}>
                            <Typography variant="h4" color='primary.main' sx={{ flex: 1 }}>
                                JD
                            </Typography>
                            <Box
                                sx={{
                                    display: {xs: 'none', md: 'flex'},
                                    flex: '0 1 30%',
                                    justifyContent: 'space-between'
                                }}
                            >
                                {pagesList}
                            </Box>
                        </Toolbar>
                    </HomeNavRoot>
                    <Box
                        sx={{
                            display: {xs: 'inline-block', md: 'none'},
                            position: 'fixed',
                            top: 25,
                            right: 10,
                            zIndex: 2000
                        }}
                    >
                        <IconButton
                            size="large"
                            onClick={handleOpen}
                        >
                            <Box
                                sx={{
                                    bgcolor: anchorNav ? 'transparent' : '#FFFFFF',
                                    width: '1.2rem',
                                    height: '2px',
                                    position: 'relative',
                                    '&::before, &::after': {
                                        content: '""',
                                        bgcolor: anchorNav ? '#000000' : '#FFFFFF',
                                        width: '1.2rem',
                                        height: '2px',
                                        zIndex: 2000,  
                                        display: 'inline-block',
                                        position: 'absolute',
                                        left: 0,
                                        transition: 'transform .2s'
                                    },
                                    '&::before': {
                                        top: anchorNav ? 0 : '-.4rem',
                                        transform: anchorNav && 'rotate(45deg)',
                                    },
                                    '&::after': {
                                        content: '""',
                                        top: anchorNav ? 0 : '.4rem',
                                        transform: anchorNav && 'rotate(-45deg)',
                                    }
                                }}
                            />
                        </IconButton>
                        <HomeSidebar
                            open={Boolean(anchorNav)}
                            onClose={() => setAnchorNav(null)}
                            pages={pages}
                        />
                    </Box>
                </Box>
            </HiddenNav>
        </>
    )
}