import { useQuery, gql } from '@apollo/client';

import Link from './Link';

const FEED_QUERY = gql`
  query Links {
    feed {
      links {
        id
        description
        url
        createdAt
      }
      id
    }
  }
`;

const LinkList = () => {
  const { loading, error, data } = useQuery(FEED_QUERY);
  const links = data?.feed?.links;

  if (loading) return <p>Loading...</p>;

  return (
    <div>{data && links.map((link) => <Link key={link.id} link={link} />)}</div>
  );
};

export default LinkList;
