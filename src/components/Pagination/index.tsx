import { Box, Flex, List, ListItem, Select } from '@chakra-ui/react';
import { fieldQuery, formatQueryString } from '@helpers/query';
import { Metadata } from '@models/entities/shared/pagination';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type Props = {
  metadata: Metadata;
};

const Pagination = ({ metadata }: Props) => {
  const [middenLinks, setMiddenLinks] = useState<(string | number)[]>([]);
  const { count, limit, last, page } = metadata;
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < last ? page + 1 : last;
  const startIndex = limit * (page - 1) + 1;
  const endIndex = page === last ? count - (page & limit) : page * limit;

  const router = useRouter();
  const { pathname, query } = router;

  useEffect(() => {
    let links;

    if (last <= 8) {
      links = Array(last)
        .fill('')
        .map((e, index) => (index += 1));
    } else if (page <= 5) {
      links = Array(8)
        .fill('')
        .map((e, index) => (index += 1));
      links = [...links, '...', last];
    } else if (page >= last - 5) {
      let startNumber = last - 8;
      links = Array(8)
        .fill('')
        .map((e) => (startNumber += 1));
      links = [1, '...', ...links];
    } else {
      let startNumber = page - 4;
      links = Array(7)
        .fill('')
        .map((e) => (startNumber += 1));
      links = [1, '...', ...links, '...', last];
    }

    setMiddenLinks(links);
  }, [last, page]);

  useEffect(() => {
    if (Number(query.page ?? last) > last) {
      const routerLink = formatQueryString(pathname, {
        ...query,
        page: last,
      });
      router.push(routerLink);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page, last]);

  const selectPageLimit = (limitNumber: string) => {
    if (!limitNumber) return;
    const routerLink = formatQueryString(pathname, {
      ...query,
      limit: limitNumber,
    });
    router.push(routerLink);
  };

  const linkString = (pageNumber: number): string => {
    return fieldQuery(pathname, { ...query, page: pageNumber });
  };

  const relString = (pageNumber: number): string | undefined => {
    return pageNumber === prevPage
      ? 'prev'
      : pageNumber === nextPage
      ? 'next'
      : undefined;
  };

  return (
    <Flex
      as='footer'
      align='flex-end'
      wrap='wrap'
      fontSize='0.9rem'
      justifyContent='space-between'
    >
      <Box display='inline-flex' flexDirection='column' marginTop='1rem'>
        <Box as='p' color='white'>
          顯示 {startIndex}-{endIndex} 筆項目，總計 {page} 頁 {count} 個項目
        </Box>
        {last > 1 && (
          <List
            display='flex'
            flexWrap='wrap'
            alignItems='center'
            marginTop='1rem'
          >
            <ListItem color='white'>
              <Link href={linkString(prevPage)} passHref>
                <Box as='a'>
                  <FaArrowLeft />
                </Box>
              </Link>
            </ListItem>
            {middenLinks.map((item, index) => (
              <ListItem
                key={index}
                overflow='hidden'
                fontWeight='500'
                color='white'
                margin='0rem 0.5rem'
              >
                {typeof item === 'number' ? (
                  <Link href={linkString(item)}>
                    <a
                      className={`${item === page ? 'active' : ''}`}
                      rel={relString(item)}
                      style={{ color: item === page ? '#1e78c1' : 'white' }}
                    >
                      {item}
                    </a>
                  </Link>
                ) : (
                  item
                )}
              </ListItem>
            ))}
            <ListItem
              color='white'
              justifyContent='center
            '
            >
              <Link href={linkString(nextPage)} passHref>
                <Box as='a'>
                  <FaArrowRight />
                </Box>
              </Link>
            </ListItem>
          </List>
        )}
      </Box>
      <Flex alignItems='center' justifyContent='center' mt='2rem'>
        <Box as='p' color='white'>
          每頁筆數：
        </Box>
        <Box as='form'>
          <Box as='label' htmlFor='pagination-show-number'>
            <Select
              id='pagination-show-number'
              color='white'
              fontWeight='700'
              value={limit}
              onChange={(event) => selectPageLimit(event.target.value)}
              sx={{
                option: {
                  color: 'black',
                },
              }}
            >
              <Box as='option' value='10'>
                10
              </Box>
              <Box as='option' value='25'>
                25
              </Box>
              <Box as='option' value='50'>
                50
              </Box>
            </Select>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Pagination;
