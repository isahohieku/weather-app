import WeatherPage from './pages/weather';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './store/react-query';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherPage />
    </QueryClientProvider>
  );
};

export default App;
