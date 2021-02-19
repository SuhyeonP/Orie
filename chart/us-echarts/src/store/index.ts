import filterStore, { FilterStore } from './filter';
import robotListStore, {RobotListStore} from "./robot";

const useStore = (): {
    filterStore: FilterStore,
    robotListStore:RobotListStore
} => ({ filterStore,robotListStore });

export default useStore;
