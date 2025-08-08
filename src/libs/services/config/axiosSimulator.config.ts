import { AxiosSimulatorProps } from './interfaces/axiosSimulator.interface';

const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const axiosSimulator = async <T>({ delay, mockedResponse }: AxiosSimulatorProps<T>): Promise<T> => {
  await timeout(delay);
  return mockedResponse;
};

export default axiosSimulator;