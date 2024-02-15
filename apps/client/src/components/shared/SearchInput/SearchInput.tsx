import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchInput.module.css';

interface Props {
  onSearch: (searchCriteria: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {

  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchParams] = useSearchParams();
  const queryParamValue = searchParams.get('search');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchCriteria(event.target.value);
  }

  const onSubmitForm = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch(searchCriteria);
  }

  return (
    <form onSubmit={onSubmitForm} className={styles['search-container']}>
      <input 
        type="text" 
        placeholder='Nunca dejes de buscar' 
        className={styles['search-input']}
        defaultValue={queryParamValue ? queryParamValue : ''}
        onChange={handleChange} 
        />
      <button type="submit" className={styles['search-button']}>B</button>
    </form>
  )
}

export default SearchInput