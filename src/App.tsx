import WeatherPage from './pages/Weather';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './store/react-query';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherPage />
    </QueryClientProvider>
  );
};

export default App;
