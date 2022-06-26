import { Box, Card, CardActionArea, CardContent, Grid, InputAdornment, styled, TextField, Typography } from "@mui/material";
import _ from 'lodash';
import Image from 'next/image';
import { articles } from '../../__mocks__/articles'  
import { Search } from "@mui/icons-material";
import { ChangeEvent, useState } from 'react';

export const BlogArticles = () => {
    const [filteredArticles, setFilteredArticles] = useState(articles);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchedArticles = articles.filter(
            article => article.title.toLowerCase().includes(event.target.value)
        );
        setFilteredArticles(searchedArticles);
    }

    const articlesList = _.map(filteredArticles, article => (
            <Grid item xs={12} sm={6} md={4} key={article.title}>
                <Card sx={{ bgcolor: 'background.default' }}>
                    <CardActionArea
                        sx={{
                            height: 460,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start',
                            '&:hover': {
                                '& .description': {
                                    height: 100,
                                    opacity: 1,
                                    transition: 'all 1s',
                                },
                                '& .imageBox': {
                                    opacity: '1 !important',
                                    transform: `scale(1.1)`,
                                    transition: 'all 1s',
                                }
                            }
                        }}
                    >
                        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Image
                                src={article.image}
                                alt={article.imageText}
                                layout='fill'
                                objectFit='cover'
                                className='imageBox'
                                style={{ zIndex: 0, opacity: .7, transition: 'all 1s' }}
                            />
                        </Box>
                        <Box
                            sx={{
                                zIndex: 1,
                                position: 'absolute',
                                bgcolor: 'rgba(0, 0, 0, 0.5)',
                                disaply: 'flex',
                                flexDirection: 'column',
                                width: '60%',
                                p: '1rem',
                                backdropFilter: 'blur(0.125rem)'
                            }}
                        >
                            <Typography variant='h6' sx={{ color: 'primary.main', opacity: .7 }}>
                                {article.subtitle}
                            </Typography>
                            <Typography variant='h4' sx={{ color: 'primary.contrastText' }}>
                                {article.title}
                            </Typography>
                            <Typography className='description'
                                sx={{
                                    color: 'primary.main',
                                    fontSize: '.7rem',
                                    fontWeight: 700,
                                    height: {md: 0},
                                    opacity: {md: 0},
                                    transition: 'all 1s',
                                }}
                            >
                                {article.description}
                            </Typography>
                        </Box>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Typography variant="h3" color='primary.contrastText'>
                    Latest
                </Typography>
                <Box sx={{ flexBasis: 430 }}>
                    <Card>
                        <CardContent sx={{ padding: '0 !important' }}>
                            <Box sx={{ width: '100%' }}>
                                <TextField
                                    fullWidth
                                    placeholder="Search articles"
                                    variant="outlined"
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            <Box width='100%' sx={{ py: '1rem' }}>
                <Grid container rowSpacing={{ xs: 4, md: 3 }} columnSpacing={{ sm: 2, md: 3 }}>
                    {articlesList}
                </Grid>
            </Box>
        </Box>
    );
}