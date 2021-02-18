import filterStore, { FilterStore } from './filter';

const useStore = (): {
    filterStore: FilterStore
} => ({ filterStore });

export default useStore;
