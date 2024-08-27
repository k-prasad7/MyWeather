import React, { useState } from 'react';
import { Stack, TextInput, Button } from '@mantine/core';

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
      <Stack gap="sm">
        <TextInput
          placeholder="Enter city name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
        />
        <Button type="submit" loading={loading}>Get Weather</Button>
      </Stack>
    </form>
  );
};

export default WeatherSearch;
