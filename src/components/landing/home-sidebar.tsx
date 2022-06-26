import { Drawer, Button } from "@mui/material";
import PropTypes, { InferProps } from "prop-types";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";

export function HomeSidebar({
    open,
    onClose,
    pages
}: InferProps<typeof HomeSidebar.propTypes>) {
    const router = useRouter();

    const pagesList = _.map(pages, page =>(
            <Link href={page!.href} key={page?.title}>
                <a style={{ textDecoration: 'none' }}>
                    <Button
                        sx={{
                            color: 'primary.dark',
                            py: '20px',
                            px: 0,
                            borderBottom: (
                                page!.href ? (router.pathname === page!.href) : false
                            ) ? '1px solid #000': 'none',
                        }}
                    >
                        {page?.title}
                    </Button>
                </a>
            </Link>
        )
    );

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    bgcolor: '#FFFFFF',
                    width: '70%',
                    pt: '4rem',
                    pl: '4rem'
                }
            }}
            sx={{ zIndex: 1000 }}
        >
            {pagesList}
        </Drawer>
    );
};

HomeSidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    pages: PropTypes.arrayOf(PropTypes.shape({
        href: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    })).isRequired
}