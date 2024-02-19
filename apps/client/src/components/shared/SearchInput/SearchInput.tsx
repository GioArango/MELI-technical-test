import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchInput.module.scss';
import iconSearch from '@/assets/icon_search.png'

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

    if (searchCriteria === '') return;
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
        maxLength={100}
        />
      <button type="submit" className={styles['search-button']}>
        <img src={iconSearch} alt='Icono buscar'/>
      </button>
    </form>
  )
}

export default SearchInput