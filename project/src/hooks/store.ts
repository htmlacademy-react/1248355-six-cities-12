import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from '../types/store';

const useAppDispatch: () => AppDispatch = useDispatch;

const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export { useAppDispatch, useAppSelector };
