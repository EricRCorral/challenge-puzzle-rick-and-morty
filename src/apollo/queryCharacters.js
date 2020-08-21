import {gql} from '@apollo/client'

const queryCharacters = gql`
  query($name: FilterCharacter, $page: Int) {
    characters(filter: $name, page: $page) {
      results {
        id
        name
        type
        gender
        species
        image
      }
      info {
        pages
        next
        prev
      }
    }
  }
`;

export default queryCharacters