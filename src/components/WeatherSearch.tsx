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
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Group align="flex-end" justify="space-between">
        <TextInput
          placeholder="Enter city name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
          style={{ flexGrow: 1, marginRight: '10px' }}
        />
        <Button type="submit" loading={loading}>
          Get Weather
        </Button>
      </Group>
    </form>
  );
};

export default WeatherSearch;
