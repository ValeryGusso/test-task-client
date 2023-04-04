import { useDispatch } from 'react-redux'
import { TypeDispatch } from '../redux/store'

const useTypedDispatch: () => TypeDispatch = useDispatch

export default useTypedDispatch
