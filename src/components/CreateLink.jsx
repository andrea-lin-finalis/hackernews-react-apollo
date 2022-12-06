import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_LINK = gql`
  mutation CreateLink($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      createdAt
      description
      id
      url
    }
  }
`;

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

const CreateLink = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    description: '',
    url: '',
  });
  const [createLink, { loading, error, data }] = useMutation(CREATE_LINK, {
    variables: { url: formState.url, description: formState.description },
    onCompleted: () => navigate('/'),
    refetchQueries: [
      { query: FEED_QUERY }, // DocumentNode object parsed with gql
      'getFeed', // Query name
    ],
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    createLink();
    console.log(data);
  };

  if (loading) return <p>Submitting...</p>;
  if (error) return <p>{`Submission error! ${error.message}`}</p>;

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({ ...formState, url: e.target.value })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
