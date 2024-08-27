import React, { useState } from 'react';
import { Group, TextInput, Button } from '@mantine/core';

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch, loading }) => {
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = searchInput.trim();
    if (trimmedInput) {
      onSearch(trimmedInput);
      setSearchInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
      <Group align="center" gap="xs">
        <TextInput
          placeholder="Enter city name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
          size="xs"
          style={{ width: '150px' }}
        />
        <Button type="submit" loading={loading} size="xs">
          Search
        </Button>
      </Group>
    </form>
  );
};

export default WeatherSearch;
